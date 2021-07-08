import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Tabs, Typography, message } from "antd";
import MainLayout from "../../../../components/MainLayout";
import moment from "moment";
import SalesQNDetail from "./SalesQNDetail";
import Comments from "../../../../components/Comments";
import TotalFooter from "../../../../components/TotalFooter";
import ModalRemark from "../../../../components/Modal_Remark";
import { get_quotation_by_id, qn_actions } from "../../../../actions/sales";
import { get_log_by_id } from "../../../../actions/comment&log";
import Authorize from "../../../system/Authorize";
import { useParams } from "react-router";
import { PrinterTwoTone } from "@ant-design/icons";

const { Text } = Typography;

const SalesQNView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const { id: qn_id } = useParams();
  const [tab, setTab] = useState("1");
  const auth = useSelector((state) => state.auth.authData);
  const data_head = useSelector((state) => state.sales.qn.qn_head);
  const data_detail = useSelector((state) => state.sales.qn.qn_detail);
  const dataComment = useSelector((state) => state.log.comment_log);
  console.log(data_detail);
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
    dispatch(get_quotation_by_id(qn_id, auth.user_name));
  }, []);

  useEffect(() => {
    data_head &&
      data_head.process_id &&
      dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  const current_project = useSelector((state) => state.auth.currentProject);
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
    message.success({ content: "Reject", key: "validate", duration: 1 });
    dispatch(qn_actions(app_detail, data_head.qn_id));
  };
  const config = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: [
      "Home",
      "Quotations",
      data_head && data_head.qn_no ? "Edit" : "Create",
      data_head && data_head.qn_no,
    ],
    search: false,
    buttonAction: [
      // "Edit",
      data_head && data_head.button_edit && "Edit",
      data_head && data_head.button_confirm && "Confirm",
      data_head && data_head.button_approve && "Approve",
      data_head && data_head.button_reject && "Reject",
      "Back",
    ],
    action: [
      {
        name: (
          <Text>
            <PrinterTwoTone /> Print
          </Text>
        ),
        link: `${
          process.env.REACT_APP_REPORT_SERVER
        }/report_quotation.aspx?qn_no=${data_head && data_head.qn_no}&price=0`,
      },
      {
        name: (
          <Text>
            <PrinterTwoTone /> Print (Include Total)
          </Text>
        ),
        link: `${
          process.env.REACT_APP_REPORT_SERVER
        }/report_quotation.aspx?qn_no=${data_head && data_head.qn_no}&price=1`,
      },
      data_head &&
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
      path: data_head && "/sales/quotations/view/" + data_head.qn_id,
    },
    edit: {
      data: data_head,
      path: data_head && "/sales/quotations/edit/" + data_head.qn_id,
    },
    discard: "/sales/quotations",
    back: "/sales/quotations",
    onDiscard: (e) => {
      console.log("Discard");
    },
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
        process_member_remark: remark,
      };
      dispatch(qn_actions(app_detail, data_head.qn_id));
    },
    onConfirm: () => {
      console.log("Confirm");
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(qn_actions(app_detail, data_head.qn_id));
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
      dispatch(qn_actions(app_detail, data_head.qn_id));
    },
  };
  console.log("data_head", data_head);
  return (
    <MainLayout {...config} data={data_head}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head && data_head.qn_no ? "Edit" : "Create"} Quotations #
                {data_head && data_head.qn_no}
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
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {moment(data_head && data_head.qn_created, "DD/MM/YYYY").format(
              "DD/MM/YYYY"
            )}
          </Col>
        </Row>
        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>NPR Ref.</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">
              {(data_head && data_head?.npr_no) || "-"}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Customer </Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">
              {data_head && data_head.customer_no_name}
            </Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Expire Date </Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">
              {data_head && data_head.qn_exp_date}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Vat</Text>
          </Col>

          <Col span={8}>
            <Text className="text-view">{data_head && data_head.vat_name}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">
              {data_head && data_head.payment_term_no_name}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description</Text>
          </Col>

          <Col span={8}>
            <Text className="text-view">
              {data_head && data_head.qn_description}
            </Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Currency :</Text>
          </Col>

          <Col span={8}>
            <Text className=" text-value pd-left-1">
              {data_head.currency_no}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <SalesQNDetail
                  qn_id={data_head && data_head.qn_id}
                  readOnly={true}
                  data_detail={data_detail}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <Text className="text-view">
                  {data_head && data_head.qn_remark}
                </Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <TotalFooter
            excludeVat={data_head && data_head.tg_qn_sum_amount}
            vat={data_head && data_head.tg_qn_vat_amount}
            includeVat={data_head && data_head.tg_qn_total_amount}
            currency={data_head && data_head.currency_no}
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

export default SalesQNView;
