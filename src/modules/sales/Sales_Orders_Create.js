/** @format */

import React, { useEffect, useReducer, useState } from "react";
import {
  Row,
  Col,
  Input,
  Tabs,
  Typography,
  DatePicker,
  message,
  Checkbox,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import MainLayout from "../../components/MainLayout";
import moment from "moment";

import Comments from "../../components/Comments";
import TotalFooter from "../../components/TotalFooter";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../components/CustomSelect";
import {
  create_so,
  getProduction_for_fg,
  getSalesType,
  getSo_production_type,
  get_qn_open_so,
  update_so,
} from "../../actions/sales";
import { header_config } from "../../include/js/main_config";
import { api_qn_detail } from "../../include/js/api";
import {
  quotation_fields,
  so_detail_fields,
  so_fields,
  so_require_fields,
  so_require_fields_detail,
  so_require_fields_type_production,
} from "./configs";
import Detail from "./Sales_Order_Detail";
import { reducer } from "./reducers";
import axios from "axios";
import Authorize from "../system/Authorize";

import { useHistory, useParams } from "react-router-dom";
import {
  validateFormDetail,
  validateFormHead,
} from "../../include/js/function_main";
import { get_vat_list } from "../../actions/accounting";
import CustomLabel from "../../components/CustomLabel";
import { useFetch } from "../../include/js/customHooks";
const apiGetSalesPerson = "/list/sales_person";
const { TextArea } = Input;
const { Text } = Typography;

const initialStateHead = so_fields;
const initialStateDetail = [so_detail_fields];
let check_change_qn = false;
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().day(-1).endOf("day");
};

const SaleOrderCreate = (props) => {
  const [selectData, setSelectData] = useState({
    salesType: [],
    soProductionType: [],
    productionForFg: [],
  });
  const { data: listSalesPerson, loading: loadingSalesPerson } = useFetch(
    `${apiGetSalesPerson}`
  );
  console.log("listSalesPerson :>> ", listSalesPerson);
  const history = useHistory();
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
  const { customer_payment_terms, vat: vatList } = useSelector(
    (state) => state.accounting.master_data
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
  console.log(" props.location", props.location.state);
  const data =
    props.location && props.location.state ? props.location.state : 0;
  console.log("data", data);
  useEffect(() => {
    const getSalesTypeData = async () => {
      const resp = await getSalesType();
      console.log("getSalesTypeData", resp);
      setSelectData((prev) => ({ ...prev, salesType: resp.data }));
    };
    const getsoProductionTypeData = async () => {
      const resp = await getSo_production_type();
      console.log("getsoProductionTypeData", resp);
      setSelectData((prev) => ({ ...prev, soProductionType: resp.data }));
    };
    const getproductionForFgData = async () => {
      const resp = await getProduction_for_fg();
      console.log("getproductionForFgData", resp);
      setSelectData((prev) => ({ ...prev, productionForFg: resp.data }));
    };
    getSalesTypeData();
    getsoProductionTypeData();
    getproductionForFgData();
    dispatch(get_qn_open_so());
    dispatch(get_vat_list());
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
    console.log("SO UseEffect get Ref", quotation_list);
    if (data_head.qn_id && !data_head.so_id && quotation_list.length) {
      headDispatch({
        type: "CHANGE_HEAD_VALUE",
        payload: getDataRef(data_head.qn_id, data_head, quotation_list),
      });
      axios
        .get(`${api_qn_detail}/ref/${data_head.qn_id}`, header_config)
        .then((res) => {
          console.log("res detail", res.data[0]);
          detailDispatch({ type: "SET_DETAIL", payload: res.data[0] });
        });
      message.success("Get Quotations reference success.", 4);
    } else if (
      data_head.qn_id &&
      data_head.so_id &&
      quotation_list.length &&
      check_change_qn
    ) {
      headDispatch({
        type: "CHANGE_HEAD_VALUE",
        payload: getDataRef(data_head.qn_id, data_head, quotation_list),
      });
      axios
        .get(`${api_qn_detail}/ref/${data_head.qn_id}`, header_config)
        .then((res) => {
          console.log("res detail", res.data[0]);
          detailDispatch({ type: "SET_DETAIL", payload: res.data[0] });
        });
      message.success("Get Quotations reference success.", 4);
      check_change_qn = false;
    }
  }, [data_head.qn_id, quotation_list]);
  const oem = [
    { label: "Sales OEM 1", value: "OEM 1" },
    { label: "Sales OEM 2", value: "OEM 2" },
    { label: "Sales OEM 3", value: "OEM 3" },
    { label: "Sales OEM 4", value: "OEM 4" },
  ];
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
    buttonAction: ["Save", "Discard"],
    step: {
      current: data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: "function",
    discard: "/sales/orders",
    onSave: (e) => {
      //e.preventDefault();
      console.log("SAVE", data_head, data_detail);
      const message_key = "validate";
      const so_requireField =
        data_head.so_type_id === 2
          ? so_require_fields
          : so_require_fields_type_production;
      const validate = validateFormHead(data_head, so_requireField);
      const validate_detail = validateFormDetail(
        data_detail,
        so_require_fields_detail
      );
      if (validate.validate && validate_detail.validate) {
        console.log("pass");
        data_head.so_id
          ? dispatch(
            update_so(
              data_head.so_id,
              auth.user_name,
              data_head,
              data_detail,
              redirect_to_view
            )
          )
          : dispatch(
            create_so(
              auth.user_name,
              data_head,
              data_detail,
              redirect_to_view
            )
          );
      } else {
        message.warning({
          content: "Please fill your form completely.",
          message_key,
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

  const getDataRef = (refId, mainData, refData) => {
    console.log("GET REF", refId, mainData, refData);
    let copyMain = {};
    let copyRef = refData.filter((data) => data.qn_id === refId)[0];
    if (copyRef) {
      copyMain.qn_id = copyRef.qn_id;
      copyMain.so_description = copyRef.qn_description;
      copyMain.so_no_description = copyRef.qn_no_description;
      copyMain.qn_no_description = copyRef.qn_no_description;
      copyMain.so_agreement = copyRef.qn_agreement;
      copyMain.so_remark = copyRef.qn_remark;
      copyMain.vat_id = copyRef.vat_id;
      copyMain.vat_rate = copyRef.vat_rate;
      copyMain.vat_include = copyRef.vat_include;
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
      copyMain.qn_tg_trans_close_id = 1;
      console.log("copyMain", copyMain);
      return copyMain;
    } else {
      return quotation_fields;
    }
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

  const redirect_to_view = (id) => {
    history.push("/sales/orders/view/" + (id ? id : "new"));
  };
  console.log("data_head", data_head);
  console.log("selectData :>> ", selectData);
  console.log("data_detail :>> ", data_detail);
  console.log("check_change_qn", check_change_qn);
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
              ? moment(data_head.so_created, "DD/MM/YYYY").format("DD/MM/YYYY")
              : moment().format("DD/MM/YYYY")}
          </Col>
        </Row>

        {/* Address & Information */}
        {/* Description order Date*/}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Description :
            </Text>
          </Col>

          <Col span={8}>
            <Input
              name="so_description"
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
            <Text strong>
              <span className="require">* </span>Order Date
            </Text>
          </Col>
          <Col span={8}>
            <DatePicker
              name={"so_order_date"}
              format={"DD/MM/YYYY"}
              className={"full-width"}
              placeholder="Order date"
              disabledDate={disabledDate}
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
        {/*Sales Type Customer*/}
        <Row className="col-2 row-margin-vertical">
          {/* Close QN */}
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Sales Person :
            </Text>
          </Col>

          <Col span={8}>
            <CustomSelect
              name={"so_type_id"}
              placeholder="Sales Person"
              field_id="emp_id"
              field_name="emp_name_no_th"
              loading={loadingSalesPerson}
              data={listSalesPerson}
              value={data_head.so_sales_person}
              onChange={(data, option) => {
                data !== undefined
                  ? headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      so_sales_person: data,
                    },
                  })
                  : headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      so_sales_person: null,
                    },
                  });
              }}
            />
          </Col>

          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Customer{" "}
            </Text>
          </Col>

          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Customer"}
              name="customer_id"
              field_id="customer_id"
              field_name="customer_no_name"
              value={data_head.customer_no_name}
              data={masterData.customers}
              onChange={(data, option) => {
                data !== undefined
                  ? headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      currency_id: option.data.currency_id,
                      currency_no: option.data.currency_no,
                      customer_id: option.data.customer_id,
                      customer_no_name: option.data.customer_no_name,
                      payment_term_id: option.data.payment_term_id,
                      payment_term_no_name: option.data.payment_term_no_name,
                      vat_id: option.data.vat_id,
                      vat_rate: option.data.vat_rate,
                      vat_name: option.data.vat_name,
                      vat_include: option.data.vat_include,
                    },
                  })
                  : headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      currency_id: 1,
                      currency_no: "THB",
                      customer_id: null,
                      customer_no_name: null,
                      payment_term_id: null,
                      payment_term_no_name: null,
                      vat_id: 1,
                      vat_rate: 0.07,
                      vat_name: "VAT 7%",
                      vat_include: false,
                    },
                  });
              }}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          {/* Close QN */}
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Sales OEM :
            </Text>
          </Col>

          <Col span={8}>
            <CustomSelect
              name={"so_sales_oem"}
              placeholder="Sale OEM"
              data={oem}
              field_id="value"
              field_name="label"
              onChange={(val) =>
                val
                  ? headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      so_sales_oem: val,
                    },
                  })
                  : headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      so_sales_oem: null,
                    },
                  })
              }
              value={data_head.so_sales_oem}
            />
          </Col>

          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>
              Payment Terms
            </Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Payment term"}
              name="payment_term_id"
              field_id="payment_term_id"
              field_name="payment_term_no_name"
              value={data_head.payment_term_no_name}
              data={customer_payment_terms}
              onChange={(data, option) => {
                data !== undefined
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
        <Row className="col-2 row-margin-vertical">
          {/* PD Type */}
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Sales Type :
            </Text>
          </Col>

          <Col span={8}>
            <CustomSelect
              name={"so_type_id"}
              placeholder="สั่งผลิต / ขายอื่นๆ"
              data={selectData.salesType}
              field_id="so_type_id"
              field_name="so_type_name"
              disabled={data_head.so_id ? true : false}
              onChange={(val) =>
                val === 1
                  ? headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      so_type_id: val,
                      so_production_type_id: 1,
                      so_production_ref_id: null,
                    },
                  })
                  : headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      so_type_id: val,
                      so_production_ref_id: null,
                      so_production_type_id: null,
                    },
                  })
              }
              value={data_head.so_type_id}
            />
          </Col>

          <Col span={2}></Col>
          <Col span={3}>
            <Text strong className="pd-left-1">
              PO No. :
            </Text>
          </Col>

          <Col span={8}>
            <Input
              name="so_customer_po_no"
              onChange={(e) =>
                headDispatch({
                  type: "CHANGE_HEAD_VALUE",
                  payload: { so_customer_po_no: e.target.value },
                })
              }
              value={data_head.so_customer_po_no}
              placeholder="PO No."
            />
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <CustomLabel
              label={"Production type :"}
              require={data_head.so_type_id == 1 ? true : false}
            />
          </Col>

          <Col span={8}>
            <CustomSelect
              name={"so_production_type_id"}
              placeholder="ผลิตรอ FG / ผลิตเก็บ"
              disabled={data_head.so_type_id === 1 ? false : true}
              data={selectData.soProductionType}
              field_id="so_production_type_id"
              field_name="so_production_type_description"
              onChange={(val) => {
                if (val === 1) {
                  headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: { so_production_type_id: val },
                  });
                } else {
                  headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      so_production_ref_id: null,
                      so_production_type_id: val,
                    },
                  });
                  detailDispatch({
                    type: "RESET_DATA",
                    payload: initialStateDetail,
                  });
                }
              }}
              value={data_head.so_production_type_id}
            />
          </Col>
          {/* quotation */}
          {/* <Col span={3}>
            <Text strong>
              <span className='require'>* </span>Quotations Ref.
            </Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              name='qn_id'
              placeholder={"Quotation ref."}
              field_id='qn_id'
              field_name='qn_no_description'
              value={data_head.qn_no_description}
              data={quotation_list}
              onChange={(data, option) => {
                if (data) {
                  headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      qn_id: data,
                    },
                  });
                } else {
                  resetForm();
                }
              }}
            />
          </Col> */}
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Vat
            </Text>
          </Col>

          <Col span={8}>
            <CustomSelect
              placeholder="Select Vat Type"
              data={vatList || []}
              field_id="vat_id"
              field_name="vat_name"
              showSearch
              onChange={(val, option) => {
                console.log("option", option);
                headDispatch({
                  type: "CHANGE_HEAD_VALUE",
                  payload: {
                    vat_id: option.data.vat_id,
                    vat_rate: option.data.vat_rate,
                    vat_include: option.data.vat_include,
                  },
                });
              }}
              value={data_head.vat_id}
              defaultValue={1}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          {/* quotation */}
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Quotations Ref.
            </Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              name="qn_id"
              placeholder={"Quotation ref."}
              field_id="qn_id"
              field_name="qn_no_description"
              value={data_head.qn_no_description}
              data={quotation_list}
              onChange={(data, option) => {
                if (data) {
                  console.log("change qn");
                  check_change_qn = true;
                  headDispatch({
                    type: "CHANGE_HEAD_VALUE",
                    payload: {
                      qn_id: data,
                    },
                  });
                } else {
                  resetForm();
                }
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>

          <Col span={8}></Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={8} offset={3}>
            <Checkbox
              onChange={(e) =>
                headDispatch({
                  type: "CHANGE_HEAD_VALUE",
                  payload: {
                    qn_tg_trans_close_id: e.target.checked ? 2 : 1,
                  },
                })
              }
              checked={
                [2, 3].includes(data_head.qn_tg_trans_close_id) ? true : false
              }
            />
            <Text className="ml-2">{"Close Quotations."}</Text>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <Detail
                  readOnly={false}
                  data_detail={data_detail}
                  so_production_type_id={data_head?.so_production_type_id}
                  detailDispatch={detailDispatch}
                  headDispatch={headDispatch}
                  vat_rate={data_head.vat_rate}
                  vat_include={data_head.vat_include}
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
                  className={"full-width"}
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
