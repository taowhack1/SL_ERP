import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Tabs, Typography, message } from "antd";
import MainLayout from "../../components/MainLayout";

import Comments from "../../components/Comments";
import ItemLine from "./po_ItemLine";
import TotalFooter from "../../components/TotalFooter";

import { po_actions } from "../../actions/purchase/PO_Actions";
import { get_log_by_id } from "../../actions/comment&log";
import ModalRemark from "../../components/Modal_Remark";

import { convertDigit, report_server } from "../../include/js/main_config";
import Authorize from "../system/Authorize";

const { Text } = Typography;
const readOnly = true;
const PurchaseOrderCreate = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });

  const auth = useSelector((state) => state.auth.authData);
  const dataComments = useSelector((state) => state.log.comment_log);
  const [tab, setTab] = useState("1");
  const data_head = useSelector((state) => state.purchase.po.po_head);
  const data_detail = useSelector((state) => state.purchase.po.po_detail);

  useEffect(() => {
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  const flow =
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const callback = (key) => {
    setTab(key);
  };

  const changeProcessStatus = (process_status_id) => {
    if (remark.trim() === "") {
      alert("Plase write remark");
      return false;
    }
    message.success({ content: "Reject", key: "validate", duration: 1 });
    setOpenRemarkModal({ visible: false, loading: false });
    const app_detail = {
      //6 = reject
      process_status_id: process_status_id,
      user_name: auth.user_name,
      process_id: data_head.process_id,
      process_member_remark: remark,
    };
    dispatch(po_actions(app_detail, data_head.po_id));
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Order",
      "Back",
      data_head.po_no && data_head.po_no,
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
        link: `${report_server}/Report_purch/report_po.aspx?po_no=${data_head.po_no}`,
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
    save: {},
    edit: {
      data: {
        data_head: data_head,
        data_detail: data_detail,
      },
      path: data_head && "/purchase/po/edit/" + data_head.po_id,
    },
    discard: "/purchase/po",
    back: "/purchase/po",
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
      console.log("Approve");
      const app_detail = {
        process_status_id: 5,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: "Approve",
      };
      dispatch(po_actions(app_detail, data_head.po_id));
    },
    onConfirm: () => {
      console.log("Confirm");
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
        process_member_remark: "Confirm",
      };
      dispatch(po_actions(app_detail, data_head.po_id));
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
      dispatch(po_actions(app_detail, data_head.po_id));
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
                Purchase Order{" "}
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
            <Text className="text-view">{data_head.po_created}</Text>
          </Col>
        </Row>
        <Row className="col-2" style={{ marginBottom: 20 }}>
          <h3>
            <b>PO No. :</b>
            <Text className="text-view">{data_head.po_no}</Text>
          </h3>
        </Row>
        {/* Head */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>PR Ref. :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.pr_no}</Text>
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
            {/* <Text strong>Due Date :</Text> */}
            <Text strong>Description :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.po_description}</Text>
          </Col>

          <Col span={2}></Col>

          <Col span={3}>
            <Text strong>Payment Terms :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.payment_term_no_name}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.po_agreement}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Currency :</Text>
          </Col>
          <Col span={8} className="text-view">
            {data_head.currency_no}
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3} className={readOnly ? "" : "pd-left-1"}>
            <Text strong>Request By :</Text>
          </Col>

          <Col span={8} className="text-left">
            <Text className={"text-value text-view"}>
              {data_head.po_created_by_no_name}
            </Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3} className={readOnly ? "" : "pd-left-1"}>
            <Text strong>Cost Center :</Text>
          </Col>
          <Col span={8}>
            <Text className={"text-value text-view"}>
              {data_head.cost_center_no_name}
            </Text>
          </Col>
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
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <ItemLine
                  pr_id={data_head.pr_id}
                  po_id={data_head.po_id}
                  data_detail={data_detail}
                  readOnly={readOnly}
                  vat_rate={data_head.vat_rate}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <Text className="text-view">
                  {data_head.po_remark ? data_head.po_remark : "-"}
                </Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <>
            <Row className="col-2 row-margin-vertical">
              <Col span={15}></Col>

              <Col span={5} className="text-number">
                <Text strong>Extended Discount :</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-value">
                  {convertDigit(data_head.po_discount, 3)}
                </Text>
              </Col>
              <Col span={1} className="text-string">
                <Text strong> {data_head.currency_no ?? "THB"}</Text>
              </Col>
            </Row>
            <TotalFooter
              excludeVat={data_head.tg_po_sum_amount}
              vat={data_head.tg_po_vat_amount}
              includeVat={data_head.tg_po_total_amount}
              currency={data_head.currency_no}
            />
          </>
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
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default PurchaseOrderCreate;
