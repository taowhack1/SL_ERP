import React, { useState } from "react";
import { Row, Col, Input, Tabs, AutoComplete, Typography, Select } from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import ItemLine from "./pr_ItemLine";
import { autoCompleteItem, autoCompleteUnit } from "../../data/inventoryData";
import { costcenter } from "../../data/costcenterData";
import Comments from "../../components/Comments";
import { dataComments, itemLots } from "../../data";
import { prItemColumns } from "../../data/purchase/pr_ItemLineData";
import { vendors } from "../../data/purchase/data";
import { pr_fields } from "./fields_config/pr";
const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const PurchaseRequisitionCreate = (props) => {
  const auth = JSON.parse(localStorage.getItem("user"));
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          ...pr_fields,
          pr_cost_center: auth.dep,
          pr_created_by: auth.user_name,
          pr_updated_by: auth.user_name,
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

  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Requisition",
      formData.po_no ? "Edit" : "Create",
      formData.po_no && formData.po_no,
    ],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.process_id,
      step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/purchase/pr/view/" + formData.pr_id,
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

  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Row className="col-2">
          <Col span={20}>
            <h2>
              <strong>
                {formData.po_no ? "Edit" : "Create"} Purchase Requisition
              </strong>
            </h2>
          </Col>
          <Col span={4}>
            <Text strong>PR Date : </Text>
            {formData.pr_date}
          </Col>
        </Row>
        <Row className="col-2" style={{ marginBottom: 20 }}>
          {formData.po_no && (
            <h3>
              <b>Ref. Code : </b>
              {formData.po_no}
            </h3>
          )}
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Request by :</Text>
          </Col>

          <Col span={8}>{auth.user_name + " " + auth.name}</Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Cost center :</Text>
          </Col>
          <Col span={8}>{formData.pr_cost_center}</Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Vendor :</Text>
          </Col>
          <Col span={8}>
            <Select
              allowClear
              showSearch
              placceholder={"Vendor..."}
              value={formData.vendor_id}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ vendor_id: data })}
              onChange={(data) => upDateFormValue({ vendor_id: data })}
              style={{ width: "100%" }}
            >
              <Option value={0}>A</Option>
              <Option value={1}>B</Option>
            </Select>
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
                  pr_id={formData.pr_id}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Reason & Description" key="2">
                <TextArea
                  onChange={(e) =>
                    upDateFormValue({ pr_description: e.target.value })
                  }
                  defaultValue={formData.pr_description}
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
