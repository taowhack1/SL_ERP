/** @format */

import React from "react";
import { WOContext } from "../../../../include/js/context";
import { Row, Col, Tabs, Typography, message, Input } from "antd";
import MainLayout from "../../../../components/MainLayout";
import Title from "antd/lib/skeleton/Title";
import CustomSelect from "../../../../components/CustomSelect";
import WorkOrderHead1 from "./WorkOrderHead1";
import WorkOrderTab from "./WorkOrderTap";
const { Text } = Typography;
const WorkOrderCreate1 = () => {
  return (
    <MainLayout>
      <div id='form'>
        <Row className='col-2'>
          <Col span={8}>
            <h2>
              <strong>Create WorkOrder</strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className='text-view'></Text>
          </Col>
        </Row>
        <WorkOrderHead1 />
        <WorkOrderTab />
      </div>
    </MainLayout>
  );
};
export default WorkOrderCreate1;
