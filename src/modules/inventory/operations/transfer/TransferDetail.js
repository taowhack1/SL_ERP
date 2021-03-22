/** @format */

import {
  DeleteTwoTone,
  EllipsisOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, InputNumber, Row, Form, Select } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "redux-form";
import {
  get_location_shelf_by_item_id,
  get_lot_batch_by_item_id_shelf,
} from "../../../../actions/inventory";
import CustomSelect from "../../../../components/CustomSelect";
import { TransferDetailColumns, TransferDetailFileds } from "./TransferConfig";

const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};
const TransferDetail = ({ dataDetail, detailDispatch, readOnly }) => {
  console.log("dataDetail", dataDetail);
  const dispatch = useDispatch();
  const ItemList = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const [itemlistShow, setItemlistShow] = useState(ItemList);
  const [tempItemlist, setTempItemlist] = useState([]);
  const select_location = useSelector(
    (state) => state.inventory.master_data.shelf
  );
  const lot_batch_list = useSelector(
    (state) => state.inventory.stock.item_lot_batch
  );
  const uom = useSelector((state) => state.inventory.configurations.uom);
  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: TransferDetailFileds,
    });
  };
  const delLine = (id, item_id) => {
    const filterTemp = tempItemlist.filter(
      (tempItemlist) => tempItemlist !== item_id
    );
    const itemlistShowReset = ItemList.filter(
      (ItemList) => !filterTemp.includes(ItemList.item_id)
    );
    setTempItemlist(filterTemp);
    setItemlistShow(itemlistShowReset);
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };
  const setTemplistFn = (rowId, data) => {
    setTempItemlist((ItemList) => ItemList.concat(data.item_id));
    console.log("set Temp data ------------------------------->>>>", data);
  };
  const resetItemlist = (rowId, data) => {
    const filterTemp = tempItemlist.filter(
      (tempItemlist) => tempItemlist !== data.delete_item
    );
    const itemlistShowReset = ItemList.filter(
      (ItemList) => !filterTemp.includes(ItemList.item_id)
    );
    setTempItemlist(filterTemp);
    setItemlistShow(itemlistShowReset);
  };
  const onChangeValue = (rowId, data) => {
    if (data.item_id) {
      dispatch(get_lot_batch_by_item_id_shelf(data.item_id));
      dispatch(get_location_shelf_by_item_id(data.item_id));
    }
    detailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
    // check item in filed
    if (!data.delete_item) {
      // check item in row betaween after item in row?
      if (data.delete_item2 != null) {
        const filterTemp = tempItemlist.filter(
          (tempItemlist) => tempItemlist !== data.delete_item2
        );
        const itemlistShowReset = ItemList.filter(
          (ItemList) =>
            ItemList.item_id != data.item_id &&
            !filterTemp.includes(ItemList.item_id)
        );
        setTempItemlist(filterTemp); //delete old in temp
        setItemlistShow(itemlistShowReset); //set new item show dropdown
        setTemplistFn(rowId, data); //set item in temp
      } else {
        setTemplistFn(rowId, data); //set item in temp
        const filterlistShow = itemlistShow.filter(
          (itemlistShow) => itemlistShow.item_id !== data.item_id
        );
        setItemlistShow(filterlistShow); //set new item show dropdown
      }
    } else {
      resetItemlist(rowId, data);
    }
  };

  return (
    <>
      <Row className='col-2 detail-tab-row'>
        <Col span={24}>
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Item Transfer
            Locations
          </Text>
        </Col>
      </Row>
      <div className='detail-form'>
        <Row gutter={2} className='detail-table-head'>
          {TransferDetailColumns &&
            TransferDetailColumns.map((col, key) => {
              return (
                <Col key={col.id} span={col.size} className='col-outline'>
                  {col.require && !readOnly && (
                    <span className='require'>* </span>
                  )}
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
            {dataDetail.length > 0 &&
              dataDetail.map((line, key) => (
                <Row
                  className='form-row'
                  key={key}
                  name={`row-${key}`}
                  gutter={3}>
                  <Col span={1} className='text-center'>
                    {key + 1}
                  </Col>
                  <Col span={4} className='text-left'>
                    <CustomSelect
                      allowClear
                      showSearch
                      size='small'
                      dropdownStyle={{ minWidth: "20%" }}
                      placeholder={"Select Item"}
                      name='item_id'
                      field_id='item_id'
                      field_name='item_no_name'
                      value={line.item_no_name}
                      data={itemlistShow}
                      onChange={(data, option) => {
                        data && data
                          ? onChangeValue(line.id, {
                              item_id: option.data.item_id,
                              item_name: option.data.item_name,
                              item_no_name: option.data.item_no_name,
                              type_id: option.data.type_id,
                              unit: null,
                              sourceLocation: null,
                              qty: null,
                              destinationLocation_id: null,
                              destinationLocation_name: null,
                              delete_item: false,
                              delete_item2: line.item_id,
                            })
                          : onChangeValue(line.id, {
                              delete_item: line.item_id,
                              delete_item2: false,
                              item_id: null,
                              item_name: null,
                              item_no_name: null,
                              type_id: null,
                              qty: null,
                              unit: null,
                              sourceLocation: null,
                              destinationLocation_id: null,
                              destinationLocation_name: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={4} className='text-left'>
                    <CustomSelect
                      allowClear
                      showSearch
                      size='small'
                      disabled={line.item_id ? false : true}
                      placeholder={"Select Source"}
                      dropdownStyle={{ minWidth: "20%" }}
                      name='sourceLocation'
                      field_id='stock_id'
                      field_name='stock_lot_no_batch_qty_balance'
                      value={line.sourceLocation}
                      data={lot_batch_list}
                      onChange={(data, option) => {
                        data && data
                          ? onChangeValue(line.id, {
                              qty: option.data.tg_stock_qty_balance,
                              sourceLocation:
                                option.data.location_shelf_no_name,
                              shelf_id: option.data.shelf_id,
                              stock_inline:
                                option.data.stock_lot_no_batch_qty_balance,
                              item_id: option.data.item_id,
                              item_no_name: option.data.item_no_name,
                              stock_id: option.data.stock_id,
                              shelf_id: option.data.shelf_id,
                              tg_stock_qty_balance:
                                option.data.tg_stock_qty_balance,
                              stock_lot_no_batch_qty_balance:
                                option.data.stock_lot_no_batch_qty_balance,
                            })
                          : onChangeValue(line.id, {
                              qty: null,
                              sourceLocation: null,
                              destinationLocation_id: null,
                              stock_inline: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={4} className='text-left'>
                    <CustomSelect
                      allowClear
                      showSearch
                      size='small'
                      disabled={line.sourceLocation ? false : true}
                      placeholder={"Select Destination Location"}
                      dropdownStyle={{ minWidth: "20%" }}
                      name='destinationLocation_id'
                      field_id='location_id'
                      field_name='location_shelf_no_name'
                      value={line.destinationLocation_id}
                      data={
                        line.item_id
                          ? select_location.filter(
                              (location) =>
                                location.type_id === line.type_id &&
                                location.shelf_id !== line.shelf_id
                            )
                          : select_location
                      }
                      onChange={(data, option) => {
                        data && data
                          ? onChangeValue(line.id, {
                              destinationLocation_id: option.data.location_id,
                              destinationLocation_name:
                                option.data.location_shelf_no_name,
                            })
                          : onChangeValue(line.id, {
                              destinationLocation_id: null,
                              destinationLocation_name: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={2} className='text-left'>
                    <Input
                      style={{
                        textAlign: "right",
                      }}
                      name='qty'
                      size='small'
                      disabled
                      placeholder={"Qty"}
                      onChange={(data) => {
                        onChangeValue(line.id, {
                          qty: data,
                        });
                      }}
                      value={line.qty}
                    />
                  </Col>
                  <Col span={2} className='text-left'>
                    <Input
                      name='unit'
                      size='small'
                      style={{
                        textAlign: "right",
                      }}
                      disabled
                      placeholder={"Unit"}
                      onChange={(data) =>
                        onChangeValue(line.id, {
                          unit: data,
                        })
                      }
                      value={line.unit}
                    />
                  </Col>
                  <Col span={3} className='text-left'>
                    <InputNumber
                      {...numberFormat}
                      disabled={line.item_id ? false : true}
                      name='qty_trafer'
                      size='small'
                      placeholder={"Qty Tramsfer"}
                      min={0.0}
                      max={line.qty}
                      step={0.001}
                      style={{ width: "100%" }}
                      value={line.qty_trafer}
                      onChange={(data) => {
                        onChangeValue(line.id, { qty_trafer: data });
                      }}
                    />
                  </Col>
                  <Col span={3} className='text-left'>
                    <CustomSelect
                      allowClear
                      showSearch
                      size='small'
                      disabled={line.item_id ? false : true}
                      placeholder={"Select Unit"}
                      name='unit_transfer'
                      field_id='uom_id'
                      field_name='uom_no_name'
                      value={line.uom_id}
                      data={uom}
                      onChange={(data, option) => {
                        data && data
                          ? onChangeValue(line.id, {
                              unit_transfer: option.data.uom_id,
                            })
                          : onChangeValue(line.id, {
                              unit_transfer: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={1} style={{ textAlign: "center" }}>
                    <DeleteTwoTone
                      onClick={(e) => delLine(line.id, line.item_id)}
                    />
                  </Col>
                </Row>
              ))}
            <div style={{ marginTop: 10 }}>
              <Button
                type='dashed'
                onClick={() => {
                  addLine();
                }}
                block>
                <PlusOutlined /> Add a line
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default TransferDetail;
