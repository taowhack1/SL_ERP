/** @format */

import { Button, Row, Col, InputNumber, Typography, DatePicker } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import moment from "moment";

import { so_detail_fields, so_detail_columns } from "./configs";
import CustomSelect from "../../components/CustomSelect";
import { calSubtotal, sumArrObjWithVat } from "../../include/js/function_main";

import { convertDigit, getNumberFormat } from "../../include/js/main_config";
import TextArea from "antd/lib/input/TextArea";
import { getMasterSORefDetail } from "../../actions/sales";
import { useState } from "react";
const { Text } = Typography;

const SO_Detail = ({
  readOnly,
  so_id_ref,
  data_detail,
  so_production_type_id,
  detailDispatch,
  headDispatch,
  vat_rate,
  vat_include,
}) => {
  const [soRefDetail, setSORefDetail] = useState({
    loading: true,
    data: []
  })
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
      "so_detail_total_price",
      vat_rate,
      vat_include
    );
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
  }, [readOnly, vat_rate, vat_include]);
  useEffect(() => {
    !readOnly && updateAmount();
  }, [readOnly, data_detail]);
  useEffect(() => {
    const getSORefDetail = async (so_id_ref) => {
      const resp = await getMasterSORefDetail(so_id_ref)
      console.log("resp", resp)
      setSORefDetail(prev => ({ loading: false, data: resp?.data || [] }));
    }
    console.log("getMasterSORefDetail")
    !readOnly && getSORefDetail(so_id_ref)
  }, [readOnly, so_id_ref])
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
  console.log("so_id_ref", so_id_ref)
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className='detail-table-head'>
        {so_detail_columns &&
          so_detail_columns.map((col, key) => {
            return (
              <Col key={key} span={col.size} className='col-outline'>
                <Text strong>{col.name}</Text>
              </Col>
            );
          })}

        <Col span={1} className='col-outline'>
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
              <div key={key}>
                <Row
                  key={key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`row-${key}`}
                  className='col-2'>
                  <Col span={9} className='text-string'>
                    <CustomSelect
                      allowClear
                      showSearch
                      size='small'
                      placeholder={"Item"}
                      data={
                        so_production_type_id == 3
                          ? select_items.filter((obj) => obj.type_id === 3)
                          : select_items ?? []
                      }
                      name='item_id'
                      field_id='item_id'
                      field_name='item_no_name'
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
                  <Col span={3} className='text-number'>
                    <InputNumber
                      {...getNumberFormat(4)}
                      name='so_detail_qty'
                      placeholder={"Qty"}
                      min={0.0}
                      step={1}
                      size='small'
                      className={"full-width"}
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
                  <Col span={2} className='text-string'>
                    <CustomSelect
                      allowClear
                      showSearch
                      name='uom_id'
                      size='small'
                      placeholder={"Unit"}
                      data={select_uoms}
                      field_id='uom_id'
                      field_name='uom_no'
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
                  <Col span={3} className='text-number'>
                    <InputNumber
                      {...getNumberFormat(2)}
                      name='so_detail_price'
                      placeholder='Unit Price'
                      value={line.so_detail_price}
                      min={0.0}
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
                      className={"full-width"}
                      size='small'
                    />
                  </Col>
                  <Col span={3} className='text-number'>
                    <div className='total-number'>
                      {convertDigit(line.so_detail_total_price, 2)}
                    </div>
                  </Col>
                  <Col span={3} className='text-number'>
                    <DatePicker
                      name={"so_detail_delivery_date"}
                      format={"DD/MM/YYYY"}
                      size='small'
                      className={"full-width"}
                      placeholder='Delivery date...'
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
                <Row
                  key={"sub-so_detail_id_ref" + key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`row-so_detail_id_ref-${key}`}
                  className='col-2'>
                  <Col span={23}>
                    <CustomSelect
                      allowClear
                      showSearch
                      size='small'
                      placeholder={"อ้างอิงรายการขายใน SO"}
                      disabled={soRefDetail?.loading || !so_id_ref}
                      // loading={soRefDetail?.loading}
                      data={soRefDetail?.data || []}
                      name='so_detail_id_ref'
                      field_id='so_detail_id_ref'
                      field_name='so_detail_id_ref_name'
                      value={line?.so_detail_id_ref_name || null}
                      onChange={(data, option) => {
                        data !== undefined
                          ? onChangeValue(line.id, {
                            so_detail_id_ref: option.data.so_detail_id_ref,
                            so_detail_id_ref_name: option.data.so_detail_id_ref_name,
                          })
                          : onChangeValue(line.id, {
                            so_detail_id_ref: null,
                            so_detail_id_ref_name: null
                          });
                      }}
                    />
                  </Col>
                  <Col span={1}></Col>
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
                  className='col-2'>
                  <Col span={23}>
                    <TextArea
                      rows={1}
                      placeholder={"Remark..."}
                      disabled={line.item_id ? 0 : 1}
                      value={line.so_detail_remark}
                      onChange={(e) =>
                        onChangeValue(line.id, {
                          so_detail_remark: e.target.value,
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
              type='dashed'
              disabled={
                data_detail.length > 0
                  ? so_production_type_id == 3
                    ? true
                    : false
                  : false
              }
              onClick={() => {
                addLine(data_detail);
              }}
              block>
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
                  key={key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`row-${key}`}
                  className='col-2'>
                  <Col span={9} className='text-string'>
                    <Text className='text-view'>{line.item_no_name}</Text>
                  </Col>
                  <Col span={3} className='text-number'>
                    <Text className='text-view'>
                      {convertDigit(line.so_detail_qty, 4)}
                    </Text>
                  </Col>
                  <Col span={2} className='text-string'>
                    <Text className='text-view'>{line.uom_no}</Text>
                  </Col>
                  <Col span={3} className='text-number'>
                    <Text className='text-view'>
                      {convertDigit(line.so_detail_price, 2)}
                    </Text>
                  </Col>
                  <Col span={3} className='text-number'>
                    <Text className='text-view'>
                      {convertDigit(line.so_detail_total_price, 2)}
                    </Text>
                  </Col>
                  <Col span={3} className='text-center'>
                    <Text className='text-view'>
                      {line.so_detail_delivery_date}
                    </Text>
                  </Col>
                </Row>
                <Row
                  key={"sub-so_detail_id_ref-" + key}
                  style={{
                    marginBottom: 0,
                    border: "1px solid white",
                    backgroundColor: "#FCFCFC",
                  }}
                  gutter={2}
                  name={`row-so_detail_id_ref-${key}`}
                  className='col-2'>
                  <Col span={23}>
                    <Text className='pd-left-1 text-view text-left'>
                      <b> อ้างอิงรายการ :</b> [ {line?.so_detail_id_ref_name || "-"} ]
                    </Text>
                  </Col>
                  <Col span={1}></Col>
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
                  className='col-2'>
                  <Col span={23}>
                    <Text className='pd-left-1 text-view text-left'>
                      {line.so_detail_remark}
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
        }}></Row>
    </>
  );
};

export default React.memo(SO_Detail);
