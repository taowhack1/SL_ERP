import { Form, Input, Button, Space, Typography, Table, Row } from "antd";
import { Redirect, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn2, signIn } from "../../actions/authActions";
import manual_qa from "./Manual_ERP_Quality_Assurance.pdf";

const { Title, Text } = Typography;
var getUrl = window.location;
const LoginForm = (props) => {
  var baseUrl =
    getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split("/")[1];
  console.log(baseUrl);
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
  if (auth.user_name) {
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
      render: (value) => {
        return (
          <div style={{ textAlign: "center" }}>
            <a download href={require(`${value}`)}>
              {/* <a download href={`${baseUrl.value}`}> */}
              <DownloadOutlined />
            </a>
          </div>
        );
      },
    },
  ];
  const manual_data = [
    {
      manual_id: 0,
      manual_pdf_name: "Purchase",
      lasted_update: "3/11/2020 09.00",
      manual_link: "./Manual_ERP_SL_Purchase.pdf",
    },
    {
      manual_id: 1,
      manual_pdf_name: "Sales",
      lasted_update: "3/11/2020 09.00",
      manual_link: "./Manual_ERP_SL_Sales.pdf",
    },
    {
      manual_id: 2,
      manual_pdf_name: "QA",
      lasted_update: "3/11/2020 09.00",
      manual_link: "./Manual_ERP_Quality_Assurance.pdf",
    },
    {
      manual_id: 3,
      manual_pdf_name: "Inventory",
      lasted_update: "6/11/2020 11.00",
      manual_link: "./Manual_ERP_SL_Inventory.pdf",
    },
  ];
  return (
    <>
      <div className="sl-logo">
        <div
          style={{
            width: 250,
            height: 300,
            margin: "150px auto",
            marginBottom: "10px",
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
        <div
          style={{
            width: "800px",
            margin: "10px auto",
          }}
        >
          <Table
            columns={manual_columns}
            dataSource={manual_data}
            size="small"
            rowKey="manual_id"
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(LoginForm);
