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
  if (auth && auth.length) {
    redirect_fn();
  } else {
    localStorage.removeItem("state");
  }
  const manual_columns = [
    {
      id: 0,
      title: "รายการคู่มือ",
      dataIndex: "manual_purch",
      width: "80%",
    },
  ];
  // {
  //   id:0,
  //   title:"คู่มือระบบ Purchase",
  //   dataIndex:"manual_purch",
  //   width:"80%"
  // },
  // {
  //   id:1,
  //   title:"คู่มือระบบ Sales",
  //   dataIndex:"manual_sales",
  //   width:"80%"
  // },
  // {
  //   id:2,
  //   title:"คู่มือระบบ QA",
  //   dataIndex:"manual_QA",
  //   width:"80%"
  // },
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
      {/* <Table
              columns={manual_columns}
              dataSource={data}
              onChange={onChange}
              size="small"
              rowKey="pr_id"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    // dispatch(set_pr_head(record.pr_id, data));
                    getData(record.pr_id, auth.user_name);

                    props.history.push({
                      pathname: "/purchase/pr/view/" + record.pr_id,
                      // state: record,
                    });
                  },
                };
              }}
            /> */}
    </div>
  );
};

export default withRouter(LoginForm);
