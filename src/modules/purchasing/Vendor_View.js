import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Tabs, Typography } from "antd";
import MainLayout from "../../components/MainLayout";

import ItemLine from "../../components/VendorItemLine";
import { autoCompleteUnit, autoCompleteItem } from "../../data/inventoryData";

import Comments from "../../components/Comments";
import { dataComments } from "../../data";

import { vendorItemColumns } from "../../data/purchase/data";

const { Text } = Typography;

const VendorView = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;

  const [formData, setData] = useState(
    data && data
      ? data
      : {
          id: 0,
          v_code: null,
          v_name: null,
          v_company: null,
          v_phone: null,
          v_mobile: null,
          v_email: null,
          v_tax_id: null,
          v_type: null,
          v_desc: null,
          v_adr_street: null,
          v_adr_street2: null,
          v_adr_city: null,
          v_adr_state: null,
          v_adr_zip: null,
          v_adr_country: null,
          v_payment_term: null,
          v_currency: null,
          v_status: 0,
          dataLine: [
            {
              id: 0,
              item: null,
              itemValidate: null,
              itemQty: 0,
              itemUnit: "pc",
              itemPrice: 0,
            },
          ],
        }
  );
  const callback = (key) => {};

  const upDateFormValue = (data) => {
    setData({ ...formData, ...data });
  };
  const getButton = (status) => {
    switch (status) {
      // case 0:
      //   return ["Edit", "Confirm", "Discard"];
      case 0:
        return ["Edit", "Confirm", "Discard"];
      case 1:
        return ["Edit", "Verify", "Discard"];
      case 2:
        return ["Edit", "Approve", "Discard"];
      case 3:
        return ["Edit", "Discard"];
      default:
        return [];
    }
  };
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Vendor",
      "View",
      formData.v_code && "[ " + formData.v_code + " ] " + formData.v_name,
    ],
    search: false,
    buttonAction: getButton(formData.v_status),
    action: [{ name: "Print", link: "www.google.co.th" }],
    step: {
      current: formData.v_status,
      step: ["Draft", "Confirm", "Verify", "Approve", "Done"],
    },
    create: "",
    edit: {
      data: formData,
      path: formData && "/purchase/vendor/edit/" + formData.id,
    },
    save: {
      data: formData,
      path: formData && "/purchase/vendor/view/" + formData.id,
    },
    discard: "/purchase/vendor",
    onSave: (e) => {
      e.preventDefault();
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
              <strong>Vendor #{formData.v_code}</strong>
            </h2>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}></Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <h3>
              <strong>{formData.v_name}</strong>
            </h3>
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Phone </Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_phone}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Company Address </Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_adr_street}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Mobile</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_mobile}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_adr_street2}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Email</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_email}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={8}>
                <Text>{formData.v_adr_city}</Text>
              </Col>
              <Col span={1}></Col>
              <Col span={8}>
                <Text>{formData.v_adr_country}</Text>
              </Col>
              <Col span={1}></Col>
              <Col span={6}>
                <Text>{formData.v_adr_zip}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Text strong>Currency</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_currency}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Tax ID</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.v_tax_id}</Text>
          </Col>
        </Row>

        {/* Product & Notes */}
        <Row className="col-2 row-tab-margin">
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <Tabs.TabPane tab="Products" key="1">
                <ItemLine
                  items={autoCompleteItem}
                  units={autoCompleteUnit}
                  dataLine={formData.dataLine ? formData.dataLine : [{}]}
                  columns={vendorItemColumns}
                  readOnly={true}
                  updateData={upDateFormValue}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Notes" key="2">
                <Text>{formData.v_desc}</Text>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default VendorView;
