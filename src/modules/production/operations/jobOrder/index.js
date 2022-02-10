/** @format */

import { Button, Radio, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useCallback, useMemo, useState } from "react";
import MainLayout from "../../../../components/MainLayout";
import JobOrderListTable from "./JobOrderListTable";
import PlanningModal from "../planning/PlanningModal";
import { useDispatch, useSelector } from "react-redux";
import { searchJobOrder } from "../../../../actions/production/jobOrderActions";
import JobOrderListTableV2 from "./JobOrderListTableV2";
const JobOrderMain = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(
    (state) => state?.production?.operations?.jobOrder
  );
  const { pageSize, page, keyword } = filter || {};
  const [modal, setModal] = useState({
    visible: false,
    data: {},
  });

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
      searchValue: keyword || null, //search string
      searchBar: (
        <Button
          className="primary"
          onClick={() =>
            dispatch(
              searchJobOrder({
                page: 1,
                pageSize: 20,
                keyword: null,
                mrp_id: null,
              })
            )
          }
        >
          Clear Filter
        </Button>
      ),
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
      onSearch: (keyword) => {
        dispatch(searchJobOrder({ keyword }));
      },
      openModal: () => console.log("openModal"),
    }),
    [pageSize, page, keyword]
  );

  const listConfig = useMemo(
    () => ({
      modal: {
        visible: modal?.visible,
        openModal,
        closeModal,
        saveModal,
      },
      filter: { pageSize, page, keyword },
    }),
    [modal, openModal, closeModal, saveModal, filter]
  );
  return (
    <MainLayout {...layoutConfig}>
      {/* <JobOrderListTable {...listConfig} /> */}
      <JobOrderListTableV2 {...listConfig} />
      {/* <PlanningModal
        config={{
          title: "Plan Detail",
          visible: modal.visible,
          closeModal: closeModal,
          saveModal: saveModal,
          width: "80%",
        }}
        data={modal.data}
        readOnly={false}
      /> */}
    </MainLayout>
  );
};

export default JobOrderMain;
