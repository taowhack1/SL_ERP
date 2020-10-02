import { Form, Input, Button, Space, Typography } from "antd";
import { withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { signIn2, signIn } from "../../actions/authActions";
const { Title, Text } = Typography;

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    if (dispatch(signIn2(values))) {
      props.history.push("/");
    }
  };

  return (
    <div
      style={{
        width: 250,
        height: 300,
        margin: "150px auto",
        padding: 15,
        border: "1px dashed gray",
      }}
    >
      <Title level={3}>Login Form</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="user_name"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="user_password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item> */}

        <Form.Item>
          <Space align="baseline">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(LoginForm);
