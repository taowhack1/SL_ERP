import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Select,
  Divider,
  DatePicker,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_pr_detail } from "../../actions/purchase/PO_Actions";
import { poItemColumns, po_detail_fields } from "./config/po";
import numeral from "numeral";
import CustomSelect from "../../components/CustomSelect";
import { calSubtotal, sumArrObj } from "../../include/js/function_main";
import moment from "moment";
import { convertDigit } from "../../include/js/main_config";
const { Option } = Select;
const { Text } = Typography;
const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const ItemLine = ({
  pr_id,
  po_id,
  data_detail,
  readOnly,
  vat_rate,
  detailDispatch,
  headDispatch,
}) => {
  const dispatch = useDispatch();
  // master data

  const select_items = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );

  const updateAmount = () => {
    const obj = sumArrObj(data_detail, "po_detail_total_price", vat_rate);
    headDispatch({
      type: "CHANGE_HEAD_VALUE",
      payload: {
        tg_po_sum_amount: obj.exclude_vat,
        tg_po_vat_amount: obj.vat,
        tg_po_total_amount: obj.include_vat,
      },
    });
  };

  useEffect(() => {
    !readOnly && updateAmount();
  }, [data_detail]);

  // function
  const addLine = () => {
    detailDispatch({ type: "ADD_ROW", payload: po_detail_fields });
  };

  const delLine = (id) => {
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };
  const onChangeValue = (rowId, data) => {
    console.log(rowId, data);
    detailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };
  if (!readOnly) {
    data_detail && !po_id && !data_detail.length && addLine();
  }

  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {poItemColumns &&
          poItemColumns.map((col, key) => {
            return (
              <Col key={key} span={col.size} className="col-outline">
                <Text strong>
                  {col.require && !readOnly && (
                    <span className="require">* </span>
                  )}
                  {col.name}
                </Text>
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
          {data_detail.length &&
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
                    name={`item_id${key}`}
                    placeholder="Item"
                    size={"small"}
                    field_id="item_id"
                    field_name="item_name"
                    value={line.item_no_name}
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
                    placeholder={"Quantity"}
                    min={0.0}
                    step={0.001}
                    precision={3}
                    {...numberFormat}
                    name={`po_detail_qty${key}`}
                    value={line.po_detail_qty}
                    style={{ width: "100%" }}
                    disabled={0}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        po_detail_qty: data,
                        po_detail_total_price: calSubtotal(
                          data,
                          line.po_detail_price,
                          line.po_detail_discount
                        ),
                      });
                    }}
                    size="small"
                  />
                </Col>
                <Col span={2} className="text-string">
                  <CustomSelect
                    allowClear
                    showSearch
                    size={"small"}
                    name={`uom_id${key}`}
                    placeholder={"Unit"}
                    data={select_uoms}
                    field_id="uom_id"
                    field_name="uom_no"
                    value={line.uom_no}
                    onChange={(data, option) =>
                      data
                        ? onChangeValue(line.id, {
                            uom_id: data,
                            uom_no: option.title,
                          })
                        : onChangeValue(line.id, {
                            uom_id: null,
                            uom_no: null,
                          })
                    }
                  />
                </Col>

                <Col span={3} className="text-number">
                  <InputNumber
                    name="po_detail_price"
                    placeholder="Unit Price"
                    name={`po_detail_price${key}`}
                    value={line.po_detail_price}
                    precision={3}
                    {...numberFormat}
                    step={5}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        po_detail_price: data,
                        po_detail_total_price: calSubtotal(
                          line.po_detail_qty,
                          data,
                          line.po_detail_discount
                        ),
                      });
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-number">
                  <InputNumber
                    name="item_discount"
                    placeholder="Discount"
                    value={line.po_detail_discount}
                    min={0.0}
                    step={5}
                    precision={3}
                    {...numberFormat}
                    onChange={(data) => {
                      onChangeValue(
                        line.id,
                        {
                          po_detail_discount: data,
                          po_detail_total_price: calSubtotal(
                            line.po_detail_qty,
                            line.po_detail_price,
                            data
                          ),
                        },
                        true
                      );
                    }}
                    style={{ width: "100%" }}
                    size="small"
                  />
                </Col>
                <Col span={3} className="text-number">
                  <div className="total-number">
                    {convertDigit(line.po_detail_total_price)}
                  </div>
                </Col>
                <Col span={3} className="text-number">
                  <DatePicker
                    name={`po_detail_due_date${key}`}
                    format={"DD/MM/YYYY"}
                    size="small"
                    style={{ width: "100%" }}
                    placeholder="Due date..."
                    value={
                      line.po_detail_due_date && line.po_detail_due_date
                        ? moment(line.po_detail_due_date, "DD/MM/YYYY")
                        : ""
                    }
                    onChange={(data) => {
                      data
                        ? onChangeValue(line.id, {
                            po_detail_due_date: data.format("DD/MM/YYYY"),
                          })
                        : onChangeValue(line.id, {
                            po_detail_due_date: null,
                          });
                    }}
                  />
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                  <DeleteTwoTone
                    onClick={() => {
                      delLine(line.id);
                    }}
                  />
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
          {data_detail.length > 0 &&
            data_detail.map((line, key) => (
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
                <Col span={6} className="text-string">
                  <Text className="text-view">{line.item_no_name}</Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.po_detail_qty)}
                  </Text>
                </Col>
                <Col span={2} className="text-string">
                  <Text className="text-view">{line.uom_no}</Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.po_detail_price)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.po_detail_discount)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.po_detail_total_price)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {line.po_detail_due_date &&
                      moment(line.po_detail_due_date, "DD/MM/YYYY").format(
                        "DD/MM/YYYY"
                      )}
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

export default React.memo(ItemLine);
