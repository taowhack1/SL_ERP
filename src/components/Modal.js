import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";

const ModalCustom = (props) => {
  const [state, setState] = useState({
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
  });
  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  handleOk = () => {
    setState({
      ...state,
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true,
    });
    setTimeout(() => {
      setState({
        ...state,
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    setState({
      ...state,
      visible: false,
    });
  };

  const { visible, confirmLoading, ModalText } = state;
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{ModalText}</p>
      </Modal>
    </>
  );
};

export default ModalCustom;
