import { DatePicker, Row, Col, InputNumber } from "antd";

import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { convertDigit, numberFormat } from "../../../include/js/main_config";

import CustomText from "../../../components/CustomText";
import ToggleReadOnlyElement from "../../../components/ToggleReadOnlyElement";

import { MRPContext } from "../../../include/js/context";

const { RangePicker } = DatePicker;
const TabMRPDetail = () => {
  const { headReducer, readOnly } = useContext(MRPContext);
  const [state, setState] = useState({
    mrp_qty_produce: headReducer.data.mrp_qty_produce,
    mrp_spare_qty: headReducer.data.mrp_spare_qty,
    mrp_plan_start_date: headReducer.data.mrp_plan_start_date,
    mrp_plan_end_date: headReducer.data.mrp_plan_end_date,
    mrp_qty_percent_spare_rm: headReducer.data.mrp_qty_percent_spare_rm,
    mrp_qty_percent_spare_pk: headReducer.data.mrp_qty_percent_spare_pk,
    uom_no: headReducer.data.uom_no,
  });
  useEffect(() => {
    state.mrp_qty_produce !== headReducer.data.mrp_qty_produce &&
      setState({
        mrp_qty_produce: headReducer.data.mrp_qty_produce,
        mrp_spare_qty: headReducer.data.mrp_spare_qty,
        mrp_plan_start_date: headReducer.data.mrp_plan_start_date,
        mrp_plan_end_date: headReducer.data.mrp_plan_end_date,
        mrp_qty_percent_spare_rm: headReducer.data.mrp_qty_percent_spare_rm,
        mrp_qty_percent_spare_pk: headReducer.data.mrp_qty_percent_spare_pk,
        uom_no: headReducer.data.uom_no,
      });
  }, [headReducer.data.mrp_qty_produce]);
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current - 1 < moment().subtract(1, "days").endOf("day");
  }
  const Save = (field) => {
    state[field] !== headReducer.data[field] &&
      headReducer.onChangeHeadValue(state);
  };
  console.log(headReducer.data);
  return (
    <Row className="col-2  mt-1" gutter={32}>
      <Col span={12} className="col-border-right">
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <CustomText strong require label readOnly={readOnly}>
              Qty. To Produce :
            </CustomText>
          </Col>
          <Col span={15} className={readOnly ? "text-right" : ""}>
            <ToggleReadOnlyElement
              readOnly={readOnly}
              value={convertDigit(state.mrp_qty_produce)}
            >
              <InputNumber
                {...numberFormat}
                min={0}
                step={1}
                placeholder={"Qty. to produce"}
                name={"mrp_qty_produce"}
                defaultValue={0}
                className="full-width"
                value={state.mrp_qty_produce}
                onChange={(data) => {
                  setState({ ...state, mrp_qty_produce: data });
                }}
                onBlur={(data) => {
                  Save("mrp_qty_produce");
                }}
              />
            </ToggleReadOnlyElement>
          </Col>
          <Col span={3} className="text-right">
            <CustomText strong readOnly={readOnly}>
              {state.uom_no ?? "Unit"}
            </CustomText>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <CustomText label strong readOnly={readOnly}>
              RM. To Spare (%) :
            </CustomText>
          </Col>
          <Col span={15} className={readOnly ? "text-right" : ""}>
            <ToggleReadOnlyElement
              readOnly={readOnly}
              value={convertDigit(state.mrp_qty_percent_spare_rm)}
            >
              <InputNumber
                name="mrp_qty_percent_spare_rm"
                placeholder="Percentage"
                defaultValue={0.0}
                min={0.0}
                max={100.0}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                precision={3}
                step={1.0}
                value={state.mrp_qty_percent_spare_rm}
                onChange={(data) => {
                  setState({ ...state, mrp_qty_percent_spare_rm: data });
                }}
                onBlur={() => {
                  Save("mrp_qty_percent_spare_rm");
                }}
                className="full-width"
              />
            </ToggleReadOnlyElement>
          </Col>
          <Col span={3} className="text-right">
            <CustomText strong>{"%"}</CustomText>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <CustomText label strong readOnly={readOnly}>
              PK To Spare (%) :
            </CustomText>
          </Col>
          <Col span={15} className={readOnly ? "text-right" : ""}>
            <ToggleReadOnlyElement
              readOnly={readOnly}
              value={convertDigit(state.mrp_qty_percent_spare_pk)}
            >
              <InputNumber
                name="mrp_qty_percent_spare_pk"
                placeholder="Percentage"
                defaultValue={0.0}
                min={0.0}
                max={100.0}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                precision={3}
                step={1.0}
                value={state.mrp_qty_percent_spare_pk}
                onChange={(data) => {
                  setState({ ...state, mrp_qty_percent_spare_pk: data });
                }}
                onBlur={() => {
                  Save("mrp_qty_percent_spare_pk");
                }}
                className="full-width"
              />
            </ToggleReadOnlyElement>
          </Col>
          <Col span={3} className="text-right">
            <CustomText strong>{"%"}</CustomText>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <CustomText require label strong readOnly={readOnly}>
              {"Plan Date :"}
            </CustomText>
          </Col>
          <Col span={18}>
            {readOnly ? (
              <Text className="text-value text-left">
                {state.mrp_plan_start_date + " - " + state.mrp_plan_end_date}
              </Text>
            ) : (
              <RangePicker
                format={"DD/MM/YYYY"}
                name="mrp_plan_start_date"
                className="full-width"
                disabledDate={disabledDate}
                onChange={(data) => {
                  data
                    ? setState({
                        ...state,
                        mrp_plan_start_date: data[0].format("DD/MM/YYYY"),
                        mrp_plan_end_date: data[1].format("DD/MM/YYYY"),
                      })
                    : setState({
                        ...state,
                        mrp_plan_start_date: null,
                        mrp_plan_end_date: null,
                      });
                }}
                onBlur={() => {
                  Save("mrp_plan_start_date");
                }}
                value={[
                  state.mrp_plan_start_date
                    ? moment(state.mrp_plan_start_date, "DD/MM/YYYY")
                    : "",
                  state.mrp_plan_end_date
                    ? moment(state.mrp_plan_end_date, "DD/MM/YYYY")
                    : "",
                ]}
              />
            )}
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={9}>
            <Text className="require" strong>
              <span className="require">* </span>
              RM Lead Time (days):
            </Text>
          </Col>
          <Col span={15}>
            <Text className="text-left">
              {headReducer.data.mrp_lead_time_day_rm +
                headReducer.data.mrp_lead_time_day_rm_qa}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={9}>
            <Text className="require" strong>
              <span className="require">* </span>
              PK Lead Time (days):
            </Text>
          </Col>
          <Col span={15}>
            <Text className="text-left">
              {headReducer.data.mrp_lead_time_day_pk +
                headReducer.data.mrp_lead_time_day_pk_qa}
            </Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(TabMRPDetail);
