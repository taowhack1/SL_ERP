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
  Space,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import ItemLine from "./pr_ItemLine";
import {
  autoCompleteUser,
  autoCompleteItem,
  locationData,
  autoCompleteUnit,
  reqItemLine,
} from "../../data/inventoryData";
import { costcenter } from "../../data/costcenterData";
import Comments from "../../components/Comments";
import { dataComments, itemLots } from "../../data";
import { prItemColumns } from "../../data/purchase/pr_ItemLineData";
import { vendors } from "../../data/purchase/data";
import $ from "jquery";
import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const PRView = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  console.log(data);
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          pr_code: "REQ2009-00001",
          pr_date: moment().format("DD/MM/YYYY"),
          pr_empId: "2563002 ตุลาการ สังอ่อนดี",
          pr_dueDate: "30/09/2020",
          pr_desc: "ขอซื้อเพื่อใช้ในการผลิต",
          pr_costCenter: "250000 MIS",
          vendorId: null,
          vendorName: "บริษัท ศิริ แลบอราทอรีส์ จำกัด",
          dataLine: [
            {
              id: 0,
              item_name: `line_0`,
              item_qty: 20.0001,
              item_unit: "unit",
              item_dueDate: "2020/09/30",
            },
            {
              id: 1,
              item_name: `line_1`,
              item_qty: 120.0001,
              item_unit: "pc",
              item_dueDate: "2020/09/30",
            },
            {
              id: 2,
              item_name: `line_2`,
              item_qty: 55.0001,
              item_unit: "liter",
              item_dueDate: "2020/09/30",
            },
          ],
        }
  );
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const updateItemLine = (data) => {
    setData({ ...formData, ...data });
  };
  const submitForm = (values) => {};

  const config = {
    projectId: 2,
    title: "PURCHASE",
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Requisition",
      "View",
      formData.req_code && formData.req_code ? formData.req_code : "Test",
    ],
    search: false,
    buttonAction: ["Edit", "Confirm", "Approve", "Reject", "Discard"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.req_step,
      step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/purchase/pr/view/" + formData.id,
    },
    edit: {
      data: formData,
      path: formData && "/purchase/pr/edit/" + formData.id,
    },
    discard: "/purchase/pr",
    onSave: (e) => {
      e.preventDefault();
      console.log("Save");
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
  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Row className="col-2">
          <Col span={20}>
            <h2>
              <strong>Purchase Requisition</strong>
            </h2>
          </Col>
          <Col span={4}>
            <Text strong>PR Date : </Text>
            {formData.pr_date}
          </Col>
        </Row>
        <Row className="col-2" style={{ marginBottom: 20 }}>
          {formData.pr_code && (
            <h3>
              <b>Ref. Code : </b>
              {formData.pr_code}
            </h3>
          )}
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Cost Center :</Text>
          </Col>

          <Col span={8}>
            <Text>{formData.pr_costCenter}</Text>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>{/* <Text strong>Due Date :</Text> */}</Col>
          <Col span={8}>{/* <Text>{formData.pr_dueDate}</Text> */}</Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_name}</Text>
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
                  columns={prItemColumns}
                  updateData={updateItemLine}
                  dataLine={formData.dataLine ? formData.dataLine : []}
                  readOnly={true}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Reason & Description" key="2">
                <Text>{formData.pr_desc}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default PRView;
