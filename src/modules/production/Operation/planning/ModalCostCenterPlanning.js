import {
  Button,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  TimePicker,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";

const ModalCostCenterPlanning = ({
  visible = false,
  data,
  closeModal,
  saveModal,
  readOnly = false,
}) => {
  return (
    <>
      <Modal
        width={"50%"}
        visible={visible}
        footer={[
          <Button onClick={closeModal} key={"close"}>
            Close
          </Button>,
          <Button className="primary" onClick={saveModal} key={"save"}>
            Save
          </Button>,
        ]}
        destroyOnClose
        onCancel={closeModal}
        title={data.plan_job_no}
      >
        <Row className="col-2">
          <Col span={22} offset={1}>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel
                  label="Cost Center :"
                  readOnly={readOnly}
                  require
                />
              </Col>
              <Col span={16}>
                <CustomSelect
                  className="full-width"
                  placeholder={"Cost Center"}
                />
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Plan Date :" readOnly={readOnly} require />
              </Col>
              <Col span={16}>
                <DatePicker className="full-width" />
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Period :" readOnly={readOnly} require />
              </Col>
              <Col span={16}>
                <TimePicker className="full-width" format={"HH:mm"} />
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={8}>
                <CustomLabel label="Worker :" readOnly={readOnly} require />
              </Col>
              <Col span={16}>
                <InputNumber
                  className="full-width"
                  min={0}
                  step={1}
                  defaultValue={0}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default React.memo(ModalCostCenterPlanning);
