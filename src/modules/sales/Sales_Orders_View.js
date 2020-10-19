import React, { useEffect, useState } from "react";
import { Row, Col, Input, Tabs, Select, Typography } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";

import Comments from "../../components/Comments";
import TotalFooter from "../../components/TotalFooter";
import { useDispatch, useSelector } from "react-redux";
import { get_so_by_id, so_actions } from "../../actions/sales";
import Detail from "./Sales_Order_Detail";
import ModalRemark from "../../components/Modal_Remark";
import { get_log_by_id } from "../../actions/comment&log";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const SaleOrderView = (props) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const data_head = useSelector((state) => state.sales.so.so_head);
  const data_detail = useSelector((state) => state.sales.so.so_detail);
  const auth = useSelector((state) => state.auth.authData[0]);
  const dataComment = useSelector((state) => state.log.comment_log);
  const current_project = useSelector((state) => state.auth.currentProject);
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });
  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  const callback = (key) => {
    setTab(key);
  };
  useEffect(() => {
    console.log("get log");
    data_head &&
      data_head.process_id &&
      dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

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
    dispatch(so_actions(app_detail, data_head.so_id));
  };

  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Sales Order",
      "View",
      data_head.so_no && data_head.so_no,
    ],
    search: false,
    buttonAction: [
      data_head && data_head.button_edit && "Edit",
      data_head && data_head.button_confirm && "Confirm",
      data_head && data_head.button_approve && "Approve",
      data_head && data_head.button_reject && "Reject",
      "Discard",
    ],
    action: [
      {
        name: "Print",
        link: `http://192.168.5.207:80/Report_purch/report_pr.aspx?pr_no=${
          data_head && data_head.so_no
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
    },
    create: "",
    edit: {
      data: { data_head: data_head, data_detail: data_detail },
      path: data_head && "/sales/orders/edit/" + data_head.so_id,
    },
    discard: "/sales/orders",
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      e.preventDefault();
      console.log("Approve");
      const app_detail = {
        process_status_id: 5,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: remark,
      };
      dispatch(so_actions(app_detail, data_head.so_id));
    },
    onConfirm: () => {
      console.log("Confirm");
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(so_actions(app_detail, data_head.so_id));
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
      dispatch(so_actions(app_detail, data_head.so_id));
    },
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                Sales Order {data_head.so_no ? "#" + data_head.so_no : null}
              </strong>
            </h2>
          </Col>
          <Col span={1}></Col>
          <Col span={10} className="text-center">
            {data_head.branch_name}
          </Col>
          <Col span={1}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.so_created}</Text>
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Delivery Date</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.tg_so_delivery_date}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Quotations Ref.</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.qn_no_description}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Order Date</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view"> {data_head.so_order_date}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>

          <Col span={8}>
            <Text className="text-view">{data_head.so_description}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Customer </Text>
          </Col>

          <Col span={8}>
            <Text className="text-view">{data_head.customer_no_name}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>

          <Col span={8}>
            <Text className="text-view">{data_head.so_agreement}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.payment_term_no_name}</Text>
          </Col>
        </Row>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <Detail readOnly={true} data_detail={data_detail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <Text className="text-view">{data_head.so_remark}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <TotalFooter
            excludeVat={data_head.tg_so_sum_amount}
            vat={data_head.tg_so_vat_amount}
            includeVat={data_head.tg_so_total_amount}
            currency={"THB"}
          />
        ) : null}
      </div>
      <ModalRemark
        title={"Reject Remark"}
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

export default SaleOrderView;
