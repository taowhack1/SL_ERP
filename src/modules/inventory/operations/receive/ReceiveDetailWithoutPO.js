/** @format */

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
import { Button } from "antd/lib/radio";
import { Modal, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
const initialStateDetail = receive_detail_fields;
const list_temp = [
  {
    item_id: 2781,
  },
  {
    item_id: 2782,
  },
];

// SO get Check bulk use api ----->getProduction_for_fg
const ReceiveDetailWithoutPO = () => {
  const { readOnly, mainState, listSOFG, initialStateHead, saveForm, loading } =
    useContext(ReceiveContext);
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
  const check_soFG = (data) => {
    const filter = list_temp.filter((obj) => obj.item_id === data.item_id);
    filter.length > 0 ? setVisible(true) : setVisible(false);
    console.log("data_onFn :>> ", filter);
  };
  const modalCancel = () => {
    console.log("modal Cancel");
    setSelectData({ ...selectData, visible: false });
  };
  const onChangeValue = (id, data) => {
    console.log("check type item :>> ", data);
    setState(state.map((obj) => (obj.id === id ? { ...obj, ...data } : obj)));
    data.type_id == 3 && check_soFG(data);
  };
  const onOpenDetail = (record) => {
    setSelectData({ ...record, visible: true });
  };
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  console.log("receive_detail", state);
  console.log("mainState", mainState);
  console.log("ReceiveData_listSOFG :>> ", listSOFG);
  console.log("itemList :>> ", itemList);
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

      {/* <Button type='primary' onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <Modal
        title='Alert'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            key='discard'
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => {
              handleCancel();
            }}
            title={
              <Text strong>
                {"Are you sure to "}
                <span className='require'>NO</span>
                {" ?"}
              </Text>
            }
            okText='Yes'
            cancelText='No'>
            <Button key='back' style={{ color: "red", marginRight: 10 }}>
              NO
            </Button>
          </Popconfirm>,
          <Popconfirm
            key='confirm'
            onConfirm={() => {
              handleOk();
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
            <Button
              key='submit'
              style={{
                color: "#ffffff",
                marginRight: 10,
                backgroundColor: "#5d6384",
              }}>
              Confirm
            </Button>
          </Popconfirm>,
        ]}>
        <p>{"ต้องการรับ Item Bulk สำหรับรอผลิต FG หรือไม่"}</p>
      </Modal>
    </>
  );
};

export default React.memo(ReceiveDetailWithoutPO);
