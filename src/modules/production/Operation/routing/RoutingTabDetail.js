import React from "react";
import { routingDetailColumns, routingDetailFileds } from "./routingConfig";
import { useSelector } from "react-redux";
import CustomTable from "../../../../components/CustomTable";

const RoutingTabDetail = ({
  dataDetail,
  stateDispatch,
  readOnly,
  routing_type_id,
}) => {
  const machineList = useSelector(
    (state) => state.production.machine.machineList
  );
  const addLine = () => {
    stateDispatch({
      type: "ADD_ROW_OBJ_OBJ_DETAIL_ARRAY_VALUE",
      payload: {
        key: "routing_detail",
        detailKey: routing_type_id === 1 ? "bulk" : "fg",
        data: {
          ...routingDetailFileds,
          routing_detail_type_id: routing_type_id,
        },
      },
    });
  };
  const delLine = (id) => {
    console.log("id", id);
    stateDispatch({
      type: "DEL_ROW_OBJ_OBJ_DETAIL_ARRAY_VALUE",
      payload: {
        key: "routing_detail",
        detailKey: routing_type_id === 1 ? "bulk" : "fg",
        id: id,
      },
    });
  };
  // const onChangeValue = (rowId, data) => {
  //   detailDispatch({
  //     type: "CHANGE_DETAIL_VALUE",
  //     payload: {
  //       id: rowId,
  //       data: data,
  //     },
  //   });
  // };
  const onChangeValue = (rowId, data) => {
    console.log("onChange", routing_type_id, rowId, data);
    routing_type_id !== undefined &&
      routing_type_id !== null &&
      stateDispatch({
        type: "CHANGE_OBJ_OBJ_DETAIL_ARRAY_VALUE",
        payload: {
          key: "routing_detail",
          detailKey: routing_type_id === 1 ? "bulk" : "fg",
          rowId,
          data,
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
