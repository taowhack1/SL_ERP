import React, { useEffect, useState } from "react";
import { Modal, Button, Input } from "antd";
const { TextArea } = Input;

const ModalRemark = (props) => {
  const { visible, loading } = props.state;
  return (
    <>
      <Modal
        visible={visible}
        loading={loading}
        preserve={false}
        destroyOnClose
        {...props}
        footer={[
          <Button key="back" onClick={props.onCancel}>
            Discard
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => props.onOk()}
          >
            Save
          </Button>,
        ]}
      >
        <TextArea
          rows={3}
          width={"100%"}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalRemark;
