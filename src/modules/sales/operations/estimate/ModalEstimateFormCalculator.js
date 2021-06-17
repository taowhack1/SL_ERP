import { Button, Divider, Row, Col } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { convertDigit } from "../../../../include/js/main_config";
import { NPREstimateContext } from "./EstimateForm";
import EstimateFormBatch from "./EstimateFormBatch";

const ModalEstimateFormCalculator = ({
  visible = false,
  onOk,
  loading = false,
}) => {
  const { onClose } = useContext(NPREstimateContext);
  return (
    <>
      <Modal
        title="Estimate"
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
        <div className="form-section">
          <EstimateFormBatch />
          <Divider />
          <Row gutter={[8, 8]}>
            <Col span={3} offset={15} className="text-right">
              <Text strong>Total :</Text>
            </Col>
            <Col span={4}>
              <div className="text-right">
                <Text strong>{convertDigit(1234512, 4) ?? "-"}</Text>
              </div>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(ModalEstimateFormCalculator);
