/** @format */

import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../../../include/js/context";
import useKeepLogs from "../../../../logs/useKeepLogs";
import Authorize from "../../../../system/Authorize";
let readOnly = false;
const AdjustStockForm = ({ visible, onClose, item_id, item_detail_id }) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [soData, setSOData] = useState([]);
  const [data, setData] = useState({
    dr_type: [],
    customerLocation: [],
  });
  const onCloseModal = () => {
    // formMethod.reset({
    //   dr: [initialState],
    // });
    onClose();
  };
  return (
    <>
      <Modal
        visible={visible}
        title='Adjust Stock Form'
        width={1000}
        destroyOnClose
        footer={
          readOnly ? (
            <Button className='primary' key='discard'>
              Back
            </Button>
          ) : (
            [
              <Button key='discard'>Discard</Button>,
              <Button name='submit-btn' className='primary' key='submit'>
                Save
              </Button>,
            ]
          )
        }
        onCancel={onCloseModal}></Modal>
    </>
  );
};

export default AdjustStockForm;
