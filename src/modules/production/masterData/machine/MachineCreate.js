import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Typography,
  message,
  DatePicker,
  Radio,
  Checkbox,
  Space,
} from "antd";
import MainLayout from "../../../../components/MainLayout";
import moment from "moment";
// import Detail from "./Issue_Detail";
import Comments from "../../../../components/Comments";
import CustomSelect from "../../../../components/CustomSelect";
import { get_log_by_id, reset_comments } from "../../../../actions/comment&log";

import { machine_fields, machine_require_fields } from "./config";

import Authorize from "../../../system/Authorize";
import { validateFormHead } from "../../../../include/js/function_main";
import { useHistory } from "react-router-dom";
import { getProductionMasterData } from "../../../../actions/production";
import {
  createMachine,
  updateMachine,
} from "../../../../actions/production/machineActions";
import { mainReducer } from "../../../../include/reducer";
import MachineTabDetail from "./MachineTabDetail";
import MachineTabCost from "./MachineTabCost";
const { Text } = Typography;
const { TextArea } = Input;

const initialStateHead = machine_fields;
// const initialStateDetail = [issue_detail_fields];

const MachineCreate = (props) => {
  const readOnly = false;
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const auth = useSelector((state) => state.auth.authData);

  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const [data_head, headDispatch] = useReducer(mainReducer, initialStateHead);

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
      "Machine",
      data_head.machine_cost_center ? "Edit" : "Create",
      data_head.machine_cost_center && data_head.machine_cost_center,
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
    discard: "/production/machine",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      console.log(data_head);
      const key = "validate";
      const validate = validateFormHead(data_head, machine_require_fields);
      if (validate.validate) {
        console.log("pass");
        data_head.machine_id
          ? dispatch(
              updateMachine(data_head.machine_id, [data_head], redirect_to_view)
            )
          : dispatch(createMachine([data_head], redirect_to_view));
      } else {
        console.log(data_head);
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
            machine_created_by: auth.employee_no_name_eng,

            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            machine_created: moment().format("DD/MM/YYYY"),
          },
    });
    return () => {
      dispatch(reset_comments());
      // dispatch(resetProductionData());
    };
  }, []);

  useEffect(() => {
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  useEffect(() => {
    dispatch(getProductionMasterData());
  }, []);

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const redirect_to_view = (id) => {
    history.push("/production/machine/view/" + (id ? id : "new"));
  };

  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.machine_id ? "Edit" : "Create"} Machine{" "}
                {data_head.machine_cost_center &&
                  "#" + data_head.machine_cost_center}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.machine_created}</Text>
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <h3>
              <strong>
                <span className="require">* </span>Machine Name
              </strong>
            </h3>
            <Col span={24}>
              <Input
                name="machine_description"
                placeholder={"Machine Name"}
                onChange={(e) =>
                  upDateFormValue({ machine_description: e.target.value })
                }
                value={data_head.machine_description}
              />
            </Col>
          </Col>
        </Row>
        <Row className="col-2 mb-1 pd-left-1">
          <Col span={1}>
            <Checkbox
              checked={data_head.machine_process_time ? true : false}
              onChange={(e) =>
                upDateFormValue({
                  machine_process_time: e.target.checked ? 1 : 0,
                })
              }
            />
          </Col>
          <Col span={23}> This process have time start - stop</Col>
        </Row>
        <Row className="col-2 mb-1 pd-left-1">
          <Col span={1}>
            <Checkbox
              checked={data_head.machine_process_scan ? true : false}
              onChange={(e) =>
                upDateFormValue({
                  machine_process_scan: e.target.checked ? 1 : 0,
                })
              }
            />
          </Col>
          <Col span={23}> This process have RM Scan</Col>
        </Row>
        <Row className="col-2 mb-1 pd-left-1">
          <Col span={1}>
            <Checkbox
              checked={data_head.machine_process_qty ? true : false}
              onChange={(e) =>
                upDateFormValue({
                  machine_process_qty: e.target.checked ? 1 : 0,
                })
              }
            />
          </Col>
          <Col span={23}>
            This process have input quantity after stop process
          </Col>
        </Row>

        <Row className="col-2">
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
                <MachineTabDetail
                  upDateFormValue={upDateFormValue}
                  readOnly={readOnly}
                  data_head={data_head}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span className="tab_pane">
                    <span className="require">* </span>
                    {"Cost"}
                  </span>
                }
                key={"2"}
              >
                <MachineTabCost
                  upDateFormValue={upDateFormValue}
                  readOnly={readOnly}
                  data_head={data_head}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span className="tab_pane">
                    {/* <span className="require">* </span> */}
                    {"Notes"}
                  </span>
                }
                key={"3"}
              >
                <TextArea
                  name="machine_remark"
                  placeholder="Remark"
                  onChange={(e) =>
                    upDateFormValue({ machine_remark: e.target.value })
                  }
                  value={data_head.machine_remark}
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

export default MachineCreate;
