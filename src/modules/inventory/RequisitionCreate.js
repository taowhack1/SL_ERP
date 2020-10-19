import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
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
} from "../../data/inventoryData";
import Comments from "../../components/Comments";
import { dataComments, itemLots } from "../../data";
import { reqItemColumns } from "../../data/requisitionData";
import { getNameById } from "../../include/js/function_main";
const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const RequisitionCreate = (props) => {
  const auth = useSelector((state) => state.auth.authData[0]);
  const data = props.location.state ? props.location.state : 0;
  const master_data = useSelector((state) => state.inventory.master_data);
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          req_code: "",
          req_contact: "",
          req_date: null,
          req_to: null,
          req_desc: "",
          req_item_type: 0,
          req_note: "",
          req_step: 0,
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
  const submitForm = (values) => {};

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Requisition",
      formData.req_code ? "Edit" : "Create",
      formData.req_code && formData.req_code,
    ],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject"],
    action: [{ name: "Print", link: "www.google.co.th" }],
    step: {
      current: formData.req_step,
      step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/inventory/requisition/view/" + formData.id,
    },
    discard: "/inventory/requisition",
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

  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        <Row className="col-2">
          <Col span={20}>
            <h2>
              <strong>
                {/* {data_head.pr_no ? "Edit" : "Create"}  */}
                Requisition
              </strong>
            </h2>
          </Col>
          <Col span={4}>
            <Text strong>PR Date : </Text>
            {moment().format("DD/MM/YYYY")}
          </Col>
        </Row>
        <Row className="col-2" style={{ marginBottom: 20 }}>
          <h3>{/* <b>Ref. Code : </b>
            {formData.req_code} */}</h3>
        </Row>
        <Row className="col-2 row-margin-vertical" style={{ paddingBottom: 8 }}>
          <Col span={3}>
            <Text strong>Request By :</Text>
          </Col>

          <Col span={8}>
            <Text>{auth.employee_no_name_eng}</Text>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <Text strong>Cost Center :</Text>
          </Col>
          <Col span={8}>
            <Text>{auth.department_no_name}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Destination Location :</Text>
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Select Location"}
              onSelect={(data) =>
                upDateFormValue({
                  req_to: data,
                })
              }
              style={{ width: "100%" }}
              defaultValue={formData.req_to}
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
          </Col>

          <Col span={1}></Col>
          <Col span={4}>
            <Text strong>Item Type </Text>
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Select Item Type"}
              onChange={(data) => upDateFormValue({ type_id: data })}
              // value={}
              style={{ width: "100%" }}
            >
              {master_data.item_type &&
                master_data.item_type.map((type) => {
                  return (
                    <Option key={type.type_id} value={type.type_id}>
                      {type.type_no}
                    </Option>
                  );
                })}
            </Select>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Due Date :</Text>
          </Col>
          <Col span={8}>
            <DatePicker
              name={"req_date"}
              format={dateConfig.format}
              style={{ width: "100%" }}
              defaultValue={
                formData.req_date ? moment(formData.req_date, "YYYY-MM-DD") : ""
              }
              onChange={(data) => {
                upDateFormValue({
                  req_date: data.format("YYYY-MM-DD HH:mm:ss"),
                });
              }}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <Text strong>Category </Text>
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Select Category"}
              onSelect={(data) =>
                upDateFormValue({
                  category_id: data,
                })
              }
              style={{ width: "100%" }}
              // value={getNameById(
              //   formData.category_id,
              //   master_data.item_category,
              //   "category_id",
              //   "category_name"
              // )}
            >
              {master_data.item_category.map((categ) => {
                return (
                  <Option key={categ.category_id} value={categ.category_id}>
                    {categ.category_name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        {/*  */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>
          <Col span={8}>
            <Input
              name={"req_desc"}
              onChange={(e) => upDateFormValue({ req_desc: e.target.value })}
              defaultValue={formData.req_desc}
            />
          </Col>
          <Col span={1}></Col>
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
                  readOnly={false}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Note" key="3">
                <TextArea
                  rows={3}
                  placeholder={"Remark your request"}
                  onChange={(e) =>
                    upDateFormValue({ req_note: e.target.value })
                  }
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

export default RequisitionCreate;
