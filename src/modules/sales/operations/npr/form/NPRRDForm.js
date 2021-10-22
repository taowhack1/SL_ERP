import Text from "antd/lib/typography/Text";
import React, { useMemo } from "react";
import MainLayout from "../../../../../components/MainLayout";
import DetailFormSales from "./DetailFormSales";
import TabList from "./TabList";
import { useParams } from "react-router";
import { useFetch } from "../../../../../include/js/customHooks";
import { Spin } from "antd";
export const NPRFormContext = React.createContext();
const apiNPR = `/sales/npr`;
const NPRRDForm = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(`${apiNPR}/${id}`);
  console.log("data", data, loading);
  const layoutConfig = useMemo(
    () => ({
      projectId: 7, // project ID from DB
      title: "SALES", // project name
      home: "/sales/npr", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Sales", "NPR", "create"], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: [], // button
      badgeCont: 0, //number
      step: null, // object {current:0,step:[],process_complete:bool}
      create: "", // path or "modal" and use openModal() instead
      edit: "", // object {data: any , path : "string"} or function
      discard: "", //path
      back: "", //path
      save: "", //path if not path use "function" and use onSave instead.
      onConfirm: () => console.log("Confirm"),
      onApprove: () => console.log("Approve"),
      onReject: () => console.log("Reject"),
      onCancel: () => console.log("Cancel"),
      onSearch: (keyword) => console.log("Search Key", keyword),
      openModal: () => console.log("openModal"),
      searchBar: null, //html code this show below search input
    }),
    []
  );
  const formContextValue = {
    data,
    loading,
    npr_id: id,
  };
  const { npr_created } = data || {};
  return (
    <>
      <NPRFormContext.Provider value={formContextValue}>
        <MainLayout {...layoutConfig}>
          <Spin spinning={loading}>
            <div id="form">
              <div className="under-line">
                <div className="d-flex space-between item-center">
                  <div>
                    <h1>New Product Request</h1>
                  </div>
                  <div>
                    <Text strong>Issued Date :</Text>
                    <Text>{`${npr_created || "-"}`}</Text>
                  </div>
                </div>
              </div>
              <DetailFormSales />
              <TabList />
            </div>
          </Spin>
        </MainLayout>
      </NPRFormContext.Provider>
    </>
  );
};

export default NPRRDForm;
