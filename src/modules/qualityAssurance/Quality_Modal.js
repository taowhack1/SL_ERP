import {
  Input,
  Select,
  Form,
  Modal,
  Row,
  Col,
  Button,
  Radio,
  Divider,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import TestForm from "./QC_Quality_Test_Form";
import { get_issue_ref_list } from "../../actions/inventory/disburseActions";

const { Option } = Select;
const Quality_Modal = (props) => {
  const { modalSave, modalCancel, visible, data_head, test_id } = props;
  const [testType, setTestType] = useState(1);
  console.log(props);
  const modalConfig = {
    width: 800,
    title: "Add new ",
    visible: visible,
    onOk: modalSave,
    onCancel: modalCancel,
    destroyOnClose: true,
    okText: "Save",
    cancelText: "Discard",
  };

  const onChangeType = (e) => {
    setTestType(e.target.value);
  };
  console.log(data_head);
  return (
    <>
      <Modal {...modalConfig}>
        {/* <Row>
          <Text>Select test type your want to create.</Text>
        </Row> */}
        <Divider orientation="left" plain>
          Select test type your want to create.
        </Divider>
        <Row>
          <Radio.Group
            onChange={onChangeType}
            value={testType}
            style={{ paddingLeft: 75 }}
            disabled={test_id ? 1 : 0}
          >
            <Radio value={1}>Subject</Radio>
            <Radio value={2}>Specification</Radio>
            <Radio value={3}>Method</Radio>
          </Radio.Group>
        </Row>
        <Divider />
        <TestForm
          fields={["Name", "Description"]}
          data_head={data_head}
          type={testType}
        />
      </Modal>
    </>
  );
};

export default Quality_Modal;
