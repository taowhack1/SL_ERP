import React, { useEffect, useReducer, useState } from "react";
import {
  Row,
  Col,
  Input,
  Tabs,
  Select,
  AutoComplete,
  Typography,
  DatePicker,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";

import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import ItemLine from "./Sales_ItemLine";
import TotalFooter from "../../components/TotalFooter";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../components/CustomSelect";
import { create_so, get_qn_open_so, update_so } from "../../actions/sales";
import { header_config } from "../../include/js/main_config";
import { api_qn_detail } from "../../include/js/api";
import { so_detail_fields, so_fields } from "./configs";
import Detail from "./Sales_Order_Detail";
import { reducer } from "./reducers";
import axios from "axios";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const initialStateHead = so_fields;
const initialStateDetail = [so_detail_fields];
const SaleOrderCreate = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const auth = useSelector((state) => state.auth.authData);
  const dataComment = useSelector((state) => state.log.comment_log);
  const current_project = useSelector((state) => state.auth.currentProject);
  const masterData = useSelector((state) => state.sales.master_data);
  const customer_payment_terms = useSelector(
    (state) => state.accounting.master_data.customer_payment_terms
  );
  const quotation_list = useSelector((state) => state.sales.so.qn_ref);
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
  console.log("data", data);
  useEffect(() => {
    dispatch(get_qn_open_so());
    headDispatch({
      type: "SET_HEAD",
      payload: data.data_head
        ? {
            ...data.data_head,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
          }
        : {
            ...so_fields,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            so_create_date: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [so_detail_fields],
    });
  }, []);
  useEffect(() => {
    data_head.qn_id &&
      !data_head.so_id &&
      axios
        .get(`${api_qn_detail}/ref/${data_head.qn_id}`, header_config)
        .then((res) => {
          detailDispatch({ type: "SET_DETAIL", payload: res.data[0] });
        });
  }, [data_head.qn_id]);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Sales Order",
      data_head.so_no ? "Edit" : "Create",
      data_head.so_no && data_head.so_no,
    ],
    search: false,
    buttonAction: ["Save", "SaveConfirm", "Discard"],
    step: {
      current: data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: {
      data: data_head,
      path:
        data_head &&
        "/sales/orders/view/" + (data_head.so_id ? data_head.so_id : "new"),
    },
    discard: "/sales/orders",
    onSave: (e) => {
      //e.preventDefault();
      console.log("SAVE");
      !data_head.so_id
        ? dispatch(create_so(data_head, data_detail))
        : dispatch(update_so(data_head.so_id, data_head, data_detail));
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const getDataRef = (refId, mainData, refData) => {
    console.log("GET REF");
    let copyMain = {};
    let copyRef = refData.filter((data) => data.qn_id === refId)[0];
    copyMain.qn_id = copyRef.qn_id;
    copyMain.so_description = copyRef.qn_description;
    copyMain.so_no_description = copyRef.qn_no_description;
    copyMain.qn_no_description = copyRef.qn_no_description;
    copyMain.so_agreement = copyRef.qn_agreement;
    copyMain.so_remark = copyRef.qn_remark;
    copyMain.vat_id = copyRef.vat_id;
    copyMain.currency_id = copyRef.currency_id;
    copyMain.tg_so_amount = copyRef.tg_qn_amount;
    copyMain.tg_so_discount = copyRef.tg_qn_discount;
    copyMain.tg_so_sum_amount = copyRef.tg_qn_sum_amount;
    copyMain.tg_so_vat_amount = copyRef.tg_qn_vat_amount;
    copyMain.tg_so_total_amount = copyRef.tg_qn_total_amount;
    copyMain.customer_id = copyRef.customer_id;
    copyMain.payment_term_id = copyRef.payment_term_id;
    copyMain.payment_term_name = copyRef.payment_term_name;
    copyMain.payment_term_no_name = copyRef.payment_term_no_name;
    copyMain.currency_no = copyRef.currency_no;
    copyMain.currency_name = copyRef.currency_name;
    copyMain.customer_no_name = copyRef.customer_no_name;
    copyMain.currency_no_name = copyRef.currency_no_name;
    copyMain.vat_rate = copyRef.vat_rate;
    console.log("copyMain", copyMain);
    return copyMain;
  };
  const resetForm = () => {
    headDispatch({
      type: "RESET_DATA",
      payload: {
        ...initialStateHead,
        commit: 1,
        user_name: auth.user_name,
        branch_id: auth.branch_id,
        branch_name: auth.branch_name,
        so_create_date: moment().format("DD/MM/YYYY"),
      },
    });
    detailDispatch({
      type: "RESET_DATA",
      payload: initialStateDetail,
    });
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
              <strong>
                {data_head.so_no ? "Edit" : "Create"} Sales Order{" "}
                {data_head.so_no ? "#" + data_head.so_no : null}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {data_head.so_id
              ? moment(data_head.so_create_date, "DD/MM/YYYY").format(
                  "DD/MM/YYYY"
                )
              : moment().format("DD/MM/YYYY")}
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Quotations Ref.</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Quotation ref."}
              field_id="qn_id"
              field_name="qn_no_description"
              value={data_head.qn_no_description}
              data={quotation_list}
              onChange={(data, option) => {
                if (data) {
                  headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: getDataRef(data, data_head, quotation_list),
                  });
                } else {
                  resetForm();
                }
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Order Date</Text>
          </Col>
          <Col span={8}>
            <DatePicker
              name={"so_order_date"}
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              placeholder="Order date"
              required
              value={
                data_head.so_order_date
                  ? moment(data_head.so_order_date, "DD/MM/YYYY")
                  : ""
              }
              defaultValue={
                data_head.so_order_date
                  ? moment(data_head.so_order_date, "DD/MM/YYYY")
                  : ""
              }
              onChange={(data) => {
                headDispatch({
                  type: "CHANGE_HEAD_VALUE",
                  payload: {
                    so_order_date: data ? data.format("DD/MM/YYYY") : "",
                  },
                });
              }}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>

          <Col span={8}>
            <Input
              onChange={(e) =>
                headDispatch({
                  type: "CHANGE_HEAD_VALUE",
                  payload: { so_description: e.target.value },
                })
              }
              value={data_head.so_description}
              placeholder="Description"
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Customer </Text>
          </Col>

          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Customer"}
              field_id="customer_id"
              field_name="customer_no_name"
              value={data_head.customer_no_name}
              data={masterData.customers}
              onChange={(data, option) => {
                data && data
                  ? headDispatch({
                      type: "CHANGE_HEAD_VALUE",
                      payload: {
                        customer_id: data,
                        customer_no_name: option.title,
                      },
                    })
                  : headDispatch({
                      type: "CHANGE_HEAD_VALUE",
                      payload: {
                        customer_id: null,
                        customer_no_name: null,
                      },
                    });
              }}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>

          <Col span={8}>
            <Input
              onChange={(e) =>
                headDispatch({
                  type: "CHANGE_HEAD_VALUE",
                  payload: { so_agreement: e.target.value },
                })
              }
              value={data_head.so_agreement}
              placeholder="Agreement"
            ></Input>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Payment term"}
              field_id="payment_term_id"
              field_name="payment_term_no_name"
              value={data_head.payment_term_no_name}
              data={customer_payment_terms}
              onChange={(data, option) => {
                data && data
                  ? headDispatch({
                      type: "CHANGE_HEAD_VALUE",
                      payload: {
                        payment_term_id: data,
                        payment_term_no_name: option.title,
                      },
                    })
                  : headDispatch({
                      type: "CHANGE_HEAD_VALUE",
                      payload: {
                        payment_term_id: null,
                        payment_term_no_name: null,
                      },
                    });
              }}
            />
          </Col>
        </Row>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <Detail
                  readOnly={false}
                  data_detail={data_detail}
                  detailDispatch={detailDispatch}
                  headDispatch={headDispatch}
                  vat_rate={data_head.vat_rate}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <TextArea
                  rows={2}
                  placeholder={"Remark..."}
                  defaultValue={data_head.so_remark}
                  onChange={(e) =>
                    headDispatch({
                      type: "CHANGE_HEAD_VALUE",
                      payload: { so_remark: e.target.value },
                    })
                  }
                  style={{ width: "100%" }}
                />
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
      <Comments data={dataComment} />
    </MainLayout>
  );
};

export default SaleOrderCreate;
