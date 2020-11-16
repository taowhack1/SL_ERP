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
  EyeOutlined,
  EditTwoTone,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import numeral from "numeral";
import {
  item_formula_columns,
  item_packaging_process_columns,
  item_qa_columns,
  item_qa_detail_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { numberFormat } from "../../../include/js/main_config";

const { Text } = Typography;

const PackagingProcess = ({ data_detail, readOnly, detailDispatch }) => {
  const item_list = useSelector((state) =>
    state.inventory.master_data.item_list.filter(
      (item) => item.type_id === 1 || item.type_id === 3
    )
  );
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
        {item_packaging_process_columns &&
          item_packaging_process_columns.map((col, key) => {
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
              gutter={3}
              className="col-2"
            >
              <Col span={3} className="text-center">
                <CustomSelect
                  allowClear
                  showSearch
                  size="small"
                  className={"filling-process-input"}
                  placeholder={"Item Code"}
                  name="item_no"
                  field_id="item_id"
                  field_name="item_no_name"
                  value={line.item_no}
                  data={item_list}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          item_no: option.data.item_no,
                          item_name: option.data.item_name,
                          item_image: option.data.item_image,
                        })
                      : onChangeValue(line.id, {
                          item_no: null,
                          item_name: null,
                          item_image: null,
                          packaging_item_qty: 0,
                          packaging_method: null,
                        });
                  }}
                />
              </Col>
              <Col span={5} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size="small"
                  className={"filling-process-input"}
                  placeholder={"Item Name"}
                  name="item_name"
                  field_id="item_id"
                  field_name="item_no_name"
                  value={line.item_name}
                  data={item_list}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          item_no: option.data.item_no,
                          item_name: option.data.item_name,
                          item_image: option.data.item_image,
                        })
                      : onChangeValue(line.id, {
                          item_no: null,
                          item_name: null,
                          item_image: null,
                          packaging_item_qty: 0,
                          packaging_method: null,
                        });
                  }}
                />
              </Col>
              <Col span={3} className="text-string">
                <InputNumber
                  {...numberFormat}
                  size="small"
                  className={"filling-process-input"}
                  name="packaging_item_qty"
                  placeholder="Qty. / pcs"
                  value={line.packaging_item_qty}
                  defaultValue={0.0}
                  min={0.0}
                  step={1.0}
                  onChange={(data) => {
                    onChangeValue(line.id, {
                      packaging_item_qty: data,
                    });
                  }}
                  style={{ width: "100%" }}
                  size="small"
                />
              </Col>
              <Col span={3} className="text-string">
                {/* Packaging Method */}
                <CustomSelect
                  allowClear
                  showSearch
                  size="small"
                  className={"filling-process-input"}
                  placeholder={"Method"}
                  name="packaging_method"
                  field_id="packaging_method"
                  field_name="packaging_method"
                  value={line.packaging_method}
                  data={[]}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          packaging_method: option.data.packaging_method,
                        })
                      : onChangeValue(line.id, {
                          packaging_method: null,
                        });
                  }}
                />
              </Col>
              <Col span={6} className="text-string">
                <Input
                  name="packaging_method_remark"
                  size="small"
                  className={"filling-process-input"}
                  placeholder={"Remark"}
                  onChange={(e) =>
                    onChangeValue({ packaging_method_remark: e.target.value })
                  }
                  value={line.packaging_method_remark}
                />
              </Col>
              <Col span={3} className="text-center">
                {/* Item Image */}
                <div className="input-center-disabled">
                  <Space size={24}>
                    <EditTwoTone
                      className="button-icon"
                      title="Edit Image"
                      onClick={() => console.log("Edit Image")}
                    />
                    <EyeOutlined
                      className="button-icon"
                      title="View Image"
                      onClick={() => console.log("View Image")}
                    />
                  </Space>
                </div>
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

export default PackagingProcess;
