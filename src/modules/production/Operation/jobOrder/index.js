import { Radio, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getJobOrderData } from "../../../../actions/production/jobOrderActions";
import MainLayout from "../../../../components/MainLayout";
import JobOrderListTable from "./JobOrderListTable";
import { sortData } from "../../../../include/js/function_main";
import PlanningModal from "../planning/PlanningModal";
// let dataSource = [];
const JobOrderMain = () => {
  // const [state, setState] = useState({
  //   loading: false,
  //   dataSource: [],
  // });

  // const setLoading = (bool = false) =>
  //   setState((prev) => ({ ...prev, loading: bool }));

  const [modal, setModal] = useState({
    visible: false,
    data: {},
  });

  // useEffect(() => {
  //   const getData = async () => {
  //     setLoading(true);
  //     const resp = await getJobOrderData();
  //     if (resp.success) {
  //       dataSource = resp.data;
  //       setState((prev) => ({
  //         ...prev,
  //         dataSource: sortData(resp.data),
  //         loading: false,
  //       }));
  //     } else {
  //       setLoading(false);
  //     }
  //   };

  //   !modal.visible && getData();

  //   return () => {
  //     dataSource = [];
  //   };
  // }, [modal.visible]);

  const openModal = useCallback(
    (plan) => {
      setModal({ ...modal, visible: true, data: plan });
    },
    [modal, setModal]
  );

  const closeModal = useCallback(
    (data) => {
      setModal({
        visible: false,
        data: {},
      });
    },
    [setModal]
  );

  const saveModal = useCallback(
    (data) => {
      setModal({
        visible: false,
        data: {},
      });
    },
    [setModal]
  );

  const layoutConfig = useMemo(
    () => ({
      projectId: 10, // project ID from DB
      title: "PRODUCTION", // project name
      home: "/production", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Production", "Operations", "Job Order"], // [1,2,3] = 1 / 2 / 3
      search: true, // bool show search
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
      searchBar: (
        <Space size={18}>
          <div>
            <Text strong>Status :</Text>
          </div>
          <Radio.Group
            options={[
              {
                label: "All",
                value: 1,
              },
              {
                label: "Pending",
                value: 2,
              },
              {
                label: "Complete",
                value: 3,
              },
              {
                label: "Cancel",
                value: 4,
              },
            ]}
            onChange={(e) => console.log({ status: e.target.value })}
            optionType="button"
            buttonStyle="solid"
            value={1}
            defaultValue={1}
          />
        </Space>
      ),
    }),
    []
  );

  const listConfig = useMemo(
    () => ({
      modal: {
        visible: modal?.visible,
        openModal,
        closeModal,
        saveModal,
      },
    }),
    [modal, openModal, closeModal, saveModal]
  );

  return (
    <MainLayout {...layoutConfig}>
      <JobOrderListTable {...listConfig} />
      <PlanningModal
        config={{
          title: "Plan Detail",
          visible: modal.visible,
          closeModal: closeModal,
          saveModal: saveModal,
          width: "80%",
        }}
        data={modal.data}
        readOnly={false}
      />
    </MainLayout>
  );
};

export default JobOrderMain;
