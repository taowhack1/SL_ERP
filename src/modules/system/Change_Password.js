import { Form, Input, Button, Space, Typography } from "antd";
import { Redirect, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn2, signIn, change_password } from "../../actions/authActions";
import useKeepLogs from "../logs/useKeepLogs";
const { Title, Text } = Typography;

const ChangePassword = (props) => {
  const keepLog = useKeepLogs();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(
    (state) => state.auth.authData && state.auth.authData
  );
  const redirect_fn = () => {
    history.push("/");
  };
  const onFinish = (values) => {
    console.log(values);
    let validate = false;
    if (values.user_password_new !== values.confirm_user_password_new) {
      alert("Password must match confirm password");
    } else {
      validate = true;
      // values.user_name = auth.user_name;
    }

    if (validate) {
      keepLog.keep_log_action(`Change Password`);
      dispatch(
        change_password({ ...values, user_name: auth.user_name }, redirect_fn)
      );
    }
  };

  console.log("auth", auth);
  if (!auth) {
    alert("Authentication required\nPlase Login.");
    history.push("/login");
  }

  return (
    <div
      style={{
        width: 250,
        height: 350,
        margin: "150px auto",
        padding: 15,
        border: "1px dashed gray",
      }}
    >
      <Title level={3}>SL ERP</Title>
      <Title level={4}>Change Password</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="user_password"
          rules={[
            {
              required: true,
              message: "Old password require!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Old Password"
          />
        </Form.Item>
        <Form.Item
          name="user_password_new"
          rules={[
            {
              required: true,
              message: "Please input your new Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm_user_password_new"
          rules={[
            {
              required: true,
              message: "Please confirm your new Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
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
              Change Password
            </Button>
            <Button
              onClick={() => {
                history.push("/");
              }}
              className="login-form-button"
            >
              Discard
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(ChangePassword);
