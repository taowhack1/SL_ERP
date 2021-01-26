import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Row, Col, Input, Tabs, Typography, message } from "antd";
import { reducer } from "../../reducers";
import {
  receive_fields,
  receive_detail_fields,
  receive_require_fields,
} from "../../config";
import {
  create_receive,
  get_po_receive_list,
  update_receive,
} from "../../../../actions/inventory/receiveActions";
import {
  header_config,
  report_server,
} from "../../../../include/js/main_config";
import { api_receive_get_ref_po_detail } from "../../../../include/js/api";
import { get_log_by_id, reset_comments } from "../../../../actions/comment&log";

import MainLayout from "../../../../components/MainLayout";
import moment from "moment";
import Comments from "../../../../components/Comments";
import Detail from "./Receive_Detail";

import CustomSelect from "../../../../components/CustomSelect";
import axios from "axios";
import Authorize from "../../../system/Authorize";
import { validateFormHead } from "../../../../include/js/function_main";

const { TextArea } = Input;
const { Text } = Typography;

const initialStateHead = receive_fields;
const initialStateDetail = [receive_detail_fields];
const Receive_Create = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [, setTab] = useState("1");
  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);

  const auth = useSelector((state) => state.auth.authData);
  const dataComments = useSelector((state) => state.log.comment_log);
  const current_project = useSelector((state) => state.auth.currentProject);
  const po_list = useSelector((state) => state.inventory.receive.po_ref);

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

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Inventory",
      "Receive",
      data_head.receive_no ? "Edit" : "Create",
      data_head.receive_no && data_head.receive_no,
    ],
    search: false,
    buttonAction: ["Save", "Validate", "Discard"],
    // action: [
    //   {
    //     name: "Print",
    //     link: `${report_server}/Report_purch/report_pr.aspx?pr_no=${
    //       data_head && data_head.receive_id
    //     }`,
    //   },
    //   data_head &&
    //     data_head.button_cancel && {
    //       name: "Cancel",
    //       cancel: true,
    //       link: ``,
    //     },
    // ],
    step: {
      current: data_head && data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: "function",
    discard: "/inventory/receive",
    onSave: (e) => {
      console.log("Save");
      const key = "validate";

      const validate = validateFormHead(data_head, receive_require_fields);
      // const validate_detail = validateFormDetail(
      //   data_detail,
      //   receive_detail_require_fields
      // );
      if (validate.validate) {
        console.log("pass");
        data_head.receive_id
          ? dispatch(
              update_receive(
                data_head.receive_id,
                auth.user_name,
                data_head,
                data_detail,
                redirect_to_view
              )
            )
          : dispatch(
              create_receive(
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

  useEffect(() => {
    dispatch(get_po_receive_list());
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
            ...receive_fields,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            receive_created: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [receive_detail_fields],
    });
  }, []);

  useEffect(() => {
    if (data_head.po_id && !data_head.receive_id) {
      // Create Receive Only GET PO Reference
      axios
        .get(
          `${api_receive_get_ref_po_detail}/${data_head.po_id}`,
          header_config
        )
        .then((res) => {
          const details = res.data[0];
          details.map((detail) => (detail.receive_sub_detail = []));
          detailDispatch({ type: "SET_DETAIL", payload: details });
        });
    }
  }, [data_head.po_id]);

  useEffect(() => {
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
    return () => {
      dispatch(reset_comments());
    };
  }, [data_head]);

  const resetForm = () => {
    headDispatch({
      type: "RESET_DATA",
      payload: {
        ...initialStateHead,
        commit: 1,
        user_name: auth.user_name,
        branch_id: auth.branch_id,
        branch_name: auth.branch_name,
        receive_created: moment().format("DD/MM/YYYY"),
      },
    });
    detailDispatch({
      type: "RESET_DATA",
      payload: initialStateDetail,
    });
  };

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const redirect_to_view = (id) => {
    history.push("/inventory/receive/view/" + (id ? id : "new"));
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.receive_no ? "Edit" : "Create"} Receive{" "}
                {data_head.receive_no ? "#" + data_head.receive_no : null}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.receive_created}</Text>
          </Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>PO Ref. :
            </Text>
          </Col>
          <Col span={8}>
            {/* PO Ref */}
            <CustomSelect
              allowClear
              showSearch
              placeholder={"PO No. ex.PO2009000x"}
              name="po_id"
              field_id="po_id"
              field_name="po_no_description"
              value={data_head.po_no_description}
              data={po_list}
              onChange={(data, option) => {
                if (data) {
                  upDateFormValue(
                    ...po_list.filter((po) => po.po_id === data, data)
                  );
                } else {
                  resetForm();
                }
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.vendor_no_name}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical ">
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Description :
            </Text>
          </Col>
          <Col span={8}>
            <Input
              name="receive_description"
              onChange={(e) =>
                upDateFormValue({
                  receive_description: e.target.value,
                })
              }
              value={data_head.receive_description}
              placeholder="Description"
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Currency :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.currency_no}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          {/* <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>
          <Col span={8}>
            <Input
              name="receive_agreement"
              value={data_head.receive_agreement}
              onChange={(e) =>
                upDateFormValue({
                  receive_agreement: e.target.value,
                })
              }
              value={data_head.receive_agreement}
              placeholder="Agreement"
            />
          </Col>
          <Col span={2}></Col> */}
          <Col span={3}>
            <Text strong>Order date :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.receive_order_date}</Text>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="require">* </span>
                    Receive Detail
                  </span>
                }
                key={"1"}
              >
                <Detail
                  readOnly={false}
                  po_id={data_head.po_id}
                  data_detail={data_detail}
                  headDispatch={headDispatch}
                  detailDispatch={detailDispatch}
                  vat_rate={data_head.vat_rate}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <TextArea
                  rows={2}
                  name="receive_remark"
                  placeholder={"Remark"}
                  defaultValue={data_head.receive_remark}
                  value={data_head.receive_remark}
                  onChange={(e) =>
                    upDateFormValue({ receive_remark: e.target.value })
                  }
                  className={"full-width"}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {/* {tab === "1" && (
          <TotalFooter
            excludeVat={data_head.tg_receive_sum_amount}
            vat={data_head.tg_receive_vat_amount}
            includeVat={data_head.tg_receive_total_amount}
            currency={data_head.currency_no}
          />
        )} */}
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default Receive_Create;
