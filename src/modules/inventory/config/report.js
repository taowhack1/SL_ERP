/** @format */
import React from "react";
import { Button } from "antd";
import numeral from "numeral";
import { EditTwoTone } from "@ant-design/icons";
export const stock_on_hand_columns = [
  {
    title: "No.",
    dataIndex: "id",
    key: "item_id",
    width: "5%",
    align: "center",
    sorter: {
      compare: (a, b) => a.item_id - b.item_id,
      multiple: 2,
    },
    render: (val) => val + 1,
  },
  {
    title: "Item Code",
    dataIndex: "item_no",
    key: "item_no",
    width: "10%",
    align: "left",
    sorter: {
      compare: (a, b) => a.item_id - b.item_id,
      multiple: 3,
    },
    ellipsis: true,
  },
  {
    title: "Name",
    dataIndex: "item_name",
    key: "item_name",
    width: "25%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "type_name",
    key: "type_name",
    width: "8%",
    align: "left",
    sorter: {
      compare: (a, b) => a.type_id - b.type_id,
      multiple: 3,
    },
    ellipsis: true,
  },
  {
    title: "On Hand",
    dataIndex: "on_hand",
    key: "on_hand",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.on_hand - b.on_hand,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Reserve",
    dataIndex: "wait_issue",
    key: "wait_issue",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.wait_issue - b.wait_issue,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Available",
    dataIndex: "on_available",
    key: "on_available",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.on_available - b.on_available,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "On PO",
    dataIndex: "wait_receive",
    key: "wait_receive",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.wait_receive - b.wait_receive,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Total Available",
    dataIndex: "balance_after_issue",
    key: "balance_after_issue",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.balance_after_issue - b.balance_after_issue,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Qty on QC",
    dataIndex: "wait_qc",
    key: "wait_qc",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.wait_qc - b.wait_qc,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Cost",
    dataIndex: "item_cost",
    key: "item_cost",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.item_cost - b.item_cost,
      multiple: 3,
    },
    ellipsis: false,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  // {
  //   title: "View",
  //   dataIndex: "wait_qc",
  //   key: "wait_qc",
  //   width: "10%",
  //   align: "right",
  //   sorter: {
  //     compare: (a, b) => a.wait_qc - b.wait_qc,
  //     multiple: 3,
  //   },
  //   ellipsis: true,
  //   render: (value) => {
  //     return (

  //     )
  //   },
  // },
];

export const Adjust_stock_columns = [
  {
    title: "No.",
    dataIndex: "id",
    key: "item_id",
    width: "5%",
    align: "center",
    sorter: {
      compare: (a, b) => a.item_id - b.item_id,
      multiple: 2,
    },
    render: (val) => val + 1,
  },
  {
    title: "Item Code",
    dataIndex: "item_no",
    key: "item_no",
    width: "10%",
    align: "left",
    sorter: {
      compare: (a, b) => a.item_id - b.item_id,
      multiple: 3,
    },
    ellipsis: true,
  },
  {
    title: "Name",
    dataIndex: "item_name",
    key: "item_name",
    width: "25%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Type",
    dataIndex: "type_name",
    key: "type_name",
    width: "8%",
    align: "left",
    sorter: {
      compare: (a, b) => a.type_id - b.type_id,
      multiple: 3,
    },
    ellipsis: true,
  },
  {
    title: "On Hand",
    dataIndex: "on_hand",
    key: "on_hand",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.on_hand - b.on_hand,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Reserve",
    dataIndex: "wait_issue",
    key: "wait_issue",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.wait_issue - b.wait_issue,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Available",
    dataIndex: "on_available",
    key: "on_available",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.on_available - b.on_available,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "On PO",
    dataIndex: "wait_receive",
    key: "wait_receive",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.wait_receive - b.wait_receive,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Total Available",
    dataIndex: "balance_after_issue",
    key: "balance_after_issue",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.balance_after_issue - b.balance_after_issue,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Qty on QC",
    dataIndex: "wait_qc",
    key: "wait_qc",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.wait_qc - b.wait_qc,
      multiple: 3,
    },
    ellipsis: true,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  {
    title: "Cost",
    dataIndex: "item_cost",
    key: "item_cost",
    width: "8%",
    align: "right",
    sorter: {
      compare: (a, b) => a.item_cost - b.item_cost,
      multiple: 3,
    },
    ellipsis: false,
    render: (value) => numeral(value).format("0,0.0000"),
  },
  // {
  //   title: "Action",
  //   dataIndex: "",
  //   key: "",
  //   width: "8%",
  //   align: "center",
  //   ellipsis: false,
  //   render: () => {
  //     return <EditTwoTone />;
  //   },
  // },
];
