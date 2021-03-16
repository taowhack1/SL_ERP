import { SwapOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useContext, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { AppContext } from "../../../include/js/context";
import {
  sortDataWithoutCommit,
  validateFormDetail,
} from "../../../include/js/function_main";
import { itemUOMConversionColumns, UOMConversionFields } from "../config/item";

const uomConversionRequireFields = [
  "uom_convert_main_action",
  "uom_convert_value",
  "uom_id_from",
  "uom_id_to",
];

const ItemUOMConversion = ({
  data_head,
  visible,
  readOnly,
  setModalVisible,
  upDateFormValue,
  UOMList,
}) => {
  const { auth } = useContext(AppContext);
  const [state, setState] = useState(data_head.uom_conversion ?? []);
  const filterUOMFunction = () => {
    const selectedList = state.map((obj2) => obj2.uom_id_to);
    const filterList = UOMList.filter(
      (obj) =>
        !selectedList.includes(obj.uom_id) && obj.uom_id !== data_head.uom_id
    );
    console.log(filterList);
    return filterList;
  };
  const filterUOM = filterUOMFunction();
  const addRow = () => {
    setState(
      sortDataWithoutCommit([
        ...state,
        {
          ...UOMConversionFields,
          uom_id_from: data_head.uom_id,
          uom_no_name_from: data_head.uom_no_name,
          user_name: auth.user_name,
          commit: 1,
        },
      ])
    );
  };
  const onDelete = (id) => {
    setState(sortDataWithoutCommit(state.filter((obj) => obj.id !== id)));
  };
  const onSwitch = (id) => {
    setState(
      state.map((obj) =>
        obj.id === id
          ? {
              ...obj,
              uom_convert_actived: !obj.uom_convert_actived,
              user_name: auth.user_name,
              commit: 1,
            }
          : obj
      )
    );
  };
  const onChange = (id, data) => {
    console.log(id, data);
    setState(
      state.map((obj) => {
        return obj.id === id
          ? { ...obj, ...data, user_name: auth.user_name, commit: 1 }
          : obj;
      })
    );
  };
  const onModalOk = () => {
    console.log("modalUOMSave", state);
    const { validate } = validateFormDetail(state, uomConversionRequireFields);
    console.log(validate);
    if (validate || state.length === 0) {
      upDateFormValue({ uom_conversion: state });
      setState([]);
      setModalVisible(false);
    } else {
      message.error("Error!. Please fill your form completely.");
    }
  };
  const onModalCancel = () => {
    setState([]);
    setModalVisible(false);
  };
  console.log(state, filterUOM);
  return (
    <>
      <Modal
        title={
          <>
            <SwapOutlined className="button-icon" />
            <span className="pd-left-1">Unit of Measure Conversion</span>
          </>
        }
        visible={visible}
        destroyOnClose
        width={800}
        onOk={onModalOk}
        onCancel={onModalCancel}
        footer={
          readOnly ? (
            <Button className="primary" onClick={onModalCancel}>
              Back
            </Button>
          ) : (
            <>
              <Popconfirm
                onConfirm={onModalCancel}
                title={"Are you sure Discard ?"}
              >
                <Button>Discard</Button>
              </Popconfirm>
              <Popconfirm
                onConfirm={onModalOk}
                title={"Are you sure Confirm ?"}
              >
                <Button className="primary">Confirm</Button>
              </Popconfirm>
            </>
          )
        }
      >
        <CustomTable
          columns={itemUOMConversionColumns({
            readOnly,
            onDelete,
            onChange,
            onSwitch,
            filterUOM,
          })}
          focusLastPage={true}
          rowClassName="row-table-detail"
          rowKey={"id"}
          pageSize={10}
          dataSource={state}
          onAdd={!readOnly && addRow}
        />
      </Modal>
    </>
  );
};

export default React.memo(ItemUOMConversion);
