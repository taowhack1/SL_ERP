import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Form,
  Input,
  Tabs,
  DatePicker,
  Radio,
  Select,
  AutoComplete,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
// import "./createInventory.css";
import ItemLine from "../../components/ItemLine";
import {
  autoCompleteUser,
  autoCompleteItem,
  locationData,
  autoCompleteUnit,
} from "../../data/inventoryData";

const { Option } = Select;
const { TextArea } = Input;
const CreateInventory = (props) => {
  //   componentDidMount() {
  //     console.log(this.props.emp.salary);
  //   }

  const [formData, setData] = useState({
    req_code: "REQ2008-0001",
  });
  const callback = (key) => {
    console.log("Tab: " + key);
  };
  const SubmitForm = () => {
    console.log("Submit");
  };
  const checkSelector = () => {
    console.log("blue");
  };

  const config = {
    title: "INVENTORY",
    show: true,
    breadcrumb: ["Home", "New"],
    search: false,
    buttonAction: ["Save", "SaveConfirm", "Discard"],
    create: "",
    discard: "/inventory",
    onSave: () => {
      console.log("Save");
      this.SubmitForm();
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const dateConfig = {
    format: "DD/MM/YYYY HH:mm:ss",
    value: moment(),
    disabled: 1,
  };

  const formConfig = {
    name: "basic",
    size: "small",
    onFinish: {},
  };

  return (
    <MainLayout {...config}>
      <div id="form">
        <Form {...formConfig} initialValues={{ remember: true }}>
          <Row className="col-2">
            <h2>
              <strong>Requisition Form</strong>
            </h2>
          </Row>
          <Row className="col-2" style={{ marginBottom: 20 }}>
            <h3>
              <b>Ref. Code : </b>
              {formData.req_code}
            </h3>
          </Row>
          <Row className="col-2">
            <Col span={11}>
              <Form.Item
                label="Contact"
                name="tf_contact"
                rules={[
                  { required: true, message: "Please input your Test 1!" },
                ]}
              >
                <AutoComplete
                  options={autoCompleteUser}
                  placceholder={"contact person"}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onBlur={checkSelector}
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="tf_desc"
                rules={[
                  { required: true, message: "Please input your Test 2!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Item type"
                name="item_type"
                rules={[
                  { required: true, message: "Please input your Test 2!" },
                ]}
              >
                <Radio.Group defaultValue={1}>
                  <Radio value={1}>RM</Radio>
                  <Radio value={2}>PK</Radio>
                  <Radio value={3}>BULK</Radio>
                  <Radio value={4}>FG</Radio>
                  <Radio value={5}>Others</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item
                label="Schedule Date"
                name="tf_sch_date"
                rules={[
                  { required: true, message: "Please input your Test 3!" },
                ]}
              >
                <DatePicker
                  format={dateConfig.format}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Destination Location"
                name="tf_to"
                rules={[
                  {
                    required: true,
                    message: "Please input your destination location !",
                  },
                ]}
              >
                <Select placeholder={"Select Location"}>
                  <Option value="null"> </Option>
                  {locationData.map((location) => {
                    return (
                      <Option key={location.id} value={location.id}>
                        {location.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="col-2 space-top-md">
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <Tabs.TabPane tab="Request Detail" key="1">
                  <ItemLine items={autoCompleteItem} units={autoCompleteUnit} />
                </Tabs.TabPane>
                {/* <Tabs.TabPane tab="Additional Info" key="2"></Tabs.TabPane> */}
                <Tabs.TabPane tab="Note" key="3">
                  <Form.Item lebel="Note" name="tf_remark" className="">
                    <TextArea rows={3} placeholder={"Remark your request"} />
                  </Form.Item>
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Form>
      </div>
    </MainLayout>
  );
};

export default CreateInventory;
