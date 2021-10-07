import { Radio, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useCallback, useMemo, useState } from "react";
import MainLayout from "../../../../components/MainLayout";
import JobOrderListTable from "./JobOrderListTable";
import PlanningModal from "../planning/PlanningModal";
const JobOrderMain = () => {
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
