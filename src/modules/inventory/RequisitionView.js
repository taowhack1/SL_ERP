import React, { useState, useEffect } from "react";
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
  Typography,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import ItemLine from "../../components/ItemLine";
import {
  autoCompleteUser,
  autoCompleteItem,
  locationData,
  autoCompleteUnit,
  reqItemLine,
} from "../../data/inventoryData";
import Comments from "../../components/Comments";
import { dataComments, itemLots } from "../../data";
import { reqItemColumns } from "../../data/requisitionData";
import $ from "jquery";
import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const RequisitionView = (props) => {
  const data = props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);
  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          req_code: "",
          req_contact: "",
          req_date: "",
          req_to: null,
          req_desc: "",
          req_item_type: 0,
          req_note: "",
          req_item_line: [{}],
        }
  );

  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const updateItemLine = (data) => {
    setData({ ...formData, ...data });
  };
  const submitForm = (values) => {
    console.log("submit");
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
    projectId: 1,
    title: "INVENTORY",
    show: true,
    breadcrumb: ["Home", "Requisition", "View", formData.req_code],
    search: false,
    buttonAction: ["Edit", "Approve", "Reject", "Discard"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: 2,
      step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    edit: {
      data: formData,
      path: formData && "/inventory/requisition/edit/" + formData.id,
    },
    discard: "/inventory/requisition",
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      e.preventDefault();
      console.log("Edit");
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
  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Form {...formConfig} initialValues={{ ...formData }}>
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
              <Form.Item label="Contact" name="req_contact" rules={[]}>
                <Text>{formData.req_contact}</Text>
              </Form.Item>
              <Form.Item label="Description" name="req_desc" rules={[]}>
                <Text>{formData.req_desc}</Text>
              </Form.Item>
              <Form.Item label="Item type" name="item_type" rules={[]}>
                <Text>{getItemType(formData.req_item_type)}</Text>
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item label="Schedule Date" name="req_date" rules={[]}>
                <Text>{formData.req_date}</Text>
              </Form.Item>
              <Form.Item label="Destination Location" name="req_to" rules={[]}>
                <Text>{formData.req_to}</Text>
              </Form.Item>
            </Col>
          </Row>
          <Row className="col-2 space-top-md">
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <Tabs.TabPane tab="Request Detail" key="1">
                  <ItemLine
                    items={autoCompleteItem}
                    units={autoCompleteUnit}
                    itemLots={itemLots}
                    columns={reqItemColumns}
                    updateData={updateItemLine}
                    dataLine={
                      formData.req_item_line ? formData.req_item_line : []
                    }
                    readOnly={true}
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
        </Form>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default RequisitionView;
