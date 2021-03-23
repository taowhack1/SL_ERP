/** @format */

import {
  DeleteTwoTone,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, InputNumber, Row, TimePicker } from "antd";
import React from "react";
import CustomTable from "../../../../components/CustomTable";
import { Columns, DetailColumns, routingDetailFileds } from "./routingConfig";
import Text from "antd/lib/typography/Text";
import CustomSelect from "../../../../components/CustomSelect";
import { useSelector } from "react-redux";
import moment from "moment";
import { convertTimeToNumber } from "../../../../include/js/function_main";
const numberFormat = {
  precision: 0,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const RoutingTabDetail = ({ dataDetail, detailDispatch, readOnly }) => {
  const machineList = useSelector(
    (state) => state.production.machine.machineList
  );
  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: routingDetailFileds,
    });
  };
  const delLine = (id) => {
    console.log("id", id);
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
  return (
    <>
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {DetailColumns &&
            DetailColumns.map((col, key) => {
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
                  <Col span={14} className="text-left">
                    <CustomSelect
                      data={machineList}
                      field_id="machine_id"
                      field_name="machine_cost_center_name"
                      name="machine_id"
                      placeholder="Select Cost Center"
                      size="small"
                      value={line.machine_id}
                      onChange={(data, option) => {
                        data && data
                          ? onChangeValue(line.id, {
                              machine_id: data,
                            })
                          : onChangeValue(line.id, {
                              machine_id: null,
                            });
                      }}
                    ></CustomSelect>
                  </Col>
                  <Col span={4} className="text-left">
                    <InputNumber
                      name="routing_detail_worker"
                      {...numberFormat}
                      style={{ width: "100%" }}
                      placeholder="Man"
                      size="small"
                      onChange={(data) => {
                        onChangeValue(line.id, {
                          routing_detail_worker: data,
                        });
                      }}
                      value={line.routing_detail_worker}
                    />
                  </Col>
                  <Col span={4} className="text-left">
                    <TimePicker
                      size="small"
                      format={"HH:mm"}
                      showNow={false}
                      name={"routing_detail_lead_time"}
                      className={"full-width"}
                      placeholder="Hour : Minute"
                      required
                      value={
                        line.routing_detail_lead_time
                          ? moment(line.routing_detail_lead_time, "HH:mm:ss")
                          : ""
                      }
                      onChange={(data) => {
                        const time = moment(data, "HH:mm").format("HH:mm:ss");
                        console.log(time);
                        onChangeValue(line.id, {
                          routing_detail_lead_time: data ? time : null,
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
                block
                onClick={() => {
                  addLine();
                }}
              >
                <PlusOutlined />
                Add a line
              </Button>
            </div>
          </>
        ) : (
          <>
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
                  <Col span={14} className="text-left">
                    <Text>{line.machine_name}</Text>
                  </Col>
                  <Col span={4} className="text-right">
                    <Text>{line.routing_detail_worker}</Text>
                  </Col>
                  <Col span={4} className="text-right">
                    <Text>{line.routing_detail_lead_time}</Text>
                  </Col>
                </Row>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default RoutingTabDetail;
