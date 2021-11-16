/** @format */

import { Button, Row, Col, Typography, Modal, Popconfirm, message } from "antd";
import React, { useEffect, useRef, useState } from "react";

import ReceiveSubDetailTable from "./ReceiveSubDetailTable";
import { convertDigit } from "../../../../include/js/main_config";
import ReceiveSubDetailHead from "./ReceiveSubDetailHead";
import {
  sortData,
  sumArrOdjWithField,
  validateFormDetail,
} from "../../../../include/js/function_main";
import {
  receive_sub_detail_fields,
  receive_sub_detail_require_fields,
} from "../../config/receiveConfig";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Text } = Typography;
const ReceiveSubDetail = ({
  selectData,
  modalSave,
  modalCancel,
  readOnly,
  qtyRef,
}) => {
  const btnSave = useRef();
  console.log("ReceiveSubDetail", selectData);
  const [state, setState] = useState(selectData);
  const saveModal = (arrObjData) => {
    console.log(arrObjData);

    modalSave(selectData.id, arrObjData);
  };
  console.log("main sub detail", state);
  return (
    <>
      <Modal
        width={1100}
        closable={false}
        title='Receive Detail'
        visible={selectData.visible}
        destroyOnClose
        onOk={modalSave}
        // onCancel={modalCancel}
        footer={[
          readOnly ? (
            <Button key='back' className={"primary"} onClick={modalCancel}>
              Back
            </Button>
          ) : (
            <Popconfirm
              key='discard'
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => {
                modalCancel();
              }}
              title={
                <Text strong>
                  {"Are you sure to "}
                  <span className='require'>Discard</span>
                  {" ?"}
                </Text>
              }
              okText='Yes'
              cancelText='No'>
              <Button key='back'>Discard</Button>
            </Popconfirm>
          ),
          !readOnly && (
            <Popconfirm
              key='confirm'
              onConfirm={() => {
                btnSave.current.click();
              }}
              icon={<QuestionCircleOutlined style={{ color: "green" }} />}
              title={
                <Text strong>
                  {"Are you sure to "}
                  <span style={{ color: "green" }}>Confirm</span>
                  {" ?"}
                </Text>
              }
              okText='Yes'
              cancelText='No'>
              <Button key='submit' className='primary'>
                Confirm
              </Button>
            </Popconfirm>
          ),
        ]}>
        <ReceiveSubDetailHead
          readOnly={readOnly}
          selectData={selectData}
          qtyRef={qtyRef}
        />
        <ReceiveSubDetailTable
          readOnly={readOnly}
          selectData={selectData}
          btnSave={btnSave}
          saveModal={saveModal}
        />
      </Modal>
    </>
  );
};

export default React.memo(ReceiveSubDetail);
