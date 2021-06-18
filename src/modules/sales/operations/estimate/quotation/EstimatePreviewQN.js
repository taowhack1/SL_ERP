import { Button, Modal } from "antd";
import React, { useContext } from "react";
import { NPREstimateContext } from "../EstimateForm";
import EstimateQNForm from "./EstimateQNForm";

const EstimatePreviewQN = () => {
  const {
    modalQN: { onClose, visible, onOk, loading },
  } = useContext(NPREstimateContext);
  return (
    <Modal
      title="Quotations"
      visible={visible}
      onCancel={onClose}
      onOk={onClose}
      width={1000}
      confirmLoading={loading}
      footer={[
        <Button key="back" onClick={onClose} className="mr-5">
          Discard
        </Button>,
        <Button
          key="submit"
          className="primary"
          onClick={onOk}
          loading={loading}
        >
          Save
        </Button>,
      ]}
    >
      <EstimateQNForm />
    </Modal>
  );
};

export default EstimatePreviewQN;
