import { Button, Row, Col, Typography, Modal } from "antd";
import React, { useEffect, useState } from "react";

import ReceiveSubDetailTable from "./ReceiveSubDetailTable";
import { convertDigit } from "../../../../include/js/main_config";
import ReceiveSubDetailHead from "./ReceiveSubDetailHead";
import { sortData } from "../../../../include/js/function_main";
import { receive_sub_detail_fields } from "../../config/receiveConfig";
const { Text } = Typography;
const ReceiveSubDetail = ({ selectData, modalSave, modalCancel, readOnly }) => {
  console.log("ReceiveSubDetail", selectData);
  const [state, setState] = useState(selectData.receive_sub_detail);

  const addLine = () => {
    setState(
      sortData([
        ...state,
        {
          ...receive_sub_detail_fields,
          receive_detail_id: selectData.receive_detail_id,
          shelf_id: selectData.shelf_id,
          shelf_no: selectData.shelf_no,
          shelf_name: selectData.shelf_name,
          shelf_no_name: selectData.shelf_no_name,
          location_id: selectData.location_id,
          location_no_name: selectData.location_no_name,
          location_no: selectData.location_no,
          uom_id: selectData.uom_id,
          uom_no: selectData.uom_no,
        },
      ])
    );
  };

  const delLine = (id) => {
    setState(sortData(state.filter((obj) => obj.id !== id)));
  };

  useEffect(() => {
    selectData.receive_sub_detail.length === 0 && addLine();
  }, []);

  console.log("main sub detail", state);
  return (
    <>
      <Modal
        width={1100}
        title="Receive Detail"
        visible={selectData.visible}
        destroyOnClose
        onOk={modalSave}
        onCancel={modalCancel}
        footer={[
          <Button
            key="back"
            className={readOnly ? "primary" : ""}
            onClick={modalCancel}
          >
            Discard
          </Button>,
          !readOnly && (
            <Button key="submit" className="primary" onClick={modalSave}>
              Confirm
            </Button>
          ),
        ]}
      >
        <ReceiveSubDetailHead readOnly={readOnly} selectData={selectData} />
        <ReceiveSubDetailTable
          readOnly={readOnly}
          subDetailData={state}
          addLine={addLine}
          delLine={delLine}
        />
      </Modal>
    </>
  );
};

export default React.memo(ReceiveSubDetail);
