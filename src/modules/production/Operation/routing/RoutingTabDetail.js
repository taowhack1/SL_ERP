/** @format */

import {
  DeleteTwoTone,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Col, InputNumber, Row, TimePicker } from "antd";
import React from "react";
import {
  DetailColumns,
  routingDetailColumns,
  routingDetailFileds,
} from "./routingConfig";
import Text from "antd/lib/typography/Text";
import CustomSelect from "../../../../components/CustomSelect";
import { useSelector } from "react-redux";
import moment from "moment";
import CustomTable from "../../../../components/CustomTable";
const numberFormat = {
  precision: 0,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};

const RoutingTabDetail = ({ dataDetail, detailDispatch, readOnly }) => {
  const machineList = useSelector(
    (state) => state.production.machine.machineList
  );
  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: routingDetailFileds,
    });
  };
  const delLine = (id) => {
    console.log("id", id);
    detailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };
  const onChangeValue = (rowId, data) => {
    detailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };
  console.log(machineList);
  return (
    <>
      <CustomTable
        rowClassName="row-table-detail"
        rowKey={"id"}
        columns={routingDetailColumns({
          readOnly,
          onDelete: delLine,
          onChangeValue,
          machineList,
        })}
        dataSource={dataDetail}
        onAdd={!readOnly && addLine}
      />
    </>
  );
};

export default RoutingTabDetail;
