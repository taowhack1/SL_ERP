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
  item_qa_columns,
  item_qa_detail_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { numberFormat } from "../../../include/js/main_config";

const { Text } = Typography;

const BulkFormula = ({ data_detail, readOnly, detailDispatch }) => {
  const item_list = useSelector((state) =>
    state.inventory.master_data.item_list.filter(
      (item) => item.type_id === 1 || item.type_id === 3
    )
  );
  const units = useSelector((state) => state.inventory.master_data.item_uom);
  const vendors = useSelector((state) => state.purchase.vendor.vendor_list);
  const addLine = () => {
    detailDispatch({ type: "ADD_ROW", payload: item_qa_detail_fields });
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

  const getFormulaPart = (number = 10) => {
    let arrayPart = [];
    for (let i = 65; i < 90 - number; i++) {
      arrayPart.push({
        item_formula_part: String.fromCharCode(i),
      });
    }
    console.log("arrayPart", arrayPart);
    return arrayPart;
  };

  const getFormulaNo = (part = "A") => {
    let arrayNo = [];
    for (let i = 1; i <= 30; i++) {
      arrayNo.push({
        item_formula_part: part,
        item_formula_no: part + numeral(i).format("00"),
      });
    }
    return arrayNo;
  };
  console.log(data_detail);
  return (
    <>
      <Row
        className="col-2 row-margin-vertical"
        style={{
          borderBottom: "1px solid #E5E5E5",
          paddingBottom: 10,
        }}
      >
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
          {data_detail.map((line, key) => (
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
                  name="item_formula_no"
                  field_id="item_formula_no"
                  field_name="item_formula_no"
                  value={line.item_formula_no}
                  data={getFormulaNo(line.item_formula_part)}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          item_formula_part: option.data.item_formula_part,
                          item_formula_no: option.data.item_formula_no,
                        })
                      : onChangeValue(line.id, {
                          item_formula_no: null,
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
                  name="item_formula_percentage"
                  placeholder="Percentage"
                  value={line.item_formula_percentage}
                  defaultValue={0.0}
                  min={0.0}
                  max={100.0}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  precision={3}
                  step={1.0}
                  onChange={(data) => {
                    onChangeValue(line.id, {
                      item_formula_percentage: data,
                    });
                  }}
                  style={{ width: "100%" }}
                  size="small"
                />
              </Col>
              <Col span={8} className="text-string">
                <Input
                  name="item_qa_detail_remark"
                  size="small"
                  placeholder={"Remark"}
                  onChange={(e) =>
                    onChangeValue({ item_qa_detail_remark: e.target.value })
                  }
                  value={line.item_qa_detail_remark}
                />
              </Col>

              <Col span={1} style={{ textAlign: "center" }}>
                <DeleteTwoTone onClick={() => delLine(line.id)} />
              </Col>
            </Row>
          ))}
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
          {data_detail.map((line, key) => (
            <Row
              key={line.item_vendor_id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={6}
              className="col-2"
            >
              <Col span={7} className="text-string">
                <Text>{line.vendor_no_name}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.item_vendor_lead_time}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>
                  {numeral(line.item_vendor_min_qty).format("0,0.000")}
                </Text>
              </Col>
              <Col span={2} className="text-string">
                <Text>{line.uom_no}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{numeral(line.item_vendor_price).format("0,0.000")}</Text>
              </Col>
              <Col span={5} className="text-number">
                <Text>{line.item_vendor_remark}</Text>
              </Col>
            </Row>
          ))}
        </> //close tag
      )}
      {/* end readonly */}
    </>
  );
};

export default BulkFormula;
