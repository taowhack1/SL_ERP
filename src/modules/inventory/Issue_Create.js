import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Select, Typography } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import Detail from "./Issue_Detail";
import Comments from "../../components/Comments";
import { reducer } from "./reducers";
import { issue_detail_fields, issue_fields } from "./config";
import CustomSelect from "../../components/CustomSelect";
import { get_log_by_id, reset_comments } from "../../actions/comment&log";
import {
  create_issue,
  update_issue,
} from "../../actions/inventory/issueActions";
import { report_server } from "../../include/js/main_config";
import Authorize from "../system/Authorize";
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const initialStateHead = issue_fields;
const initialStateDetail = [issue_detail_fields];

const IssueCreate = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  console.log("Render : IssueCreate");
  const dispatch = useDispatch();
  const data = props.location.state ? props.location.state : 0;
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const cost_centers = useSelector((state) => state.hrm.cost_center);
  const dataComments = useSelector((state) => state.log.comment_log);
  const master_data = useSelector((state) => state.inventory.master_data);
  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);

  const flow =
    data_head &&
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const callback = (key) => {};

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Issue",
      data_head.issue_no ? "Edit" : "Create",
      data_head.issue_no && data_head.issue_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    action: [
      {
        name: "Print",
        link: `${report_server}/Report_purch/report_pr.aspx?pr_no=${
          data_head && data_head.issue_id
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
    save: {
      data: data_head,
      path:
        data_head &&
        "/inventory/issue/view/" +
          (data_head.issue_id ? data_head.issue_id : "new"),
    },
    discard: "/inventory/issue",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      data_head.issue_id
        ? dispatch(update_issue(data_head.issue_id, data_head, data_detail))
        : dispatch(create_issue(data_head, data_detail));
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
            ...issue_fields,
            commit: 1,
            user_name: auth.user_name,
            issue_created_by_no_name: auth.employee_no_name_eng,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            issue_created: moment().format("DD/MM/YYYY"),
          },
    });

    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [issue_detail_fields],
    });
  }, []);

  useEffect(() => {
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
    return () => {
      dispatch(reset_comments());
    };
  }, [data_head]);

  const dateConfig = {
    format: "DD/MM/YYYY HH:mm:ss",
    value: moment(),
    disabled: 1,
  };

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const filter = {
    type_id: data_head && data_head.type_id,
    type_no_name: data_head && data_head.type_no_name,
    category_id: data_head && data_head.category_id,
    category_no_name: data_head && data_head.category_no_name,
  };
  console.log("head filter", filter);
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.issue_id ? "Edit" : "Create"} Issue{" "}
                {data_head.issue_no && "#" + data_head.issue_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.issue_created}</Text>
          </Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Request By :</Text>
          </Col>

          <Col span={8}>
            <Text>{data_head.issue_created_by_no_name}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Cost Center :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Cost Center"}
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
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>
          <Col span={8}>
            <Input
              value={data_head.issue_description}
              placeholder="Description"
              onChange={(e) =>
                upDateFormValue({ issue_description: e.target.value })
              }
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Agreement :</Text>
          </Col>
          <Col span={8}>
            <Input
              value={data_head.issue_agreement}
              placeholder="Agreement"
              onChange={(e) =>
                upDateFormValue({ issue_agreement: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical" />
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <Detail
                  detailDispatch={detailDispatch}
                  data_detail={data_detail}
                  readOnly={false}
                  category_id={data_head.category_id}
                  type_id={data_head.type_id}
                  headDispatch={upDateFormValue}
                  filter={filter && filter}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Note" key="3">
                <TextArea
                  rows={3}
                  placeholder={"Remark your request"}
                  onChange={(e) =>
                    upDateFormValue({ issue_remark: e.target.value })
                  }
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default IssueCreate;
