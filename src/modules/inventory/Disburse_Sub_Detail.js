import {
  Button,
  Row,
  Col,
  InputNumber,
  AutoComplete,
  Typography,
  Select,
  Divider,
  Modal,
  DatePicker,
  Input,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import {
  calSubtotal,
  sortData,
  sumArrObj,
} from "../../include/js/function_main";
import {
  receive_detail_fields,
  receive_sub_detail_fields,
  disburse_sub_detail_columns,
  disburse_sub_detail_fields,
} from "./config";
import moment from "moment";
import { reducer } from "./reducers";
import CustomSelect from "../../components/CustomSelect";
import { get_lot_batch_by_item_id_shelf } from "../../actions/inventory";
const { Text } = Typography;
const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const SubDetail = ({
  readOnly,
  disburse_detail_id,
  data_detail,
  temp_sub_detail,
  tempSubDetailDispatch,
}) => {
  const location_shelf_list = useSelector(
    (state) => state.inventory.stock.item_location_shelf
  );
  const lot_batch_list = useSelector(
    (state) => state.inventory.stock.item_lot_batch
  );
  // function
  useEffect(() => {
    !temp_sub_detail.length && addLine();
  }, []);
  const addLine = () => {
    tempSubDetailDispatch({
      type: "ADD_ROW",
      payload: {
        ...disburse_sub_detail_fields,
        disburse_detail_id: disburse_detail_id,
        shelf_id: null,
        shelf_no: null,
        shelf_name: null,
        location_id: null,
        location_name: null,
        location_no: null,
      },
    });
  };

  const delLine = (id) => {
    tempSubDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    tempSubDetailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: { ...data, commit: 1 },
      },
    });
  };
  const getLotBatchList = (line) => {
    console.log(line);
    if (lot_batch_list) {
      if (line && line.shelf_id) {
        return sortData(
          lot_batch_list.filter((lot) => lot.shelf_id === line.shelf_id)
        );
      } else if (line && !line.shelf_id) {
        return sortData(lot_batch_list);
      } else {
        return [];
      }
    }
  };
  const getLocationShelf = (shelf_id) => {
    if (location_shelf_list) {
      if (shelf_id) {
        return location_shelf_list.filter(
          (location) => location.shelf_id === shelf_id
        );
      } else {
        return location_shelf_list;
      }
    }
  };
  console.log("sub detail page 2", temp_sub_detail);
  console.log("data_detail", data_detail);
  console.log("location_shelf_list", location_shelf_list);
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {disburse_sub_detail_columns &&
          disburse_sub_detail_columns.map((col, key) => {
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
          {temp_sub_detail &&
            temp_sub_detail.map((line, key) => (
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
                <Col span={7} className="text-string">
                  <CustomSelect
                    allowClear
                    showSearch
                    placeholder={"Source Location"}
                    name="location_id"
                    field_id="shelf_id"
                    field_name="location_shelf_no_name"
                    value={line.location_shelf_no_name}
                    data={getLocationShelf(line.shelf_id)}
                    size={"small"}
                    onChange={(data, option) => {
                      console.log("selected data", option);
                      data
                        ? onChangeValue(line.id, {
                            location_id: option.data.location_id,
                            location_shelf_no_name:
                              option.data.location_shelf_no_name,
                            shelf_id: option.data.shelf_id,
                            shelf_name: option.data.shelf_name,
                          })
                        : onChangeValue(line.id, {
                            location_id: null,
                            location_shelf_no_name: null,
                            shelf_id: null,
                            shelf_name: null,

                            stock_batch: null,
                            stock_lot_no: null,
                            stock_lot_no_batch_qty_balance: null,
                          });
                    }}
                  />
                </Col>
                <Col span={8} className="text-string">
                  <CustomSelect
                    allowClear
                    showSearch
                    placeholder={"Lot / Batch no."}
                    size={"small"}
                    name="stock_batch"
                    field_id="stock_id"
                    field_name="stock_lot_no_batch_qty_balance"
                    value={line.stock_lot_no_batch_qty_balance}
                    data={getLotBatchList(line)}
                    onChange={(data, option) => {
                      data
                        ? onChangeValue(line.id, {
                            stock_id: option.data.stock_id,
                            stock_batch: option.data.stock_batch,
                            stock_lot_no: option.data.stock_lot_no,
                            stock_lot_no_batch_qty_balance:
                              option.data.stock_lot_no_batch_qty_balance,

                            location_id: option.data.location_id,
                            location_shelf_no_name:
                              option.data.location_shelf_no_name,
                            shelf_id: option.data.shelf_id,
                            shelf_name: option.data.shelf_name,
                            stock_mfg_date: option.data.stock_mfg_date,
                            stock_exp_date: option.data.stock_exp_date,
                          })
                        : onChangeValue(line.id, {
                            stock_id: null,
                            stock_batch: null,
                            stock_lot_no: null,
                            stock_lot_no_batch_qty_balance: null,
                          });
                    }}
                  />
                </Col>
                <Col span={3} className="text-number">
                  <InputNumber
                    {...numberFormat}
                    placeholder={"Quantity Done"}
                    min={0.0}
                    step={0.001}
                    size="small"
                    name="disburse_detail_sub_qty"
                    style={{ width: "100%" }}
                    disabled={0}
                    value={line.disburse_detail_sub_qty}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        disburse_detail_sub_qty: data,
                      });
                    }}
                  />
                </Col>
                <Col span={2} className="text-number text-value">
                  <div
                    className="input-string-disabled text-value uom"
                    placeholder={"Unit"}
                  >
                    {data_detail.uom_no}
                  </div>
                </Col>
                <Col span={3} className="text-string">
                  <DatePicker
                    name={"disburse_detail_sub_disburse_date"}
                    format={"DD/MM/YYYY"}
                    size="small"
                    style={{ width: "100%" }}
                    placeholder="Disburse date..."
                    value={
                      line.disburse_detail_sub_disburse_date &&
                      line.disburse_detail_sub_disburse_date
                        ? moment(
                            line.disburse_detail_sub_disburse_date,
                            "DD/MM/YYYY"
                          )
                        : ""
                    }
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        disburse_detail_sub_disburse_date: data.format(
                          "DD/MM/YYYY"
                        ),
                      });
                    }}
                  />
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                  <DeleteTwoTone
                    onClick={() => delLine(line.id)}
                    className="button-icon"
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
          {data_detail &&
            data_detail.disburse_sub_detail.map((line, key) => (
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
                <Col span={7} className="text-string">
                  <Text className="text-view text-string">
                    {line.location_shelf_no_name}
                  </Text>
                </Col>
                <Col span={8} className="text-string">
                  <Text className="text-view text-string">
                    {line.stock_lot_no_batch_qty_balance}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view text-number">
                    {numeral(line.disburse_detail_sub_qty).format("0,0.000")}
                  </Text>
                </Col>
                <Col span={2} className="text-string">
                  <Text className="text-view text-string">
                    {data_detail.uom_no}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view text-number">
                    {line.disburse_detail_sub_disburse_date}
                  </Text>
                </Col>

                <Col span={1} className="text-center"></Col>
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

export default React.memo(SubDetail);
