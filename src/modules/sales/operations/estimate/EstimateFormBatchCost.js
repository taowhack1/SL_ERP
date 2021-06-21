import { InputNumber, Row, Col, Divider } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { convertDigit } from "../../../../include/js/main_config";

const EstimateFormBatchCost = ({
  name,
  fields,
  showInput = [true, true, true, false],
  data,
  onChangeMarkup,
}) => {
  return (
    <>
      <Divider />
      <Text strong>
        <u>{name}</u>
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
          {showInput[0] ? <Text>{convertDigit(data[fields[0]], 4)}</Text> : "-"}
        </Col>
        <Col span={2} className="text-center">
          <Text>+</Text>
        </Col>
        <Col span={4} className="text-center">
          {showInput[1] ? (
            <Text>
              {convertDigit(data[fields[1]], 4)} <Text strong>%</Text>
            </Text>
          ) : (
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
              className="w-100"
              size="small"
              disabled={data.npr_product_cost_detail_id !== null ? false : true}
              value={data[fields[2]] || 0}
              defaultValue={data[fields[2]] || 0}
              onChange={(val) =>
                onChangeMarkup(data.npr_estimate_type_id, { [fields[2]]: val })
              }
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
              <Text style={{ color: "blue" }}>
                {convertDigit(data[fields[3]], 4)}
              </Text>
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
