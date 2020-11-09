import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography } from "antd";
import { reducer } from "./reducers";
import { disburse_fields, disburse_detail_fields } from "./config";
import {
  create_disburse,
  disburse_actions,
  update_disburse,
} from "../../actions/inventory/disburseActions";
import { header_config, report_server } from "../../include/js/main_config";
import { api_disburse_get_ref_issue_detail } from "../../include/js/api";
import { get_log_by_id, reset_comments } from "../../actions/comment&log";

import MainLayout from "../../components/MainLayout";
import moment from "moment";
import Comments from "../../components/Comments";
import Detail from "./Disburse_Detail";
import TotalFooter from "../../components/TotalFooter";
import CustomSelect from "../../components/CustomSelect";
import axios from "axios";
import { get_issue_ref_list } from "../../actions/inventory/disburseActions";
import ModalRemark from "../../components/Modal_Remark";
import Authorize from "../system/Authorize";

const { TextArea } = Input;
const { Text } = Typography;

const initialStateHead = disburse_fields;
const initialStateDetail = [disburse_detail_fields];

const DisburseView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");

  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });

  const data_head = useSelector(
    (state) => state.inventory.disburse.disburse_head
  );
  const data_detail = useSelector(
    (state) => state.inventory.disburse.disburse_detail
  );
  const data_sub_detail = useSelector(
    (state) => state.inventory.disburse.disburse_sub_detail
  );
  const dataComments = useSelector((state) => state.log.comment_log);
  const current_project = useSelector((state) => state.auth.currentProject);
  const auth = useSelector((state) => state.auth.authData);

  useEffect(() => {
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
    return () => {
      dispatch(reset_comments());
    };
  }, [data_head]);

  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const callback = (key) => {
    setTab(key);
  };

  const data =
    props.location && props.location.state ? props.location.state : 0;

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Inventory",
      "Disburse",
      "View",
      data_head.disburse_no && data_head.disburse_no,
    ],
    search: false,
    buttonAction: [
      data_head && data_head.button_edit && "Edit",
      data_head && data_head.button_confirm && "Confirm",
      data_head && data_head.button_approve && "Approve",
      data_head && data_head.button_reject && "Reject",
      "Back",
    ],
    action: [
      {
        name: "Print",
        link: `${report_server}/Report_purch/report_pr.aspx?pr_no=${
          data_head && data_head.disburse_id
        }`,
      },
      data_head &&
        data_head.button_cancel && {
          name: "Cancel",
          cancel: true,
          link: ``,
        },
    ],
    step: {
      current: data_head && data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    edit: {
      data: {
        data_head: data_head,
        data_detail: data_detail,
        data_sub_detail: data_sub_detail,
      },
      path: data_head && "/inventory/disburse/edit/" + data_head.disburse_id,
    },
    discard: "/inventory/disburse",
    back: "/inventory/disburse",
    onBack: (e) => {
      console.log("Back");
    },
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
      const app_detail = {
        process_status_id: 5,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: "Approve",
      };
      dispatch(disburse_actions(app_detail, data_head.disburse_id));
    },
    onConfirm: () => {
      console.log("Confirm");
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: "Confirm",
      };
      dispatch(disburse_actions(app_detail, data_head.disburse_id));
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
        process_member_remark: "Cancel",
      };
      dispatch(disburse_actions(app_detail, data_head.disburse_id));
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
    dispatch(disburse_actions(app_detail, data_head.disburse_id));
  };

  console.log("data_head 1", data_head);
  console.log("data_detail 1", data_detail);
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                Disburse {data_head.disburse_no && "#" + data_head.disburse_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.disburse_created}</Text>
          </Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Issue Ref. :</Text>
          </Col>
          <Col span={8}>
            {/* Issue Ref */}
            <Text className="text-view">{data_head.issue_no_description}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Due date :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.disburse_due_date}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical ">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.disburse_description}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.disburse_agreement}</Text>
          </Col>
        </Row>

        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <Detail
                  readOnly={true}
                  issue_id={data_head.issue_id}
                  data_detail={data_detail}
                  data_sub_detail={data_sub_detail}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <Text className="text-view">{data_head.disburse_remark}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
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
  );
};

export default DisburseView;
