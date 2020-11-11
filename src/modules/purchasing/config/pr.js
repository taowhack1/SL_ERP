import {
  getSelfStepStatus,
  getRefStatus,
} from "../../../include/js/function_main";
import React from "react";
import { Tag } from "antd";
export const pr_require_fields = [
  "pr_description",
  "user_name",
  "cost_center_id",
  "branch_id",
  "currency_id",
];
export const pr_require_fields_detail = [
  "item_id",
  "uom_id",
  "pr_detail_qty",
  "pr_detail_due_date",
];

export const pr_list_columns = [
  {
    title: "PR No",
    dataIndex: "pr_no",
    key: "pr_no",
    width: "8%",
    align: "left",
    sorter: (a, b) => a.pr_id - b.pr_id,
  },
  {
    title: "PR Date",
    dataIndex: "pr_created",
    key: "pr_created",
    width: "8%",
    align: "left",
  },
  {
    title: "PR Due Date",
    dataIndex: "tg_pr_due_date",
    key: "tg_pr_due_date",
    width: "8%",
    align: "left",
  },
  {
    title: "Cost Center",
    dataIndex: "cost_center_no_name",
    key: "cost_center_no_name",
    width: "14%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Request By",
    dataIndex: "pr_created_by_no_name",
    key: "pr_created_by_no_name",
    width: "14%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Vendor",
    dataIndex: "vendor_no_name",
    key: "vendor_no_name",
    width: "14%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "pr_description",
    key: "pr_description",
    width: "14%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "PR Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return getSelfStepStatus(record);
    },
  },
  {
    title: "PO Status",
    dataIndex: "trans_close_name",
    key: "trans_close_name",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return getRefStatus(record);
    },
  },
];

export const pr_fields = {
  pr_id: null,
  pr_no: null,
  pr_description: "",
  cost_center_id: null,
  pr_contact_description: "",
  pr_remark: "",
  pr_lock: 0,
  pr_actived: 1,
  pr_created: null,
  pr_created_by: null,
  pr_cost_center: null,
  pr_updated: null,
  pr_updated_by: null,
  branch_id: 1,
  vendor_id: null,
  vendor_name: null,
  vendor_no_name: null,
  currency_id: 1,
  currency_no: "THB",
  vat_id: 1,
  process_id: 0,
  tg_trans_status_id: 1, // 1 Draft , 2 Confirm
  tg_pr_due_date: null,
  tg_pr_amount: 0,
  tg_pr_discount: 0,
  tg_pr_sum_amount: 0,
  tg_pr_vat_amount: 0,
  tg_pr_total_amount: 0,
  commit: 1,
};
export const pr_detail_fields = {
  id: 0,
  pr_id: null,
  item_id: null,
  uom_id: null,
  pr_detail_id: null,
  pr_detail_qty: 0,
  pr_detail_price: 0,
  pr_detail_discount: 0,
  pr_detail_discount_pct: 0,
  pr_detail_total_price: 0,
  pr_detail_remark: null,
  pr_detail_actived: 1,
  pr_detail_created: null,
  pr_detail_created_by: null,
  pr_detail_updated: null,
  pr_detail_updated_by: null,
  pr_detail_due_date: null,
  uom_no: null,
  item_no_name: null,
  commit: 1,
};

export const prItemColumns = [
  {
    id: 0,
    name: "Item",
    size: 6,
    require: true,
  },
  {
    id: 1,
    name: "Quantity",
    size: 3,
    require: true,
  },
  {
    id: 2,
    name: "Unit",
    size: 2,
    require: true,
  },
  {
    id: 3,
    name: "Unit Price",
    size: 3,
    require: true,
  },
  {
    id: 4,
    name: "Discount",
    size: 3,
  },
  {
    id: 5,
    name: "Total Price",
    size: 3,
  },
  {
    id: 6,
    name: "Due Date",
    size: 3,
    require: true,
  },
];
