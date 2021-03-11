import { getSelfStepStatus } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";
import React from "react";
import Text from "antd/lib/typography/Text";
export const receivePDColumns = [
  {
    title: "Receive No.",
    dataIndex: "receive_pd_no",
    key: "receive_pd_no",
    width: "10%",
    align: "center",
    sorter: {
      compare: (a, b) => a.recieve_pd_id - b.recieve_pd_id,
      multiple: 3,
    },
  },
  {
    title: "Job Ref.",
    dataIndex: "mrp_no",
    key: "mrp_no",
    width: "10%",
    align: "center",
    sorter: {
      compare: (a, b) => a.mrp_id - b.mrp_id,
      multiple: 3,
    },
    render: (value, record) => value ?? "-",
  },
  {
    title: "Description",
    dataIndex: "receive_pd_description",
    key: "receive_pd_description",
    width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Receive By",
    dataIndex: "receive_pd_created_by_no_name",
    key: "receive_pd_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Item",
    dataIndex: "item_no_name",
    key: "item_no_name",
    width: "25%",
    align: "left",
    sorter: {
      compare: (a, b) => a.item_id - b.item_id,
      multiple: 3,
    },
    render: (value, record) => (
      <div className="text-value" title={value}>
        <Text>{value ?? "-"}</Text>
      </div>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "tg_receive_pd_qty",
    key: "tg_receive_pd_qty",
    width: "10%",
    align: "right",
    ellipsis: true,
    sorter: {
      compare: (a, b) => a.tg_receive_pd_qty - b.tg_receive_pd_qty,
      multiple: 3,
    },
    render: (value) => (value ? convertDigit(value, 4) : 0),
  },
  {
    title: "UOM",
    dataIndex: "uom_no",
    key: "uom_no",
    width: "10%",
    align: "center",
    ellipsis: true,
    render: (value, record) => value ?? "-",
  },
  {
    title: "Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "8%",
    align: "center",
    ellipsis: true,
    sorter: {
      compare: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
      multiple: 3,
    },
    ellipsis: true,
    render: (value, record, index) => {
      return getSelfStepStatus(record);
    },
  },
];

export const receivePDfields = {};
