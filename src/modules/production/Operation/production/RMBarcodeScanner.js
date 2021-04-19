import { Button, Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";

const RMBarcodeScanner = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          // minHeight: 300,
        }}
        className="mb-2"
      >
        <div
          style={{
            width: "50%",
          }}
          className="col-border-right"
        >
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label={"Barcode"} />
            </Col>
            <Col span={16}>
              <Input placeholder={"Barcode"} autoFocus={true} />
            </Col>
            <Col span={1}>
              <Button>Click</Button>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label={"RM Code"} />
            </Col>
            <Col span={16}>
              <Text className="text-value">{"eg. 10xSRLA000xxx"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label={"Spec. Weight"} />
            </Col>
            <Col span={16} className="text-right">
              <Text className="text-value mr-2">{"2.362500"}</Text>
              <Text strong>{"kg"}</Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label={"Net Weight"} />
            </Col>
            <Col span={16} className="text-right">
              <Text className="text-value mr-2">{"2.362830"}</Text>
              <Text strong>{"kg"}</Text>
            </Col>
          </Row>
        </div>
        <div
          style={{
            width: "50%",
          }}
        >
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <CustomLabel label={"Product"} />
            </Col>
            <Col span={16}>
              <Text className="text-value">{"eg. 30xSRLA000xxx"}</Text>
              {/* <Input bordered={false} placeholder={"Bulk Code"} /> */}
            </Col>
          </Row>

          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <CustomLabel label={"Lot No."} />
            </Col>
            <Col span={16}>
              <Text className="text-value">{"eg. 2103240001"}</Text>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default RMBarcodeScanner;
