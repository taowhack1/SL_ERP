/** @format */

import { convertDigit } from "../../../include/js/main_config";

export const columns = [
  {
    id: 1,
    title: "No.",
    dataIndex: "stock_id",
    width: "1%",
    align: "center",
    render: (value, record, index) => {
      return index + 1;
    },
  },
  {
    id: 2,
    title: "Item Code",
    dataIndex: "item_no",
    width: "10%",
    align: "left",
  },
  {
    id: 3,
    title: "Item Name",
    dataIndex: "item_name",
    width: "19%",
    align: "left",
  },
  {
    id: 4,
    title: "Lot",
    dataIndex: "stock_lot_no",
    width: "10%",
    align: "left",
  },
  {
    id: 5,
    title: "Batch",
    dataIndex: "stock_batch",
    width: "10%",
    align: "left",
  },
  {
    id: 6,
    title: "Qty Receive",
    dataIndex: "stock_receive_qty",
    width: "10%",
    align: "right",
    render: (value, record) =>
      value == null ? "-" : convertDigit(value, 4) + " " + record.uom_no,
  },
  {
    id: 7,
    title: "Qty Pass",
    dataIndex: "stock_pass_qty",
    width: "10%",
    align: "right",
    render: (value, record) =>
      value == null ? "-" : convertDigit(value, 4) + " " + record.uom_no,
  },
  {
    id: 8,
    title: "Qty Reject",
    dataIndex: "stock_reject_qty",
    width: "10%",
    align: "right",
    render: (value, record) =>
      value == null ? "-" : convertDigit(value, 4) + " " + record.uom_no,
  },
  {
    id: 9,
    title: "Adjudgement Date",
    dataIndex: "adjudgement_date",
    width: "10%",
    align: "left",
    sorter: {
      compare: (a, b) => a.stock_detail_id - b.stock_detail_id,
      multiple: 3,
    },
  },
  // {
  //   id: 6,
  //   title: "Quantity on Qc.",
  //   dataIndex: "Quantity",
  //   width: "10%",
  //   align: "center",
  // },
  // {
  //   id: 6,
  //   title: "Qty. Pass",
  //   dataIndex: "Pass",
  //   width: "10%",
  //   align: "center",
  // },
  // {
  //   id: 6,
  //   title: "Qty. Reject",
  //   dataIndex: "Reject",
  //   width: "10%",
  //   align: "center",
  // },
  //   {
  //     id: 5,
  //     title: "Working Time",
  //     dataIndex: "routing_working_time_hour",
  //     width: "10%",
  //     align: "center",
  //     render: (value, record, index) => {
  //       return `${value} hour`;
  //     },
  //   },
];

export const datamackup = [
  {
    id: 1,
    ItemCode: "101SRLA000500",
    ItemName: "Lipomulse luxe",
    Lot: "[ ABCD / 1213100035 ]",
    Quantity: "1.0",
    Pass: "1.0",
    Reject: "0",
  },
];
