import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
const NPRHead = ({ state }) => {
  console.log("NPRHead", state);
  return (
    <>
      <Row className="col-2">
        <Col span={16} style={{ padding: 10 }}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label={"Product :"} />
            </Col>
            <Col span={18}>
              <Text>{state.npr_product_no_name || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label={"Customer :"} />
            </Col>
            <Col span={18}>
              <Text>{state.npr_customer_no_name || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label="Contact No./Email :" />
            </Col>
            <Col span={18}>
              <Text>{state.npr_contact_no || "-"}</Text>
            </Col>
          </Row>

          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label="Ref. Formulation :" />
            </Col>
            <Col span={18}>
              <Text>{state.npr_reference_formulation || "-"}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ padding: 10 }}>
          <Row className="col-2">
            <Col span={24}>
              <Row className="col-2 row-margin-vertical">
                <Col span={10}>
                  <CustomLabel label="NPR No." />
                </Col>
                <Col span={14}>
                  <Text>{state.npr_no || "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={10}>
                  <CustomLabel label="Issued Date :" />
                </Col>
                <Col span={14}>
                  <Text>{state.npr_created || "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={10}>
                  <CustomLabel label="Request Date :" />
                </Col>
                <Col span={14}>
                  <Text>{state.npr_request_date || "-"}</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default NPRHead;
