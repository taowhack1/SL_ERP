import { ProfileOutlined } from "@ant-design/icons";
import { Col, InputNumber, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import CustomLabel from "../../../components/CustomLabel";
import { ItemContext } from "../../../include/js/context";
import { convertDigit, getNumberFormat } from "../../../include/js/main_config";

const ItemInventoryData = () => {
  const { data_head, saveForm, readOnly } = useContext(ItemContext);
  const [state, setState] = useState({
    item_min_qty: data_head.item_min_qty,
    item_max_qty: data_head.item_max_qty,
  });

  const onChange = (data) => setState({ ...state, ...data });
  const onSave = () => saveForm(state);
  return (
    <>
      <Row className="col-2 row-margin-vertical detail-tab-row">
        <Space>
          <Text strong style={{ fontSize: 16, marginRight: 10 }}>
            <ProfileOutlined style={{ marginRight: 10 }} />
            {"Standard Quantity."}
          </Text>
        </Space>
      </Row>
      <Row className="mt-2">
        <Col span={12} className="col-border-right">
          <Row className="col-2 row-margin-vertical">
            <Col offset={1} span={6}>
              <CustomLabel label="Minimum :" require readOnly={readOnly} />
            </Col>
            <Col span={11}>
              {readOnly ? (
                <div className="text-right">
                  <Text className="text-value pd-right-2">
                    {convertDigit(data_head.item_min_qty)}
                  </Text>
                </div>
              ) : (
                <InputNumber
                  {...getNumberFormat(4)}
                  className="full-width"
                  min={0}
                  value={state.item_min_qty}
                  onChange={(val) => onChange({ item_min_qty: val })}
                  onBlur={onSave}
                />
              )}
            </Col>
            <Col span={6}>
              <Text className="text-value pd-left-1" strong>
                {data_head.uom_no_name}
              </Text>
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={6} offset={1}>
              <CustomLabel label="Maximum :" require readOnly={readOnly} />
            </Col>
            <Col span={11}>
              {readOnly ? (
                <div className="text-right">
                  <Text className="text-value pd-right-2">
                    {convertDigit(data_head.item_max_qty)}
                  </Text>
                </div>
              ) : (
                <InputNumber
                  {...getNumberFormat(4)}
                  className="full-width"
                  min={0}
                  value={state.item_max_qty}
                  onChange={(val) => onChange({ item_max_qty: val })}
                  onBlur={onSave}
                />
              )}
            </Col>
            <Col span={6}>
              <Text className="text-value pd-left-1" strong>
                {data_head.uom_no_name}
              </Text>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          {/* <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label="Maximum Qty. :" require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              <InputNumber />
            </Col>
            <Col span={2}></Col>
          </Row> */}
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ItemInventoryData);
