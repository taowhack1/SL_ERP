import { InputNumber } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../../../../components/CustomTable";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
import { TSCtrlContext } from "../TimesheetDisplay";
const TableLog = ({ status }) => {
  const { tsLog } = useContext(TSCtrlContext);
  const { time_sheet_log_detail } = tsLog?.data || {};
  return (
    <>
      <div className="full-width mt-2 pd-left-1 pd-right-1">
        <CustomTable
          columns={detailColumns(status)}
          dataSource={time_sheet_log_detail}
          rowKey="time_sheet_log_id"
          rowClassName={(row, index) =>
            index % 2 === 0 ? "row-hl row-table-detail" : "row-table-detail"
          }
          pagination={false}
          size={"small"}
        />
      </div>
    </>
  );
};

export default React.memo(TableLog);

export const detailColumns = (status) => [
  {
    title: "No.",
    dataIndex: "time_sheet_log_id",
    width: "8%",
    key: "time_sheet_log_id",
    align: "center",
    ellipsis: true,
    render: (value, _, index) => {
      return <Text className={"text-value"}>{index + 1}</Text>;
    },
  },
  {
    title: "Start",
    dataIndex: "time_sheet_log_date_from",
    width: "20%",
    align: "center",
    ellipsis: true,
    render: (value) => {
      return (
        <Text className="text-value">{value || "-"}</Text>
        // <Text className="text-value">{value ? value.split(" ")[1] : "-"}</Text>
      );
    },
  },
  {
    title: "Stop",
    dataIndex: "time_sheet_log_date_to",
    width: "20%",
    align: "center",
    ellipsis: true,
    render: (value) => {
      return (
        <Text className="text-value">{value || "-"}</Text>
        // <Text className="text-value">{value ? value.split(" ")[1] : "-"}</Text>
      );
    },
  },
  {
    title: "Total time",
    dataIndex: "time_sheet_log_time",
    width: "12%",
    align: "center",
    ellipsis: true,
    render: (value, record) => {
      return (
        <Text className="text-value">
          {record.time_sheet_log_date_to ? value : "-"}
        </Text>
      );
    },
  },
  {
    title: (
      <div className="text-center">
        <Text>Total Qty.</Text>
      </div>
    ),
    dataIndex: "time_sheet_log_qty",
    width: "12%",
    align: "right",
    ellipsis: true,
    render: (value, record) => {
      return status === 2 ? (
        <InputNumber
          {...getNumberFormat(6)}
          min={0}
          step={1}
          name="time_sheet_log_qty"
          size={"small"}
          className="full-width"
          id="time_sheet_log_qty"
          value={value}
        />
      ) : (
        <Text className="text-value">
          {record.time_sheet_log_date_to
            ? value >= 0
              ? convertDigit(value || 0, 6)
              : "-"
            : "-"}
        </Text>
      );
    },
  },
  {
    title: (
      <div className="text-center">
        <Text>Remark</Text>
      </div>
    ),
    dataIndex: "time_sheet_log_remark",

    align: "left",
    ellipsis: true,
    render: (value) => {
      return <Text className="text-value">{value || "-"}</Text>;
    },
  },
];
