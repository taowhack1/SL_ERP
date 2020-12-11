import { DatePicker, Row, Col, Tabs, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import moment from "moment";

const { RangePicker } = DatePicker;
const TabWorkOrderDetail = () => {
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current - 1 < moment().subtract(1, "days").endOf("day");
  }
  return (
    <Row className="col-2  mt-1" gutter={32}>
      <Col span={12} className="col-border-right">
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <Text strong>
              <span className="require">* </span>Quantity to produce :
            </Text>
          </Col>
          <Col span={18}>
            <InputNumber defaultValue={0} className="full-width" />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <Text strong className="pd-left-1">
              Quantity to spare :
            </Text>
          </Col>
          <Col span={18}>
            <InputNumber defaultValue={0} className="full-width" />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <Text strong>
              <span className="require">* </span>Plan Date :
            </Text>
          </Col>
          <Col span={18}>
            <RangePicker disabledDate={disabledDate} className="full-width" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TabWorkOrderDetail;
