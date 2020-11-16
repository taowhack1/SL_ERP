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
import { item_qa_columns, item_qa_detail_fields } from "../config/item";
import CustomSelect from "../../../components/CustomSelect";

const { Text } = Typography;

const ItemQADetail = ({ data_detail, readOnly, detailDispatch }) => {
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
  console.log(data_detail);
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {item_qa_columns &&
          item_qa_columns.map((col, key) => {
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
              <Col span={6} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Subject"}
                  name="subject_id"
                  field_id="subject_id"
                  field_name="subject_name"
                  value={line.subject_name}
                  data={[]}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          subject_id: option.data.subject_id,
                          subject_name: option.data.subject_name,
                        })
                      : onChangeValue(line.id, {
                          subject_id: null,
                          subject_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={6} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Specification"}
                  name="specification_id"
                  field_id="specification_id"
                  field_name="specification_name"
                  value={line.specification_name}
                  data={[]}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          specification_id: option.data.specification_id,
                          specification_name: option.data.specification_name,
                        })
                      : onChangeValue(line.id, {
                          specification_id: null,
                          specification_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={5} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Method"}
                  name="method_id"
                  field_id="method_id"
                  field_name="method_name"
                  value={line.method_name}
                  data={[]}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          method_id: option.data.method_id,
                          method_name: option.data.method_name,
                        })
                      : onChangeValue(line.id, {
                          method_id: null,
                          method_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={6} className="text-string">
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

export default ItemQADetail;
