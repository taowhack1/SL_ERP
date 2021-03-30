import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";

const ProductionViewJobDetail = () => {
  return (
    <>
      <Row className="col-2">
        <Col lg={12} sm={24} className={"col-border-right"}>
          <Row className="col-2 row-margin-vertical">
            <Col md={7} sm={23}>
              <CustomLabel label={"Job No."} />
            </Col>
            <Col md={16} sm={24}>
              <Text className="text-value">{"SO2021030xxx"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col md={7} sm={24}>
              <CustomLabel label={"MRP No."} />
            </Col>
            <Col md={16} sm={24}>
              <Text className="text-value">{"MRP2021030xxx"}</Text>
            </Col>
          </Row>
        </Col>
        <Col lg={12} sm={24}>
          <Row className="col-2 row-margin-vertical">
            <Col md={7} sm={24}>
              <CustomLabel label={"Plan Date."} />
            </Col>
            <Col md={16} sm={24}>
              <Text className="text-value">{"26/03/2021  -  31/03/2021"}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ProductionViewJobDetail);
