import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  AutoComplete,
  Typography,
  Select,
  Alert,
  message,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import ItemLine from "./pr_ItemLine";
import {
  validateFormDetail,
  validateFormHead,
} from "../../include/js/function_main";
import Comments from "../../components/Comments";
import {
  pr_fields,
  prItemColumns,
  pr_detail_fields,
  pr_require_fields,
  pr_require_fields_detail,
} from "./config/pr";
import {
  reset_pr_data,
  create_pr,
  update_pr,
  update_pr_head,
  pr_actions,
} from "../../actions/purchase/PR_Actions";
import CustomSelect from "../../components/CustomSelect";
import TotalFooter from "../../components/TotalFooter";
import { reducer } from "./reducers";
import { Redirect, withRouter } from "react-router-dom";
import { keep_log } from "../../actions/comment&log";
import { log_detail } from "../system/configs/log";
import useKeepLogs from "../logs/useKeepLogs";
import Authorize from "../system/Authorize";

const { TextArea } = Input;
const { Text } = Typography;

const initialStateHead = pr_fields;
const initialStateDetail = [pr_detail_fields];

const PurchaseRequisitionCreate = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const keepLog = useKeepLogs();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const auth = useSelector((state) => state.auth.authData);
  const dataComments = useSelector((state) => state.log.comment_log);
  const cost_centers = useSelector((state) => state.hrm.cost_center);
  const vendors = useSelector((state) => state.purchase.vendor.vendor_list);

  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const data =
    props.location && props.location.state ? props.location.state : 0;

  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  useEffect(() => {
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
            ...pr_fields,
            commit: 1,
            pr_created_by_no_name: auth.employee_no_name_eng,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            pr_created: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [pr_detail_fields],
    });
  }, [dispatch]);

  const callback = (key) => {
    setTab(key);
  };

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Requisition",
      data_head.pr_no ? "Edit" : "Create",
      data_head.pr_no && data_head.pr_no,
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
    discard: "/purchase/pr",
    onDiscard: (e) => {
      dispatch(reset_pr_data());
    },
    onSave: (e) => {
      console.log("Save");
      const key = "validate";
      message.loading({ content: "Validating...", key });
      const validate = validateFormHead(data_head, pr_require_fields);
      const validate_detail = validateFormDetail(
        data_detail,
        pr_require_fields_detail
      );
      if (validate.validate && validate_detail.validate) {
        data_head.pr_id
          ? dispatch(
              update_pr(
                data_head.pr_id,
                auth.user_name,
                data_head,
                data_detail,
                redirect_to_view
              )
            )
          : dispatch(
              create_pr(
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
    onConfirm: () => {
      console.log("Confirm");
    },
  };
  const redirect_to_view = () => {
    props.history.push(
      "/purchase/pr/view/" + (data_head.pr_id ? data_head.pr_id : "new")
    );
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
                <Text strong>
                  {data_head.pr_no ? "Edit" : "Create"} Purchase Requisition
                </Text>
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>PR Date : </Text>
          </Col>
          <Col span={2} className="text-center">
            <Text>{data_head.pr_created}</Text>
          </Col>
        </Row>
        <Row className="col-2" style={{ marginBottom: 20 }}>
          {data_head.pr_no && (
            <h3>
              <b>PR No. : </b>
              {data_head.pr_no}
            </h3>
          )}
        </Row>
        <Row className="col-2 row-margin-vertical-lg">
          <Col span={3}>
            <Text strong>Request by :</Text>
          </Col>

          <Col span={8}>{data_head.pr_created_by_no_name}</Col>
          <Col span={2}></Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Cost center :
            </Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Cost Center"}
              name="cost_center_id"
              field_id="cost_center_id"
              field_name="cost_center_no_name"
              value={data_head.cost_center_no_name}
              data={cost_centers}
              onChange={(data, option) => {
                data && data
                  ? upDateFormValue({
                      cost_center_id: data,
                      cost_center_no_name: option.title,
                    })
                  : upDateFormValue({
                      cost_center_id: null,
                      cost_center_no_name: null,
                    });
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Vendor"}
              name="vendor_id"
              field_id="vendor_id"
              field_name="vendor_no_name"
              value={data_head.vendor_no_name}
              data={vendors}
              onChange={(data, option) => {
                data && data
                  ? upDateFormValue({
                      vendor_id: data,
                      vendor_no_name: option.title,
                    })
                  : upDateFormValue({
                      vendor_id: null,
                      vendor_no_name: null,
                    });
              }}
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
              onChange={(e) =>
                upDateFormValue({ pr_description: e.target.value })
              }
              name={"pr_description"}
              value={data_head.pr_description}
              placeholder="Description"
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
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <ItemLine
                  data_detail={data_detail}
                  readOnly={false}
                  detailDispatch={detailDispatch}
                  headDispatch={headDispatch}
                  vat_rate={data_head.vat_rate}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <TextArea
                  onChange={(e) =>
                    upDateFormValue({ pr_remark: e.target.value })
                  }
                  value={data_head.pr_remark}
                  placeholder="Remark"
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" && (
          <TotalFooter
            excludeVat={data_head.tg_pr_sum_amount}
            vat={data_head.tg_pr_vat_amount}
            includeVat={data_head.tg_pr_total_amount}
            currency={data_head.currency_no}
          />
        )}
      </div>

      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default withRouter(PurchaseRequisitionCreate);
