import React, { useState } from "react";
import {
  Row,
  Col,
  Input,
  Tabs,
  Select,
  AutoComplete,
  Typography,
  DatePicker,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";

import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import ItemLine from "./Sales_ItemLine";
import TotalFooter from "../../components/TotalFooter";
import { items } from "../../data/items";
import { units } from "../../data/units";
import { itemLineColumns } from "../../data/sale/data";
import { payment_terms } from "../../data/payment_terms";
import { customerData } from "../../data/sale/data";
const { TextArea } = Input;
const { Text } = Typography;

const CustomerCreate = (props) => {
  const [tab, setTab] = useState(1);
  const data =
    props.location && props.location.state ? props.location.state : 0;
  let customers = [];
  customerData.map((cus) => {
    return customers.push({
      id: cus.id,
      name: cus.c_name,
      value: "[" + cus.c_code + "] " + cus.c_name,
    });
  });
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          q_code: null,
          q_create_date: moment().format("DD/MM/YYYY"),
          q_expire_date: null,
          c_name: null,
          c_company: null,
          q_sale_person: "Sale User 1",
          c_payment_term: null,
          q_total: 0,
          q_vat: 0,
          q_include_vat: 0,
          q_status: 0,
          q_remark: null,
          dataLine: [
            {
              id: 0,
              item: null,
              item_qty: 0,
              item_unit: null,
              item_unit_price: 0,
              item_subtotal: 0,
            },
          ],
        }
  );
  const callback = (key) => {
    setTab(key);
  };

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const config = {
    projectId: 3,
    title: "SALES",
    show: true,
    breadcrumb: [
      "Home",
      "Quotations",
      formData.q_code ? "Edit" : "Create",
      formData.q_code && formData.q_code,
    ],
    search: false,
    buttonAction: editForm
      ? ["Save", "SaveConfirm", "Discard"]
      : ["Edit", "Approve", "Reject", "Discard"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.c_status,
      step: ["Draft", "Confirm", "Approve", "Done"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/sales/quotations/view/" + formData.id,
    },
    discard: "/sales/quotations",
    onSave: (e) => {
      e.preventDefault();
      setData({ q_code: "Q2002-0099", c_company: "Test Company" });
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
        {/* Head */}
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>
                {formData.q_code ? "Edit" : "Create"} Quotations #
                {formData.q_code && formData.q_code}
              </strong>
            </h2>
          </Col>
          <Col span={9}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {moment(formData.q_create_date, "DD/MM/YYYY").format("DD/MM/YYYY")}
          </Col>
        </Row>
        {/* <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            
          </Col>
        </Row> */}

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Customer </Text>
          </Col>
          <Col span={8}>
            <AutoComplete
              options={customers}
              placeholder="Customer.."
              defaultValue={formData.c_name}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ c_name: data })}
              onChange={(data) => upDateFormValue({ c_name: data })}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Expire Date </Text>
          </Col>
          <Col span={8}>
            <DatePicker
              name={"q_expire_date"}
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              placeholder="Due date..."
              defaultValue={
                formData.q_expire_date
                  ? moment(formData.q_expire_date, "DD/MM/YYYY")
                  : ""
              }
              onChange={(data) => {
                upDateFormValue({
                  q_expire_date: data.format("DD/MM/YYYY"),
                });
              }}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}></Col>

          <Col span={8}></Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <AutoComplete
              options={payment_terms}
              placeholder="Payment Terms..."
              defaultValue={formData.c_payment_term}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ c_payment_term: data })}
              onChange={(data) => upDateFormValue({ c_payment_term: data })}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key="1">
                <ItemLine
                  items={items}
                  units={units}
                  // itemLots={itemLots}
                  columns={itemLineColumns}
                  updateData={upDateFormValue}
                  dataLine={formData.dataLine ? formData.dataLine : []}
                  readOnly={false}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <TextArea
                  rows={2}
                  placeholder={"Remark..."}
                  defaultValue={formData.q_remark}
                  onChange={(e) =>
                    upDateFormValue({ q_remark: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === 1 ? (
          <TotalFooter
            excludeVat={formData.q_total}
            vat={formData.q_vat}
            includeVat={formData.q_include_vat}
            currency={"THB"}
          />
        ) : null}
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default CustomerCreate;
