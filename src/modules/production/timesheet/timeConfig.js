/** @format */

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Table, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
export const detailFields = ["count"];
export const detail = {
  count: null,
  time_start: null,
  time_stop: null,
  time_record: null,
};
export const detailColumns = [
  {
    title: "No.",
    dataIndex: "id",
    width: "10%",
    key: "id",
    align: "center",
    ellipsis: true,
    // render: (value) => {
    //   return <Text className={"text-value"}>{value + 1}</Text>;
    // },
  },
  {
    title: "time start",
    dataIndex: "time_start",
    width: "20%",
    align: "center",
    ellipsis: true,
    // render: (value) => {
    //   return <Text className='text-value'>{value}</Text>;
    // },
  },
  {
    title: "time stop",
    dataIndex: "time_stop",
    width: "20%",
    align: "center",
    ellipsis: true,
    // render: (value) => {
    //   return <Text className='text-value'>{value}</Text>;
    // },
  },
  {
    title: "time record",
    dataIndex: "time",
    width: "20%",
    align: "center",
    ellipsis: true,
    // render: (value) => {
    //   return <Text className='text-value'>{value}</Text>;
    // },
  },
  {
    title: "count.",
    dataIndex: "count",
    width: "20%",
    align: "center",
    ellipsis: true,
    // render: (value) => {
    //   return <Text className='text-value'>{value}</Text>;
    // },
  },
  {
    title: "remark",
    dataIndex: "remark",
    width: "20%",
    align: "center",
    ellipsis: true,
    // render: (value) => {
    //   return <Text className='text-value'>{value}</Text>;
    // },
  },
];

export const mockupdata = [
  {
    id: 1,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "11:30:22",
    count: 12,
    remark: "issue",
  },
  {
    id: 2,
    time: "00:20:00",
    time_start: "09:30:22",
    time_stop: "10:30:22",
    count: 8,
    remark: "",
  },
  {
    id: 3,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 15,
    remark: "",
  },
  {
    id: 4,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 15,
    remark: "",
  },
  {
    id: 5,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 15,
    remark: "",
  },
  {
    id: 6,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 15,
    remark: "issue",
  },
  {
    id: 7,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 15,
    remark: "issue",
  },
  {
    id: 8,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 11,
    remark: "",
  },
  {
    id: 10,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 14,
    remark: "",
  },
  {
    id: 11,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 13,
    remark: "",
  },
  {
    id: 12,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 13,
    remark: "",
  },
  {
    id: 13,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 13,
    remark: "",
  },
  {
    id: 14,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 13,
    remark: "",
  },
  {
    id: 15,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 13,
    remark: "",
  },
  {
    id: 16,
    time: "00:35:00",
    time_start: "09:30:22",
    time_stop: "09:30:22",
    count: 13,
    remark: "",
  },
];
