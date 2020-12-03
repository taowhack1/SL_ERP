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
  item_process_specification_columns,
  item_qa_columns,
  item_qa_detail_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../include/js/main_config";

const { Text } = Typography;

const PartSpecification = ({
  readOnly,
  data_part_detail,
  partDetailDispatch,
  item_list,
}) => {
  const addLine = () => {
    partDetailDispatch({
      type: "ADD_ROW",
      payload: item_formula_detail_fields,
    });
  };

  const delLine = (id) => {
    partDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    partDetailDispatch({
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
        <Col span={7}>
          {/* <div className="detail-tab-header"> */}
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Part Specification
          </Text>
          {/* </div> */}
        </Col>
        <Col span={6} className="text-left"></Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      {/* Column Header */}
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {item_process_specification_columns &&
            item_process_specification_columns.map((col, key) => {
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
            {data_part_detail.map((line, key) => (
              <Row
                key={line.id}
                style={{
                  margin: "0px 1px",
                  backgroundColor: "#FCFCFC",
                }}
                name={`row-${key}`}
                gutter={4}
                className="form-row"
              >
                <Col span={1} className="text-center">
                  {key + 1}
                </Col>
                <Col span={14} className="text-left">
                  <CustomSelect
                    allowClear
                    showSearch
                    size={"small"}
                    placeholder={"Condition"}
                    name="item_formula_part"
                    field_id="item_formula_part"
                    field_name="item_formula_part"
                    value={line.item_formula_part}
                    data={[]}
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
                <Col span={8} className="text-left">
                  <Input
                    name="item_part_set"
                    size="small"
                    placeholder={"Set"}
                    onChange={(e) =>
                      onChangeValue(line.id, {
                        item_part_set: e.target.value,
                      })
                    }
                    value={line.item_part_set}
                  />
                </Col>
                {/* <Col span={8} className="text-left">
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
                </Col> */}

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
            {data_part_detail.map((line, key) => (
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
                <Col span={1} className="text-center">
                  <Text>{key + 1}</Text>
                </Col>
                <Col span={6} className="text-center">
                  <Text>{line.item_formula_part_no}</Text>
                </Col>
                <Col span={5} className="text-string">
                  <Text>
                    <Text>{line.item_no_name}</Text>
                  </Text>
                </Col>
                <Col span={11} className="text-string">
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

export default React.memo(PartSpecification);
