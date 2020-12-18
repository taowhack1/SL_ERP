import { DatePicker, Row, Col, Tabs, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React, { useContext, useReducer, useState } from "react";
import moment from "moment";
import { WOContext } from "./WorkOrderCreate";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import ReducerClass from "../../../include/js/ReducerClass";
import CustomText from "../../../components/CustomText";
import ToggleReadOnlyElement from "../../../components/ToggleReadOnlyElement";
import { reducer } from "../reducers";

const { RangePicker } = DatePicker;
const TabWorkOrderDetail = () => {
  const { headReducer, readOnly } = useContext(WOContext);
  const [state, setState] = useState({
    wo_qty: headReducer.data.wo_qty,
    wo_spare_qty: headReducer.data.wo_spare_qty,
    wo_plan_start_date: headReducer.data.wo_plan_start_date,
    wo_plan_start_date: headReducer.data.wo_plan_start_date,
    uom_name: headReducer.data.uom_name,
  });
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current - 1 < moment().subtract(1, "days").endOf("day");
  }
  console.log("TabWorkOrderDetail", headReducer.data);
  return (
    <Row className="col-2  mt-1" gutter={32}>
      <Col span={12} className="col-border-right">
        <Row className="col-2 row-margin-vertical">
          <Col span={6}>
            <CustomText strong require label readOnly={readOnly}>
              Qty. To Produce :
            </CustomText>
          </Col>
          <Col span={15} className="text-right">
            <ToggleReadOnlyElement
              readOnly={readOnly}
              value={convertDigit(state.wo_qty)}
            >
              <InputNumber
                {...numberFormat}
                min={0}
                step={1}
                placeholder={"Qty. to produce"}
                name={"wo_qty"}
                defaultValue={0}
                className="full-width"
                value={state.wo_qty}
                onChange={(data) => {
                  setState({ ...state, wo_qty: data });
                }}
                onBlur={() => {
                  headReducer.onChangeHeadValue(state);
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
              Qty. To Spare (%) :
            </CustomText>
          </Col>
          <Col span={15} className="text-right">
            <ToggleReadOnlyElement
              readOnly={readOnly}
              value={convertDigit(state.wo_spare_qty)}
            >
              <InputNumber
                name="wo_spare_qty"
                placeholder="Percentage"
                defaultValue={0.0}
                min={0.0}
                max={100.0}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                precision={3}
                step={1.0}
                value={state.wo_spare_qty}
                onChange={(data) => {
                  setState({ ...state, wo_spare_qty: data });
                }}
                onBlur={() => {
                  headReducer.onChangeHeadValue(state);
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
            <ToggleReadOnlyElement
              readOnly={readOnly}
              value={() => {
                const start = state.wo_plan_start_date ?? " ";
                const end = state.wo_plan_end_date ?? " ";
                return start + " - " + end;
              }}
            >
              <RangePicker
                format={"DD/MM/YYYY"}
                name="qn_exp_date"
                className="full-width"
                disabledDate={disabledDate}
                onChange={(data) => {
                  data
                    ? setState({
                        ...state,
                        wo_plan_start_date: data[0].format("DD/MM/YYYY"),
                        wo_plan_end_date: data[1].format("DD/MM/YYYY"),
                      })
                    : setState({
                        ...state,
                        wo_plan_start_date: null,
                        wo_plan_end_date: null,
                      });
                }}
                onBlur={() => {
                  headReducer.onChangeHeadValue(state);
                }}
                value={[
                  state.wo_plan_start_date
                    ? moment(state.wo_plan_start_date, "DD/MM/YYYY")
                    : "",
                  state.wo_plan_end_date
                    ? moment(state.wo_plan_end_date, "DD/MM/YYYY")
                    : "",
                ]}
              />
            </ToggleReadOnlyElement>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(TabWorkOrderDetail);
