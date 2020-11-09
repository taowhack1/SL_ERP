import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Tabs, Typography } from "antd";
import MainLayout from "../../components/MainLayout";

import Comments from "../../components/Comments";
import Detail from "./Issue_Detail";
import TotalFooter from "../../components/TotalFooter";
import { get_log_by_id, reset_comments } from "../../actions/comment&log";
import { issue_actions } from "../../actions/inventory/issueActions";
import ModalRemark from "../../components/Modal_Remark";
import { report_server } from "../../include/js/main_config";
import Authorize from "../system/Authorize";
const { Text } = Typography;

const Issue_View = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const dataComments = useSelector((state) => state.log.comment_log);
  const current_project = useSelector((state) => state.auth.currentProject);
  const auth = useSelector((state) => state.auth.authData);
  const [tab, setTab] = useState("1");
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });

  const data_head = useSelector((state) => state.inventory.issue.issue_head);
  const data_detail = useSelector(
    (state) => state.inventory.issue.issue_detail
  );

  useEffect(() => {
    console.log("get_log");
    data_head &&
      data_head.process_id &&
      dispatch(get_log_by_id(data_head.process_id));
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

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Inventory",
      "Issue",
      "View",
      data_head && data_head.issue_no,
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
        link: `${report_server}/Report_purch/report_ream1.aspx?issue_no=${
          data_head && data_head.issue_no
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
      process_complete: data_head && data_head.process_complete,
    },
    create: "",
    edit: {
      data: {
        data_head: data_head,
        data_detail: data_detail,
      },
      path: data_head && "/inventory/issue/edit/" + data_head.issue_id,
    },
    discard: "/inventory/issue",
    back: "/inventory/issue",
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
      dispatch(issue_actions(app_detail, data_head.issue_id));
    },
    onConfirm: () => {
      console.log("Confirm");
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: "Confirm",
      };
      dispatch(issue_actions(app_detail, data_head.issue_id));
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
      dispatch(issue_actions(app_detail, data_head.issue_id));
    },
  };
  const changeProcessStatus = (process_status_id) => {
    if (remark.trim() === "") {
      alert("Plase write remark");
      return false;
    }
    setOpenRemarkModal({ visible: false, loading: false });
    const app_detail = {
      //6 = reject
      process_status_id: process_status_id,
      user_name: auth.user_name,
      process_id: data_head.process_id,
      process_member_remark: remark,
    };
    dispatch(issue_actions(app_detail, data_head.issue_id));
  };

  console.log("data_head", data_head);
  console.log("data_detail", data_detail);
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>Issue {data_head && "#" + data_head.issue_no}</strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">
              {data_head && data_head.issue_created}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Request By :</Text>
          </Col>

          <Col span={8}>
            <Text>{data_head && data_head.issue_created_by_no_name}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Cost Center :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">
              {data_head && data_head.cost_center_no_name}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">
              {data_head && data_head.issue_description}
            </Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">
              {data_head && data_head.issue_agreement}
            </Text>
          </Col>
        </Row>

        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <Detail
                  data_detail={data_detail && data_detail}
                  readOnly={true}
                  category_id={data_head && data_head.category_id}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <Text className="text-view">
                  {data_head && data_head.issue_remark}
                </Text>
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

export default Issue_View;
