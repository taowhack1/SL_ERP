import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Tabs, Typography, Alert, message } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import ItemLine from "./pr_ItemLine";
import { prItemColumns } from "./config/pr";
import Comments from "../../components/Comments";
import TotalFooter from "../../components/TotalFooter";
import ModalRemark from "../../components/Modal_Remark";
import { pr_actions } from "../../actions/purchase/PR_Actions";
import { get_log_by_id, reset_comments } from "../../actions/comment&log";
import { useParams } from "react-router-dom";
import { report_server } from "../../include/js/main_config";
import Authorize from "../system/Authorize";
const { Text } = Typography;

const PRView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const pr_id = useParams();
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const auth = useSelector((state) => state.auth.authData);
  const data_head = useSelector((state) => state.purchase.pr.pr_head);
  const data_detail = useSelector((state) => state.purchase.pr.pr_detail);
  const dataComment = useSelector((state) => state.log.comment_log);
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

  const callback = (key) => {
    setTab(key);
  };

  useEffect(() => {
    console.log("GET_LOG");
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  const current_project = useSelector((state) => state.auth.currentProject);
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
    dispatch(pr_actions(app_detail, data_head.pr_id));
    setRemark("");
  };
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Requisition",
      "View",
      data_head.pr_no && data_head.pr_no,
    ],
    search: false,
    buttonAction: [
      data_head.button_edit && "Edit",
      data_head.button_confirm && "Confirm",
      data_head.button_approve && "Approve",
      data_head.button_reject && "Reject",
      "Back",
    ],
    action: [
      {
        name: "Print",
        link: `${report_server}/Report_purch/report_pr.aspx?pr_no=${data_head.pr_no}`,
      },
      data_head.button_cancel && {
        name: "Cancel",
        cancel: true,
        link: ``,
      },
    ],
    step: {
      current: data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: {
      data: data_head,
      path: data_head && "/purchase/pr/view/" + data_head.pr_id,
    },
    edit: {
      data: {
        data_head: data_head,
        data_detail: data_detail,
      },
      path: data_head && "/purchase/pr/edit/" + data_head.pr_id,
    },
    discard: "/purchase/pr",
    back: "/purchase/pr",
    // btnLoading: btnLoading,
    onDiscard: (e) => {
      console.log("Discard");
    },
    onBack: (e) => {
      console.log("Back");
    },
    onSave: (e) => {
      console.log("Save");
    },
    onEdit: (e) => {
      console.log("Edit");
    },
    onApprove: (e) => {
      const app_detail = {
        process_status_id: 5,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: remark,
      };
      dispatch(pr_actions(app_detail, data_head.pr_id));
    },
    onConfirm: () => {
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(pr_actions(app_detail, data_head.pr_id));
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
      dispatch(pr_actions(app_detail, data_head.pr_id));
    },
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                Purchase Requisition{" "}
                {data_head.tg_trans_status_id === 3 && (
                  <Text strong type="danger">
                    #{data_head.trans_status_name}
                  </Text>
                )}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date : </Text>
          </Col>
          <Col span={2} className="text-center">
            <Text className="text-view">{data_head.pr_created}</Text>
          </Col>
        </Row>

        <Row className="col-2" style={{ marginBottom: 20 }}>
          <h3>
            <b>PR No. : </b>
            {data_head.pr_no}
          </h3>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Due Date :</Text>
          </Col>

          <Col span={8} className="text-view">
            {data_head.tg_pr_due_date}
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Request by :</Text>
          </Col>

          <Col span={8} className="text-view">
            {data_head.pr_created_by_no_name}
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.vendor_no_name}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Cost center :</Text>
          </Col>
          <Col span={8} className="text-view">
            {data_head.cost_center_no_name}
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Currency :</Text>
          </Col>
          <Col span={8} className="text-view">
            {data_head.currency_no ? data_head.currency_no : "THB"}
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>
          <Col span={8} className="text-view">
            {data_head.pr_description}
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Item Type :</Text>
          </Col>
          <Col span={8} className="text-view">
            {data_head.type_name}
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <ItemLine
                  pr_id={data_head.pr_id}
                  data_detail={data_detail}
                  columns={prItemColumns}
                  readOnly={true}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <Text className="text-view">
                  {data_head.pr_remark ? data_head.pr_remark : "-"}
                </Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <TotalFooter
            excludeVat={data_head.tg_pr_sum_amount}
            vat={data_head.tg_pr_vat_amount}
            includeVat={data_head.tg_pr_total_amount}
            currency={data_head.currency_no}
          />
        ) : null}
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
      <Comments data={dataComment} />
    </MainLayout>
  );
};

export default React.memo(PRView);
