import { SwapOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Popconfirm, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import CustomLabel from "../../../components/CustomLabel";
import CustomSelect from "../../../components/CustomSelect";
import CustomTable from "../../../components/CustomTable";
import { sortData } from "../../../include/js/function_main";
import { itemUoMConversionColumns, UoMConversionFields } from "../config/item";

const ItemUoMConversion = ({
  data_head,
  visible,
  readOnly,
  setModalVisible,
  upDateFormValue,
  UoMList,
}) => {
  const [state, setState] = useState(data_head.uom_conversion ?? []);
  const addRow = () => {
    setState(
      sortData([
        ...state,
        {
          ...UoMConversionFields,
          uom_id: data_head.uom_id,
          uom_no_name: data_head.uom_no_name,
        },
      ])
    );
  };
  const onDelete = (id) => {
    setState(sortData(state.filter((obj) => obj.id !== id)));
  };
  const onSwitch = (id) => {
    setState(
      state.map((obj) =>
        obj.id === id
          ? { ...obj, uom_conversion_actived: !obj.uom_conversion_actived }
          : obj
      )
    );
  };
  const onChange = (id, data) => {
    console.log(id, data);
    setState(
      state.map((obj) => {
        return obj.id === id ? { ...obj, ...data } : obj;
      })
    );
  };
  const onModalOk = () => {
    upDateFormValue({ uom_conversion: state });
    setState([]);
    setModalVisible(false);
  };
  const onModalCancel = () => {
    setState([]);
    setModalVisible(false);
  };
  console.log(state);
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
          <>
            <Popconfirm
              onConfirm={onModalCancel}
              title={"Are you sure Discard ?"}
            >
              <Button>Discard</Button>
            </Popconfirm>
            <Popconfirm onConfirm={onModalOk} title={"Are you sure Confirm ?"}>
              <Button className="primary">Confirm</Button>
            </Popconfirm>
          </>
        }
      >
        {/* <Row className="col-2 mb-1">
          <Col span={6}>
            <CustomLabel title={"Main UoM :"} require readOnly={readOnly} />
          </Col>
          <Col span={16}>
            <Text className="text-value text-left">
              {data_head.uom_no_name ?? "-"}
            </Text>
          </Col>
        </Row> */}
        <CustomTable
          columns={itemUoMConversionColumns({
            readOnly,
            onDelete,
            onChange,
            onSwitch,
            UoMList,
          })}
          rowClassName="row-table-detail"
          rowKey={"id"}
          pageSize={10}
          dataSource={state}
          onAdd={addRow}
        />
      </Modal>
    </>
  );
};

export default React.memo(ItemUoMConversion);
