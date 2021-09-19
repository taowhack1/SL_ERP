/** @format */

import { Button, Col, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AppContext } from "../../../../../include/js/context";
import useKeepLogs from "../../../../logs/useKeepLogs";
import Authorize from "../../../../system/Authorize";
import Form from "./Form";
const initialState = {
  commit: 1,
  data_id: null,
  document_date: null,
  document_description: null,
  document_id: null,
  document_no: null,
  id: null,
  item_id: null,
  stock_batch: null,
  stock_exp_date: null,
  stock_id: null,
  stock_lot_no: null,
  stock_mfg_date: null,
  stock_unit_price: null,
  stock_updated: null,
  tg_stock_qty_balance: null,
  tg_stock_qty_inbound: null,
  tg_stock_qty_outbound: null,
  uom_name: null,
  uom_no: null,
};
let readOnly = false;
const AdjustStockForm = ({ visible, onClose, rowData, item_no_name }) => {
  const dataMain = rowData;
  console.log("dataMain", dataMain);
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [itemData, setItemData] = useState({});

  const formMethod = useForm({
    defaultValues: {
      ...initialState,
    },
  });
  const formArray = useFieldArray({
    name: "adjustock",
    control: formMethod.control,
  });
  const onCloseModal = () => {
    formMethod.reset({
      ...initialState,
    });
    onClose();
  };

  const formConfig = React.useMemo(
    () => ({
      form: formMethod,
      formArray,
      readOnly,
      itemData,
    }),
    [formArray, formMethod, itemData, readOnly]
  );
  useEffect(() => {
    setItemData({ ...dataMain });
    formMethod.reset({
      ...dataMain,
    });
  }, [dataMain]);
  const onSubmit = async (data) => {
    console.log("submit", data);
    onClose();
  };
  const onError = (errors, e) => console.log(errors, e);
  console.log("itemData", itemData);
  return (
    <>
      <Modal
        visible={visible}
        title={item_no_name}
        width={520}
        destroyOnClose
        footer={
          readOnly ? (
            <Button className='primary' key='discard' onClick={onCloseModal}>
              Back
            </Button>
          ) : (
            [
              <Button key='discard' onClick={onCloseModal}>
                Discard
              </Button>,
              <Button
                name='submit-btn'
                className='primary'
                key='submit'
                htmlType='submit'
                onClick={() => document.getElementById("submit-btn").click()}>
                Save
              </Button>,
            ]
          )
        }
        onCancel={onCloseModal}
        onOk={onSubmit}>
        <form onSubmit={formMethod.handleSubmit(onSubmit, onError)}>
          <Form {...formConfig} />
          <button type='submit' id='submit-btn' className='d-none'></button>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(AdjustStockForm);
