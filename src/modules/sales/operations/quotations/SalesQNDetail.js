import { Button, Row, Col, InputNumber, Typography, Select } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

import {
  quotation_detail_fields,
  quotation_detail_columns,
  so_detail_fields,
} from "../../configs";
import CustomSelect from "../../../../components/CustomSelect";
import {
  calSubtotal,
  sumArrObjWithVat,
} from "../../../../include/js/function_main";

import {
  convertDigit,
  getNumberFormat,
} from "../../../../include/js/main_config";
import TextArea from "antd/lib/input/TextArea";
const { Text } = Typography;
const { Option } = Select;

const SalesQNDetail = ({
  readOnly,

  data_detail,
  detailDispatch,
  headDispatch,
  vat_rate,
  vat_include,
  project,
}) => {
  // state
  const select_items = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );

  const updateAmount = () => {
    const obj = sumArrObjWithVat(
      data_detail,
      "qn_detail_total_price",
      vat_rate,
      vat_include
    );
    console.log("updateAmount", obj);
    headDispatch({
      type: "CHANGE_HEAD_VALUE",
      payload: {
        tg_qn_sum_amount: obj.exclude_vat,
        tg_qn_vat_amount: obj.vat,
        tg_qn_total_amount: obj.include_vat,
      },
    });
  };
  useEffect(() => {
    !readOnly && updateAmount();
  }, [readOnly, vat_rate, vat_include]);
  useEffect(() => {
    !readOnly && updateAmount();
  }, [readOnly, data_detail]);

  // function
  const addLine = () => {
    project === "quotation"
      ? detailDispatch({ type: "ADD_ROW", payload: quotation_detail_fields })
      : detailDispatch({ type: "ADD_ROW", payload: so_detail_fields });
  };

  const delLine = (id) => {
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    console.log("onChangeValue", rowId, data);
    detailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };
  console.log(data_detail);
  console.log("select master", select_items, select_uoms);
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {quotation_detail_columns &&
          quotation_detail_columns.map((col, key) => {
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
          {data_detail &&
            data_detail.map((line, key) => (
              <div key={"div" + line.id}>
                <Row
                  key={line.id}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`row-${key}`}
                  className="col-2"
                >
                  <Col span={12} className="text-string">
                    <CustomSelect
                      allowClear
                      showSearch
                      size="small"
                      placeholder={"Item"}
                      data={select_items ?? []}
                      name="item_id"
                      field_id="item_id"
                      field_name="item_no_name"
                      value={line.item_no_name}
                      onChange={(data, option) => {
                        data !== undefined
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
                            });
                      }}
                    />
                  </Col>
                  <Col span={3} className="text-number">
                    <InputNumber
                      {...getNumberFormat(4)}
                      name="qn_detail_qty"
                      placeholder={"Qty"}
                      min={0.0}
                      step={0.001}
                      size="small"
                      className={"full-width"}
                      disabled={0}
                      value={line.qn_detail_qty}
                      onChange={(data) => {
                        onChangeValue(line.id, {
                          qn_detail_qty: data,
                          qn_detail_total_price: calSubtotal(
                            line.qn_detail_price,
                            data,
                            line.qn_detail_discount
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
                      data={select_uoms ?? []}
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
                      {...getNumberFormat(4)}
                      name="qn_detail_price"
                      placeholder="Unit Price"
                      value={line.qn_detail_price}
                      min={0.0}
                      step={5}
                      onChange={(data) => {
                        onChangeValue(line.id, {
                          qn_detail_price: data,
                          qn_detail_total_price: calSubtotal(
                            line.qn_detail_qty,
                            data,
                            line.qn_detail_discount
                          ),
                        });
                        updateAmount();
                      }}
                      className={"full-width"}
                      size="small"
                    />
                  </Col>
                  <Col span={3} className="text-number">
                    <div className="total-number">
                      {convertDigit(line.qn_detail_total_price, 4)}
                    </div>
                  </Col>
                  <Col span={1} style={{ textAlign: "center" }}>
                    <DeleteTwoTone onClick={() => delLine(line.id)} />
                  </Col>
                </Row>
                <Row
                  key={"remark-" + key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`remark-row-${key}`}
                  className="col-2"
                >
                  <Col span={23}>
                    <TextArea
                      rows={1}
                      placeholder={"Remark..."}
                      disabled={line.item_id ? 0 : 1}
                      value={line.qn_detail_remark}
                      onChange={(e) =>
                        onChangeValue(line.id, {
                          qn_detail_remark: e.target.value,
                        })
                      }
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
              <div key={key}>
                <Row
                  key={line.id}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`row-${line.id}`}
                  className="col-2"
                >
                  <Col span={12} className="text-string">
                    <Text className="text-view">{line.item_no_name}</Text>
                  </Col>
                  <Col span={3} className="text-number">
                    <Text className="text-view">
                      {convertDigit(line.qn_detail_qty, 4)}
                    </Text>
                  </Col>
                  <Col span={2} className="text-string">
                    <Text className="text-view">{line.uom_no}</Text>
                  </Col>
                  <Col span={3} className="text-number">
                    <Text className="text-view">
                      {convertDigit(line.qn_detail_price, 4)}
                    </Text>
                  </Col>
                  <Col span={3} className="text-number">
                    <Text className="text-view">
                      {convertDigit(line.qn_detail_total_price, 4)}
                    </Text>
                  </Col>
                </Row>
                <Row
                  key={"remark-" + line.id}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`row-${line.id}`}
                  className="col-2"
                >
                  <Col span={23}>
                    <Text className="pd-left-1 text-view text-left">
                      {line.qn_detail_remark}
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
          background:
            "linear-gradient(180deg,rgba(198,198,198,1) 0%, rgba(198,198,198,1) 55%,rgba(255,255,255,1) 100%)",
          marginBottom: 20,
        }}
      ></Row>
    </>
  );
};

export default React.memo(SalesQNDetail);
