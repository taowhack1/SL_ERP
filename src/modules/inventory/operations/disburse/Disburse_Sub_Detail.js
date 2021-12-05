import {
  Button,
  Row,
  Col,
  InputNumber,
  Typography,
  DatePicker,
  Spin,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { sortData } from "../../../../include/js/function_main";
import {
  disburse_sub_detail_columns,
  disburse_sub_detail_fields,
} from "./config";
import moment from "moment";

import CustomSelect from "../../../../components/CustomSelect";

import { convertDigit, numberFormat } from "../../../../include/js/main_config";
import { api_get_lot_batch_by_item_id_shelf } from "../../../../include/js/api";
import { useFetch } from "../../../../include/js/customHooks";
const { Text } = Typography;

const apiGetStockAvailableByItemIdAndDisburseID = `/inventory/disburse/stock_available`;
const SubDetail = ({
  disburse_id,
  limit_qty,
  readOnly,
  disburse_detail_id,
  data_detail,
  temp_sub_detail,
  tempSubDetailDispatch,
}) => {
  const { item_id } = data_detail || {};
  // const lot_batch_list = useSelector(
  //   (state) => state.inventory.stock.item_lot_batch
  // );

  const { data, loading: loadingGetLotBatch } = useFetch(
    `${apiGetStockAvailableByItemIdAndDisburseID}/${item_id}&${
      disburse_id || 0
    }`,
    !item_id
  );
  const { data: lot_batch_list } = data || {};
  console.log("data", data);
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
        disburse_detail_sub_disburse_date: moment().format("DD/MM/YYYY"),
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
  const getMaxQty = (stock_id) => {
    if (!stock_id) return 0;
    console.log("getMaxQty Stock_id", stock_id);
    console.log("lot_batch_list 2", lot_batch_list);
    const maxQty =
      lot_batch_list?.find((obj) => obj.stock_id === stock_id)
        ?.tg_stock_qty_balance || 0;
    return maxQty;
  };
  console.log("lot_batch_list 1", lot_batch_list);
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
                <Col span={11} className="text-string">
                  <Spin spinning={loadingGetLotBatch}>
                    <CustomSelect
                      allowClear
                      showSearch
                      placeholder={"Lot / Batch no."}
                      size={"small"}
                      name="stock_batch"
                      field_id="stock_id"
                      field_name="stock_lot_no_batch_qty_balance"
                      value={line.stock_id}
                      data={lot_batch_list}
                      onChange={(data, option) => {
                        data
                          ? onChangeValue(line.id, {
                              stock_id: option.data.stock_id,
                              stock_batch: option.data.stock_batch,
                              stock_lot_no: option.data.stock_lot_no,
                              stock_lot_no_batch_qty_balance:
                                option.data.stock_lot_no_batch_qty_balance,

                              shelf_id: option.data.shelf_id,
                              location_id: option.data.location_id,
                              stock_mfg_date: option.data.stock_mfg_date,
                              stock_exp_date: option.data.stock_exp_date,
                              tg_stock_qty_balance:
                                option.data.tg_stock_qty_balance,
                              disburse_detail_sub_qty: 0,
                            })
                          : onChangeValue(line.id, {
                              stock_id: null,
                              stock_batch: null,
                              stock_lot_no: null,
                              stock_lot_no_batch_qty_balance: null,
                              stock_mfg_date: null,
                              stock_exp_date: null,
                              tg_stock_qty_balance: 0,
                              disburse_detail_sub_qty: 0,
                              shelf_id: null,
                              location_id: null,
                            });
                      }}
                    />
                  </Spin>
                </Col>
                <Col span={5} className="text-number">
                  <InputNumber
                    {...numberFormat}
                    placeholder={"Quantity Done"}
                    min={0.0}
                    max={getMaxQty(line?.stock_id)}
                    step={0.000001}
                    size="small"
                    name="disburse_detail_sub_qty"
                    className={"full-width"}
                    disabled={!getMaxQty(line?.stock_id)}
                    value={line.disburse_detail_sub_qty}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        disburse_detail_sub_qty: data,
                      });
                    }}
                  />
                </Col>
                <Col span={3} className="text-number text-value">
                  <div
                    className="input-string-disabled text-value uom"
                    placeholder={"Unit"}
                  >
                    {data_detail.uom_no}
                  </div>
                </Col>
                <Col span={4} className="text-string">
                  <DatePicker
                    name={"disburse_detail_sub_disburse_date"}
                    format={"DD/MM/YYYY"}
                    size="small"
                    className={"full-width"}
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
                        disburse_detail_sub_disburse_date:
                          data.format("DD/MM/YYYY"),
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
                <Col span={11} className="text-string">
                  <Text className="text-view text-string">
                    {line.stock_lot_no_batch_qty_balance}
                  </Text>
                </Col>
                <Col span={5} className="text-number">
                  <Text className="text-view text-number">
                    {convertDigit(line.disburse_detail_sub_qty)}
                  </Text>
                </Col>
                <Col span={3} className="text-string">
                  <Text className="text-view text-string">
                    {data_detail.uom_no}
                  </Text>
                </Col>
                <Col span={4} className="text-number">
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
