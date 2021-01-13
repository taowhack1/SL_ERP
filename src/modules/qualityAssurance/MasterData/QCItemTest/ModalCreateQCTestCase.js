import { Modal, Row, Radio, Divider } from "antd";
import React, { useMemo, useState } from "react";
const QCContext = React.createContext();
const ModalCreateQCTestCase = ({
  modalSave,
  modalCancel,
  visible,
  data_head,
  test_id,
}) => {
  const [state, setState] = useState(data_head);
  const [qc_type, setQCType] = useState(1);
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
    setQCType(e.target.value);
  };
  const getFields = (type_id) => {
    switch (type_id) {
      case 1:
        return ["qa_subject_name", "qa_subject_remark"];
      case 2:
        return ["qa_specification_name", "qa_specification_remark"];
      case 3:
        return ["qa_method_name", "qa_method_remark"];
      default:
        return ["", ""];
    }
  };
  const ContextValue = useMemo(() => {
    return { state, setState };
  }, [state, setState]);
  return (
    <>
      <QCContext.Provider value={ContextValue}>
        <Modal {...modalConfig}>
          <Divider orientation="left" plain>
            Select type to create.
          </Divider>
          <Row>
            <Radio.Group
              onChange={onChangeType}
              value={qc_type}
              style={{ paddingLeft: 75 }}
              disabled={test_id ? 1 : 0}
            >
              <Radio value={1}>Subject</Radio>
              <Radio value={2}>Specification</Radio>
              <Radio value={3}>Method</Radio>
            </Radio.Group>
          </Row>
          <Divider />
        </Modal>
      </QCContext.Provider>
    </>
  );
};

export default ModalCreateQCTestCase;
