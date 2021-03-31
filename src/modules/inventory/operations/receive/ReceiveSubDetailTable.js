/** @format */

import { Row, Col, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../../../components/CustomTable";
import {
  sortData,
  sumArrOdjWithField,
  validateFormDetail,
} from "../../../../include/js/function_main";

import {
  receiveSubDetailColumns,
  receive_sub_detail_fields,
  receive_sub_detail_require_fields,
} from "../../config/receiveConfig";
import moment from "moment";

const ReceiveSubDetailTable = ({
  readOnly,
  selectData,
  btnSave,
  saveModal,
}) => {
  const locationList = useSelector(
    (state) => state.inventory.stock.item_location_shelf
  );
  useEffect(() => {
    selectData.item_id &&
      selectData.receive_sub_detail.length === 0 &&
      addLine();
  }, []);
  const [state, setState] = useState(selectData.receive_sub_detail);

  const addLine = () => {
    console.log("addLine", state, selectData);
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
          item_shelf_life: selectData.item_shelf_life,
          location_id: selectData.location_id,
          location_no_name: selectData.location_no_name,
          location_no: selectData.location_no,
          uom_id: selectData.uom_id,
          uom_no: selectData.uom_no,
          color:false,
          receive_detail_sub_receive_date: moment().format("DD/MM/YYYY"),
        },
      ])
    );
  };
  const delLine = (id) => {
    setState(sortData(state.filter((obj) => obj.id !== id)));
  };

  const onChangeValue = (id, data) => {
    setState(state.map((obj) => (obj.id === id ? { ...obj, ...data } : obj )));
    console.log("data",data)
  };

  const validateForm = (arrObjData) => {
    const { validate, data } = validateFormDetail(
      arrObjData,
      receive_sub_detail_require_fields
    );
    if (validate) {
      const receive_qty = sumArrOdjWithField(
        arrObjData,
        "receive_detail_sub_qty"
      );

      console.log("receive_qty", receive_qty);

      console.log(selectData.id, arrObjData);
      saveModal(arrObjData);
    } else {
      console.log("return data", data);
      // setState(data);
      message.warning({
        content: "Please fill your form completely.",
        key: "warning",
        duration: 2,
      });
    }
  };

  console.log(
    "selectData.receive_sub_detail",
    state,
    selectData.receive_sub_detail
  );
  console.log("locationList", locationList);
  const AlertShelfLift = (record, dateMFG) => {
      const dateMFGinFN = moment(dateMFG,"DD/MM/YYYY");
      const dateRecevie = moment(
        record.receive_detail_sub_receive_date,
        "DD/MM/YYYY"
      );
      const dateDif = dateRecevie.diff(dateMFGinFN,'days');
      const HalfLife = record.item_shelf_life / 2;
      const calcula = record.item_shelf_life - dateDif;
      if(calcula >= HalfLife){
      }else{
        message.warning({content: "The remaining shelf life is less than half",key: "warning",duration: 5,})
      }
      //calcula >= HalfLife ? console.log("The remaining shelf life is normal") :message.warning({content: "The remaining shelf life is less than half",key: "warning",duration: 2,});
  };
  return (
    <>
      <Row className='row-tab-margin-lg'>
        <Col span={24}>
          <CustomTable
            columns={receiveSubDetailColumns(
              readOnly,
              onChangeValue,
              locationList,
              delLine,
              AlertShelfLift
            )}
            dataSource={state}
            rowKey={"id"}
            size={"small"}
            rowClassName={(record, index) => {
              return `row-table-detail`;
            }}
            onAdd={!readOnly && addLine}
            focusLastPage={true}
            pageSize={5}
          />
        </Col>
        <button
          style={{ display: "none" }}
          type='button'
          ref={btnSave}
          onClick={() => validateForm(state)}
        />
      </Row>
    </>
  );
};

export default React.memo(ReceiveSubDetailTable);
