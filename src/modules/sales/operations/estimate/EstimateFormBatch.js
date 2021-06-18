import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Divider } from "antd";
import CustomSelect from "../../../../components/CustomSelect";
import EstimateFormBatchCostList from "./EstimateFormBatchCostList";
import Text from "antd/lib/typography/Text";
import { NPREstimateContext } from "./EstimateForm";
import { convertDigit } from "../../../../include/js/main_config";

const EstimateFormBatch = ({
  data,
  getBatchCost,
  batchList,
  onChangeMarkup,
}) => {
  return (
    <>
      <Row>
        <Col span={3}>
          <Text strong>Batch Size</Text>
        </Col>
        <Col span={6}>
          <CustomSelect
            placeholder="Select batch size"
            data={batchList}
            allowClear
            field_id="npr_product_cost_detail_id"
            field_name="npr_product_cost_detail_batch_size"
            onChange={(val) => {
              getBatchCost(val);
            }}
          />
        </Col>
      </Row>
      <EstimateFormBatchCostList data={data} onChangeMarkup={onChangeMarkup} />
      <Divider />
      <Row gutter={[8, 8]}>
        <Col span={3} offset={15} className="text-right">
          <Text strong>Total :</Text>
        </Col>
        <Col span={4}>
          <div className="text-right">
            <Text strong>
              {convertDigit(data?.tg_npr_estimate_detail_total_amount, 4) ??
                "-"}
            </Text>
          </div>
        </Col>
        <Col span={2}></Col>
      </Row>
    </>
  );
};

export default React.memo(EstimateFormBatch);
