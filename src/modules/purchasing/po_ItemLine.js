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
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { poItemColumns, po_detail_fields } from "./config/po";

import CustomSelect from "../../components/CustomSelect";
import { calSubtotal } from "../../include/js/function_main";
import moment from "moment";
import { convertDigit, numberFormat } from "../../include/js/main_config";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;
const { Text } = Typography;

const ItemLine = ({
  type_id,
  pr_id,
  po_id,
  data_detail,
  readOnly,
  vat_rate,
  detailDispatch,

  updateAmount,
}) => {
  // master data

  const select_items = useSelector((state) =>
    state.inventory.master_data.item_list.filter(
      (item) => item.type_id === 9 || item.type_id === 10
    )
  );
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );

  useEffect(() => {
    !readOnly && updateAmount(data_detail, "po_detail_total_price", vat_rate);
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
  console.log(data_detail);
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
          {data_detail.length > 0 &&
            data_detail.map((line, key) => (
              <div key={key} name={`row-${key}`} className="row-detail">
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
                    <CustomSelect
                      allowClear
                      showSearch
                      disabled={type_id ? 0 : 1}
                      size="small"
                      placeholder={"Item"}
                      data={select_items}
                      name="item_id"
                      field_id="item_id"
                      field_name="item_no_name"
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
                              po_detail_qty: 0,
                              po_detail_price: 0,
                              po_detail_discount: 0,
                              po_detail_total_price: 0,
                              po_detail_due_date: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={3} className="text-number">
                    <InputNumber
                      placeholder={"Quantity"}
                      min={0.0}
                      step={0.001}
                      precision={3}
                      disabled={type_id ? 0 : 1}
                      {...numberFormat}
                      name={`po_detail_qty${key}`}
                      value={line.po_detail_qty}
                      style={{ width: "100%" }}
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
                      disabled={type_id ? 0 : 1}
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
                      disabled={type_id ? 0 : 1}
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
                      disabled={type_id ? 0 : 1}
                      name="item_discount"
                      placeholder="Discount"
                      value={line.po_detail_discount}
                      min={0.0}
                      step={5}
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
                    <div className="total-number text-value">
                      {convertDigit(line.po_detail_total_price)}
                    </div>
                  </Col>
                  <Col span={3} className="text-number">
                    <DatePicker
                      disabled={type_id ? 0 : 1}
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
                    {data_detail.length > 1 && (
                      <DeleteTwoTone
                        onClick={() => {
                          delLine(line.id);
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row
                  key={"sub-" + key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`row-${key}`}
                  className="col-2"
                >
                  <Col span={23}>
                    <TextArea
                      rows={1}
                      placeholder={"Remark..."}
                      disabled={line.item_id ? 0 : 1}
                      value={line.po_detail_remark}
                      onChange={(e) =>
                        onChangeValue(line.id, {
                          po_detail_remark: e.target.value,
                        })
                      }
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
            ))}
          {pr_id && (
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
          )}
        </>
      ) : (
        <>
          {/* View Form */}
          {data_detail.length > 0 &&
            data_detail.map((line, key) => (
              <div key={key} name={`row-${key}`} className="row-detail">
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
                <Row
                  key={"sub-" + key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  className="col-2"
                >
                  <Col span={23}>
                    <Text className="text-view">
                      {line.po_detail_remark ? line.po_detail_remark : "-"}
                    </Text>
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
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
