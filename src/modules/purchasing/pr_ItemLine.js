import { Button, Row, Col, InputNumber, Typography, DatePicker } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import moment from "moment";

import { prItemColumns, pr_detail_fields } from "./config/pr";
import CustomSelect from "../../components/CustomSelect";
import { calSubtotal, sumArrObj } from "../../include/js/function_main";

import { convertDigit, numberFormat } from "../../include/js/main_config";
import TextArea from "antd/lib/input/TextArea";

const { Text } = Typography;

const ItemLine = ({
  type_id,
  data_detail,
  readOnly,
  detailDispatch,
  headDispatch,
  vat_rate,
}) => {
  const dispatch = useDispatch();
  const select_items = useSelector((state) =>
    state.inventory.master_data.item_list.filter(
      (item) => item.type_id === type_id
    )
  );
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );

  const updateAmount = () => {
    const obj = sumArrObj(data_detail, "pr_detail_total_price", vat_rate);
    headDispatch({
      type: "CHANGE_HEAD_VALUE",
      payload: {
        tg_pr_sum_amount: obj.exclude_vat,
        tg_pr_vat_amount: obj.vat,
        tg_pr_total_amount: obj.include_vat,
      },
    });
  };

  useEffect(() => {
    !readOnly && updateAmount();
  }, [data_detail]);

  // function
  const addLine = () => {
    detailDispatch({ type: "ADD_ROW", payload: pr_detail_fields });
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

  const dateConfig = {
    format: "DD/MM/YYYY",
    value: moment(),
    disabled: 1,
  };
  // !data_detail.length && addLine();
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {prItemColumns &&
          prItemColumns.map((col, key) => {
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
                  className="col-2"
                >
                  <Col span={6} className="text-string">
                    <CustomSelect
                      allowClear
                      showSearch
                      disabled={type_id ? 0 : 1}
                      size={"small"}
                      placeholder={"Item"}
                      name="item_id"
                      field_id="item_id"
                      field_name="item_no_name"
                      value={line.item_no_name}
                      data={select_items}
                      onChange={(data, option) => {
                        data && data
                          ? onChangeValue(line.id, {
                              item_id: option.data.item_id,
                              uom_id: option.data.uom_id,
                              item_no_name: option.data.item_no_name,
                              uom_no: option.data.uom_no,
                            })
                          : onChangeValue(line.id, {
                              item_id: null,
                              uom_id: null,
                              item_no_name: null,
                              uom_no: null,
                              pr_detail_remark: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={3} className="text-number">
                    <InputNumber
                      {...numberFormat}
                      placeholder={"Qty"}
                      min={0.0}
                      step={0.001}
                      size="small"
                      className={"full-width"}
                      disabled={type_id ? 0 : 1}
                      defaultValue={line.pr_detail_qty}
                      value={line.pr_detail_qty}
                      onChange={(data) => {
                        onChangeValue(
                          line.id,
                          {
                            pr_detail_qty: data,
                            pr_detail_total_price: calSubtotal(
                              line.pr_detail_price,
                              data,
                              line.pr_detail_discount
                            ),
                          },
                          true
                        );
                      }}
                    />
                  </Col>
                  <Col span={2} className="text-string">
                    <CustomSelect
                      allowClear
                      showSearch
                      disabled={type_id ? 0 : 1}
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
                      disabled={type_id ? 0 : 1}
                      name="pr_detail_price"
                      placeholder="Unit Price"
                      value={line.pr_detail_price}
                      min={0.0}
                      precision={3}
                      step={5}
                      onChange={(data) => {
                        onChangeValue(
                          line.id,
                          {
                            pr_detail_price: data,
                            pr_detail_total_price: calSubtotal(
                              line.pr_detail_qty,
                              data,
                              line.pr_detail_discount
                            ),
                          },
                          true
                        );
                      }}
                      className={"full-width"}
                      size="small"
                    />
                  </Col>
                  <Col span={3} className="text-number">
                    {console.log(line.pr_detail_discount)}
                    <InputNumber
                      {...numberFormat}
                      disabled={type_id ? 0 : 1}
                      name="item_discount"
                      placeholder="Discount"
                      value={line.pr_detail_discount}
                      min={0.0}
                      step={5}
                      onChange={(data) => {
                        onChangeValue(
                          line.id,
                          {
                            pr_detail_discount: data,
                            pr_detail_total_price: calSubtotal(
                              line.pr_detail_qty,
                              line.pr_detail_price,
                              data
                            ),
                          },
                          true
                        );
                      }}
                      className={"full-width"}
                      size="small"
                    />
                  </Col>
                  <Col span={3} className="text-number">
                    <div className="total-number">
                      {convertDigit(line.pr_detail_total_price)}
                    </div>
                  </Col>
                  <Col span={3} className="text-number">
                    <DatePicker
                      disabled={type_id ? 0 : 1}
                      name={"pr_detail_due_date"}
                      format={dateConfig.format}
                      size="small"
                      className={"full-width"}
                      placeholder="Due date..."
                      value={
                        line.pr_detail_due_date
                          ? moment(line.pr_detail_due_date, "DD/MM/YYYY")
                          : ""
                      }
                      onChange={(data) => {
                        data
                          ? onChangeValue(line.id, {
                              pr_detail_due_date: data.format("DD/MM/YYYY"),
                            })
                          : onChangeValue(line.id, {
                              pr_detail_due_date: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={1} style={{ textAlign: "center" }}>
                    {data_detail.length > 1 && (
                      <DeleteTwoTone onClick={() => delLine(line.id)} />
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
                  className="col-2"
                >
                  <Col span={23}>
                    <TextArea
                      rows={1}
                      placeholder={"Remark..."}
                      disabled={type_id && line.item_id ? 0 : 1}
                      value={line.pr_detail_remark}
                      onChange={(e) => {
                        onChangeValue(line.id, {
                          pr_detail_remark: e.target.value,
                        });
                      }}
                      className={"full-width"}
                    />
                  </Col>
                  <Col span={1}></Col>
                </Row>
              </div>
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
            <div key={key} name={`row-${key}`} className="row-detail">
              <Row
                key={key}
                style={{
                  marginBottom: 0,
                  border: "1px solid white",
                  backgroundColor: "#FCFCFC",
                }}
                gutter={2}
                className="col-2"
              >
                <Col span={6} className="text-string">
                  <Text className="text-view">{line.item_no_name}</Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.pr_detail_qty)}
                  </Text>
                </Col>
                <Col span={2} className="text-string">
                  <Text className="text-view">{line.uom_no}</Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.pr_detail_price)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.pr_detail_discount)}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {convertDigit(line.pr_detail_total_price)}
                  </Text>
                </Col>

                <Col span={3} className="text-number">
                  <Text className="text-view">
                    {moment(line.pr_detail_due_date, "DD/MM/YYYY").format(
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
                    {line.pr_detail_remark ? line.pr_detail_remark : "-"}
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
