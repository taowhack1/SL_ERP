import { Checkbox, Col, Row, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";

const RDFormDetail = () => {
  return (
    <>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="form-section-head">
          <Text strong>Details of Sample Request :</Text>
        </div>
        <div className="form-section-detail">
          <Row className="col-2 row-margin-vertical">
            <Col span={24}>
              <Checkbox className="ml-3" />
              SL
              <Checkbox className="ml-3" />
              Customer
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
        </div>
      </div>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="form-section-head">
          <Text strong>Components :</Text>
        </div>
      </div>
    </>
  );
};

export default RDFormDetail;
