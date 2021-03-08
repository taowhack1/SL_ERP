import { Col, InputNumber, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import CustomLabel from "../../../components/CustomLabel";
import { ItemContext } from "../../../include/js/context";

const ItemFGPacking = () => {
  const { readOnly, data_head, saveForm } = useContext(ItemContext);
  const [state, setState] = useState(data_head.item_box_qty ?? 0);
  console.log(state);
  return (
    <>
      <Row className="col-2 detail-tab-row mt-3 mb-1">
        <Col span={24}>
          <Text strong className="detail-tab-header">
            {"FG Packing"}
          </Text>
        </Col>
      </Row>
      <Row className="col-2">
        <Col span={12}>
          <Row className="col-2">
            <Col span={7}>
              <CustomLabel
                require
                readOnly={readOnly}
                label={"Pieces / Box :"}
              />
            </Col>
            <Col span={10}>
              {readOnly ? (
                <Text className="text-value">{state}</Text>
              ) : (
                <InputNumber
                  className="full-width"
                  name={"item_box_qty"}
                  placeholder="Pcs."
                  min={0}
                  step={1}
                  defaultValue={0}
                  precision={0}
                  value={state}
                  onChange={(val) => {
                    setState(val);
                  }}
                  onBlur={(e) => {
                    saveForm({ item_box_qty: state });
                  }}
                />
              )}
            </Col>
            <Col span={2} className="text-center">
              <Text className="text-value" strong>
                {" "}
                {data_head.uom_no}
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ItemFGPacking);
