import React from "react";
import numeral from "numeral";
import { Row, Col, Typography } from "antd";
const { Text } = Typography;

const TotalFooter = ({ excludeVat, vat, includeVat, currency = "THB" }) => {
  return (
    <>
      <Row className="row-margin-vertical">
        <Col span={17}></Col>

        <Col span={3} className="text-number">
          <Text strong>Exclude Vat :</Text>
        </Col>
        <Col span={3} className="text-number">
          <Text>{numeral(excludeVat ? excludeVat : 0).format("0,0.00")}</Text>
        </Col>
        <Col span={1} className="text-string">
          <Text strong> {currency}</Text>
        </Col>
      </Row>
      <Row className="row-margin-vertical">
        <Col span={17}></Col>

        <Col span={3} className="text-number">
          <Text strong>Vat :</Text>
        </Col>
        <Col span={3} className="text-number">
          <Text>{numeral(vat ? vat : 0).format("0,0.00")}</Text>
        </Col>
        <Col span={1} className="text-string">
          <Text strong> {currency}</Text>
        </Col>
      </Row>
      <Row style={{ height: 10 }}>
        <Col span={18}></Col>

        <Col
          span={6}
          className="text-number"
          style={{ borderBottom: "0.2vh solid #c6c6c6" }}
        ></Col>
      </Row>
      <Row className="row-margin-vertical">
        <Col span={17}></Col>

        <Col span={3} className="text-number">
          <Text strong>Include Vat :</Text>
        </Col>
        <Col span={3} className="text-number">
          <Text>{numeral(includeVat ? includeVat : 0).format("0,0.00")}</Text>
        </Col>
        <Col span={1} className="text-string">
          <Text strong> {currency}</Text>
        </Col>
      </Row>
    </>
  );
};

export default TotalFooter;
