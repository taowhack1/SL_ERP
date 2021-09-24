/** @format */

import { Button, Col, message, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { saveAdjustStock } from "../../../../../actions/inventory/configurations/adjuststock/adjuststockAction";
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
const AdjustStockForm = ({
  visible,
  onClose,
  rowData,
  item_no_name,
  type,
  handleExpand2,
}) => {
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
      type,
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
    const saveData = [
      {
        stock_id: data.stock_id,
        item_id: data.item_id,
        user_name: user_name,
        stock_lot_no: data.stock_lot_no,
        stock_batch: data.stock_batch,
        stock_detail_qty_inbound: data.stock_detail_qty_inbound,
        stock_detail_qty_outbound: data.stock_detail_qty_outbound,
        stock_remark: type == "+ Qty." ? "adjust_add" : "adjust_minus",
        stock_mfg_date: data.stock_mfg_date,
        stock_exp_date: data.stock_exp_date,
        stock_unit_price: data.stock_unit_price,
        commit: 1,
      },
    ];
    const hide = message.loading("Action in progress....", 0);
    const response = await saveAdjustStock(saveData);
    setTimeout(hide, 0);
    if (response.success) {
      console.log("response :>> ", { ...response.data[0] });
      await Swal.fire({
        type: "success",
        title: "Save Successfully!",
        icon: "success",
        showCancelButton: false,
        confirmButtonText: `OK`,
        allowOutsideClick: false,
      }).then((result) => {
        keepLog.keep_log_action(`Save Stock Success`);
        if (result.isConfirmed) {
          onClose();
          handleExpand2(data);
        } else {
          formMethod.reset({ ...response.data[0] });
        }
      });
    } else {
      keepLog.keep_log_action(`Save Stock Error`);
      message.success({
        content: `Error ! ${response.message}`,
        duration: 6,
        key: "save",
      });
    }
    console.log("submit", data);
    //onClose();
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
