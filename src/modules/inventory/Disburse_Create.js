import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message } from "antd";
import { reducer } from "./reducers";
import { disburse_fields, disburse_detail_fields } from "./config";
import {
  create_disburse,
  update_disburse,
} from "../../actions/inventory/disburseActions";
import { header_config, report_server } from "../../include/js/main_config";
import { api_disburse_get_ref_issue_detail } from "../../include/js/api";
import { get_log_by_id, reset_comments } from "../../actions/comment&log";

import MainLayout from "../../components/MainLayout";
import moment from "moment";
import Comments from "../../components/Comments";
import Detail from "./Disburse_Detail";

import CustomSelect from "../../components/CustomSelect";
import axios from "axios";
import { get_issue_ref_list } from "../../actions/inventory/disburseActions";
import Authorize from "../system/Authorize";
import { useHistory } from "react-router-dom";
import { validateFormHead } from "../../include/js/function_main";
import {
  disburse_require_fields,

} from "./config/disburse";

const { TextArea } = Input;
const { Text } = Typography;

const initialStateHead = disburse_fields;
const initialStateDetail = [disburse_detail_fields];

const DisburseCreate = (props) => {
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
  const issue_list = useSelector((state) => state.inventory.disburse.issue_ref);

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
      "Disburse",
      data_head.disburse_no ? "Edit" : "Create",
      data_head.disburse_no && data_head.disburse_no,
    ],
    search: false,
    buttonAction: ["Save", "Validate", "Discard"],
    action: [
      {
        name: "Print",
        link: `${report_server}/Report_purch/report_pr.aspx?pr_no=${
          data_head && data_head.disburse_id
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
      process_complete: data_head.process_complete,
    },
    create: "",
    save: "function",
    discard: "/inventory/disburse",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      const key = "validate";

      const validate = validateFormHead(data_head, disburse_require_fields);
      // const validate_detail = validateFormDetail(
      //   data_detail,
      //   receive_detail_require_fields
      // );
      if (validate.validate) {
        console.log("pass");
        data_head.disburse_id
          ? dispatch(
              update_disburse(
                data_head.disburse_id,
                auth.user_name,
                data_head,
                data_detail,
                redirect_to_view
              )
            )
          : dispatch(
              create_disburse(
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

      // data_head.disburse_id
      //   ? dispatch(
      //       update_disburse(data_head.disburse_id, data_head, data_detail)
      //     )
      //   : dispatch(create_disburse(data_head, data_detail));
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
    dispatch(get_issue_ref_list());
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
            ...disburse_fields,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            disburse_created: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [disburse_detail_fields],
    });
  }, []);

  useEffect(() => {
    if (data_head.issue_id && !data_head.disburse_id) {
      // Create Disburse Only GET PO Reference
      console.log(`${api_disburse_get_ref_issue_detail}/${data_head.issue_id}`);
      axios
        .get(
          `${api_disburse_get_ref_issue_detail}/${data_head.issue_id}`,
          header_config
        )
        .then((res) => {
          const details = res.data[0];
          details.map((detail) => (detail.disburse_sub_detail = []));
          detailDispatch({ type: "SET_DETAIL", payload: details });
        });
    }
  }, [data_head.issue_id]);

  useEffect(() => {
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
    return () => {
      dispatch(reset_comments());
    };
  }, [data_head.node_stay]);

  const resetForm = () => {
    headDispatch({
      type: "RESET_DATA",
      payload: {
        ...initialStateHead,
        commit: 1,
        user_name: auth.user_name,
        branch_id: auth.branch_id,
        branch_name: auth.branch_name,
        disburse_created: moment().format("DD/MM/YYYY"),
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
    history.push("/inventory/disburse/view/" + (id ? id : "new"));
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.disburse_no ? "Edit" : "Create"} Disburse{" "}
                {data_head.disburse_no ? "#" + data_head.disburse_no : null}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.disburse_created}</Text>
          </Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>
              <span className="require">* </span>Issue Ref. :
            </Text>
          </Col>
          <Col span={8}>
            {/* Issue Ref */}
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Issue No. ex.ISS2009000x"}
              name="issue_id"
              field_id="issue_id"
              field_name="issue_no_description"
              value={data_head.issue_no_description}
              data={issue_list}
              onChange={(data, option) => {
                if (data) {
                  upDateFormValue(
                    ...issue_list.filter(
                      (issue) => issue.issue_id === data,
                      data
                    )
                  );
                } else {
                  resetForm();
                }
              }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Due date :</Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">{data_head.disburse_due_date}</Text>
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
              name="disburse_description"
              onChange={(e) =>
                upDateFormValue({
                  disburse_description: e.target.value,
                })
              }
              value={data_head.disburse_description}
              placeholder="Description"
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>
          <Col span={8}>
            <Input
              name="disburse_agreement"
              value={data_head.disburse_agreement}
              onChange={(e) =>
                upDateFormValue({
                  disburse_agreement: e.target.value,
                })
              }
              value={data_head.disburse_agreement}
              placeholder="Agreement"
            />
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <Detail
                  readOnly={false}
                  issue_id={data_head.issue_id}
                  data_detail={data_detail}
                  headDispatch={headDispatch}
                  detailDispatch={detailDispatch}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <TextArea
                  rows={2}
                  name="disburse_remark"
                  placeholder={"Remark"}
                  defaultValue={data_head.disburse_remark}
                  value={data_head.disburse_remark}
                  onChange={(e) =>
                    upDateFormValue({ disburse_remark: e.target.value })
                  }
                  style={{ width: "100%" }}
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

export default DisburseCreate;
