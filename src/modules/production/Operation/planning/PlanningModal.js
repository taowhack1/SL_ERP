import {
  Button,
  Col,
  DatePicker,
  Form,
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
import FormLeft from "./modal/FormLeft";
import FormRight from "./modal/FormRight";

const PlanningModal = (props) => {
  const { readOnly, data, config } = props;
  return (
    <>
      <Modal
        footer={[
          <Button onClick={config.closeModal} key={"close"}>
            Close
          </Button>,
          <Button className="primary" onClick={config.saveModal} key={"save"}>
            Save
          </Button>,
        ]}
        destroyOnClose
        {...config}
      >
        <div className="flex-container" style={{ minHeight: "50vh" }}>
          <div style={{ width: "35%" }}>
            <FormLeft />
          </div>
          <div style={{ width: "65%" }}>
            <FormRight />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(PlanningModal);
