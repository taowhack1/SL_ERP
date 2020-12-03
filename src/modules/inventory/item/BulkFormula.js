import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Input,
  Space,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import numeral from "numeral";
import {
  item_formula_columns,
  item_formula_detail_fields,
  item_qa_columns,
  item_qa_detail_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../include/js/main_config";

const { Text } = Typography;

const BulkFormula = ({
  readOnly,
  data_formula_detail,
  formulaDetailDispatch,
  item_list,
}) => {
  const { machineList } = useSelector((state) => state.production.machine);
  const addLine = () => {
    formulaDetailDispatch({
      type: "ADD_ROW",
      payload: item_formula_detail_fields,
    });
  };

  const delLine = (id) => {
    formulaDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    formulaDetailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };

  const getFormulaPart = (number = 10) => {
    let arrayPart = [];
    for (let i = 65; i < 90 - number; i++) {
      arrayPart.push({
        item_formula_part: String.fromCharCode(i),
      });
    }
    return arrayPart;
  };

  const getFormulaNo = (part = "A") => {
    let arrayNo = [];
    let part_temp = part && part !== undefined ? part : "A";
    for (let i = 1; i <= 30; i++) {
      arrayNo.push({
        item_formula_part: part_temp,
        item_formula_part_no: part_temp + numeral(i).format("00"),
      });
    }
    return arrayNo;
  };
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
                  // backgroundColor: key % 2 ? "#F1F1F1" : "#FCFCFC",
                  backgroundColor: "#FCFCFC",
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
                    name="item_id"
                    field_id="item_id"
                    field_name="item_no_name"
                    value={line.item_no_name}
                    data={item_list}
                    onChange={(data, option) => {
                      data && data
                        ? onChangeValue(line.id, {
                            item_id: option.data.item_id,
                            item_no_name: option.data.item_no_name,
                          })
                        : onChangeValue(line.id, {
                            item_id: null,
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
                    name="machine_no_name"
                    field_id="machine_id"
                    field_name="machine_no_name"
                    value={line.machine_no_name}
                    data={machineList}
                    onChange={(data, option) => {
                      data && data
                        ? onChangeValue(line.id, {
                            machine_id: option.data.machine_id,
                            machine_no_name: option.data.machine_no_name,
                          })
                        : onChangeValue(line.id, {
                            machine_id: null,
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
                  backgroundColor: key % 2 ? "#F1F1F1" : "#FCFCFC",
                }}
                name={`row-${key}`}
                gutter={4}
                className="form-row"
              >
                <Col span={3} className="text-center">
                  <Text>{line.item_formula_part}</Text>
                </Col>
                <Col span={3} className="text-center">
                  <Text>{line.item_formula_part_no}</Text>
                </Col>
                <Col span={6} className="text-string">
                  <Text>
                    <Text>{line.item_no_name}</Text>
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text>{convertDigit(line.item_formula_qty)} % </Text>
                </Col>
                <Col span={8} className="text-string">
                  <Text>{line.item_formula_remark}</Text>
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
