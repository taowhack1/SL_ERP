import { Button, Col, InputNumber, Row, TimePicker } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";
import WorkCenterDetail from "../../production/WorkCenterDetail";
import moment from "moment";

export const ItemProcessModal = ({
  readOnly,
  visible,
  modalSave,
  modalCancel,
  data_detail,
  detailDispatch,
}) => {
  console.log(data_detail);
  return (
    <Modal
      width={1100}
      title="Work Center Detail"
      visible={visible}
      destroyOnClose
      onOk={modalSave}
      onCancel={modalCancel}
      footer={[
        <Button
          key="back"
          className={readOnly ? "primary" : ""}
          onClick={modalCancel}
        >
          Discard
        </Button>,
        !readOnly && (
          <Button key="submit" className="primary" onClick={modalSave}>
            Confirm
          </Button>
        ),
      ]}
    >
      <Row className="">
        <Col span={24}>
          <WorkCenterDetail
            data_detail={data_detail}
            detailDispatch={detailDispatch}
            readOnly={readOnly}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ItemProcessModal;
