import React, { useState } from "react";
import { Row, Col, Typography } from "antd";
import MainLayout from "../../components/MainLayout";
import Comments from "../../components/Comments";
import { dataComments } from "../../data";

const { Text } = Typography;

const CustomerView = (props) => {
  const data =
    props.location && props.location.state ? props.location.state : 0;

  const [formData] = useState(
    data && data
      ? data
      : {
          id: 0,
          c_code: null,
          c_name: null,
          c_company: null,
          c_phone: null,
          c_mobile: null,
          c_email: null,
          c_tax_id: null,
          c_type: null,
          c_desc: null,
          c_adr_street: null,
          c_adr_street2: null,
          c_adr_city: null,
          c_adr_state: null,
          c_adr_zip: null,
          c_adr_country: null,
          c_payment_term: null,
          c_currency: null,
          c_status: 0,
        }
  );
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
  const config = {
    projectId: 3,
    title: "SALES",
    show: true,
    breadcrumb: [
      "Home",
      "Customers",
      "View",
      formData.c_code && "[ " + formData.c_code + " ] " + formData.c_name,
    ],
    search: false,
    buttonAction: getButton(formData.c_status),
    action: [{ name: "Print", link: "www.google.co.th" }],
    step: {
      current: formData.c_status,
      step: ["Draft", "Confirm", "Verify", "Approve", "Done"],
    },
    create: "",
    edit: {
      data: formData,
      path: formData && "/sales/config/customers/edit/" + formData.id,
    },
    save: {
      data: formData,
      path: formData && "/sales/config/customers/view/" + formData.id,
    },
    discard: "/sales/config/customers",
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
              <strong>Customer #{formData.c_code}</strong>
            </h2>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}></Col>
        </Row>
        <Row className="col-2">
          <Col span={24} style={{ marginBottom: 8 }}>
            <h3>
              <strong>{formData.c_name}</strong>
            </h3>
          </Col>
        </Row>

        {/* Address & Information */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Phone </Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_phone}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Company Address </Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_adr_street}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Mobile</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_mobile}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_adr_street2}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>Email</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_email}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={8}>
                <Text>{formData.c_adr_city}</Text>
              </Col>
              <Col span={1}></Col>
              <Col span={8}>
                <Text>
                  {formData.c_adr_state
                    ? formData.c_adr_state
                    : formData.c_adr_country}
                </Text>
              </Col>
              <Col span={1}></Col>
              <Col span={6}>
                <Text>{formData.c_adr_zip}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Text strong>Currency</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_currency}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Tax ID</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_tax_id}</Text>
          </Col>
        </Row>
        <Row className="row-margin-vertical">
          <Col span={3}>
            <Text strong>Payment Terms</Text>
          </Col>
          <Col span={8}>
            <Text>{formData.c_payment_term}</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Text></Text>
          </Col>
        </Row>

        <Row className="row-tab-margin">
          <Col span={3}>
            <Text strong>Descriptions</Text>
            <br />
            <Text style={{ paddingLeft: 15 }}>{formData.c_desc}</Text>
          </Col>
          <Col span={8}></Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong></Text>
          </Col>
          <Col span={8}>
            <Text></Text>
          </Col>
        </Row>
      </div>
      <Comments data={[...dataComments]} />
    </MainLayout>
  );
};

export default CustomerView;
