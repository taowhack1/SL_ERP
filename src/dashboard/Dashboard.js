
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/MainLayout";
import { Button, Modal } from "antd";
import { addSalary, delSalary } from "../actions/salaryActions";
const Dashboard = (props) => {
  const { salary } = useSelector((state) => state.salary);
  console.log(salary);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    visible: false,
  });
  const OpenModal = () => {
    console.log("11");
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
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const config = {
    title: "DASHBOARD",
    show:true,
    breadcrumb:['Home'],
    search:false,
    action: true,
    step: {
        current: 2,
        step: ['User','Manager','Purchase','Manager Purchase','Board']
    },
    create:"",
    buttonAction: ['Cancel'],
    discard: "",
    onCancel: () => {
      console.log("Cancel");
    },
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

export default Dashboard;
