import { Button, Row, Col, InputNumber, Typography } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useEffect, useReducer } from "react";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import { reducer } from "../reducers";
import {
  workOrderRMColumns,
  workOrderRMDetailFields,
} from "../config/workOrder";

const { Text } = Typography;

const TabWorkOrderRMDetail = ({
  readOnly,
  data_rm_detail,
  rmDetailDispatch,
  itemList,
}) => {
  const addLine = () => {
    rmDetailDispatch({
      type: "ADD_ROW",
      payload: workOrderRMDetailFields,
    });
  };

  const delLine = (id) => {
    rmDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    rmDetailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };

  // useEffect(() => {
  //   !readOnly &&
  //     formulaDetailDispatch({
  //       type: "CHANGE_HEAD_VALUE",
  //       payload: {
  //         [item_part_id]: detail,
  //       },
  //     });
  // }, [detail]);
  console.log("TabWorkOrderRMDetail");
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={13} className="text-left">
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Raw Material List
          </Text>
        </Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      {/* Column Header */}
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {workOrderRMColumns &&
            workOrderRMColumns.map((col, key) => {
              return (
                <Col key={col.id} span={col.size} className="col-outline">
                  {col.require && !readOnly && (
                    <span className="require">* </span>
                  )}
                  <Text strong>{col.name}</Text>
                </Col>
              );
            })}

          <Col span={1} className="col-outline">
            <Text strong>
              <EllipsisOutlined />
            </Text>
          </Col>
        </Row>
        {!readOnly ? (
          <>
            {/* Edit Form */}
            {data_rm_detail.map((line, key) => (
              <Row
                key={line.id}
                style={{
                  margin: "0px 1px",
                  backgroundColor: key % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${key}`}
                gutter={4}
                className="form-row"
              >
                <Col span={1} className="text-center">
                  <Text>{key + 1}</Text>
                </Col>
                <Col span={11} className="text-string">
                  <CustomSelect
                    allowClear
                    showSearch
                    size={"small"}
                    placeholder={"Raw Material Code"}
                    name="item_id"
                    field_id="item_id"
                    field_name="item_no_name"
                    value={line.item_no_name}
                    data={itemList}
                    onChange={(data, option) => {
                      data && data
                        ? onChangeValue(line.id, {
                            item_id: option.data.item_id,
                            item_no_name: option.data.item_no_name,
                            uom_id: option.data.uom_id,
                            uom_name: option.data.uom_name,
                          })
                        : onChangeValue(line.id, {
                            item_id: null,
                            item_no_name: null,
                            uom_id: null,
                            uom_name: null,
                          });
                    }}
                  />
                </Col>
                <Col span={3} className="text-number input-string-disabled">
                  <Text className="text-value text-right">
                    {convertDigit(line.item_cal_qty) ?? "-"}
                  </Text>
                </Col>
                <Col span={3} className="text-number input-string-disabled">
                  <Text className="text-value text-right">
                    {convertDigit(line.item_on_stock_qty) ?? "-"}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <InputNumber
                    {...numberFormat}
                    placeholder={"Qty. to PR"}
                    min={0.0}
                    step={0.001}
                    style={{ width: "100%" }}
                    disabled={0}
                    name="item_qty"
                    value={line.item_qty}
                    onChange={(data) =>
                      onChangeValue(line.id, { item_qty: data })
                    }
                    size="small"
                  />
                </Col>

                <Col span={2} className="text-center input-string-disabled">
                  <Text className="text-value ">{line.uom_name ?? "-"}</Text>
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                  <DeleteTwoTone onClick={() => delLine(line.id)} />
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              // className="primary"
              onClick={() => {
                addLine();
              }}
              style={{ borderRadius: 3, marginTop: 10 }}
              block
            >
              <PlusOutlined /> Add a line
            </Button>
          </>
        ) : (
          <>
            {/* View Form */}
            {data_rm_detail.map((line, key) => (
              <Row
                key={line.id}
                style={{
                  margin: "0px 1px",
                  backgroundColor: key % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${key}`}
                gutter={4}
                className="form-row"
              >
                <Col span={1} className="text-center">
                  <Text className="text-value">{key + 1}</Text>
                </Col>
                <Col span={9}>
                  <Text className="text-left text-value">
                    {line.item_no_name ?? "-"}
                  </Text>
                </Col>
                <Col span={9}>
                  <Text className="text-left text-value">
                    {line.machine_no_name ?? "-"}
                  </Text>
                </Col>
                <Col span={4} className="text-number">
                  <Text className="text-right text-value">
                    {convertDigit(line.item_formula_qty) ?? "-"} %
                  </Text>
                </Col>
              </Row>
            ))}
          </> //close tag
        )}
        {/* end readonly */}
      </div>
    </>
  );
};

export default React.memo(TabWorkOrderRMDetail);
