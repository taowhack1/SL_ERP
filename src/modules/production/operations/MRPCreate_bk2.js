import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Typography,
  DatePicker,
  Radio,
  TimePicker,
  InputNumber,
  Button,
  Form,
} from "antd";
import MainLayout from "../../../components/MainLayout";
import moment from "moment";
import Comments from "../../../components/Comments";
import { reducer } from "../reducers";
import CustomSelect from "../../../components/CustomSelect";
import { get_log_by_id } from "../../../actions/comment&log";
import {
  work_center_detail_fields,
  work_center_fields,
} from "../config/master_data";
import Authorize from "../../system/Authorize";
import { useHistory } from "react-router-dom";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;
const { TextArea } = Input;
const { Item } = Form;

const initialStateHead = work_center_fields;
const initialStateDetail = [work_center_detail_fields];

const MRPCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const dataComments = useSelector((state) => state.log.comment_log);
  const [data_head, headDispatch] = useReducer(reducer, initialStateHead);
  const [data_detail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [form] = Form.useForm();
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
      "Operations",
      "Work Order",
      data_head.mrp_no ? "Edit" : "Create",
      data_head.mrp_no && data_head.mrp_no,
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
    discard: "/production/operations/mrp",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
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
    // GET LOG
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const redirect_to_view = (id) => {
    history.push("/production/work_center/view/" + (id ? id : "new"));
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const formLayout = {
    labelCol: {
      md: { span: 24 },
      lg: { span: 6 },
    },
    labelAlign: "left",
    wrapperCol: {
      md: { span: 24 },
      lg: { span: 18 },
    },
  };
  const formHeadLayout = {
    labelCol: {
      md: { span: 24 },
      lg: { span: 24 },
    },
    wrapperCol: {
      md: { span: 24 },
      lg: { span: 24 },
    },
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.mrp_id ? "Edit" : "Create"} Work Order{" "}
                {data_head.mrp_no && "#" + data_head.mrp_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.mrp_created}</Text>
          </Col>
        </Row>

        {/* Start Form */}
        <Form
          form={form}
          name="form-head"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          {...formLayout}
        >
          <Row>
            <Col span={24}>
              <Item
                // className="ml-1"
                name={"mrp_description"}
                label={"Description / Job name"}
                validateTrigger={["onChange", "onBlur"]}
                style={{ fontWeight: "bold" }}
                rules={[
                  {
                    type: "string",
                    message: "The input is not valid text",
                  },
                  {
                    required: true,
                    message: "Please input description or job name.",
                  },
                ]}
                {...formHeadLayout}
              >
                <Input placeholder="Description / Job name." />
              </Item>
            </Col>
          </Row>
          <Row className="col-2" gutter={[16, 8]}>
            <Col span={11}>
              <Item
                className="ml-1"
                name={"so_id"}
                label="Sales Order"
                validateTrigger={["onBlur"]}
                rules={[
                  {
                    type: "string",
                    message: "The input is not valid text",
                  },
                  {
                    required: true,
                    message: "Please select 'Sales Order'.",
                  },
                ]}
              >
                <Input />
              </Item>
              <Item
                className="ml-1"
                name={"so_id"}
                label="Sales Order"
                validateTrigger={["onBlur"]}
                rules={[
                  {
                    type: "string",
                    message: "The input is not valid text",
                  },
                  {
                    required: true,
                    message: "Please select 'Sales Order'.",
                  },
                ]}
              >
                <CustomSelect placeholder={"Sales Order Document"} />
              </Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Item
                className="ml-1"
                name={["email", "1"]}
                label="Source"
                validateTrigger={["onBlur"]}
                rules={[
                  {
                    type: "string",
                    message: "The input is not valid text",
                  },
                  {
                    required: false,
                  },
                ]}
              >
                <CustomSelect placeholder={"Source Document"} />
              </Item>
            </Col>
          </Row>
          <Item>
            <Button htmlType="submit">FINISH</Button>
          </Item>
        </Form>
        {/* End Form */}
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default MRPCreate;
