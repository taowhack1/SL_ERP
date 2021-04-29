import {
  Button,
  Col,
  DatePicker,
  Divider,
  InputNumber,
  Row,
  TimePicker,
} from "antd";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";

const FormLeft = (props) => {
  return (
    <>
      <div className="full-wh col-border-right" style={{ padding: "5px 20px" }}>
        <div className="title-bar">
          <h3>Selected Cost Center</h3>
        </div>
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomLabel label={"Cost Center :"} require />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomSelect placeholder={"Select Cost Center"} />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={10}>
            <CustomLabel label={"Plan Date :"} require />
          </Col>
          <Col span={3}></Col>
          <Col span={11}>
            <CustomLabel label={"Period :"} require />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={10}>
            <DatePicker placeholder={"Plan Date"} className="full-width" />
          </Col>
          <Col span={3}></Col>
          <Col span={11}>
            <TimePicker placeholder={"00:00:00"} className="full-width" />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomLabel label={"Worker :"} require />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={10}>
            <InputNumber placeholder={"0"} className="full-width" />
          </Col>
        </Row>
        <div className="mt-5 mb-2 text-center">
          <Button className="primary">Calculate Plan</Button>
          {/* <Button>Reset</Button> */}
        </div>
      </div>
    </>
  );
};

export default FormLeft;
