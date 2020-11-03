import { Form, Input, Button, Space, Typography, Table, Row } from "antd";
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
  if (auth && auth.length) {
    redirect_fn();
  } else {
    localStorage.removeItem("state");
  }
  const manual_columns = [
    {
      id: 0,
      title: "Manual List",
      dataIndex: "manual_pdf_name",
      width: "60%",
    },
    {
      id: 1,
      title: "Lasted Update",
      dataIndex: "lasted_update",
      width: "30%",
    },
    {
      id: 2,
      title: "Download",
      dataIndex: "manual_link",
      width: "10%",
    },
  ];
  const manual_data = [
    {
      id: 0,
      manual_pdf_name: "คู่มือระบบ Purchase",
      lasted_update: "3/11/2020 09.00",
      manual_link: "",
    },
    {
      id: 1,
      manual_pdf_name: "คู่มือระบบ Sales",
      lasted_update: "3/11/2020 09.00",
      manual_link: "",
    },
    {
      id: 2,
      manual_pdf_name: "คู่มือระบบ QA",
      lasted_update: "3/11/2020 09.00",
      manual_link: "",
    },
  ];
  return (
    <>
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
      {/* <div
        style={{
          marginTop: 50,
          width: "800px",
          margin: "10px auto",
          marginTop: 10,
        }}
      >
        <Table
          columns={manual_columns}
          dataSource={manual_data}
          // onChange={onChange}
          size="small"
          rowKey="manual_id"
        />
      </div> */}
    </>
  );
};

export default withRouter(LoginForm);
