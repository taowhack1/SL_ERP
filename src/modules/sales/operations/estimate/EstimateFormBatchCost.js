import { InputNumber, Row, Col, Divider } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../include/js/main_config";

const EstimateFormBatchCost = ({
  title = "Title",
  showInput = [true, true, true, false],
}) => {
  return (
    <>
      <Divider />
      <Text strong>
        <u>{title}</u>
      </Text>
      <Row className="col-2 mt-1" gutter={16}>
        <Col span={4} className="text-center">
          <Text strong>Cost</Text>
        </Col>
        <Col span={4} offset={2} className="text-center">
          <Text strong>Waste %</Text>
        </Col>
        <Col span={4} offset={2} className="text-center">
          <Text strong>Markup %</Text>
        </Col>
        <Col span={4} offset={2} className="text-center">
          <Text strong>Total</Text>
        </Col>
      </Row>
      <Row className="col-2 mt-1" gutter={16}>
        <Col span={4} className="text-center">
          {showInput[0] ? (
            <Text>{convertDigit(1500, 4)}</Text>
          ) : (
            // <InputNumber
            //   className="w-100"
            //   size="small"
            //   defaultValue={0}
            //   precision={4}
            // />
            "-"
          )}
        </Col>
        <Col span={2} className="text-center">
          <Text>+</Text>
        </Col>
        <Col span={4} className="text-center">
          {showInput[1] ? (
            <Text>
              {convertDigit(3, 4)} <Text strong>%</Text>
            </Text>
          ) : (
            // <InputNumber
            //   formatter={(value) => `${value}%`}
            //   parser={(value) => value.replace("%", "")}
            //   precision={4}
            //   min={0}
            //   max={100}
            //   className="w-100"
            //   size="small"
            //   defaultValue={0}
            // />
            "-"
          )}
        </Col>
        <Col span={2} className="text-center">
          <Text>+</Text>
        </Col>
        <Col span={4} className="text-center">
          {showInput[2] ? (
            <InputNumber
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              precision={4}
              min={0}
              max={100}
              className="w-100"
              size="small"
              defaultValue={0}
            />
          ) : (
            "-"
          )}
        </Col>
        <Col span={2} className="text-center">
          <Text>=</Text>
        </Col>
        <Col span={4} style={{ padding: "0px 8px" }} className="text-center">
          {showInput[3] ? (
            <div className="text-right total-number-modal text-value">
              <Text style={{ color: "blue" }}>{"15,340.0000"}</Text>
            </div>
          ) : (
            "-"
          )}
        </Col>
      </Row>
    </>
  );
};

export default React.memo(EstimateFormBatchCost);
