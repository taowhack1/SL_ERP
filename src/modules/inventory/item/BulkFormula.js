import { Button, Row, Col, InputNumber, Typography } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useEffect, useReducer } from "react";
import {
  item_formula_columns,
  item_formula_detail_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit } from "../../../include/js/main_config";
import { reducer } from "../reducers";

const { Text } = Typography;

const BulkFormula = ({
  readOnly,
  item_part_id,
  data_formula_detail,
  formulaDetailDispatch,
  item_list,
  machineList,
}) => {
  const [detail, detailDispatch] = useReducer(reducer, data_formula_detail);
  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: {
        ...item_formula_detail_fields,
      },
    });
  };

  const delLine = (id) => {
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    detailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };

  useEffect(() => {
    !readOnly &&
      formulaDetailDispatch({
        type: "CHANGE_HEAD_VALUE",
        payload: {
          [item_part_id]: detail,
        },
      });
  }, [detail]);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={3}>
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Formula
          </Text>
        </Col>
        <Col span={10} className="text-left"></Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      {/* Column Header */}
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {item_formula_columns &&
            item_formula_columns.map((col, key) => {
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
            {data_formula_detail.map((line, key) => (
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
                <Col span={9} className="text-string">
                  <CustomSelect
                    allowClear
                    showSearch
                    size={"small"}
                    placeholder={"Raw Material Code"}
                    name="item_id_formula"
                    field_id="item_id"
                    field_name="item_no_name"
                    value={line.item_no_name}
                    data={item_list}
                    onChange={(data, option) => {
                      data && data
                        ? onChangeValue(line.id, {
                            item_id_formula: option.data.item_id,
                            item_no_name: option.data.item_no_name,
                          })
                        : onChangeValue(line.id, {
                            item_id_formula: null,
                            item_no_name: null,
                          });
                    }}
                  />
                </Col>
                <Col span={9} className="text-string">
                  <CustomSelect
                    allowClear
                    showSearch
                    size="small"
                    placeholder={"Select Machine"}
                    name="machine_id_formula"
                    field_id="machine_id"
                    field_name="machine_no_name"
                    value={line.machine_no_name}
                    data={machineList}
                    onChange={(data, option) => {
                      data && data
                        ? onChangeValue(line.id, {
                            machine_id_formula: option.data.machine_id,
                            machine_no_name: option.data.machine_no_name,
                          })
                        : onChangeValue(line.id, {
                            machine_id_formula: null,
                            machine_no_name: null,
                          });
                    }}
                  />
                </Col>
                <Col span={4} className="text-number">
                  <InputNumber
                    name="item_formula_qty"
                    placeholder="Percentage"
                    value={line.item_formula_qty}
                    defaultValue={0.0}
                    min={0.0}
                    max={100.0}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                    precision={3}
                    step={1.0}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        item_formula_qty: data,
                      });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
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
            {data_formula_detail.map((line, key) => (
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

export default React.memo(BulkFormula);
