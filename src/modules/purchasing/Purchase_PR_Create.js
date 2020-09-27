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

const PurchaseRequisitionCreate = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          pr_code: null,
          pr_date: moment().format("DD/MM/YYYY"),
          pr_empId: "",
          pr_dueDate: "",
          pr_desc: null,
          pr_costCenter: null,
          vendorId: 0,
          vendorName: "",
          dataLine: [{}],
        }
  );
  console.log(formData);
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const updateItemLine = (data) => {
    setData({ ...formData, ...data });
  };
  const submitForm = (values) => {
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
    projectId: 2,
    title: "PURCHASE",
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Requisition",
      formData.pr_code ? "Edit" : "Create",
      formData.pr_code && formData.pr_code,
    ],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject"],
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
              <strong>
                {formData.pr_code ? "Edit" : "Create"} Purchase Requisition
              </strong>
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
            <AutoComplete
              name={"pr_costCenter"}
              options={costcenter}
              placceholder={"Costcenter..."}
              defaultValue={formData.pr_costCenter}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ pr_costCenter: data })}
              onChange={(data) => upDateFormValue({ pr_costCenter: data })}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={4}>{/* <Text strong>Due Date :</Text> */}</Col>
          <Col span={8}>
            {/* <DatePicker
              name={"pr_dueDate"}
              format={dateConfig.format}
              style={{ width: "100%" }}
              placeholder="Due date..."
              defaultValue={
                formData.pr_dueDate
                  ? moment(formData.pr_dueDate, "YYYY-MM-DD HH:mm:ss")
                  : ""
              }
              onChange={(data) => {
                upDateFormValue({
                  pr_dueDate: data.format("YYYY-MM-DD HH:mm:ss"),
                });
              }}
            /> */}
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>
          <Col span={8}>
            <AutoComplete
              name={"vendorName"}
              options={vendors}
              placceholder={"Vendor..."}
              defaultValue={formData.vendorName}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ vendorName: data })}
              onChange={(data) => upDateFormValue({ vendorName: data })}
              style={{ width: "100%" }}
            />
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
                  readOnly={false}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Reason & Description" key="2">
                <TextArea
                  onChange={(e) => upDateFormValue({ pr_desc: e.target.value })}
                  defaultValue={formData.pr_desc}
                  placeholder="Reason & Description"
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default PurchaseRequisitionCreate;
