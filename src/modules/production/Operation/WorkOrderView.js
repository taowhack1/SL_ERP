import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, message } from "antd";
import MainLayout from "../../../components/MainLayout";
import Comments from "../../../components/Comments";
import { get_log_by_id } from "../../../actions/comment&log";
import Authorize from "../../system/Authorize";

import WorkOrderTabPanel from "./WorkOrderTabPanel";
import { wo_actions } from "../../../actions/production/workOrderActions";
import WorkOrderHead from "./WorkOrderHead";
import { sortData } from "../../../include/js/function_main";
import { WOContext } from "../../../include/js/context";
import ModalRemark from "../../../components/Modal_Remark";
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;

const WorkOrderView = (props) => {
  const readOnly = true;
  const authorize = Authorize();

  const dispatch = useDispatch();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const { data_head, data_material } = useSelector(
    (state) => state.production.operations.workOrder.workOrder
  );
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });
  const flow =
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  useEffect(() => {
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Operations",
      "Work Order",
      "View",
      data_head.wo_no && data_head.wo_no,
    ],
    search: false,
    buttonAction: [
      data_head.button_edit && "Edit",
      data_head.button_confirm && "Confirm",
      data_head.button_approve && "Approve",
      data_head.button_reject && "Reject",
      "Back",
    ],
    step: {
      current: data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: "function",
    back: "/production/operations/wo",
    discard: "/production/operations/wo",
    edit: {
      data: {
        data_head: data_head,
        data_rm: sortData(data_material.filter((item) => item.type_id === 1)),
        data_pk: sortData(data_material.filter((item) => item.type_id === 2)),
      },
      path: data_head && "/production/operations/wo/edit/" + data_head.wo_id,
    },
    onApprove: (e) => {
      const app_detail = {
        process_status_id: 5,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: remark,
      };
      dispatch(wo_actions(app_detail, data_head.wo_id));
    },
    onConfirm: () => {
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(wo_actions(app_detail, data_head.wo_id));
      console.log("Confirm");
    },
    onReject: () => {
      console.log("Reject");
      setOpenRemarkModal({
        visible: true,
        loading: false,
      });
    },
    onCancel: () => {
      console.log("Cancel");
      const app_detail = {
        process_status_id: 3,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(wo_actions(app_detail, data_head.wo_id));
    },
  };
  const changeProcessStatus = (process_status_id) => {
    if (remark.trim() === "") {
      alert("Plase write remark");
      return false;
    }
    setOpenRemarkModal({ visible: false, loading: false });
    const app_detail = {
      process_status_id: process_status_id,
      user_name: auth.user_name,
      process_id: data_head.process_id,
      process_member_remark: remark,
    };
    message.success({ content: "Reject", key: "validate", duration: 1 });
    dispatch(wo_actions(app_detail, data_head.wo_id));
    setRemark("");
  };

  const headContextValue = useMemo(() => {
    return {
      readOnly,
      headReducer: {
        data: data_head,
      },
      RMReducer: {
        data: sortData(data_material.filter((item) => item.type_id === 1)),
      },
      PKReducer: {
        data: sortData(data_material.filter((item) => item.type_id === 2)),
      },
    };
  }, []);
  return (
    <WOContext.Provider value={headContextValue}>
      <MainLayout {...config}>
        <div id="form">
          <Row className="col-2">
            <Col span={8}>
              <h2>
                <strong>
                  {"View"} Work Order
                  {data_head.wo_no && " #" + data_head.wo_no}
                </strong>
              </h2>
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
              <Text strong>Create Date :</Text>
            </Col>
            <Col span={2} style={{ textAlign: "right" }}>
              <Text className="text-view">{data_head.wo_created}</Text>
            </Col>
          </Row>

          <WorkOrderHead />
          <WorkOrderTabPanel />
        </div>
        <ModalRemark
          title={"Remark"}
          state={openRemarkModal}
          onChange={setRemark}
          onOk={() => {
            changeProcessStatus(6);
          }}
          onCancel={() => {
            setOpenRemarkModal({ visible: false, loading: false });
            setRemark("");
          }}
        />
        <Comments data={dataComments} />
      </MainLayout>
    </WOContext.Provider>
  );
};

export default React.memo(WorkOrderView);
