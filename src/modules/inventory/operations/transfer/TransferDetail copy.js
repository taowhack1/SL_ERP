import {
  DeleteTwoTone,
  EllipsisOutlined,
  PlusOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, InputNumber, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_location_shelf_by_item_id,
  get_lot_batch_by_item_id_shelf,
} from "../../../../actions/inventory";
import CustomSelect from "../../../../components/CustomSelect";
import { reducer } from "../../../production/reducers";
import {
  TransferDetailColumns,
  TransferDetailFileds,
  TransferLotBatchfileds,
} from "./TransferConfig";

const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const TransferDetail = ({
  dataDetail,
  detailDispatch,
  readOnly,
  tepmStockInline,
  settepmStockInline,
}) => {
  const [qty, setQty] = useState([]);
  const dispatch = useDispatch();
  const ItemList = useSelector(
    (state) => state.inventory.master_data.item_list
  );

  const select_location = useSelector(
    (state) => state.inventory.master_data.shelf
  );
  const location_shelf_list = useSelector(
    (state) => state.inventory.stock.item_location_shelf
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
    settepmStockInline({
      type: "ADD_ROW",
      payload: TransferLotBatchfileds,
    });
  };
  const delLine = (id) => {
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };
  const tempItemOld = null;
  const tempItemNew = null;

  const onChangeValue = (rowId, data) => {
    let row = parseInt(rowId) - 0;
    console.log("row", row);
    dispatch(get_lot_batch_by_item_id_shelf(data.item_id));
    dispatch(get_location_shelf_by_item_id(data.item_id));
    detailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });

    console.log("ItemList", ItemList);
    console.log("select_location", select_location);
    console.log("location_shelf_list", location_shelf_list);
    console.log("lot_batch_list", lot_batch_list);

    if (tepmStockInline[row].item_id === data.item_id) {
      console.log("ok");
    }
    console.log("tepmStockInline_item_id", tepmStockInline[0].item_id);
    console.log("rowId", rowId);
  };

  console.log("dataDetail", dataDetail);
  console.log("tepmStockInline", tepmStockInline);
  const checkQtyItem = (rowId, data) => {
    console.log("data", data);
    settepmStockInline({
      type: "CHANGE_DETAIL_LoT",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };

  return (
    <>
      <Row className="col-2 detail-tab-row">
        <Col span={24}>
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Item Transfer
            Locations
          </Text>
        </Col>
      </Row>
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {TransferDetailColumns &&
            TransferDetailColumns.map((col, key) => {
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
            {dataDetail.length > 0 &&
              dataDetail.map((line, key) => (
                <Row
                  className="form-row"
                  key={key}
                  name={`row-${key}`}
                  gutter={3}
                >
                  <Col span={1} className="text-center">
                    {key + 1}
                  </Col>
                  <Col span={4} className="text-left">
                    <CustomSelect
                      allowClear
                      showSearch
                      size="small"
                      dropdownStyle={{ minWidth: "20%" }}
                      placeholder={"Select Item"}
                      name="item_id"
                      field_id="item_id"
                      field_name="item_no_name"
                      value={line.item_id}
                      data={ItemList}
                      onChange={(data, option) => {
                        data !== undefined
                          ? onChangeValue(line.id, {
                              item_id: option.data.item_id,
                              item_name: option.data.item_name,
                              unit: null,
                              unit: option.data.uom_no,
                              type_id: option.data.type_id,
                              sourceLocation: null,
                              qty: null,
                              destinationLocation_id: null,
                              destinationLocation_name: null,
                            })
                          : onChangeValue(line.id, {
                              item_id: null,
                              item_name: null,
                              qty: null,
                              unit: null,
                              sourceLocation: null,
                              destinationLocation_id: null,
                              destinationLocation_name: null,
                            });
                      }}
                    />
                  </Col>
                  <Col span={4} className="text-left">
                    <CustomSelect
                      allowClear
                      showSearch
                      size="small"
                      disabled={line.item_id ? false : true}
                      placeholder={"Select Source"}
                      dropdownStyle={{ minWidth: "20%" }}
                      name="sourceLocation"
                      field_id="stock_id"
                      field_name="stock_lot_no_batch_qty_balance"
                      value={line.sourceLocation}
                      data={lot_batch_list}
                      onChange={(data, option) => {
                        data !== undefined
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
                        checkQtyItem(line.id, {
                          item_id: option.data.item_id,
                          item_no_name: option.data.item_no_name,
                          stock_id: option.data.stock_id,
                          shelf_id: option.data.shelf_id,
                          tg_stock_qty_balance:
                            option.data.tg_stock_qty_balance,
                          stock_lot_no_batch_qty_balance:
                            option.data.stock_lot_no_batch_qty_balance,

                          // qty: option.data.tg_stock_qty_balance,
                          // sourceLocation: option.data.location_shelf_no_name,
                          // shelf_id: option.data.shelf_id,
                          // stock_inline:
                          //   option.data.stock_lot_no_batch_qty_balance,
                        });
                      }}
                    />
                  </Col>
                  <Col span={4} className="text-left">
                    <CustomSelect
                      allowClear
                      showSearch
                      size="small"
                      disabled={line.sourceLocation ? false : true}
                      placeholder={"Select Destination Location"}
                      dropdownStyle={{ minWidth: "20%" }}
                      name="destinationLocation_id"
                      field_id="location_id"
                      field_name="location_shelf_no_name"
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
                        data !== undefined
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
                  <Col span={2} className="text-left">
                    <Input
                      style={{
                        textAlign: "right",
                      }}
                      name="qty"
                      size="small"
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
                  <Col span={2} className="text-left">
                    <Input
                      name="unit"
                      size="small"
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
                  <Col span={3} className="text-left">
                    <InputNumber
                      {...numberFormat}
                      disabled={line.item_id ? false : true}
                      name="qty_trafer"
                      size="small"
                      placeholder={"Qty Tramsfer"}
                      min={0.0}
                      max={line.qty}
                      step={0.001}
                      style={{ width: "100%" }}
                      value={line.qty_trafer}
                      onChange={(data) => {
                        onChangeValue(line.id, { qty_trafer: data });
                        checkQtyItem(line.id, {
                          qty_trafer: data,
                          qty_dif:
                            parseFloat(line.qty) - parseFloat(line.qty_trafer),
                        });
                      }}
                    />
                  </Col>
                  <Col span={3} className="text-left">
                    <CustomSelect
                      allowClear
                      showSearch
                      size="small"
                      disabled={line.item_id ? false : true}
                      placeholder={"Select Unit"}
                      name="unit_transfer"
                      field_id="uom_id"
                      field_name="uom_no_name"
                      value={line.uom_id}
                      data={uom}
                      onChange={(data, option) => {
                        data !== undefined
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
                    <DeleteTwoTone onClick={(e) => delLine(line.id)} />
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
          <></>
        )}
      </div>
    </>
  );
};
export default TransferDetail;
