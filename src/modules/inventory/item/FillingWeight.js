import { Col, InputNumber, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import { item_packaging_weight_columns } from "../config/item";
import { ItemContext } from "../../../include/js/context";
const FillingWeight = ({ data_weight_detail, weightDetailDispatch }) => {
  const { readOnly, BULKList } = useContext(ItemContext);
  const onChangeValue = (rowId, data) => {
    weightDetailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };
  return (
    <>
      <Row className="col-2 detail-tab-row mt-3 mb-1">
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Weight
          </Text>
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={18}>
          <Row className="col-2 row-margin-vertical">
            <Col span={4}></Col>
            <Col span={18}>
              {/* Weight Columns */}
              <Row gutter={2} className="detail-table-head">
                {item_packaging_weight_columns &&
                  item_packaging_weight_columns.map((col, key) => {
                    return (
                      <Col key={col.id} span={col.size} className="col-outline">
                        {col.require && !readOnly && (
                          <span className="require">* </span>
                        )}
                        <Text strong>{col.name}</Text>
                      </Col>
                    );
                  })}
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={4}>
              <Text strong>Packaging Weight</Text>
            </Col>
            <Col span={18}>
              {/* weight */}
              <Row
                key={0}
                style={{
                  margin: "0px 1px",
                  backgroundColor: 0 % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${0}`}
                gutter={4}
                className="form-row"
              >
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[0].item_weight_standard_qty
                        ? convertDigit(
                            data_weight_detail[0].item_weight_standard_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_standard_qty"
                      placeholder="Standard"
                      value={data_weight_detail[0].item_weight_standard_qty}
                      defaultValue={0.0}
                      min={0.0001}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[0].id, {
                          item_weight_standard_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[0].item_weight_min_qty
                        ? convertDigit(
                            data_weight_detail[0].item_weight_min_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_min_qty"
                      placeholder="Min"
                      value={data_weight_detail[0].item_weight_min_qty}
                      defaultValue={0.0}
                      min={0.0001}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[0].id, {
                          item_weight_min_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[0].item_weight_max_qty
                        ? convertDigit(
                            data_weight_detail[0].item_weight_max_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_max_qty"
                      placeholder="Max"
                      value={data_weight_detail[0].item_weight_max_qty}
                      defaultValue={0.0}
                      min={0.0001}
                      // max={100.0}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[0].id, {
                          item_weight_max_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={4}>
              <Text strong>FG Weight </Text>
            </Col>
            <Col span={18}>
              {/* weight */}
              <Row
                key={1}
                style={{
                  margin: "0px 1px",
                  backgroundColor: 1 % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${1}`}
                gutter={4}
                className="form-row"
              >
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[1].item_weight_standard_qty
                        ? convertDigit(
                            data_weight_detail[1].item_weight_standard_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_standard_qty"
                      placeholder="Standard"
                      value={data_weight_detail[1].item_weight_standard_qty}
                      defaultValue={0.0}
                      min={0.0001}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[1].id, {
                          item_weight_standard_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[1].item_weight_min_qty
                        ? convertDigit(
                            data_weight_detail[1].item_weight_min_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_min_qty"
                      placeholder="Min"
                      value={
                        data_weight_detail.length &&
                        data_weight_detail[1].item_weight_min_qty
                      }
                      defaultValue={0.0}
                      min={0.0001}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[1].id, {
                          item_weight_min_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[1].item_weight_max_qty
                        ? convertDigit(
                            data_weight_detail[1].item_weight_max_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_max_qty"
                      placeholder="Max"
                      value={data_weight_detail[1].item_weight_max_qty}
                      defaultValue={0.0}
                      min={0.0001}
                      // max={100.0}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[1].id, {
                          item_weight_max_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={4}>
              <Text strong>FG Weight / Box</Text>
            </Col>
            <Col span={18}>
              {/* weight */}
              <Row
                key={2}
                style={{
                  margin: "0px 1px",
                  backgroundColor: 2 % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${2}`}
                gutter={4}
                className="form-row"
              >
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[2].item_weight_standard_qty
                        ? convertDigit(
                            data_weight_detail[2].item_weight_standard_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_standard_qty"
                      placeholder="Standard"
                      value={data_weight_detail[2].item_weight_standard_qty}
                      defaultValue={0.0}
                      min={0.0001}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[2].id, {
                          item_weight_standard_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[2].item_weight_min_qty
                        ? convertDigit(
                            data_weight_detail[2].item_weight_min_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_min_qty"
                      placeholder="Min"
                      value={data_weight_detail[2].item_weight_min_qty}
                      defaultValue={0.0}
                      min={0.0001}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[2].id, {
                          item_weight_min_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  {/* std. unit */}
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
                <Col span={5} className="text-number">
                  {readOnly ? (
                    <Text className="text-view text-number">
                      {data_weight_detail.length &&
                      data_weight_detail[2].item_weight_max_qty
                        ? convertDigit(
                            data_weight_detail[2].item_weight_max_qty
                          )
                        : "-"}
                    </Text>
                  ) : (
                    <InputNumber
                      {...numberFormat}
                      name="item_weight_max_qty"
                      placeholder="Max"
                      value={data_weight_detail[2].item_weight_max_qty}
                      defaultValue={0.0}
                      min={0.0001}
                      // max={100.0}
                      step={1.0}
                      onChange={(data) => {
                        onChangeValue(data_weight_detail[2].id, {
                          item_weight_max_qty: data,
                        });
                      }}
                      style={{ width: "100%" }}
                      size="small"
                    />
                  )}
                </Col>
                <Col span={3} className="text-center">
                  <Text>{"[ g ] Gram"}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>{/* Right Col */}</Col>
            <Col span={16}>{/* LEFT Col */}</Col>
          </Row>
          <Row className="col-2 row-tab-margin"></Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={2}></Col>
            <Col span={6}>{/* Right Col */}</Col>
            <Col span={16}>{/* LEFT Col */}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default FillingWeight;
