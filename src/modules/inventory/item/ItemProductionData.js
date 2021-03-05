import { ProfileOutlined } from "@ant-design/icons";
import { Col, InputNumber, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import CustomLabel from "../../../components/CustomLabel";
import { ItemContext } from "../../../include/js/context";
import { convertDigit, getNumberFormat } from "../../../include/js/main_config";

const ItemProductionData = () => {
  const { data_head, saveForm, readOnly } = useContext(ItemContext);
  const [state, setState] = useState({
    item_loss_percent_qty: data_head.item_loss_percent_qty,
  });

  const onChange = (data) => setState({ ...state, ...data });
  const onSave = () => saveForm(state);
  return (
    <>
      <Row className="col-2 row-margin-vertical detail-tab-row">
        <Space>
          <Text strong style={{ fontSize: 16, marginRight: 10 }}>
            <ProfileOutlined style={{ marginRight: 10 }} />
            {"General Data."}
          </Text>
        </Space>
      </Row>
      <Row className="mt-2">
        <Col span={12} className="col-border-right">
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={6}>
              <CustomLabel label="Scrap in % :" require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <div className="text-left">
                  <Text className="text-value pd-left-2">
                    {convertDigit(data_head.item_loss_percent_qty, 6)}
                  </Text>
                </div>
              ) : (
                <InputNumber
                  {...getNumberFormat(6)}
                  className="full-width"
                  min={0}
                  value={state.item_loss_percent_qty}
                  onChange={(val) => onChange({ item_loss_percent_qty: val })}
                  onBlur={onSave}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col span={12}></Col>
      </Row>
    </>
  );
};

export default React.memo(ItemProductionData);
