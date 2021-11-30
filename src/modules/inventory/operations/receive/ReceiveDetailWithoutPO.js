import React, { useState, useContext } from "react";
import {
  calSubtotal,
  sortData,
  sumArrOdjWithField,
} from "../../../../include/js/function_main";
import {
  receive_detail_fields,
  receiveDetailWithNoPOColumns,
} from "../../config/receiveConfig";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../../../components/CustomTable";
import ReceiveSubDetail from "./ReceiveSubDetail";
import { ReceiveContext } from "../../../../include/js/context";
import { Button } from "antd/lib/radio";
import { Modal, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import CustomSelect from "../../../../components/CustomSelect";
const initialStateDetail = receive_detail_fields;
// SO get Check bulk use api ----->getProduction_for_fg
const ReceiveDetailWithoutPO = () => {
  const {
    readOnly,
    mainState,
    listSOFG,
    setListSOFG,
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
    mainState?.so_id !== null &&
      saveForm({ ...mainState, so_id: null, so_no: null }) &&
      setListSOFG((prev) => ({ ...prev, so_id: null }));
    setState(sortData(state.filter((obj) => obj.id !== id)));
  };

  const modalSave = (row_id, data_sub_detail) => {
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
    const filter = listSOFG?.listSOForFg?.filter(
      (obj) => obj.item_id === data.item_id
    );
    filter.length > 0 ? setVisible(true) : setVisible(false);
  };
  const modalCancel = () => {
    setSelectData({ ...selectData, visible: false });
  };
  const onChangeValue = (id, data) => {
    data.so_id == null &&
      saveForm({ ...mainState, so_id: null, so_no: null }) &&
      setListSOFG((prev) => ({ ...prev, so_id: null }));

    setState(state.map((obj) => (obj.id === id ? { ...obj, ...data } : obj)));
    // if type = bulk > check so bulk
    data.type_id == 3 && check_soFG(data);
  };
  const onOpenDetail = (record) => {
    console.log("Record", record);
    setSelectData({ ...record, visible: true });
  };
  const update_soFGCloes = (data, option) => {
    setListSOFG((prev) => ({ ...prev, so_id: data }));
    saveForm({ ...mainState, so_id: data, so_no: option.data.so_no });
  };
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    saveForm({ ...mainState, so_id: null, so_no: null }) &&
      setListSOFG((prev) => ({ ...prev, so_id: null }));
    setVisible(false);
  };

  console.log("itemList", itemList);
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
        onAdd={!readOnly && mainState.so_id ? readOnly : !readOnly && addLine}
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

      <Modal
        title="Alert"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            key="discard"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => {
              handleCancel();
            }}
            title={
              <Text strong>
                {"Are you sure to "}
                <span className="require">NO</span>
                {" ?"}
              </Text>
            }
            okText="Yes"
            cancelText="No"
          >
            <Button key="back" style={{ color: "red", marginRight: 10 }}>
              NO
            </Button>
          </Popconfirm>,
          <Popconfirm
            key="confirm"
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
            okText="Yes"
            cancelText="No"
          >
            <Button
              key="submit"
              style={{
                color: "#ffffff",
                marginRight: 10,
                backgroundColor: "#5d6384",
              }}
            >
              Confirm
            </Button>
          </Popconfirm>,
        ]}
      >
        <p>
          {"ไอเทมนี้มีการเปิดผลิตเพื่อรอ FG ต้องการอ้างอิงเลขที่ SO หรือไม่"}
        </p>
        <CustomSelect
          name={"so_id"}
          placeholder="SO Ref"
          data={listSOFG?.listSOForFg}
          field_id="so_id"
          field_name="so_description"
          onChange={(val, option) => update_soFGCloes(val, option)}
          value={listSOFG?.so_id}
        />
      </Modal>
    </>
  );
};

export default React.memo(ReceiveDetailWithoutPO);
