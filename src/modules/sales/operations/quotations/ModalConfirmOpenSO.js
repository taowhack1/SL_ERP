import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";

const ModalConfirmOpenSO = ({ visible, qn_id, qn_no, onCancel, onConfirm }) => {
  console.log("modal open so", visible, qn_id);
  return (
    <>
      <Modal
        destroyOnClose
        visible={visible}
        onCancel={onCancel}
        onOk={onConfirm}
        width={"500px"}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="ok" className="primary" onClick={onConfirm}>
            Confirm
          </Button>,
        ]}
      >
        <Text strong>
          Are you sure to create Sales Order with QN :
          <span style={{ color: "blue" }}>{qn_no}</span> ?
        </Text>
      </Modal>
    </>
  );
};

export default React.memo(ModalConfirmOpenSO);
