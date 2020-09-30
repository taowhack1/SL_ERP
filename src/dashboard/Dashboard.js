import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { Button, Modal } from "antd";
import { Form, Input } from "antd";
import { addSalary, delSalary } from "../actions/salaryActions";
import { signIn2, signIn3 } from "../actions/authActions";
const Dashboard = (props) => {
  const { salary } = useSelector((state) => state.salary);
  console.log(salary);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    visible: false,
  });
  const OpenModal = () => {
    setState({ visible: true });
  };
  const handleOk = () => {
    console.log("Handle OK Button");
    setState({ visible: false });
  };
  const handleCancel = () => {
    console.log("Handle Cancel Button");
    setState({ visible: false });
  };
  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  const config = {
    projectId: 0,
    title: "DASHBOARD",
    show: true,
    breadcrumb: ["Home"],
    search: false,
    action: ["print"],
    step: {
      current: 2,
      step: ["User", "Manager", "Purchase", "Manager Purchase", "Board"],
    },
    create: "",
    buttonAction: ["Cancel"],
    discard: "",
    onCancel: () => {
      console.log("Cancel");
    },
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const onFinish = (data) => {
    console.log("data", data);
    dispatch(signIn2(data));
  };

  return (
    <div>
      <MainLayout {...config}>
        <Button onClick={OpenModal}>Popup</Button>
        <Button onClick={() => dispatch(addSalary(salary))}>
          ADD SALARY + 1000
        </Button>
        <Button onClick={() => dispatch(delSalary(salary))}>
          DEL SALARY - 1000
        </Button>
        Salary: {salary}
        <h1>This is Dashboard</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item label="Username" name="user_name" rules={[]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="user_password" rules={[]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </MainLayout>
      <Modal
        title="Basic Modal"
        visible={state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...1</p>
        <p>Some contents...2</p>
        <p>Some contents...3</p>
      </Modal>
    </div>
  );
};

export default withRouter(Dashboard);
