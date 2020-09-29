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
import ItemLine from "./Sales_ItemLine";
import TotalFooter from "../../components/TotalFooter";
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
  const [tab, setTab] = useState(1);
  const data =
    props.location && props.location.state ? props.location.state : 0;

  // prepare autocomplete value
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

  // main data
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
  const isEditPage = formData && formData.so_code ? 1 : 0;
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
                Sales Order {isEditPage ? "#" + formData.so_code : null}
              </strong>
            </h2>
          </Col>
          <Col span={9}></Col>
          <Col span={2}>
            <Text strong>Order Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {moment(
              formData.so_create_date,
              isEditPage ? "DD/MM/YYYY" : "YYYY-MM-DD"
            ).format("DD/MM/YYYY")}
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Quotations Ref.</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.q_code}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Deliver Date </Text>
          </Col>
          <Col span={8}>
            <Text>{formData.so_delivery_date}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Customer </Text>
          </Col>

          <Col span={8}>
            <Text>{formData.c_name}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.so_payment_term}</Text>
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
                  dataLine={formData.dataLine ? formData.dataLine : [{}]}
                  readOnly={true}
                  formData={formData}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <Text>{formData.so_remark}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === 1 ? (
          <TotalFooter
            excludeVat={formData.so_total}
            vat={formData.so_vat}
            includeVat={formData.so_include_vat}
            currency={"THB"}
          />
        ) : null}
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default SaleOrderView;
