import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Select,
  Typography,
  DatePicker,
  message,
} from "antd";
import { useParams, withRouter } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import moment from "moment";

import Comments from "../../components/Comments";
import ItemLine from "./po_ItemLine";

import {
  po_fields,
  poItemColumns,
  po_detail_fields,
  po_require_fields_detail,
  po_require_fields,
} from "./config/po";
import TotalFooter from "../../components/TotalFooter";
import CustomSelect from "../../components/CustomSelect";

import {
  update_po,
  create_po,
  get_po_by_id,
  update_po_head,
  reset_po_data,
  get_open_po_list,
  get_pr_detail,
} from "../../actions/purchase/PO_Actions";
import { reducer } from "./reducers";
import axios from "axios";
import { api_get_pr_detail_ref } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import {
  validateFormDetail,
  validateFormHead,
} from "../../include/js/function_main";
import $ from "jquery";
import Authorize from "../system/Authorize";

const { TextArea } = Input;
const { Text } = Typography;
const initialStateHead = po_fields;
const initialStateDetail = [po_detail_fields];

const PurchaseOrderCreate = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const dataComments = useSelector((state) => state.log.comment_log);
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const vendors = useSelector((state) => state.purchase.vendor.vendor_list);
  const select_box_pr = useSelector((state) => state.purchase.po.pr_ref);
  const vendor_payment_terms = useSelector(
    (state) => state.accounting.master_data.vendor_payment_terms
  );
  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const data =
    props.location && props.location.state ? props.location.state : 0;

  const callback = (key) => {
    setTab(key);
  };
  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const setEditableData = () => {
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
            ...po_fields,
            commit: 1,
            po_created_by_no_name: auth.employee_no_name_eng,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            po_created: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [po_detail_fields],
    });
  };

  useEffect(() => {
    setEditableData();
  }, []);

  useEffect(() => {
    data_head.pr_id &&
      !data_head.po_id &&
      axios
        .get(`${api_get_pr_detail_ref}/${data_head.pr_id}`, header_config)
        .then((res) => {
          const details = res.data[0];
          detailDispatch({
            type: "SET_DETAIL",
            payload: details.length ? details : initialStateDetail,
          });
        });
    // dispatch(get_pr_detail(data_head.pr_id));
    // detailDispatch({type:"SET_DETAIL",payload:})
  }, [data_head.pr_id]);

  const upDateFormValue = (data) => {
    console.log("upDateFormValue");
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Order",
      data_head.po_no ? "Edit" : "Create",
      data_head.po_no && data_head.po_no,
    ],
    search: false,
    buttonAction: ["Save", "SaveConfirm", "Discard"],
    step: {
      current: data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: "function",
    discard: "/purchase/po",
    back: "/purchase/po",
    onDiscard: (e) => {
      console.log("Discard");
    },
    onSave: (e) => {
      console.log("Save");
      const key = "validate";

      const validate = validateFormHead(data_head, po_require_fields);
      const validate_detail = validateFormDetail(
        data_detail,
        po_require_fields_detail
      );
      if (validate.validate && validate_detail.validate) {
        console.log("pass");
        data_head.po_id
          ? dispatch(
              update_po(
                data_head.po_id,
                auth.user_name,
                data_head,
                data_detail,
                redirect_to_view
              )
            )
          : dispatch(
              create_po(
                auth.user_name,
                data_head,
                data_detail,
                redirect_to_view
              )
            );
      } else {
        message.warning({
          content: "Please fill your form completely.",
          key,
          duration: 2,
        });
      }
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
  const redirect_to_view = (po_id) => {
    props.history.push("/purchase/po/view/" + (po_id ? po_id : "new"));
  };
  const getDataRef = (refId, mainData, refData) => {
    let copyMain = { ...mainData };
    let copyRef = { ...refData[refId] };
    copyMain.pr_id = copyRef.pr_id;
    copyMain.pr_no = copyRef.pr_no;
    copyMain.vendor_no_name = copyRef.vendor_no_name;
    copyMain.pr_no_description = copyRef.pr_no_description;
    copyMain.po_description = copyRef.pr_description;
    copyMain.po_due_date = copyRef.tg_pr_due_date;
    copyMain.tg_po_amount = copyRef.tg_pr_amount;
    copyMain.tg_po_discount = copyRef.tg_pr_discount;
    copyMain.tg_po_sum_amount = copyRef.tg_pr_sum_amount;
    copyMain.tg_po_vat_amount = copyRef.tg_pr_vat_amount;
    copyMain.tg_po_total_amount = copyRef.tg_pr_total_amount;
    copyMain.currency_id = copyRef.currency_id;
    copyMain.currency_no = copyRef.currency_no;
    copyMain.payment_term_id = copyRef.payment_term_id;
    copyMain.payment_term_no_name = copyRef.payment_term_no_name;
    copyMain.cost_center_id = copyRef.cost_center_id;
    copyMain.vendor_id = copyRef.vendor_id;
    upDateFormValue({ ...data_head, ...copyMain });
  };

  const resetDataRef = () => {
    dispatch(reset_po_data());
  };
  console.log(data_detail);
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.po_no ? "Edit" : "Create"} Purchase Order{" "}
                {data_head.po_no && "#" + data_head.po_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date : </Text>
          </Col>
          <Col span={2} className="text-center">
            <Text>{data_head.po_created}</Text>
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>PR Ref. :
            </Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              placeholder={"Select PR. ex.PR2009-00xx"}
              allowClear
              showSearch
              name="pr_id"
              field_id="pr_id"
              field_name="pr_no_description"
              value={data_head.pr_no_description}
              data={select_box_pr}
              onChange={(data, option) => {
                console.log("onchange");
                option && option.title
                  ? getDataRef(option.key, data_head, select_box_pr)
                  : resetDataRef();
              }}
            />
          </Col>
          <Col span={2}></Col>

          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Vendor :
            </Text>
          </Col>

          <Col span={8}>
            <CustomSelect
              placeholder={"Vendor"}
              allowClear
              showSearch
              name="vendor_id"
              field_id="vendor_id"
              field_name="vendor_no_name"
              value={data_head.vendor_no_name}
              data={vendors}
              onSelect={(data, option) =>
                upDateFormValue({
                  vendor_id: data,
                  vendor_no_name: option.title,
                })
              }
              onChange={(data, option) =>
                data
                  ? upDateFormValue({
                      vendor_id: option.data.vendor_id,
                      vendor_no_name: option.data.vendor_no_name,
                      payment_term_id: option.data.payment_term_id,
                      payment_term_no_name: option.data.payment_term_no_name,
                      currency_id: option.data.currency_id,
                      currency_no: option.data.currency_no,
                    })
                  : upDateFormValue({
                      vendor_id: null,
                      vendor_no_name: null,
                      payment_term_id: null,
                      payment_term_no_name: null,
                      currency_id: 1,
                      currency_no: "THB",
                    })
              }
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Description :
            </Text>
          </Col>

          <Col span={8}>
            <Input
              name="po_description"
              onChange={(e) =>
                upDateFormValue({ po_description: e.target.value })
              }
              value={data_head.po_description}
              placeholder="Description"
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Payment Terms :
            </Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              placeholder={"Payment Term"}
              allowClear
              showSearch
              name="payment_term_id"
              field_id="payment_term_id"
              field_name="payment_term_no_name"
              value={data_head.payment_term_no_name}
              data={vendor_payment_terms}
              onChange={(data, option) =>
                data
                  ? upDateFormValue({
                      payment_term_id: data,
                      payment_term_no_name: option.title,
                    })
                  : upDateFormValue({
                      payment_term_id: null,
                      payment_term_no_name: null,
                    })
              }
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
                upDateFormValue({ po_agreement: e.target.value })
              }
              value={data_head.po_agreement}
              placeholder="Agreement"
            ></Input>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Currency :</Text>
          </Col>
          <Col span={8}>
            {data_head.currency_no ? data_head.currency_no : "THB"}
          </Col>
        </Row>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <ItemLine
                  pr_id={data_head.pr_id && data_head.pr_id}
                  po_id={data_head.po_id && data_head.po_id}
                  data_detail={data_detail}
                  readOnly={false}
                  detailDispatch={detailDispatch}
                  headDispatch={headDispatch}
                  vat_rate={data_head.vat_rate}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <TextArea
                  rows={2}
                  placeholder={"Remark..."}
                  defaultValue={data_head.po_remark}
                  value={data_head.po_remark}
                  onChange={(e) =>
                    upDateFormValue({ po_remark: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <TotalFooter
            excludeVat={data_head.tg_po_sum_amount}
            vat={data_head.tg_po_vat_amount}
            includeVat={data_head.tg_po_total_amount}
            currency={data_head.currency_no}
          />
        ) : null}
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default withRouter(PurchaseOrderCreate);
