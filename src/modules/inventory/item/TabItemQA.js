import React from "react";
import ItemQADetail from "./Item_QA_Detail";
import moment from "moment";
import { Col, InputNumber, Row, Space, TimePicker } from "antd";
import Text from "antd/lib/typography/Text";
const TabItemQA = ({
  data_head,
  upDateFormValue,
  readOnly,
  data_qa_detail,
  qaDetailDispatch,
}) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <Text strong>
                {!readOnly && <span className="require">* </span>}QA used time /
                Lot. :{" "}
              </Text>
            </Col>
            <Col span={17}>
              <Space size={24}>
                {readOnly ? (
                  <Text className="text-view">
                    {data_head.item_qa_lead_time_day
                      ? data_head.item_qa_lead_time_day
                      : "-"}
                  </Text>
                ) : (
                  <InputNumber
                    name="item_qa_lead_time_day"
                    placeholder={"Day"}
                    title="Amount of day"
                    min={0}
                    step={1}
                    precision={0}
                    style={{ width: "150px" }}
                    disabled={0}
                    value={data_head.item_qa_lead_time_day}
                    onChange={(data) =>
                      upDateFormValue({
                        item_qa_lead_time_day: data,
                      })
                    }
                  />
                )}
                <Text strong> Day </Text>
                {readOnly ? (
                  <Text className="text-view">
                    {data_head.item_qa_lead_time
                      ? data_head.item_qa_lead_time
                      : "-"}
                  </Text>
                ) : (
                  <TimePicker
                    className="full-width"
                    format={"HH:mm"}
                    showNow={false}
                    minuteStep={15}
                    name={"item_qa_lead_time"}
                    style={{ width: "150px" }}
                    placeholder="00:00"
                    required
                    value={
                      data_head.item_qa_lead_time
                        ? moment(data_head.item_qa_lead_time, "HH:mm:ss")
                        : ""
                    }
                    onChange={(data) => {
                      const time = moment(data, "HH:mm").format("HH:mm:ss");
                      console.log(time);
                      upDateFormValue({
                        item_qa_lead_time: data ? time : null,
                      });
                    }}
                  />
                )}
                <Text strong> Hour </Text>
                <Col span={1}></Col>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}></Col>
      </Row>
      <div className="mt-3">
        <ItemQADetail
          readOnly={readOnly}
          data_qa_detail={data_qa_detail}
          qaDetailDispatch={qaDetailDispatch}
        />
      </div>
    </>
  );
};

export default TabItemQA;
