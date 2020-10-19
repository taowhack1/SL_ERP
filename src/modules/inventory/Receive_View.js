import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import ItemLine from "./Receive_ItemLine";
import TotalFooter from "../../components/TotalFooter";
import { items } from "../../data/items";
import { units } from "../../data/units";
import { receiveLineColumns } from "../../data/inventory/data";
import { payment_terms } from "../../data/payment_terms";
import { vendorData, poData } from "../../data/purchase/data";
import { locations } from "../../data/locationData";
import numeral from "numeral";
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const Receive_View = (props) => {
  const [tab, setTab] = useState("1");
  const data =
    props.location && props.location.state ? props.location.state : 0;

  let poRef = [];
  poData.map((po) => {
    return poRef.push({
      id: po.id,
      name: po.po_code,
      value: "[" + po.po_code + "] Due date: " + po.po_dueDate,
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

  const [refData] = useState(poData && poData);
  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          r_code: null,
          po_code: null,
          v_name: null,
          v_company: null,
          r_location: null,
          r_create_date: moment().format("YYYY-MM-DD"),
          r_schedule_date: null,
          r_status: 0,
          r_total: 0,
          r_vat: 0,
          r_include_vat: 0,
          r_remark: null,
          dataLine: [
            {
              id: 0,
              item: null,
              item_qty: 0,
              item_unit: null,
              item_qty_done: 0,
              item_unit_price: 0,
              item_subtotal: 0,
            },
          ],
        }
  );
  useEffect(() => {}, [formData.po_code]);
  const isEditPage = formData && formData.r_code ? 1 : 0;
  const callback = (key) => {
    setTab(key);
  };

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Inventory",
      "Receive",
      "View",
      formData.r_code && formData.r_code,
    ],
    search: false,
    buttonAction: ["Edit", "Confirm", "Validate", "Discard"],
    action: [{ name: "Print", link: "www.google.co.th" }],
    step: {
      current: formData.r_status,
      step: ["Draft", "Confirm", "Validate", "Done"],
    },
    create: "",
    save: {
      data: formData,
      path: formData && "/inventory/receive/view/" + formData.id,
    },
    edit: {
      data: formData,
      path: formData && "/inventory/receive/edit/" + formData.id,
    },
    discard: "/inventory/receive",
    onSave: (e) => {
      e.preventDefault();
      setData({ r_code: "R2009-00099" });
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
    copyMain.po_code = copyRef.po_code;
    copyMain.v_name = copyRef.v_name;
    copyMain.v_company = copyRef.v_company;
    copyMain.r_total = copyRef.po_total;
    copyMain.r_vat = copyRef.po_vat;
    copyMain.r_schedule_date = copyRef.po_dueDate;
    copyMain.r_include_vat = copyRef.po_include_vat;
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
              <strong>Receive {"#" + formData.r_code}</strong>
            </h2>
          </Col>
          <Col span={9}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            {moment(
              formData.r_create_date,
              isEditPage ? "DD/MM/YYYY" : "YYYY-MM-DD"
            ).format("DD/MM/YYYY")}
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>PO Ref.</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.po_code}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Schedule Date </Text>
          </Col>
          <Col span={8}>
            <Text>{formData.r_schedule_date}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Form Vendor </Text>
          </Col>

          <Col span={8}>
            <Text>{formData.v_name}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Destination Location</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.r_location}</Text>
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
                  columns={receiveLineColumns}
                  updateData={upDateFormValue}
                  dataLine={formData.dataLine ? formData.dataLine : [{}]}
                  readOnly={true}
                  formData={formData}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key={"2"}>
                <Text>{formData.r_remark}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        {tab === "1" ? (
          <TotalFooter
            excludeVat={formData.r_total}
            vat={formData.r_vat}
            includeVat={formData.r_include_vat}
            currency={"THB"}
          />
        ) : null}
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default Receive_View;
