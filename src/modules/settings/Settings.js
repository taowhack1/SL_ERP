import React, { useState } from "react";
import { Row, Col, Typography, Form, InputNumber, Button } from "antd";
import MainLayout from "../../components/MainLayout";
import numeral from "numeral";
import $ from "jquery";
const { Title, Text } = Typography;

const Settings = () => {
  const [setting, setSetting] = useState({
    item_digit: 2,
    price_digit: 2,
    input_vat: 7,
  });
  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  const config = {
    projectId: 4,
    title: "SETTINGS",
    home: "/settings",
    show: true,
    breadcrumb: ["Home"],
    search: true,
    create: "",
    buttonAction: ["Save"],
    save: "function",
    onSave: () => {
      $("#save_setting").click();
      console.log(setting);
    },
    discard: "/settings",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const onFinish = (data) => {
    setSetting(data);
    console.log("Save Setting");
  };
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };
  return (
    <div>
      <MainLayout {...config}>
        <Form
          {...layout}
          name="settings"
          onFinish={onFinish}
          validateMessages={""}
          initialValues={setting}
        >
          <div className="full-width-paper">
            <Row className="row-header">
              <Col span={24}>
                <Title level={5}>Decimal format</Title>
              </Col>
            </Row>
            <Row className="row-body">
              <Col span={24}>
                <Form.Item
                  name={"item_digit"}
                  label="Item Digit"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <InputNumber step={1} min={0} className="number" />
                </Form.Item>
                <Form.Item
                  name={"price_digit"}
                  label="Price Digit"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <InputNumber step={1} min={0} className="number" />
                </Form.Item>
                <Text>
                  {"ex. " + numeral(12345.12345678).format("0,000.00")}
                </Text>
              </Col>
            </Row>
            <Row className="row-header">
              <Col span={24}>
                <Title level={5}>Vat</Title>
              </Col>
            </Row>
            <Row className="row-body">
              <Form.Item
                name={"input_vat"}
                label="Input Vat"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <InputNumber step={0.1} min={0} className="number" />
              </Form.Item>
            </Row>
            <Form.Item>
              <Button
                htmlType="submit"
                id="save_setting"
                style={{ display: "none" }}
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </MainLayout>
    </div>
  );
};

export default Settings;
