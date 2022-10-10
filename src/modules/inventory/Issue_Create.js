import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message, Collapse } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import Detail from "./Issue_Detail";
import Comments from "../../components/Comments";
import { issue_detail_fields, issue_fields } from "./config";
import CustomSelect from "../../components/CustomSelect";
import { get_log_by_id, reset_comments } from "../../actions/comment&log";
import {
  create_issue,
  update_issue,
} from "../../actions/inventory/issueActions";
import Authorize from "../system/Authorize";
import {
  validateFormDetail,
  validateFormHead,
} from "../../include/js/function_main";
import {
  issue_detail_require_fields,
  issue_require_fields,
} from "./config/issue";
import { useHistory } from "react-router-dom";
import CustomLabel from "../../components/CustomLabel";
import { mainReducer } from "../../include/reducer";
import { SearchOutlined } from "@ant-design/icons";
import { getMasterDataItem } from "../../actions/inventory";
import { getMRPRefForIssue } from "../../actions/production/mrpActions";
import { useState } from "react";
const { Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
const initialStateHead = issue_fields;
const initialStateDetail = [issue_detail_fields];

const IssueCreate = (props) => {
  const readOnly = false;
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const data = props.location.state ? props.location.state : 0;
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const cost_centers = useSelector((state) => state.hrm.cost_center);
  const dataComments = useSelector((state) => state.log.comment_log);
  const { item_type } = useSelector((state) => state.inventory.master_data);
  const [data_head, headDispatch] = useReducer(mainReducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(
    mainReducer,
    initialStateDetail
  );
  const [mrpRefList, setMRPRefList] = useState({
    loading: false,
    data: []
  })

  const flow =
    data_head &&
    data_head?.data_flow_process &&
    data_head?.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });

  const callback = (key) => { };

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Issue",
      data_head?.issue_no ? "Edit" : "Create",
      data_head?.issue_no && data_head?.issue_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],

    step: {
      current: data_head && data_head?.node_stay - 1,
      step: flow,
      process_complete: data_head?.process_complete,
    },
    create: "",
    save: "function",
    discard: "/inventory/issue",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      const key = "validate";
      const validate = validateFormHead(data_head, issue_require_fields);
      const validate_detail = validateFormDetail(
        data_detail,
        issue_detail_require_fields
      );
      if (validate.validate && validate_detail.validate) {
        console.log("pass");
        data_head?.issue_id
          ? dispatch(
            update_issue(
              data_head?.issue_id,
              auth.user_name,
              data_head,
              data_detail,
              redirect_to_view
            )
          )
          : dispatch(
            create_issue(
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
    dispatch(getMasterDataItem());
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
          branch_id: auth.branch_id,
          branch_name: auth.branch_name,
          issue_created: moment().format("DD/MM/YYYY"),
        },
    });

    detailDispatch({
      type: "SET_DETAIL",
      payload: data.data_detail ? data.data_detail : [issue_detail_fields],
    });

    const getMRPRefList = async () => {
      const resp = await getMRPRefForIssue()
      console.log("resp", resp)
      setMRPRefList(prev => ({ loading: false, data: resp.data }))
    }
    getMRPRefList()
  }, []);

  useEffect(() => {
    // GET LOG
    data_head?.process_id && dispatch(get_log_by_id(data_head?.process_id));
    return () => {
      dispatch(reset_comments());
    };
  }, [data_head]);

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
    if ((data.type_id && data_head?.type_id) || data.type_id === null) {
      data.type_id !== data_head?.type_id &&
        detailDispatch({ type: "RESET_DETAIL", payload: initialStateDetail });
    }
  };
  const filter = {
    type_id: data_head && data_head?.type_id,
    type_no_name: data_head && data_head?.type_no_name,
    category_id: data_head && data_head?.category_id,
    category_no_name: data_head && data_head?.category_no_name,
  };
  const redirect_to_view = (id) => {
    history.push("/inventory/issue/view/" + (id ? id : "new"));
  };

  console.log("head filter", filter);

  console.log("CHECK", data_detail);
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head?.issue_id ? "Edit" : "Create"} Issue{" "}
                {data_head?.issue_no && "#" + data_head?.issue_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head?.issue_created}</Text>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="col-border-right">
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <Text strong>
                  <span className="require">* </span>Description :
                </Text>
              </Col>
              <Col span={16}>
                <Input
                  name="issue_description"
                  value={data_head?.issue_description}
                  placeholder="Description"
                  onChange={(e) =>
                    upDateFormValue({ issue_description: e.target.value })
                  }
                />
              </Col>
              <Col span={2}></Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <Text strong>
                  <span className="require">* </span>Cost Center :
                </Text>
              </Col>
              <Col span={16}>
                <CustomSelect
                  allowClear
                  showSearch
                  placeholder={"Cost Center"}
                  name="cost_center_id"
                  field_id="cost_center_id"
                  field_name="cost_center_no_name"
                  value={data_head?.cost_center_no_name}
                  data={cost_centers}
                  onChange={(data, option) => {
                    data !== undefined
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
              <Col span={6}>
                <Text strong>
                  <span className="require">* </span>Item Type :
                </Text>
              </Col>
              <Col span={16}>
                <CustomSelect
                  allowClear
                  showSearch
                  placeholder={"Item Type"}
                  name="type_id"
                  field_id="type_id"
                  field_name="type_no_name"
                  value={data_head?.type_no_name}
                  data={item_type}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                        type_id: data,
                        type_no_name: option.title,
                      })
                      : upDateFormValue({
                        type_id: null,
                        type_no_name: null,
                      });
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={2}></Col>
              <Col span={6}>
                <Text strong>
                  <span className="require">* </span>Request By :
                </Text>
              </Col>

              <Col span={16}>
                <Text>{data_head?.issue_created_by_no_name}</Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={2}></Col>
              <Col span={6}>
                <CustomLabel readOnly={readOnly} label={"Job Ref. :"} />
              </Col>
              <Col span={16}>
                {/* <Text>{data_head?.mrp_no ?? "-"}</Text>
                {data_head?.mrp_no && (
                  <SearchOutlined
                    className="button-icon"
                    onClick={console.log("View Job Detail")}
                  />
                )} */}
                <CustomSelect
                  allowClear
                  showSearch
                  disabled={mrpRefList?.data?.length > 1 ? false : true}
                  placeholder={"MRP No."}
                  name="mrp_id"
                  field_id="mrp_id"
                  field_name="mrp_no_description"
                  value={data_head?.mrp_id}
                  data={mrpRefList?.data || []}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                        mrp_id: data,
                        mrp_no_description: option.title,
                      })
                      : upDateFormValue({
                        mrp_id: null,
                        mrp_no_description: null,
                      });
                  }} />
              </Col>
            </Row>
            {/* <Row className="col-2 row-margin-vertical">
              <Col span={2}></Col>
              <Col span={6}>
                <CustomLabel readOnly={readOnly} label={"อ้างอิง MRP :"} />
              </Col>
              <Col span={16}>

              </Col>
            </Row> */}
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="require">* </span>
                    Request Detail
                  </span>
                }
                key="1"
              >
                <Detail
                  detailDispatch={detailDispatch}
                  data_detail={data_detail}
                  readOnly={readOnly}
                  category_id={data_head?.category_id}
                  type_id={data_head?.type_id}
                  data_head={data_head}
                  updateHead={upDateFormValue}
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
