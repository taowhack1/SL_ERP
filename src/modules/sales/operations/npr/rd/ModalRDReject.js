import { Button, Col, Popconfirm, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";

const ModalRDReject = ({
  modal: { visible },
  onChangeRemarkReject,
  onCloseReject,
  onSubmitReject,
  loading,
}) => {
  return (
    <>
      <Modal
        visible={visible}
        width={600}
        destroyOnClose
        footer={[
          <Button onClick={onCloseReject} key="discard" loading={loading}>
            Disacrd
          </Button>,

          <Popconfirm
            onConfirm={onSubmitReject}
            key="save"
            title="Are you sure you want to reject？"
            okText="Yes"
            cancelText="No"
          >
            <Button className="primary" loading={loading}>
              Save
            </Button>
          </Popconfirm>,
        ]}
      >
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={24}>
            <CustomLabel require readOnly={false} label="Reject Remark :" />
          </Col>
        </Row>
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={24}>
            <TextArea
              cols={4}
              placeholder="Remark"
              onChange={(e) => onChangeRemarkReject(e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default React.memo(ModalRDReject);
