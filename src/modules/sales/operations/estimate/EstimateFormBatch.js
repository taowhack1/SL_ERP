import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Divider, Button } from "antd";
import CustomSelect from "../../../../components/CustomSelect";
import EstimateFormBatchCostList from "./EstimateFormBatchCostList";
import Text from "antd/lib/typography/Text";
import { NPREstimateContext } from "./EstimateForm";
import { convertDigit } from "../../../../include/js/main_config";
import { CalculatorOutlined, SyncOutlined } from "@ant-design/icons";

const EstimateFormBatch = ({
  data,
  getBatchCost,
  batchList,
  onChangeMarkup,
  calculate,
  isCal,
}) => {
  return (
    <>
      <Row>
        <Col span={3}>
          <Text strong>Batch Size</Text>
        </Col>
        <Col span={6}>
          {data.npr_estimate_id ? (
            <Text>{data.npr_product_cost_detail_batch_size}</Text>
          ) : (
            <CustomSelect
              allowClear
              placeholder="Select batch size"
              data={batchList}
              field_id="npr_product_cost_detail_id"
              field_name="npr_product_cost_detail_batch_size"
              value={data.npr_product_cost_detail_id}
              onChange={(val) => {
                getBatchCost(val);
              }}
            />
          )}
        </Col>
      </Row>
      <EstimateFormBatchCostList data={data} onChangeMarkup={onChangeMarkup} />
      <Divider />
      <Row gutter={[8, 8]} className="col-2">
        <Col span={3} offset={12} className="text-right">
          <Button
            disabled={!isCal}
            className={isCal ? "primary" : ""}
            icon={<SyncOutlined />}
            onClick={calculate}
          >
            Calculate
          </Button>
        </Col>
        <Col span={2} className="text-right">
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
