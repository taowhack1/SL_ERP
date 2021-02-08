import React from "react";
import MainLayout from "../../../../components/MainLayout";
import { Row, Col, Input, Tabs, Typography, message } from "antd";
const TransferCreate = () => {
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  return (
    <MainLayout>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>Create Transfer </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view"></Text>
          </Col>
        </Row>

        {/* tab detail */}
        <Row className="col-2 row-margin-vertical">
          <Col span={3}>
            <Text strong>
              <span className="require">*</span> Create By :
            </Text>
          </Col>
          <Col span={8}>
            <Text className="text-view">[2563009] เพชร</Text>
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <Text strong>Description :</Text>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default TransferCreate;
