import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
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
  Button,
  Typography,
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
  reqItemLine,
} from "../../data/inventoryData";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const CreateInventory = () => {
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState({
    req_code: "REQ2008-0001",
    req_contact: "",
    req_date: "",
    req_desc: "",
    req_item_type: 0,
    req_note: "",
    req_item_line: [...reqItemLine],
  });

  const callback = (key) => {};
  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const updateItemLine = (data) => {
    setData({ ...formData, ...data });
    // return formData.req_item_line;
  };
  const submitForm = (values) => {
    // console.log(values);
    console.log(formData);
  };

  const getItemType = (typeId) => {
    switch (typeId) {
      case 0:
        return "Raw Material";
      case 1:
        return "Packaging";
      case 2:
        return "Bluk";
      case 3:
        return "Finish Good";
      default:
        return "Others";
    }
  };

  const config = {
    title: "INVENTORY",
    show: true,
    breadcrumb: ["Home", "New"],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject"],
    create: "",
    discard: "/inventory/requisition",
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
      setEdit(false);
    },
    onEdit: (e) => {
      e.preventDefault();
      console.log("Edit");
      setEdit(true);
    },
    onApprove: (e) => {
      e.preventDefault();
      console.log("Approve");
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
    name: "req_form",
    size: "small",
    onFinish: (values) => {
      submitForm(values);
    },
  };

  console.log(editForm);
  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Form {...formConfig} initialValues={{ ...formData }}>
          {editForm ? (
            <>
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
                    name="req_contact"
                    rules={
                      [
                        // { required: true, message: "Please input your Test 1!" },
                      ]
                    }
                  >
                    <AutoComplete
                      name={"req_contact"}
                      options={autoCompleteUser}
                      placceholder={"contact person"}
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      onSelect={(data) =>
                        upDateFormValue({ req_contact: data })
                      }
                      onChange={(data) =>
                        upDateFormValue({ req_contact: data })
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="req_desc"
                    rules={
                      [
                        // { required: true, message: "Please input your Test 2!" },
                      ]
                    }
                  >
                    <Input
                      name={"req_desc"}
                      onChange={(e) =>
                        upDateFormValue({ req_desc: e.target.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Item type"
                    name="item_type"
                    rules={
                      [
                        // { required: true, message: "Please input your Test 2!" },
                      ]
                    }
                  >
                    <Radio.Group
                      // defaultValue={1}
                      name={"req_item_type"}
                      onChange={(e) =>
                        upDateFormValue({ req_item_type: e.target.value })
                      }
                    >
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
                    name="req_date"
                    rules={
                      [
                        // { required: true, message: "Please input your Test 3!" },
                      ]
                    }
                  >
                    <DatePicker
                      name={"req_date"}
                      format={dateConfig.format}
                      style={{ width: "100%" }}
                      onChange={(data) => {
                        upDateFormValue({
                          req_date: data.format("YYYY-MM-DD HH:mm:ss"),
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Destination Location"
                    name="req_to"
                    rules={
                      [
                        // {
                        //   required: true,
                        //   message: "Please input your destination location !",
                        // },
                      ]
                    }
                  >
                    <Select
                      placeholder={"Select Location"}
                      onSelect={(data) =>
                        upDateFormValue({
                          req_to: data,
                        })
                      }
                    >
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
                      <ItemLine
                        updateItemLine={updateItemLine}
                        items={autoCompleteItem}
                        units={autoCompleteUnit}
                        req_item_line={formData.req_item_line}
                        editForm={editForm}
                        // formData={formData}
                      />
                    </Tabs.TabPane>
                    {/* <Tabs.TabPane tab="Additional Info" key="2"></Tabs.TabPane> */}
                    <Tabs.TabPane tab="Note" key="3">
                      <Form.Item lebel="Note" name="req_note" className="">
                        <TextArea
                          rows={3}
                          placeholder={"Remark your request"}
                          onChange={(e) =>
                            upDateFormValue({ req_note: e.target.value })
                          }
                        />
                      </Form.Item>
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
            </>
          ) : (
            // ------------------ View ----------------------
            <>
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
                    name="req_contact"
                    rules={
                      [
                        // { required: true, message: "Please input your Test 1!" },
                      ]
                    }
                  >
                    <Title level={5}>{formData.req_contact}</Title>
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="req_desc"
                    rules={
                      [
                        // { required: true, message: "Please input your Test 2!" },
                      ]
                    }
                  >
                    <Title level={5}>{formData.req_desc}</Title>
                  </Form.Item>
                  <Form.Item
                    label="Item type"
                    name="item_type"
                    rules={
                      [
                        // { required: true, message: "Please input your Test 2!" },
                      ]
                    }
                  >
                    <Text>{getItemType(formData.req_item_type)}</Text>
                  </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={11}>
                  <Form.Item
                    label="Schedule Date"
                    name="req_date"
                    rules={
                      [
                        // { required: true, message: "Please input your Test 3!" },
                      ]
                    }
                  >
                    <Title level={5}>{formData.req_date}</Title>
                  </Form.Item>
                  <Form.Item
                    label="Destination Location"
                    name="req_to"
                    rules={
                      [
                        // {
                        //   required: true,
                        //   message: "Please input your destination location !",
                        // },
                      ]
                    }
                  >
                    <Title level={5}>{formData.req_to}</Title>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="col-2 space-top-md">
                <Col span={24}>
                  <Tabs defaultActiveKey="1" onChange={callback}>
                    <Tabs.TabPane tab="Request Detail" key="1">
                      <ItemLine
                        updateItemLine={updateItemLine}
                        items={autoCompleteItem}
                        units={autoCompleteUnit}
                        req_item_line={formData.req_item_line}
                        editForm={editForm}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Note" key="3">
                      <Form.Item lebel="Note" name="req_note" className="">
                        <Paragraph
                          ellipsis={{
                            rows: 2,
                            expandable: true,
                            symbol: "more",
                          }}
                        >
                          {formData.req_note}
                        </Paragraph>
                      </Form.Item>
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </div>
    </MainLayout>
  );
};

export default CreateInventory;
