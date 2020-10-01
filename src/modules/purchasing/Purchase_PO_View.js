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
          po_create_date: null,
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
  const callback = (key) => {
    console.log(key);
    setTab(key);
  };

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Purchase Order",
      "View",
      formData.po_code && formData.po_code,
    ],
    search: false,
    buttonAction: ["Edit", "Confirm", "Approve", "Reject", "Discard"],
    action: [{ name: "print", link: "www.google.co.th" }],
    step: {
      current: formData.po_status,
      step: ["Draft", "Confirm", "Approve", "Done"],
    },
    create: "",
    save: {},
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
              <strong>Purchase Order #{formData.po_code}</strong>
            </h2>
          </Col>
          <Col span={9}></Col>
          <Col span={2}>
            <Text strong>PO Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {moment(formData.po_create_date, "DD/MM/YYYY").format("DD/MM/YYYY")}
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>PR Ref.</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.pr_code}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Due Date </Text>
          </Col>
          <Col span={8}>
            <Text>
              {moment(formData.po_dueDate, "DD/MM/YYYY").format("DD/MM/YYYY")}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Vendor </Text>
          </Col>

          <Col span={8}>
            <Text>{formData.v_name}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.po_payment_term}</Text>
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
                  readOnly={true}
                  formData={formData}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <Text>{formData.po_remark}</Text>
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
