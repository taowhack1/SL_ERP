import { Col, InputNumber, Row, Space, TimePicker } from "antd";
import React, { useContext, useEffect, useReducer, useState } from "react";
import CustomLabel from "../../../components/CustomLabel";
import { ItemContext } from "../../../include/js/context";
import moment from "moment";
import Text from "antd/lib/typography/Text";
import {
  convertNumberToTime,
  convertTimeToNumber,
} from "../../../include/js/function_main";
const FillingProcessHead = () => {
  const { readOnly, data_head, saveForm } = useContext(ItemContext);
  const [state, setState] = useState({
    item_filling_worker: data_head.item_filling_worker,
    item_filling_lead_time: data_head.item_filling_lead_time,
  });
  const onChange = (data) => {
    setState({ ...state, ...data });
  };
  console.log("state", state);
  return (
    <>
      <Row className={"mb-1"}>
        <Col
          span={12}
          style={{
            borderRight: "1px solid #c4c4c4",
          }}
        >
          <Row className={"col-2 row-margin-vertical"}>
            <Col span={7}>
              <CustomLabel
                title={"Worker :"}
                require={true}
                readOnly={readOnly}
              />
            </Col>
            <Col span={14} className="text-left">
              {readOnly ? (
                <Text className="text-value">
                  {data_head.item_filling_worker}
                </Text>
              ) : (
                <InputNumber
                  className="full-width"
                  name={"item_filling_worker"}
                  placeholder="Amount of Worker"
                  min={0}
                  step={1}
                  defaultValue={0}
                  precision={0}
                  value={state.item_filling_worker}
                  onChange={(data) => {
                    console.log(data);
                    onChange({
                      item_filling_worker: data ?? 0,
                    });
                  }}
                  onBlur={(e) => {
                    console.log(e.target.value);
                    saveForm({
                      item_filling_worker: e.target.value,
                    });
                  }}
                />
              )}
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className={"col-2 row-margin-vertical"}>
            <Col span={2}></Col>
            <Col span={7}>
              <CustomLabel
                title={"Used Time / Unit :"}
                require={true}
                readOnly={readOnly}
              />
            </Col>
            <Col span={11} className="text-center">
              {readOnly ? (
                <Text className="text-value">
                  {convertTimeToNumber(state.item_filling_lead_time)}
                </Text>
              ) : (
                <InputNumber
                  name="item_filling_lead_time"
                  placeholder="Time"
                  className={"full-width"}
                  min={0}
                  step={1}
                  defaultValue={0}
                  precision={0}
                  value={convertTimeToNumber(state.item_filling_lead_time)}
                  onChange={(data) => {
                    onChange({
                      item_filling_lead_time: convertNumberToTime(data),
                    });
                  }}
                  onBlur={(e) =>
                    saveForm({
                      item_filling_lead_time: convertNumberToTime(
                        e.target.value
                      ),
                    })
                  }
                />
              )}
            </Col>
            <Col span={3}>
              <Text strong className="pd-left-1">
                Minutes
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(FillingProcessHead);
