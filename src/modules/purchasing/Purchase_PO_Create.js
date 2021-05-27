import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message, InputNumber } from "antd";
import { withRouter } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import moment from "moment";

import Comments from "../../components/Comments";
import ItemLine from "./po_ItemLine";

import {
  po_fields,
  po_detail_fields,
  po_require_fields_detail,
  po_require_fields,
} from "./config/po";
import TotalFooter from "../../components/TotalFooter";
import CustomSelect from "../../components/CustomSelect";

import {
  update_po,
  create_po,
  reset_po_data,
  updatePODueDate,
} from "../../actions/purchase/PO_Actions";
import { reducer } from "./reducers";
import axios from "axios";
import { api_get_pr_detail_ref } from "../../include/js/api";
import {
  convertDigit,
  header_config,
  numberFormat,
} from "../../include/js/main_config";
import {
  sumArrObj,
  validateFormDetail,
  validateFormHead,
} from "../../include/js/function_main";

import Authorize from "../system/Authorize";
import CustomLabel from "../../components/CustomLabel";

const { TextArea } = Input;
const { Text } = Typography;
const initialStateHead = po_fields;
const initialStateDetail = [po_detail_fields];

const PurchaseOrderCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const readOnly =
    data?.data_head?.tg_trans_status_id === 4 && data?.data_head?.button_create
      ? true
      : false;
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

  const callback = (key) => {
    setTab(key);
  };
  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  useEffect(() => {
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
    setEditableData();
  }, [auth, data]);

  useEffect(() => {
    data_head.pr_id &&
      !data_head.po_id &&
      axios
        .get(`${api_get_pr_detail_ref}/${data_head.pr_id}`, header_config)
        .then((res) => {
          const details = res.data[0];
          detailDispatch({
            type: "SET_DETAIL",
            payload: details.length
              ? details.map((obj) => {
                  return {
                    ...obj,
                    po_detail_total_price:
                      obj.po_detail_qty * obj.po_detail_price,
                  };
                })
              : initialStateDetail,
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
      console.log(data_head);
      if (readOnly) {
        //Update Due Date
        const poDetail = data_detail.map((obj) => {
          const { po_detail_id, po_detail_due_date } = obj;
          return {
            po_detail_id,
            po_detail_due_date,
            commit: 1,
          };
        });
        dispatch(
          updatePODueDate(
            data_head.po_id,
            poDetail,
            auth.user_name,
            redirect_to_view
          )
        );
      } else {
        // Normal Case Create / Edit PO.
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
    let copyMain = refData[refId];
    upDateFormValue({ ...data_head, ...copyMain });
  };
  const resetDataRef = () => {
    let copyMain = po_fields;
    copyMain.pr_id = null;
    copyMain.pr_no = null;
    copyMain.vendor_no_name = null;
    copyMain.pr_no_description = null;
    copyMain.po_description = null;
    copyMain.po_due_date = null;
    copyMain.tg_po_amount = null;
    copyMain.tg_po_discount = null;
    copyMain.tg_po_sum_amount = null;
    copyMain.tg_po_vat_amount = null;
    copyMain.tg_po_total_amount = null;
    copyMain.currency_id = null;
    copyMain.currency_no = null;
    copyMain.payment_term_id = null;
    copyMain.payment_term_no_name = null;
    copyMain.cost_center_id = null;
    copyMain.vendor_id = null;
    copyMain.vat_rate = 0;
    copyMain.po_discount = 0;
    upDateFormValue(copyMain);
    detailDispatch({ type: "SET_DETAIL", payload: initialStateDetail });
    dispatch(reset_po_data());
  };
  const updateAmount = (data_detail, field, vat_rate, discount) => {
    const obj = sumArrObj(data_detail, field, vat_rate, data_head.po_discount);
    headDispatch({
      type: "CHANGE_HEAD_VALUE",
      payload: {
        tg_po_sum_amount: obj.exclude_vat,
        tg_po_vat_amount: obj.vat,
        tg_po_total_amount: obj.include_vat,
      },
    });
  };

  console.log(data_head, data_detail);
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
            <CustomLabel label={"PR Ref."} require readOnly={readOnly} />
          </Col>
          <Col span={8}>
            {readOnly ? (
              <Text className="text-value">{data_head.pr_no_description}</Text>
            ) : (
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
                  if (data) {
                    console.log("if");
                    getDataRef(option.key, data_head, select_box_pr);
                  } else {
                    console.log("else");
                    resetDataRef();
                  }
                }}
              />
            )}
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <CustomLabel label={"Job Name "} readOnly={readOnly} />
          </Col>
          <Col span={8} className="text-view">
            {data_head.mrp_no_description ?? "-"}
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <CustomLabel label={"Description "} require readOnly={readOnly} />
          </Col>

          <Col span={8}>
            {readOnly ? (
              <Text className="text-value">
                {data_head.po_description ?? "-"}
              </Text>
            ) : (
              <Input
                name="po_description"
                onChange={(e) =>
                  upDateFormValue({ po_description: e.target.value })
                }
                value={data_head.po_description}
                placeholder="Description"
              />
            )}
          </Col>
          <Col span={2}></Col>
          {/* vendor */}
          <Col span={3}>
            <CustomLabel label={"Request By "} readOnly={readOnly} />
          </Col>

          <Col span={8} className="text-left">
            <Text className={"text-value"}>
              {data_head.po_created_by_no_name ?? "-"}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <CustomLabel label={"Vendor "} require readOnly={readOnly} />
          </Col>

          <Col span={8}>
            {readOnly ? (
              <Text className="text-value">
                {data_head.vendor_no_name ?? "-"}
              </Text>
            ) : (
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
                        vat_rate: option.data.vat_rate,
                        vat_id: option.data.vat_id,
                      })
                    : upDateFormValue({
                        vendor_id: null,
                        vendor_no_name: null,
                        payment_term_id: null,
                        payment_term_no_name: null,
                        currency_id: 1,
                        currency_no: "THB",
                        vat_rate: 0,
                        vat_id: option.data.vat_id,
                      })
                }
              />
            )}
          </Col>

          <Col span={2}></Col>
          <Col span={3}>
            <CustomLabel label={"Cost Center "} readOnly={readOnly} />
          </Col>
          <Col span={8} className="text-left">
            <Text className={"text-value"}>
              {data_head.cost_center_no_name ?? "-"}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <CustomLabel label={"Payment Terms "} require readOnly={readOnly} />
          </Col>
          <Col span={8}>
            {readOnly ? (
              <Text className="text-value">
                {data_head.payment_term_no_name}
              </Text>
            ) : (
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
            )}
          </Col>
          <Col span={2}></Col>
          {/* 8 */}
          <Col span={3}>
            <CustomLabel label={"Item Type "} readOnly={readOnly} />
          </Col>
          <Col span={8} className="text-left">
            <Text className={"text-value"}>
              {data_head.type_no_name ?? "-"}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <CustomLabel label={"Currency "} readOnly={readOnly} />
          </Col>
          <Col span={8}>
            {data_head.currency_no ? data_head.currency_no : "THB"}
          </Col>

          <Col span={2}></Col>
        </Row>
        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <ItemLine
                  type_id={data_head.type_id}
                  pr_id={data_head.pr_id && data_head.pr_id}
                  po_id={data_head.po_id && data_head.po_id}
                  data_detail={data_detail}
                  readOnly={readOnly}
                  detailDispatch={detailDispatch}
                  headDispatch={headDispatch}
                  vat_rate={data_head.vat_rate}
                  updateAmount={updateAmount}
                  enableEditDueDate={readOnly}
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
                  className={"full-width"}
                />
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
                {readOnly ? (
                  <Text className="text-value">
                    {convertDigit(data_head.po_discount ?? 0, 4)}
                  </Text>
                ) : (
                  <InputNumber
                    name="item_discount"
                    placeholder="Discount"
                    value={data_head.po_discount}
                    min={0.0}
                    step={5}
                    precision={3}
                    defaultValue={0}
                    {...numberFormat}
                    onChange={(data) => {
                      upDateFormValue({ po_discount: data });
                    }}
                    onBlur={(data) => {
                      updateAmount(
                        data_detail,
                        "po_detail_total_price",
                        data_head.vat_rate
                      );
                    }}
                    className="full-width"
                    size="small"
                  />
                )}
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
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default withRouter(PurchaseOrderCreate);
