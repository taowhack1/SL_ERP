import { Col, DatePicker, Row, TimePicker } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import { getDRCustomers } from "../../../../../actions/sales/doActions";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { DOContext } from "../../../../../include/js/context";
const Head = () => {
  const {
    readOnly,
    stateDO,
    setStateDO,
    selectData: { customers },
  } = useContext(DOContext);

  const onChange = (data) => setStateDO((prev) => ({ ...prev, ...data }));
  const {
    do_id,
    do_no,
    customer_no_name,
    customer_id,
    do_location_delivery,
    tg_trans_status_id,
    do_delivery_date,
    do_delivery_time,
    do_remark,
  } = stateDO;

  console.log("Head Render...");
  return (
    <>
      <Row className="col-2 row-margin-vertical" gutter={[24, 8]}>
        <Col span={12}>
          {do_id && (
            <>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel label="DO No. :" require readOnly={readOnly} />
                </Col>
                <Col span={16}>
                  <Text className="pre-wrap">{do_no}</Text>
                </Col>
              </Row>
            </>
          )}
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel label="ลูกค้า :" require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="pre-wrap">{customer_no_name}</Text>
              ) : (
                <CustomSelect
                  name="customer_id"
                  field_id="customer_id"
                  field_name="customer_no_name"
                  placeholder="Select Customer"
                  allowClear
                  showSearch
                  value={customer_id}
                  data={customers}
                  onChange={(val, row) =>
                    val !== undefined
                      ? onChange({
                          customer_id: val,
                          do_detail: [
                            {
                              id: 0,
                              dr_id: null,
                              so_id: null,
                              so_detail_id: null,
                              dr_remark: null,
                              dr_qty: null,
                            },
                          ],
                        })
                      : onChange({
                          customer_id: null,
                          do_detail: [
                            {
                              id: 0,
                              dr_id: null,
                              so_id: null,
                              so_detail_id: null,
                              dr_remark: null,
                              dr_qty: null,
                            },
                          ],
                        })
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1">
            <Col span={8}>
              <CustomLabel
                label="วัน/เวลา ที่ออกรถ :"
                readOnly={readOnly}
                require={true}
              />
            </Col>
            <Col span={9}>
              {readOnly ? (
                <Text className="pre-wrap pd-right-2">{do_delivery_date}</Text>
              ) : (
                <>
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    className={"full-width"}
                    name="do_delivery_date"
                    placeholder="Delivery Date"
                    value={
                      do_delivery_date
                        ? moment(do_delivery_date, "DD/MM/YYYY")
                        : ""
                    }
                    onChange={(data) => {
                      onChange({
                        do_delivery_date: data.format("DD/MM/YYYY"),
                      });
                    }}
                  />
                </>
              )}
            </Col>
            <Col span={7}>
              {readOnly ? (
                <>
                  <Text strong>เวลา : </Text>
                  <Text className="pre-wrap">{do_delivery_time}</Text>
                </>
              ) : (
                <>
                  <TimePicker
                    placeholder={"ชั่วโมง : นาที"}
                    format={"HH:mm"}
                    className="w-100"
                    value={
                      do_delivery_time
                        ? moment(do_delivery_time, "HH:mm:ss")
                        : null
                    }
                    onChange={(val) =>
                      val
                        ? onChange({
                            do_delivery_time: moment(val).format("HH:mm:ss"),
                          })
                        : onChange({ do_delivery_time: null })
                    }
                  />
                </>
              )}
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel
                label="สถานที่จัดส่ง :"
                require
                readOnly={readOnly}
              />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="pre-wrap">{do_location_delivery}</Text>
              ) : (
                <>
                  <TextArea
                    name="do_location_delivery"
                    placeholder="สถานที่จัดส่ง"
                    rows={4}
                    value={do_location_delivery}
                    onChange={(e) =>
                      onChange({ do_location_delivery: e.target.value })
                    }
                  />
                </>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={8}>
              <CustomLabel label="หมายเหตุ :" require readOnly={readOnly} />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="pre-wrap">{do_remark}</Text>
              ) : (
                <>
                  <TextArea
                    name="do_remark"
                    placeholder="Delivery Location"
                    rows={4}
                    value={do_remark}
                    onChange={(e) => onChange({ do_remark: e.target.value })}
                  />
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(Head);
