import React from "react";
import { routingDetailColumns, routingDetailFileds } from "./config";
import { useSelector } from "react-redux";
import CustomTable from "../../../../components/CustomTable";

const RoutingTabDetail = ({
  dataDetail,
  stateDispatch,
  readOnly,
  routing_type_id,
  detailField,
  columns,
  triggerHead,
}) => {
  const machineList = useSelector(
    (state) => state.production.machine.machineList
  );
  const addLine = () => {
    stateDispatch({
      type: "ADD_ROW_OBJ_OBJ_DETAIL_ARRAY_VALUE",
      payload: {
        key: detailField,
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
        key: detailField,
        detailKey: routing_type_id === 1 ? "bulk" : "fg",
        id: id,
      },
    });
  };
  const onChangeValue = (rowId, data) => {
    console.log("onChange", routing_type_id, rowId, data);
    if (triggerHead) {
      console.log("has fn trgg", "mrp_routing_plan_date" in data, rowId);
      if ("mrp_routing_plan_date" in data)
        if (rowId === 0) {
          console.log("match conditions");
          triggerHead(routing_type_id, data.mrp_routing_plan_date || null);
          return false;
        }
    }
    routing_type_id !== undefined &&
      routing_type_id !== null &&
      stateDispatch({
        type: "CHANGE_OBJ_OBJ_DETAIL_ARRAY_VALUE",
        payload: {
          key: detailField,
          detailKey: routing_type_id === 1 ? "bulk" : "fg",
          rowId,
          data,
        },
      });
  };
  return (
    <>
      <CustomTable
        rowClassName="row-table-detail"
        rowKey={"id"}
        columns={columns({
          readOnly,
          onDelete: delLine,
          onChangeValue,
          machineList,
        })}
        pageSize={999}
        dataSource={dataDetail}
        onAdd={!readOnly && addLine}
      />
    </>
  );
};

export default RoutingTabDetail;
