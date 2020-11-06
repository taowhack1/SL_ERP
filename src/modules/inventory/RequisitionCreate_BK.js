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
import { dataComments } from "../../data";
import $ from "jquery";
import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const RequisitionCreate = (props) => {
  const data = props.location.state ? props.location.state : 0;
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
      current: 2,
      step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/inventory/requisition/view/" + formData.id,
    },
    discard: "/inventory/requisition",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
      setEdit(true);
    },
    onApprove: (e) => {
      //e.preventDefault();
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
                <AutoComplete
                  name={"req_contact"}
                  options={autoCompleteUser}
                  placceholder={"contact person"}
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onSelect={(data) => upDateFormValue({ req_contact: data })}
                  onChange={(data) => upDateFormValue({ req_contact: data })}
                />
              </Form.Item>

              <Form.Item label="Description" name="req_desc" rules={[]}>
                <Input
                  name={"req_desc"}
                  onChange={(e) =>
                    upDateFormValue({ req_desc: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Item type" name="req_item_type" rules={[]}>
                <Radio.Group
                  name={"req_item_type"}
                  onChange={(e) =>
                    upDateFormValue({ req_item_type: e.target.value })
                  }
                  // defaultValue={formData.req_item_type}
                >
                  <Radio value={0}>RM</Radio>
                  <Radio value={1}>PK</Radio>
                  <Radio value={2}>BULK</Radio>
                  <Radio value={3}>FG</Radio>
                  <Radio value={4}>Others</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Form.Item label="Schedule Date" rules={[]}>
                <DatePicker
                  name={"req_date"}
                  format={dateConfig.format}
                  style={{ width: "100%" }}
                  // defaultValue={
                  //   formData.req_date
                  //     ? moment(formData.req_date, "YYYY-MM-DD")
                  //     : ""
                  // }
                  onChange={(data) => {
                    upDateFormValue({
                      req_date: data.format("YYYY-MM-DD HH:mm:ss"),
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="Destination Location" name="req_to" rules={[]}>
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
        </Form>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <ItemLine
                  updateItemLine={updateItemLine}
                  items={autoCompleteItem}
                  units={autoCompleteUnit}
                  req_item_line={
                    formData.req_item_line ? formData.req_item_line : []
                  }
                  editForm={editForm}
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
