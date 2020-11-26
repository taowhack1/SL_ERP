import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Input,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
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
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Formula
          </Text>
        </Col>
      </Row>
      {/* Column Header */}
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
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              name={`row-${key}`}
              gutter={6}
              className="col-2"
            >
              <Col span={3} className="text-center">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Part"}
                  name="item_formula_part"
                  field_id="item_formula_part"
                  field_name="item_formula_part"
                  value={line.item_formula_part}
                  data={getFormulaPart()}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          item_formula_part: option.data.item_formula_part,
                          item_formula_no: null,
                        })
                      : onChangeValue(line.id, {
                          item_formula_no: null,
                          item_formula_part: null,
                        });
                  }}
                />
              </Col>
              <Col span={3} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"No."}
                  name="item_formula_part_no"
                  field_id="item_formula_part_no"
                  field_name="item_formula_part_no"
                  value={line.item_formula_part_no}
                  data={getFormulaNo(line.item_formula_part)}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          item_formula_part: option.data.item_formula_part,
                          item_formula_part_no:
                            option.data.item_formula_part_no,
                        })
                      : onChangeValue(line.id, {
                          item_formula_part_no: null,
                        });
                  }}
                />
              </Col>
              <Col span={6} className="text-string">
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
              <Col span={3} className="text-string">
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
              <Col span={8} className="text-string">
                <Input
                  name="item_formula_remark"
                  size="small"
                  placeholder={"Remark"}
                  onChange={(e) =>
                    onChangeValue(line.id, {
                      item_formula_remark: e.target.value,
                    })
                  }
                  value={line.item_formula_remark}
                />
              </Col>

              <Col span={1} style={{ textAlign: "center" }}>
                <DeleteTwoTone onClick={() => delLine(line.id)} />
              </Col>
            </Row>
          ))}

          <Row class="row-tab-margin col-2" gutter={6}>
            <Col span={12}></Col>
            <Col span={12}>
              {/* <Row gutter={6}>
                <Col span={6} className="col-left text-right">
                  {" "}
                  <Text>Total %(W/W)</Text>
                </Col>
                <Col span={16} className="col-right text-center">
                  <Text>100.000%</Text>
                </Col>
                <Col span={2}></Col>
              </Row> */}
              <Row
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                gutter={6}
                className="col-2"
              >
                <Col span={6} className="text-right">
                  <div className="detail-box text-right">
                    <Text strong>Total %(W/W)</Text>
                  </div>
                </Col>
                <Col span={16} className="text-center">
                  <div className="detail-box text-center">
                    <Text strong>100.000%</Text>
                  </div>
                </Col>

                <Col span={2} style={{ textAlign: "center" }}></Col>
              </Row>
            </Col>
          </Row>
          <div style={{ marginTop: 10 }}>
            <Button
              type="dashed"
              onClick={() => {
                addLine();
              }}
              block
            >
              <PlusOutlined /> Add a line
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* View Form */}
          {data_formula_detail.map((line, key) => (
            <Row
              key={line.id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={6}
              className="col-2"
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
    </>
  );
};

export default React.memo(BulkFormula);
