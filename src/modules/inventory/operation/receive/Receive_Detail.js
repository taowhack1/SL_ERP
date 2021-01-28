import {
  Button,
  Row,
  Col,
  Typography,
  Modal,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import {
  PlusOutlined,
  EllipsisOutlined,
  FormOutlined,
  InfoCircleTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import React, { useState, useEffect, useReducer, useContext } from "react";

import SubDetail from "./ReceiveSubDetailTable";
import {
  calSubtotal,
  sumArrObj,
  sumArrOdjWithField,
  validateFormDetail,
} from "../../../../include/js/function_main";
import {
  receive_detail_fields,
  recieve_detail_columns,
  receive_sub_detail_fields,
  receive_sub_detail_require_fields,
  receiveDetailColumns,
} from "../../config/receiveConfig";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../../../components/CustomSelect";
import moment from "moment";

import { get_location_shelf_by_item_id } from "../../../../actions/inventory";
import { convertDigit, numberFormat } from "../../../../include/js/main_config";
import { mainReducer } from "../../../../include/reducer";
import CustomTable from "../../../../components/CustomTable";
import ReceiveSubDetail from "./ReceiveSubDetail";
import { ReceiveContext } from "./Receive_Create";
const { Text } = Typography;

const ReceiveDetail = () => {
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
  const select_uoms = useSelector(
    (state) => state.inventory.master_data.item_uom
  );

  const [temp_sub_detail, tempSubDetailDispatch] = useReducer(mainReducer, [
    receive_sub_detail_fields,
  ]);

  // const updateAmount = () => {
  //   const obj = sumArrObj(
  //     state.receive_detail,
  //     "receive_detail_total_price",
  //     vat_rate
  //   );
  //   headDispatch({
  //     type: "CHANGE_HEAD_VALUE",
  //     payload: {
  //       tg_receive_sum_amount: obj.exclude_vat,
  //       tg_receive_vat_amount: obj.vat,
  //       tg_receive_total_amount: obj.include_vat,
  //     },
  //   });
  // };

  // useEffect(() => {
  //   !readOnly && updateAmount();
  // }, [data_detail]);

  // function
  const addLine = () => {
    // detailDispatch({ type: "ADD_ROW", payload: receive_detail_fields });
  };
  const delLine = (id) => {
    // detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const modalSave = (detail_id, data_sub_detail) => {
    console.log("modal Save");
    setSelectData({ ...selectData, visible: false });
    saveForm({
      ...mainState,
      receive_detail: state.map((row) =>
        row.id === detail_id
          ? { ...row, receive_sub_detail: data_sub_detail }
          : row
      ),
    });
    // console.log("Confirm Modal", "id", temp_detail.id, temp_sub_detail);
    // const key = "validate";
    // const validate_detail = validateFormDetail(
    //   temp_sub_detail,
    //   receive_sub_detail_require_fields
    // );
    // if (validate_detail.validate) {
    //   setVisible(false);
    //   const receive_qty = sumArrOdjWithField(
    //     temp_sub_detail,
    //     "receive_detail_sub_qty"
    //   );

    //   console.log(
    //     "balance",
    //     temp_detail.tg_receive_detail_qty_balance_temp,
    //     receive_qty,
    //     temp_detail.tg_receive_detail_qty_balance_temp - receive_qty
    //   );
    //   detailDispatch({
    //     type: "CHANGE_DETAIL_VALUE",
    //     payload: {
    //       id: temp_detail.id,
    //       data: {
    //         receive_sub_detail: temp_sub_detail,
    //         tg_receive_detail_qty: receive_qty,
    //         receive_detail_total_price: calSubtotal(
    //           receive_qty,
    //           temp_detail.receive_detail_price
    //           // discount
    //         ),
    //         tg_receive_detail_qty_balance:
    //           temp_detail.tg_receive_detail_qty_balance_temp - receive_qty,
    //       },
    //     },
    //   });
    //   setTempDetail(null);
    // } else {
    //   message.warning({
    //     content: "Please fill your form completely.",
    //     key,
    //     duration: 2,
    //   });
    // }
  };

  const modalCancel = () => {
    console.log("modal Cancel");
    setSelectData({ ...selectData, visible: false });
    // setVisible(false);
    // setTempDetail(null);
    // console.log("Cancel Modal");
    // tempSubDetailDispatch({
    //   type: "SET_DETAIL",
    //   payload: [receive_sub_detail_fields],
    // });
  };
  const onChangeValue = (rowId, data) => {
    // detailDispatch({
    //   type: "CHANGE_DETAIL_VALUE",
    //   payload: {
    //     id: rowId,
    //     data: data,
    //   },
    // });
    setState({
      ...state,
      ...data,
    });
  };
  const onOpenDetail = (record) => {
    setSelectData({ ...record, visible: true });
  };
  const get_location_shelf = (item_id) => {
    dispatch(get_location_shelf_by_item_id(item_id));
  };
  console.log("receive_detail", state);
  console.log("temp_sub_detail", temp_sub_detail);
  return (
    <>
      {/* Column Header */}
      <CustomTable
        columns={receiveDetailColumns(
          readOnly,
          onChangeValue,
          itemList,
          delLine,
          onOpenDetail
        )}
        dataSource={state}
        rowKey={"id"}
        size={"small"}
        rowClassName={"row-table-detail"}
      />
      <ReceiveSubDetail
        selectData={selectData}
        modalSave={modalSave}
        modalCancel={modalCancel}
        readOnly={readOnly}
      />
    </>
  );
};

export default React.memo(ReceiveDetail);
