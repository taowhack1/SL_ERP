import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../components/CustomLabel";

const FillingProcessSummary = ({ worker, time }) => {
  return (
    <>
      <Row className={"mb-1"}>
        <Col span={18}></Col>
        <Col span={6}>
          <Row className="col-2 row-margin-vertical">
            <Col span={11}>
              <CustomLabel label={"Total Worker : "} />
            </Col>
            <Col span={5} className="text-right">
              <Text strong className={!worker ? "require" : "text-value"}>
                {worker ?? 0}
              </Text>
            </Col>
          </Row>
          <Row className="col-2">
            <Col span={11}>
              <CustomLabel label={"Total Time : "} />
            </Col>
            <Col span={5} className="text-right">
              <Text strong className="text-value">
                <Text strong className={!time ? "require" : "text-value"}>
                  {time ?? 0}
                </Text>
              </Text>
            </Col>
            <Col span={8} className={"pd-left-1 text-right"}>
              <Text strong>{"Hours"}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(FillingProcessSummary);
