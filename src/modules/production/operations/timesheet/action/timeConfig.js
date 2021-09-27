import { Input, InputNumber } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../../include/js/main_config";
export const detailFields = ["count"];
export const detail = {
  count: null,
  time_start: null,
  time_stop: null,
  time_record: null,
};
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
          {...getNumberFormat(3)}
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
              ? convertDigit(value || 0, 4)
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
