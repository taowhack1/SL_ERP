import { Button, Row, Col, InputNumber, Typography, Input } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import {
  item_detail_fields,
  item_vendor_columns,
} from "../modules/inventory/config/item";
import { useSelector } from "react-redux";
import CustomSelect from "./CustomSelect";
import { convertDigit } from "../include/js/main_config";

const { Text } = Typography;

const VendorLine = ({ data_head, data_detail, readOnly, detailDispatch }) => {
  const units = useSelector((state) => state.inventory.master_data.item_uom);
  const vendors = useSelector((state) => state.purchase.vendor.vendor_list);
  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: {
        ...item_detail_fields,
        uom_id: data_head.uom_id && data_head.uom_id,
        uom_name: data_head.uom_name && data_head.uom_name,
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
      detailDispatch({
        type: "SET_DETAIL",
        payload: data_detail.map((detail) => {
          return {
            ...detail,
            uom_id: data_head.uom_id,
            uom_name: data_head.uom_name,
          };
        }),
      });
  }, [data_head.uom_id]);
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {item_vendor_columns &&
          item_vendor_columns.map((col, key) => {
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
              <Col span={6} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Vendor"}
                  name="vendor_id"
                  field_id="vendor_id"
                  field_name="vendor_no_name"
                  value={line.vendor_no_name}
                  data={vendors}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          vendor_id: option.data.vendor_id,
                          vendor_no_name: option.data.vendor_no_name,
                        })
                      : onChangeValue(line.id, {
                          vendor_id: null,
                          vendor_no_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={3} className="text-string">
                <InputNumber
                  placeholder={"Lead time"}
                  min={0}
                  step={1}
                  precision={0}
                  style={{ width: "100%" }}
                  disabled={0}
                  name="item_vendor_lead_time_day"
                  value={line.item_vendor_lead_time_day}
                  onChange={(data) =>
                    onChangeValue(line.id, { item_vendor_lead_time_day: data })
                  }
                  size="small"
                />
              </Col>
              <Col span={3} className="text-number">
                <InputNumber
                  placeholder={"Min Quantity"}
                  min={0.0}
                  step={0.0001}
                  precision={4}
                  style={{ width: "100%" }}
                  disabled={0}
                  name="item_vendor_min_qty"
                  value={line.item_vendor_min_qty}
                  onChange={(data) =>
                    onChangeValue(line.id, { item_vendor_min_qty: data })
                  }
                  size="small"
                />
              </Col>

              <Col span={2} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  disabled
                  size={"small"}
                  placeholder={"Select UOM"}
                  name="uom_id"
                  field_id="uom_id"
                  field_name="uom_name"
                  value={line.uom_name}
                  data={units}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          uom_id: option.data.uom_id,
                          uom_no: option.data.uom_no,
                          uom_name: option.data.uom_name,
                        })
                      : onChangeValue(line.id, {
                          uom_id: null,
                          uom_no: null,
                          uom_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={3} className="text-number">
                <InputNumber
                  placeholder={"Unit/Price"}
                  min={0.0}
                  step={50.0}
                  precision={3}
                  style={{ width: "100%" }}
                  disabled={0}
                  name="item_vendor_price"
                  value={line.item_vendor_price}
                  onChange={(data) =>
                    onChangeValue(line.id, { item_vendor_price: data })
                  }
                  size="small"
                />
              </Col>
              <Col span={5} className="text-number">
                <Input
                  placeholder={"Remark"}
                  style={{ width: "100%" }}
                  disabled={0}
                  name="item_vendor_remark"
                  value={line.item_vendor_remark}
                  onChange={(e) =>
                    onChangeValue(line.id, {
                      item_vendor_remark: e.target.value,
                    })
                  }
                  size="small"
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
              <Col span={6} className="text-string">
                <Text>{line.vendor_no_name ?? "-"}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{line.item_vendor_lead_time_day ?? "-"}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{convertDigit(line.item_vendor_min_qty) ?? "-"}</Text>
              </Col>
              <Col span={2} className="text-string">
                <Text>{line.uom_name ?? "-"}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text>{convertDigit(line.item_vendor_price) ?? "-"}</Text>
              </Col>
              <Col span={5} className="text-string">
                <Text>{line.item_vendor_remark ?? "-"}</Text>
              </Col>
            </Row>
          ))}
        </> //close tag
      )}
      {/* end readonly */}
    </>
  );
};

export default VendorLine;
