import {
  Button,
  Row,
  Col,
  InputNumber,
  Typography,
  Select,
  DatePicker,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import moment from "moment";

import { so_detail_fields, so_detail_columns } from "./configs";
import CustomSelect from "../../components/CustomSelect";
import {
  calSubtotal,
  sortData,
  sumArrObj,
} from "../../include/js/function_main";
import numeral from "numeral";
import { convertDigit } from "../../include/js/main_config";
const { Text } = Typography;
const { Option } = Select;

const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const SO_Detail = ({
  readOnly,
  data_detail,
  detailDispatch,
  headDispatch,
  vat_rate,
}) => {
  // state
  const select_items = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );

  const updateAmount = () => {
    const obj = sumArrObj(data_detail, "so_detail_total_price", vat_rate);
    headDispatch({
      type: "CHANGE_HEAD_VALUE",
      payload: {
        tg_so_sum_amount: obj.exclude_vat,
        tg_so_vat_amount: obj.vat,
        tg_so_total_amount: obj.include_vat,
      },
    });
  };

  useEffect(() => {
    !readOnly && updateAmount();
  }, [data_detail]);

  // function
  const addLine = () => {
    detailDispatch({ type: "ADD_ROW", payload: so_detail_fields });
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

  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {so_detail_columns &&
          so_detail_columns.map((col, key) => {
            return (
              <Col key={key} span={col.size} className="col-outline">
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
          {data_detail &&
            data_detail.map((line, key) => (
              <Row
                key={key}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                gutter={2}
                name={`row-${key}`}
                className="col-2"
              >
                <Col span={6} className="text-string">
                  <Select
                    allowClear
                    showSearch
                    placeholder="Item"
                    name="item_id"
                    field_id="item_id"
                    field_name="item_name"
                    value={line.item_no_name}
                    size="small"
                    onChange={(data, option) => {
                      data && data
                        ? onChangeValue(line.id, {
                            item_id: data,
                            uom_id: option.uom_id,
                            item_no_name: option.title,
                            uom_no: option.uom_no,
                          })
                        : onChangeValue(line.id, {
                            item_id: null,
                            uom_id: null,
                            item_no_name: null,
                            uom_no: null,
                          });
                    }}
                    style={{ width: "100%" }}
                    filterOption={(inputValue, option) =>
                      option.title &&
                      option.title
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  >
                    {select_items &&
                      select_items.map((item, key) => {
                        return (
                          <Option
                            key={key}
                            value={item.item_id}
                            title={item.item_no_name}
                            uom_id={item.uom_id}
                            uom_no={item.uom_no}
                          >
                            {item.item_no_name}
                          </Option>
                        );
                      })}
                  </Select>
                </Col>
                <Col span={3} className="text-number">
                  <InputNumber
                    {...numberFormat}
                    name="so_detail_qty"
                    placeholder={"Qty"}
                    min={0.0}
                    step={0.001}
                    size="small"
                    style={{ width: "100%" }}
                    disabled={0}
                    value={line.so_detail_qty}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        so_detail_qty: data,
                        so_detail_total_price: calSubtotal(
                          line.so_detail_price,
                          data,
                          line.so_detail_discount
                        ),
                      });
                      updateAmount();
                    }}
                  />
                </Col>
                <Col span={2} className="text-string">
                  <CustomSelect
                    allowClear
                    showSearch
                    name="uom_id"
                    size="small"
                    placeholder={"Unit"}
                    data={select_uoms}
                    field_id="uom_id"
                    field_name="uom_no"
                    value={line.uom_no}
                    onSelect={(data, option) =>
                      onChangeValue(line.id, {
                        uom_id: data,
                        uom_no: option.title,
                      })
                    }
                    onChange={(data) => onChangeValue({ uom_id: data })}
                  />
                </Col>
                <Col span={3} className="text-number">
                  <InputNumber
                    {...numberFormat}
                    name="so_detail_price"
                    placeholder="Unit Price"
                    value={line.so_detail_price}
                    min={0.0}
                    precision={3}
                    step={5}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        so_detail_price: data,
                        so_detail_total_price: calSubtotal(
                          line.so_detail_qty,
                          data,
                          line.so_detail_discount
                        ),
                      });
                      updateAmount();
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-number">
                  <InputNumber
                    {...numberFormat}
                    name="item_discount"
                    placeholder="Discount"
                    value={line.so_detail_discount}
                    min={0.0}
                    step={5}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        so_detail_discount: data,
                        so_detail_total_price: calSubtotal(
                          line.so_detail_qty,
                          line.so_detail_price,
                          data
                        ),
                      });
                      updateAmount();
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-number">
                  <div className="total-number">
                    {convertDigit(line.so_detail_total_price)}
                  </div>
                </Col>
                <Col span={3} className="text-number">
                  <DatePicker
                    name={"so_detail_delivery_date"}
                    format={"DD/MM/YYYY"}
                    size="small"
                    style={{ width: "100%" }}
                    placeholder="Delivery date..."
                    value={
                      line.so_detail_delivery_date &&
                      line.so_detail_delivery_date
                        ? moment(line.so_detail_delivery_date, "DD/MM/YYYY")
                        : ""
                    }
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        so_detail_delivery_date: data.format("DD/MM/YYYY"),
                      });
                    }}
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
                addLine(data_detail);
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
          {data_detail &&
            data_detail.map((line, key) => (
              <Row
                key={key}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                gutter={2}
                name={`row-${key}`}
                className="col-2"
              >
                <Col span={6} className="text-string">
                  <Text className="text-view">{line.item_no_name}</Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.so_detail_qty)}
                  </Text>
                </Col>
                <Col span={2} className="text-string">
                  <Text className="text-view">{line.uom_no}</Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.so_detail_price)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.so_detail_discount)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.so_detail_total_price)}
                  </Text>
                </Col>
                <Col span={3} className="text-center">
                  <Text className="text-view">
                    {line.so_detail_delivery_date}
                  </Text>
                </Col>
              </Row>
            ))}
        </> //close tag
      )}
      {/* end readonly */}
      <Row
        style={{
          width: "100%",
          height: "5px",
          background: "#c6c6c6",
          background:
            "linear-gradient(180deg,rgba(198,198,198,1) 0%, rgba(198,198,198,1) 55%,rgba(255,255,255,1) 100%)",
          marginBottom: 20,
        }}
      ></Row>
    </>
  );
};

export default React.memo(SO_Detail);
