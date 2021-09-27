import { InputNumber } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../../../../components/CustomTable";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";

const TableLog = ({ status }) => {
  const { start: timesheet } = useSelector(
    (state) => state.production.timesheet
  );
  const { time_sheet_log_detail } = timesheet;
  return (
    <>
      <div className="full-width mt-2 pd-left-1 pd-right-1">
        <CustomTable
          columns={detailColumns(status)}
          dataSource={mockupData}
          rowKey="ids"
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
const mockupData = [
  {
    ids: 0,
    time_sheet_log_date_from: "27/09/21 13:30:00",
    time_sheet_log_date_to: "27/09/21 13:45:00",
    time_sheet_log_time: "00:15:00",
    time_sheet_log_qty: 0,
    time_sheet_log_remark: "ตั้งค่าเครื่อง",
  },
  {
    ids: 1,
    time_sheet_log_date_from: "27/09/21 13:45:00",
    time_sheet_log_date_to: "27/09/21 14:30:00",
    time_sheet_log_time: "00:45:00",
    time_sheet_log_qty: 25,
    time_sheet_log_remark: "ผสม",
  },
  {
    ids: 2,
    time_sheet_log_date_from: "27/09/21 14:30:00",
    time_sheet_log_date_to: "27/09/21 15:30:00",
    time_sheet_log_time: "01:00:00",
    time_sheet_log_qty: 0,
    time_sheet_log_remark: "ถ่ายถังผสม",
  },
  {
    ids: 3,
    time_sheet_log_date_from: "27/09/21 15:30:00",
    time_sheet_log_date_to: "27/09/21 16:45:00",
    time_sheet_log_time: "01:15:00",
    time_sheet_log_qty: 0,
    time_sheet_log_remark: "ทำความสะอาด",
  },
];
export const detailColumns = (status) => [
  {
    title: "No.",
    dataIndex: "ids",
    width: "5%",
    key: "ids",
    align: "center",
    ellipsis: true,
    render: (value) => {
      return <Text className={"text-value"}>{value + 1}</Text>;
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
