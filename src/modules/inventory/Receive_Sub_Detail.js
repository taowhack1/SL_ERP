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
import { useSelector } from "react-redux";
import numeral from "numeral";
import {
  receive_detail_fields,
  receive_sub_detail_fields,
  receive_sub_detail_columns,
} from "./config";
import moment from "moment";
import { reducer } from "./reducers";
import CustomSelect from "../../components/CustomSelect";
import { convertDigit } from "../../include/js/main_config";
const { Text } = Typography;
const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const SubDetail = ({
  readOnly,
  receive_detail_id,
  data_detail,
  temp_sub_detail,
  tempSubDetailDispatch,
}) => {
  const location_list = useSelector(
    (state) => state.inventory.stock.item_location_shelf
  );
  // function
  useEffect(() => {
    !temp_sub_detail.length && addLine();
  }, []);
  const addLine = () => {
    tempSubDetailDispatch({
      type: "ADD_ROW",
      payload: {
        ...receive_sub_detail_fields,
        receive_detail_id: receive_detail_id,
        shelf_id: data_detail.shelf_id,
        shelf_no: data_detail.shelf_no,
        shelf_name: data_detail.shelf_name,
        shelf_no_name: data_detail.shelf_no_name,

        location_id: data_detail.location_id,
        location_no_name: data_detail.location_no_name,
        location_no: data_detail.location_no,
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
        data: data,
      },
    });
  };
  console.log("sub detail page 2", temp_sub_detail);
  console.log("data_detail", data_detail);
  console.log("location_list", location_list);
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {receive_sub_detail_columns &&
          receive_sub_detail_columns.map((col, key) => {
            return (
              <Col key={key} span={col.size} className="col-outline">
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
                <Col span={5} className="text-string">
                  {/* <CustomSelect
                    allowClear
                    showSearch
                    placeholder={"Location"}
                    field_id="location_id"
                    field_name="location_no_name"
                    value={line.location_no_name}
                    data={location_list}
                    size={"small"}
                    onChange={(data, option) => {
                      onChangeValue(line.id, {
                        location_id: data,
                        location_no_name: option.data.location_no_name,
                        shelf_id: option.data.shelf_id,
                        shelf_name: option.data.shelf_name,
                        shelf_no_name: option.data.shelf_no_name,
                      });
                    }}
                  /> */}
                  <div
                    className="input-string-disabled text-value"
                    placeholder="Location"
                  >
                    {line.location_no_name}
                  </div>
                </Col>
                <Col span={4} className="text-string">
                  <Input
                    placeholder="Lot No."
                    size="small"
                    value={line.receive_detail_sub_lot_no}
                    onChange={(e) => {
                      onChangeValue(line.id, {
                        receive_detail_sub_lot_no: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={3} className="text-number">
                  <DatePicker
                    name={"receive_detail_sub_receive_date"}
                    format={"DD/MM/YYYY"}
                    size="small"
                    style={{ width: "100%" }}
                    placeholder="Receive date..."
                    value={
                      line.receive_detail_sub_receive_date &&
                      line.receive_detail_sub_receive_date
                        ? moment(
                            line.receive_detail_sub_receive_date,
                            "DD/MM/YYYY"
                          )
                        : ""
                    }
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        receive_detail_sub_receive_date: data.format(
                          "DD/MM/YYYY"
                        ),
                      });
                    }}
                  />
                </Col>
                <Col span={3} className="text-number">
                  <DatePicker
                    name={"receive_detail_sub_mfg_date"}
                    format={"DD/MM/YYYY"}
                    size="small"
                    style={{ width: "100%" }}
                    placeholder="MFG date..."
                    value={
                      line.receive_detail_sub_mfg_date &&
                      line.receive_detail_sub_mfg_date
                        ? moment(line.receive_detail_sub_mfg_date, "DD/MM/YYYY")
                        : ""
                    }
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        receive_detail_sub_mfg_date: data.format("DD/MM/YYYY"),
                      });
                    }}
                  />
                </Col>
                <Col span={3} className="text-string">
                  <DatePicker
                    name={"receive_detail_sub_exp_date"}
                    format={"DD/MM/YYYY"}
                    size="small"
                    style={{ width: "100%" }}
                    placeholder="EXP date..."
                    value={
                      line.receive_detail_sub_exp_date &&
                      line.receive_detail_sub_exp_date
                        ? moment(line.receive_detail_sub_exp_date, "DD/MM/YYYY")
                        : ""
                    }
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        receive_detail_sub_exp_date: data.format("DD/MM/YYYY"),
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
                    style={{ width: "100%" }}
                    disabled={0}
                    value={line.receive_detail_sub_qty}
                    onChange={(data) => {
                      onChangeValue(line.id, {
                        receive_detail_sub_qty: data,
                      });
                      // updateAmount();
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
            data_detail.receive_sub_detail.map((line, key) => (
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
                <Col span={5} className="text-string">
                  <Text className="text-view text-string">
                    {line.location_name}
                  </Text>
                </Col>
                <Col span={4} className="text-string">
                  <Text className="text-view text-string">
                    {line.receive_detail_sub_lot_no}
                  </Text>
                </Col>
                <Col span={3} className="text-center">
                  <Text className="text-view text-center">
                    {line.receive_detail_sub_receive_date}
                  </Text>
                </Col>
                <Col span={3} className="text-center">
                  <Text className="text-view text-center">
                    {line.receive_detail_sub_mfg_date}
                  </Text>
                </Col>
                <Col span={3} className="text-center">
                  <Text className="text-view text-center">
                    {line.receive_detail_sub_exp_date}
                  </Text>
                </Col>
                <Col span={3} className="text-number">
                  <Text className="text-view text-number">
                    {convertDigit(line.receive_detail_sub_qty)}
                  </Text>
                </Col>
                <Col span={2} className="text-string">
                  <Text className="text-view text-string">
                    {data_detail.uom_no}
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
