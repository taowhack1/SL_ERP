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
import { states } from "../../data/index";
import ItemLine from "./sales_ItemLine";
import { items } from "../../data/items";
import { units } from "../../data/units";
import { itemLineColumns } from "../../data/sale/data";
import { payment_terms } from "../../data/payment_terms";
import { customerData, quotationData } from "../../data/sale/data";
import numeral from "numeral";
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const SaleOrderView = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;
  let quotationsRef = [];
  quotationData.map((quo) => {
    return quotationsRef.push({
      id: quo.id,
      name: quo.q_code,
      value:
        "[" +
        quo.q_code +
        "] " +
        quo.c_name +
        " ( " +
        numeral(quo.q_total).format("0,0.00") +
        " )",
    });
  });
  let customers = [];
  customerData.map((cus) => {
    return customers.push({
      id: cus.id,
      name: cus.c_name,
      value: "[" + cus.c_code + "] " + cus.c_name,
    });
  });
  console.log(customers);
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          so_code: null,
          q_code: null,
          so_delivery_date: null,
          so_create_date: moment().format("YYYY-MM-DD"),
          c_name: null,
          c_company: null,
          so_sale_person: "Sale User 1",
          so_payment_term: null,
          so_total: 0,
          so_status: 0,
          so_remark: null,
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
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const config = {
    projectId: 3,
    title: "SALES",
    show: true,
    breadcrumb: [
      "Home",
      "Sales Order",
      formData.so_code ? "Edit" : "Create",
      formData.so_code && formData.so_code,
    ],
    search: false,
    buttonAction: ["Edit", "Approve", "Reject", "Discard"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.so_status,
      step: ["Draft", "Confirm", "Approve", "Done"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/sales/orders/view/" + formData.id,
    },
    edit: {
      data: formData,
      path: formData && "/sales/orders/edit/" + formData.id,
    },
    discard: "/sales/orders",
    onSave: (e) => {
      e.preventDefault();
      setData({ so_code: "Q2002-0099", c_company: "Test Company" });
      console.log(formData);
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
              <strong>Sales Order #{formData.so_code}</strong>
            </h2>
          </Col>
          <Col span={9}></Col>
          <Col span={2}>
            <Text strong>Order Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {moment(formData.so_create_date, "DD/MM/YYYY").format("DD/MM/YYYY")}
          </Col>
        </Row>
        {/* <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            
          </Col>
        </Row> */}

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Quotations Ref.</Text>
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Quotations. ex.Q2009-00xx"}
              onSelect={(data) =>
                upDateFormValue({
                  q_code: data,
                })
              }
              style={{ width: "100%" }}
              defaultValue={formData.q_code}
            >
              <Option value="null"> </Option>
              {quotationsRef.map((quo) => {
                return (
                  <Option key={quo.id} value={quo.name}>
                    {quo.value}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Deliver Date </Text>
          </Col>
          <Col span={8}>
            <DatePicker
              name={"so_delivery_date"}
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              placeholder="Due date..."
              defaultValue={
                formData.so_delivery_date
                  ? moment(formData.so_delivery_date, "DD/MM/YYYY")
                  : ""
              }
              onChange={(data) => {
                upDateFormValue({
                  so_delivery_date: data.format("DD/MM/YYYY"),
                });
              }}
            />
          </Col>
        </Row>
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
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <AutoComplete
              options={payment_terms}
              placeholder="Payment Terms..."
              defaultValue={formData.so_payment_term}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ so_payment_term: data })}
              onChange={(data) => upDateFormValue({ so_payment_term: data })}
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
                  defaultValue={formData.so_remark}
                  onChange={(e) =>
                    upDateFormValue({ so_remark: e.target.value })
                  }
                  style={{ width: "100%" }}
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

export default SaleOrderView;
