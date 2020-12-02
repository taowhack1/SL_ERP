import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Select,
  Typography,
  message,
  Space,
  DatePicker,
  Radio,
  TimePicker,
  InputNumber,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
// import Detail from "./Issue_Detail";
import Comments from "../../components/Comments";
import { reducer } from "./reducers";
import CustomSelect from "../../components/CustomSelect";
import { get_log_by_id, reset_comments } from "../../actions/comment&log";
import {
  create_issue,
  update_issue,
} from "../../actions/inventory/issueActions";
import {
  machine_fields,
  machine_require_fields,
  work_center_detail_fields,
  work_center_detail_require_fields,
  work_center_fields,
  work_center_require_fields,
} from "./config/master_data";
import { report_server } from "../../include/js/main_config";
import Authorize from "../system/Authorize";
import {
  validateFormDetail,
  validateFormHead,
} from "../../include/js/function_main";
import { useHistory } from "react-router-dom";
import WorkCenterDetail from "./WorkCenterDetail";
import {
  getProductionMasterData,
  resetProductionData,
} from "../../actions/production";
import { getMasterDataItem } from "../../actions/inventory";
import { getAllMachine } from "../../actions/production/machineActions";
import {
  createWorkCenter,
  updateWorkCenter,
} from "../../actions/production/workCenterActions";
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const initialStateHead = work_center_fields;
const initialStateDetail = [work_center_detail_fields];

const WorkCenterCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const { workCenterType } = useSelector(
    (state) => state.production.masterData.workCenter
  );
  const item_type = useSelector((state) =>
    state.inventory.master_data.item_type.filter(
      (type) => type.type_id === 3 || type.type_id === 4
    )
  );
  const dataComments = useSelector((state) => state.log.comment_log);
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
      "Work Center",
      data_head.work_center_no ? "Edit" : "Create",
      data_head.work_center_no && data_head.work_center_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    step: {
      current: data_head && data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    create: "",
    save: "function",
    discard: "/production/work_center",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      const key = "validate";
      const validate = validateFormHead(data_head, work_center_require_fields);
      const validate_detail = validateFormDetail(
        data_detail,
        work_center_detail_require_fields
      );
      if (validate.validate && validate_detail.validate) {
        console.log("pass");
        const data = {
          data_head: data_head,
          data_detail: data_detail,
        };
        console.log(data);
        data_head.work_center_id
          ? dispatch(
              updateWorkCenter(data_head.work_center_id, data, redirect_to_view)
            )
          : dispatch(createWorkCenter(data, redirect_to_view));
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
    dispatch(getProductionMasterData());
    dispatch(getMasterDataItem());
    dispatch(getAllMachine());
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
            ...initialStateHead,
            commit: 1,
            user_name: auth.user_name,
            work_center_create_by: auth.employee_no_name_eng,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            work_center_created: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.data_detail.length ? data.data_detail : initialStateDetail,
    });
    return () => {
      dispatch(reset_comments());
    };
  }, []);

  useEffect(() => {
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const redirect_to_view = (id) => {
    history.push("/production/work_center/view/" + (id ? id : "new"));
  };

  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.work_center_id ? "Edit" : "Create"} Work Center{" "}
                {data_head.work_center_no && "#" + data_head.work_center_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.work_center_created}</Text>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <h3>
              <strong>
                <span className="require">* </span>Work Center Description
              </strong>
            </h3>
            <Col span={24}>
              <Input
                name="work_center_description"
                required
                placeholder={"Description"}
                onChange={(e) =>
                  upDateFormValue({ work_center_description: e.target.value })
                }
                value={data_head.work_center_description}
              />
            </Col>
            <Row className="col-2 mt-2">
              {/* <Col span={1}></Col> */}

              <Col span={3}>
                <Text strong>
                  <span className="require">* </span>Capacity Type :
                </Text>
              </Col>
              <Col span={21} className=" pd-left-1 col-right-1">
                <Row className="col-2 row-radio">
                  <Col span={24}>
                    <Radio.Group
                      onChange={(e) =>
                        upDateFormValue({
                          capacity_category_id: e.target.value,
                        })
                      }
                      value={data_head.capacity_category_id}
                    >
                      <Radio className="radio-vertical" value={1}>
                        Machine
                      </Radio>
                      <Radio className="radio-vertical" value={2}>
                        Person
                      </Radio>
                    </Radio.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <Tabs
              defaultActiveKey={"1"}
              onChange={callback}
              className="row-tab-margin-lg"
            >
              <Tabs.TabPane
                tab={
                  <span className="tab_pane">
                    <span className="require">* </span>
                    {"Detail"}
                  </span>
                }
                key={"1"}
              >
                <Row className="col-2 row-margin-vertical">
                  <Col span={12} className="col-border-right">
                    <Row className="col-2 row-margin-vertical">
                      <Col span={6} className="col-left-1">
                        <Text strong>
                          <span className="require">* </span>Use For :
                        </Text>
                      </Col>

                      <Col span={17}>
                        <CustomSelect
                          allowClear
                          showSearch
                          placeholder={"Use For : Item Type"}
                          name="type_id"
                          field_id="type_id"
                          field_name="type_name"
                          value={data_head.type_name}
                          data={item_type}
                          onChange={(data, option) => {
                            data && data
                              ? upDateFormValue({
                                  type_id: data,
                                  type_name: option.title,
                                })
                              : upDateFormValue({
                                  type_id: null,
                                  type_name: null,
                                });
                          }}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={6} className="col-left-1">
                        <Text strong>
                          <span className="require">* </span>Worker :
                        </Text>
                      </Col>

                      <Col span={17}>
                        <InputNumber
                          name="work_center_worker"
                          placeholder="Amount of Worker"
                          value={data_head.work_center_worker}
                          min={0}
                          step={1}
                          defaultValue={0}
                          precision={0}
                          onChange={(data) => {
                            upDateFormValue({
                              work_center_worker: data,
                            });
                          }}
                          style={{ width: "100%" }}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={1}></Col>

                      <Col span={8}>
                        <Text strong>
                          <span className="require">* </span>Work Center Type :
                        </Text>
                      </Col>
                      <Col span={15}>
                        <CustomSelect
                          allowClear
                          showSearch
                          placeholder={"Select Category"}
                          name="work_center_type_id"
                          field_id="work_center_type_id"
                          field_name="work_center_type_no_name"
                          value={data_head.work_center_type_no_name}
                          data={workCenterType}
                          onChange={(data, option) => {
                            data && data
                              ? upDateFormValue({
                                  work_center_type_id: data,
                                  work_center_type_no_name: option.title,
                                  work_center_category_id: data,
                                })
                              : upDateFormValue({
                                  work_center_type_id: null,
                                  work_center_type_no_name: null,
                                  work_center_category_id: null,
                                });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={1}></Col>

                      <Col span={8}>
                        <Text strong>
                          <span className="require">* </span>Time Used :
                        </Text>
                      </Col>
                      <Col span={15}>
                        <TimePicker
                          format={"HH:mm"}
                          showNow={false}
                          name={"work_center_time"}
                          style={{ width: "100%" }}
                          placeholder="Hour : Minute"
                          required
                          value={
                            data_head.work_center_time
                              ? moment(data_head.work_center_time, "HH:mm:ss")
                              : ""
                          }
                          onChange={(data) => {
                            const time = moment(data, "HH:mm").format(
                              "HH:mm:ss"
                            );
                            console.log(time);
                            upDateFormValue({
                              work_center_time: data ? time : null,
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <WorkCenterDetail
                  data_detail={data_detail}
                  detailDispatch={detailDispatch}
                  readOnly={false}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={<span className="tab_pane">{"Notes"}</span>}
                key={"2"}
              >
                <TextArea
                  name="work_center_remark"
                  placeholder="Remark"
                  onChange={(e) =>
                    upDateFormValue({ work_center_remark: e.target.value })
                  }
                  value={data_head.work_center_remark}
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

export default WorkCenterCreate;
