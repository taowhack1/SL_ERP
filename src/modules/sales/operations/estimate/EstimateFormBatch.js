import React from "react";
import { Row, Col } from "antd";
import CustomSelect from "../../../../components/CustomSelect";
import EstimateFormBatchCostList from "./EstimateFormBatchCostList";
import Text from "antd/lib/typography/Text";

const EstimateFormBatch = () => {
  return (
    <>
      <Row>
        <Col span={3}>
          <Text strong>Batch Size</Text>
        </Col>
        <Col span={6}>
          <CustomSelect
            placeholder="Select batch size"
            data={[
              {
                label: 100,
                value: 100,
              },
              {
                label: 200,
                value: 200,
              },
              {
                label: 300,
                value: 300,
              },
            ]}
            allowClear
            field_id="label"
            field_name="value"
            onChange={(e) => {
              //   CalculateValueBatch();
              //   setDisplay(false);
            }}
          />
        </Col>
      </Row>
      <EstimateFormBatchCostList />
    </>
  );
};

export default React.memo(EstimateFormBatch);
