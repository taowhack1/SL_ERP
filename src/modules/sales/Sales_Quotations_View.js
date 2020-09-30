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
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const CustomerCreate = (props) => {
  const [tab, setTab] = useState(1);
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [editForm, setEdit] = useState(true);

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          q_code: null,
          q_create_date: moment().format("YYYY-MM-DD"),
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
      "View",
      formData.q_code && formData.q_code,
    ],
    search: false,
    buttonAction: ["Edit", "Approve", "Reject", "Discard"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.c_status,
      step: ["Draft", "Confirm", "Approve", "Done"],
    },
    create: "",
    save: {},
    edit: {
      data: formData,
      path: formData && "/sales/quotations/edit/" + formData.id,
    },
    discard: "/sales/quotations",
    onSave: (e) => {
      e.preventDefault();
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
              <strong>Quotations #{formData.q_code && formData.q_code}</strong>
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
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Customer </Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_name}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Expire Date </Text>
          </Col>
          <Col span={8}>
            <Text>{formData.q_expire_date}</Text>
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
            <Text>{formData.c_payment_term}</Text>
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
                  readOnly={true}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <Text style={{ paddingLeft: 15 }}>{formData.q_remark}</Text>
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
