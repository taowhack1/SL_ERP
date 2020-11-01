import { Form, Input, Button, Space, Typography } from "antd";
import { Redirect, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn2, signIn } from "../../actions/authActions";
const { Title, Text } = Typography;

const LoginForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(signIn2(values));
  };
  const auth = useSelector((state) => state.auth.authData);
  const redirect_fn = () => {
    history.push("/");
  };
  console.log("auth", auth);
  if (auth.length) {
    redirect_fn();
  }

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
      <Title level={3}>SL ERP</Title>
      <Title level={4}>Login</Title>
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
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(LoginForm);
