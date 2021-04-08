import { CalculatorOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import { convertTimeToNumber } from "../../../../include/js/function_main";
import RoutingTabDetail from "./RoutingTabDetail";

const RoutingDetail = ({
  readOnly = false,
  upDateFormValue,
  children,
  state,
  stateDispatch,
  detailField,
  columns,
  triggerHead,
}) => {
  return (
    <>
      <Row className="col-2 ">
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={<CustomLabel readOnly={readOnly} require label={"Bulk"} />}
              key="1"
            >
              <RoutingTabDetail
                dataDetail={state[detailField].bulk}
                routing_type_id={1}
                readOnly={readOnly}
                stateDispatch={stateDispatch}
                detailField={detailField}
                columns={columns}
                triggerHead={triggerHead}
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={<CustomLabel readOnly={readOnly} require label={"FG"} />}
              key="2"
            >
              <RoutingTabDetail
                dataDetail={state[detailField].fg}
                routing_type_id={2}
                readOnly={readOnly}
                stateDispatch={stateDispatch}
                detailField={detailField}
                columns={columns}
                triggerHead={triggerHead}
              />
            </Tabs.TabPane>
            {children}
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default RoutingDetail;
