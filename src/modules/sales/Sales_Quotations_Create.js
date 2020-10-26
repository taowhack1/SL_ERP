import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { items } from "../../data/items";
import { units } from "../../data/units";
import { itemLineColumns } from "../../data/sale/data";
import { payment_terms } from "../../data/payment_terms";
import { quotation_detail_fields, quotation_fields } from "./configs";
import CustomSelect from "../../components/CustomSelect";
import { update_quotation } from "../../actions/sales";
import { create_quotation } from "../../actions/sales";
import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { sortData, sumArrObj } from "../../include/js/function_main";
import { reducer } from "./reducers";
const { TextArea } = Input;
const { Text } = Typography;

const initialStateHead = quotation_fields;
const initialStateDetail = [quotation_detail_fields];

const CustomerCreate = (props) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const auth = useSelector((state) => state.auth.authData[0]);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const dataComment = useSelector((state) => state.log.comment_log);
  const current_project = useSelector((state) => state.auth.currentProject);
  const masterData = useSelector((state) => state.sales.master_data);
  const data =
    props.location && props.location.state ? props.location.state : 0;
  useEffect(() => {
    headDispatch({
      type: "SET_HEAD",
      payload: data
        ? {
            ...data,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
          }
        : {
            ...quotation_fields,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            qn_created: moment().format("DD/MM/YYYY"),
          },
    });
  }, []);

  useEffect(() => {
    function getDetail() {
      axios
        .get(
          `http://192.168.5.222:3009/api/sales/qn_detail/${data.qn_id}`,
          header_config
        )
        .then((res) => {
          // set_qn_detail(res.data[0]);
          detailDispatch({ type: "SET_DETAIL", payload: res.data[0] });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    data && getDetail();
  }, []);

  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Quotations",
      data_head.qn_no ? "Edit" : "Create",
      data_head.qn_no && data_head.qn_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    step: data_head.qn_id
      ? {
          current: data_head.node_stay,
          step: ["Draft", "Confirm", "Approve", "Done"],
        }
      : {},
    create: "",
    save: {
      data: data_head,
      path:
        data_head &&
        "/sales/quotations/view/" + (data_head.qn_id ? data_head.qn_id : "new"),
    },
    discard: "/sales/quotations",
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
      data_head.qn_id && data_head.qn_id
        ? dispatch(update_quotation(data_head.qn_id, data_head, data_detail))
        : dispatch(create_quotation(data_head, data_detail));
    },
    onEdit: (e) => {
      e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };
  const callback = (key) => {
    setTab(key);
  };

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
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
        qn_created: moment().format("DD/MM/YYYY"),
      },
    });
    detailDispatch({
      type: "RESET_DATA",
      payload: initialStateDetail,
    });
  };

  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.qn_no ? "Edit" : "Create"} Quotations #
                {data_head.qn_no && data_head.qn_no}
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
            {moment(data_head.qn_created, "DD/MM/YYYY").format("DD/MM/YYYY")}
          </Col>
        </Row>
        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
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
                console.log(option);
                data && data
                  ? upDateFormValue({
                      currency_id: option.data.currency_id,
                      currency_no: option.data.currency_no,
                      customer_id: option.data.customer_id,
                      customer_no_name: option.data.customer_no_name,
                      payment_term_id: option.data.payment_term_id,
                      payment_term_no_name: option.data.payment_term_no_name,
                      vat_id: option.data.vat_id,
                      vat_rate: option.data.vat_rate,
                      vat_name: option.data.vat_name,
                    })
                  : resetForm();
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Expire Date </Text>
          </Col>
          <Col span={8}>
            <DatePicker
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              placeholder="Expire Date"
              value={
                data_head.qn_exp_date
                  ? moment(data_head.qn_exp_date, "DD/MM/YYYY")
                  : ""
              }
              onChange={(data) => {
                upDateFormValue({
                  qn_exp_date: data.format("DD/MM/YYYY"),
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
                upDateFormValue({ qn_description: e.target.value })
              }
              value={data_head.qn_description}
              placeholder="Description"
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
              placeholder={"Payment Term"}
              field_id="payment_term_id"
              field_name="payment_term_no_name"
              value={data_head.payment_term_no_name}
              data={masterData.payment_terms}
              onChange={(data, option) => {
                data && data
                  ? upDateFormValue({
                      ...option.data,
                    })
                  : upDateFormValue({
                      payment_term_no_name: null,
                      payment_term_id: null,
                      payment_term_name: null,
                      payment_term_no: null,
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
                upDateFormValue({ qn_agreement: e.target.value })
              }
              value={data_head.qn_agreement}
              placeholder="Agreement"
            ></Input>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Currency :</Text>
          </Col>

          <Col span={8}>
            <Text>{data_head.currency_no}</Text>
          </Col>
        </Row>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <ItemLine
                  qn_id={data_head.qn_id}
                  readOnly={false}
                  data_detail={data_detail}
                  vat_rate={data_head.vat_rate}
                  detailDispatch={detailDispatch}
                  headDispatch={headDispatch}
                  project="quotation"
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <TextArea
                  rows={2}
                  placeholder={"Remark..."}
                  defaultValue={data_head.qn_remark}
                  onChange={(e) =>
                    upDateFormValue({ qn_remark: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" && (
          <TotalFooter
            excludeVat={data_head.tg_qn_sum_amount}
            vat={data_head.tg_qn_vat_amount}
            includeVat={data_head.tg_qn_total_amount}
            currency={"THB"}
          />
        )}
      </div>
      <Comments data={dataComment} />
    </MainLayout>
  );
};

export default React.memo(CustomerCreate);
