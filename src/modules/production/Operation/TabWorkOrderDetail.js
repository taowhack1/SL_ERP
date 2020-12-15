import { DatePicker, Row, Col, Tabs, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import moment from "moment";
import { WOContext } from "./WorkOrderCreate";
import { numberFormat } from "../../../include/js/main_config";

const { RangePicker } = DatePicker;
const TabWorkOrderDetail = () => {
  const { data_head, upDateFormValue } = useContext(WOContext);
  // console.log();
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current - 1 < moment().subtract(1, "days").endOf("day");
  }
  console.log("TabWorkOrderDetail");
  return (
    <Row className="col-2  mt-1" gutter={32}>
      <Col span={12} className="col-border-right">
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <Text strong>
              <span className="require">* </span>Qty. To Produce :
            </Text>
          </Col>
          <Col span={15}>
            <InputNumber
              {...numberFormat}
              min={0}
              step={1}
              placeholder={"Qty. to produce"}
              name={"wo_qty"}
              value={data_head.wo_qty}
              defaultValue={0}
              className="full-width"
              onChange={(data) => {
                upDateFormValue({
                  wo_qty: data,
                });
              }}
            />
          </Col>
          <Col span={3} className=" text-right">
            <Text strong className="text-value">
              {data_head.uom_no ?? "Unit"}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <Text strong className="pd-left-1">
              Qty. To Spare (%) :
            </Text>
          </Col>
          <Col span={15}>
            <InputNumber
              name="wo_spare_qty"
              placeholder="Percentage"
              value={data_head.wo_spare_qty}
              defaultValue={0.0}
              min={0.0}
              max={100.0}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              precision={3}
              step={1.0}
              onChange={(data) => {
                upDateFormValue({
                  wo_spare_qty: data,
                });
              }}
              className="full-width"
            />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <Text strong>
              <span className="require">* </span>Plan Date :
            </Text>
          </Col>
          <Col span={18}>
            <RangePicker disabledDate={disabledDate} className="full-width" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(TabWorkOrderDetail);
