/** @format */

import { Row, Col, Button, Input, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PrinterOutlined } from "@ant-design/icons";
import { DeliveryOrderContext } from "./DeliveryOrderForm";
import moment from "moment";
const { TextArea } = Input;
const DeliveryOrderFormHead = () => {
  const { method } = useContext(DeliveryOrderContext);
  console.log("method", method);
  return (
    <>
      <div
        className='full-width text-center mb-2'
        style={{ borderBottom: "1px solid #c0c0c0" }}>
        <h1>Delivery Order</h1>
      </div>
      {method == "create" ? (
        <>
          <div className='form-section'>
            <Row className='mt-2 col-2' gutter={24}>
              <Col span={12}>
                <Row className='col-2 mt-1 mb-1'>
                  <Col span={6}>
                    <Text strong>Delivery Date :</Text>
                  </Col>
                  <Col span={16}>
                    <DatePicker
                      name={"npr_product_cost_response_date"}
                      format={"DD/MM/YYYY"}
                      className={"full-width"}
                      placeholder='Delivery Date'
                      required
                      //   value={
                      //     costing.npr_product_cost_response_date
                      //       ? moment(
                      //           costing.npr_product_cost_response_date,
                      //           "DD/MM/YYYY"
                      //         )
                      //       : null
                      //   }
                      //   onChange={(val) =>
                      //     onChange({
                      //       npr_product_cost_response_date: val
                      //         ? moment(val).format("DD/MM/YYYY")
                      //         : null,
                      //     })
                      //   }
                    />
                  </Col>
                </Row>
                {/* <Row className='col-2 mt-1 mb-1'>
                  <Col span={6}>
                    <Text strong>Sender :</Text>
                  </Col>
                  <Col span={16}>
                    <Input
                      name='delivery_sender'
                      placeholder={"Enter Sender"}
                    />
                  </Col>
                </Row> */}
              </Col>
              <Col span={12}>
                <Row className='col-2 mt-1 mb-1'>
                  <Col span={6}>
                    <Text strong>Remark :</Text>
                  </Col>
                  <Col span={16}>
                    <TextArea
                      rows={3}
                      name='delivery_remark'
                      placeholder={"Remark"}
                      //   value={data_head.customer_remark}
                      //   onChange={(e) =>
                      //     upDateFormValue({ customer_remark: e.target.value })
                      //   }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className='form-section'>
            <Row className='mt-2 col-2' gutter={24}>
              <Col span={12}>
                <Row className='col-2 mt-1 mb-1'>
                  <Col span={6}>
                    <Text strong>Delivery Date :</Text>
                  </Col>
                  <Col span={16}>
                    <Text className='text-value'>{"Delivery Date" || "-"}</Text>
                  </Col>
                </Row>
                <Row className='col-2 mt-1 mb-1'>
                  <Col span={6}>
                    <Text strong>Sender :</Text>
                  </Col>
                  <Col span={16}>
                    <Text className='text-value'>{"Sender" || "-"}</Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className='col-2 mt-1 mb-1'>
                  <Col span={6}>
                    <Text strong>Remark :</Text>
                  </Col>
                  <Col span={16}>
                    <Text className='text-value'>{"Remark" || "-"}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default DeliveryOrderFormHead;
