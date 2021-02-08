import React, { useState, useContext } from "react";
import {
  calSubtotal,
  sortData,
  sumArrOdjWithField,
} from "../../../../include/js/function_main";
import {
  receive_detail_fields,
  receiveDetailColumns,
  receiveDetailWithNoPOColumns,
} from "../../config/receiveConfig";
import { useDispatch, useSelector } from "react-redux";
import { get_location_shelf_by_item_id } from "../../../../actions/inventory";
import CustomTable from "../../../../components/CustomTable";
import ReceiveSubDetail from "./ReceiveSubDetail";
import { ReceiveContext } from "../../../../include/js/context";
const initialStateDetail = receive_detail_fields;
const ReceiveDetailWithoutPO = () => {
  const {
    readOnly,
    mainState,
    initialStateHead,
    saveForm,
    loading,
  } = useContext(ReceiveContext);
  const dispatch = useDispatch();
  const [state, setState] = useState(mainState.receive_detail);
  const [selectData, setSelectData] = useState({
    visible: false,
    receive_sub_detail: [],
  });
  const itemList = useSelector(
    (state) => state.inventory.master_data.item_list
  );

  // function
  const addLine = () => {
    setState(sortData([...state, initialStateDetail]));
  };
  const delLine = (id) => {
    setState(sortData(state.filter((obj) => obj.id !== id)));
  };

  const modalSave = (row_id, data_sub_detail) => {
    console.log("modal Save");
    setSelectData({ ...selectData, visible: false });
    const receive_qty = sumArrOdjWithField(
      data_sub_detail,
      "receive_detail_sub_qty"
    );
    saveForm({
      ...mainState,
      receive_detail: state.map((row) =>
        row.id === row_id
          ? {
              ...row,
              tg_receive_detail_qty: receive_qty,
              receive_detail_total_price: calSubtotal(
                receive_qty,
                selectData.receive_detail_price
                // discount
              ),
              tg_receive_detail_qty_balance: 0,
              receive_sub_detail: data_sub_detail,
            }
          : row
      ),
    });
    setState(
      state.map((row) =>
        row.id === row_id
          ? {
              ...row,
              tg_receive_detail_qty: receive_qty,
              receive_detail_total_price: calSubtotal(
                receive_qty,
                selectData.receive_detail_price
                // discount
              ),
              tg_receive_detail_qty_balance:
                selectData.tg_receive_detail_qty_balance_temp - receive_qty,
              receive_sub_detail: data_sub_detail,
            }
          : row
      )
    );
  };

  const modalCancel = () => {
    console.log("modal Cancel");
    setSelectData({ ...selectData, visible: false });
  };
  const onChangeValue = (id, data) => {
    setState(state.map((obj) => (obj.id === id ? { ...obj, ...data } : obj)));
  };
  const onOpenDetail = (record) => {
    setSelectData({ ...record, visible: true });
  };
  console.log("receive_detail", state);
  console.log("mainState", mainState);
  return (
    <>
      {/* Column Header */}
      <CustomTable
        columns={receiveDetailWithNoPOColumns(
          readOnly,
          onChangeValue,
          itemList,
          delLine,
          onOpenDetail
        )}
        onAdd={!readOnly && addLine}
        dataSource={state}
        rowKey={"id"}
        rowClassName={"row-table-detail"}
      />
      <ReceiveSubDetail
        selectData={selectData}
        modalSave={modalSave}
        modalCancel={modalCancel}
        readOnly={readOnly}
        qtyRef={false}
      />
    </>
  );
};

export default React.memo(ReceiveDetailWithoutPO);
