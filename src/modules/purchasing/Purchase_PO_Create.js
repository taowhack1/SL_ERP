import React, { useEffect, useState } from "react";
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
import ItemLine from "./Purchase_ItemLine";
import TotalFooter from "../../components/TotalFooter";
import { items } from "../../data/items";
import { units } from "../../data/units";
import { itemLineColumns } from "../../data/sale/data";
import { payment_terms } from "../../data/payment_terms";
import { vendorData, prData } from "../../data/purchase/data";
import numeral from "numeral";
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const PurchaseOrderCreate = (props) => {
  const [tab, setTab] = useState("1");
  const data =
    props.location && props.location.state ? props.location.state : 0;

  let prRef = [];
  prData.map((pr) => {
    return prRef.push({
      id: pr.id,
      name: pr.pr_code,
      value:
        "[" +
        pr.pr_code +
        "] | Department " +
        pr.pr_costCenter +
        "  " +
        pr.pr_empId,
    });
  });

  let vendors = [];
  vendorData.map((ven) => {
    return vendors.push({
      id: ven.id,
      name: ven.v_name,
      value: "[" + ven.v_code + "] " + ven.v_name,
    });
  });

  const [refData] = useState(prData && prData);
  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          pr_code: null,
          po_code: null,
          v_id: null,
          v_name: null,
          v_company: null,
          po_create_date: moment().format("DD/MM/YYYY"),
          po_dueDate: null,
          po_total: 0,
          po_vat: 0,
          po_include_vat: 0,
          v_currency: "THB",
          po_purch: "Purch User 1",
          po_status: 0,
          po_item_status: 0,
          po_payment_term: null,
          po_remark: null,
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
  useEffect(() => {}, [formData.pr_code]);
  const isEditPage = formData && formData.po_code ? 1 : 0;
  const callback = (key) => {
    setTab(key);
  };

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const config = {
    projectId: 2,
    title: "PURCHASE",
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Order",
      formData.po_code ? "Edit" : "Create",
      formData.po_code && formData.po_code,
    ],
    search: false,
    buttonAction: ["Save", "SaveConfirm", "Discard"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.po_status,
      step: ["Draft", "Confirm", "Approve", "Done"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/purchase/po/view/" + formData.id,
    },
    edit: {
      data: formData,
      path: formData && "/purchase/po/edit/" + formData.id,
    },
    discard: "/purchase/po",
    onSave: (e) => {
      e.preventDefault();
      setData({ po_code: "PO2009-0099" });
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

  const getDataRef = (refId, mainData, refData) => {
    let copyMain = { ...mainData };
    let copyRef = { ...refData[refId] };
    let copyDataLine = [{ ...mainData.dataLine }];
    copyMain.pr_code = copyRef.pr_code;
    copyMain.v_id = copyRef.v_id;
    copyMain.v_name = copyRef.v_name;
    copyMain.v_company = copyRef.v_company;
    copyMain.dataLine = copyRef.dataLine;
    setData({ ...formData, ...copyMain });
  };
  return (
    <MainLayout {...config} data={formData}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={11}>
            <h2>
              <strong>
                {isEditPage ? "Edit" : "Create"} Purchase Order{" "}
                {isEditPage ? "#" + formData.po_code : null}
              </strong>
            </h2>
          </Col>
          <Col span={9}></Col>
          <Col span={2}>
            <Text strong>PO Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {moment(
              formData.po_create_date,
              isEditPage ? "DD/MM/YYYY" : "DD/MM/YYYY"
            ).format("DD/MM/YYYY")}
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>PR Ref.</Text>
          </Col>
          <Col span={8}>
            <Select
              placeholder={"PR. ex.PR2009-00xx"}
              onSelect={(data) => {
                getDataRef(data, formData, refData);
              }}
              style={{ width: "100%" }}
              defaultValue={formData.pr_code}
            >
              <Option value="null"> </Option>
              {prRef.map((pr) => {
                return (
                  <Option key={pr.id} value={pr.pr_code}>
                    {pr.value}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Due Date </Text>
          </Col>
          <Col span={8}>
            <DatePicker
              name={"po_dueDate"}
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              placeholder="Due date..."
              value={
                formData.po_dueDate
                  ? moment(formData.po_dueDate, "DD/MM/YYYY")
                  : ""
              }
              defaultValue={
                formData.po_dueDate
                  ? moment(formData.po_dueDate, "DD/MM/YYYY")
                  : ""
              }
              onChange={(data) => {
                upDateFormValue({
                  po_dueDate: data.format("DD/MM/YYYY"),
                });
              }}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Vendor </Text>
          </Col>

          <Col span={8}>
            <AutoComplete
              options={vendors}
              placeholder="Vendor.."
              defaultValue={formData.v_name}
              value={formData.v_name}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ v_name: data })}
              onChange={(data) => upDateFormValue({ v_name: data })}
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
              defaultValue={formData.po_payment_term}
              value={formData.po_payment_term}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onSelect={(data) => upDateFormValue({ po_payment_term: data })}
              onChange={(data) => upDateFormValue({ po_payment_term: data })}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row className="col-2 space-top-md">
          <Col span={24}>
            <Tabs defaultActiveKey={"1"} onChange={callback}>
              <Tabs.TabPane tab="Request Detail" key={"1"}>
                <ItemLine
                  items={items}
                  units={units}
                  // itemLots={itemLots}
                  columns={itemLineColumns}
                  updateData={upDateFormValue}
                  dataLine={formData.dataLine ? formData.dataLine : [{}]}
                  readOnly={false}
                  formData={formData}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <TextArea
                  rows={2}
                  placeholder={"Remark..."}
                  defaultValue={formData.po_remark}
                  value={formData.po_remark}
                  onChange={(e) =>
                    upDateFormValue({ po_remark: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <TotalFooter
            excludeVat={formData.po_total}
            vat={formData.po_vat}
            includeVat={formData.po_include_vat}
            currency={"THB"}
          />
        ) : null}
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default PurchaseOrderCreate;
