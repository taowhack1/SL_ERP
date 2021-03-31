import React from "react";
import { routingDetailColumns, routingDetailFileds } from "./routingConfig";
import { useSelector } from "react-redux";
import CustomTable from "../../../../components/CustomTable";

const RoutingTabDetail = ({
  dataDetail,
  detailDispatch,
  readOnly,
  type_id,
}) => {
  const machineList = useSelector(
    (state) => state.production.machine.machineList
  );
  const addLine = () => {
    detailDispatch({
      type: "ADD_ROW",
      payload: { ...routingDetailFileds, type_id },
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
