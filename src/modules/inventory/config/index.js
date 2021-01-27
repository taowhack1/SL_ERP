import {
  getRefStatus,
  getSelfStepStatus,
} from "../../../include/js/function_main";
import { convertDigit } from "../../../include/js/main_config";

// ISSUE
export const issue_columns = [
  {
    title: "Issue No.",
    dataIndex: "issue_no",
    key: "issue_no",
    width: "10%",
    align: "left",
    sorter: {
      compare: (a, b) => a.issue_id - b.issue_id,
      multiple: 3,
    },
  },
  {
    title: "Create Date",
    dataIndex: "issue_created",
    key: "issue_created",
    width: "8%",
    align: "center",
  },
  {
    title: "Request Date",
    dataIndex: "tg_issue_due_date",
    key: "tg_issue_due_date",
    width: "8%",
    align: "center",
  },
  {
    title: "Cost Center",
    dataIndex: "cost_center_no_name",
    key: "cost_center_no_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Request By",
    dataIndex: "issue_created_by_no_name",
    key: "issue_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "issue_description",
    key: "issue_description",
    align: "left",
    ellipsis: true,
  },

  {
    title: "Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "9%",
    align: "center",
    sorter: {
      compare: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
      multiple: 3,
    },
    ellipsis: true,
    render: (value, record, index) => {
      return getSelfStepStatus(record);
    },
  },
  {
    title: "Disburse Status ",
    dataIndex: "trans_close_name",
    key: "trans_close_name",
    width: "10%",
    align: "center",
    sorter: {
      compare: (a, b) => a.tg_trans_close_id - b.tg_trans_close_id,
      multiple: 3,
    },
    ellipsis: true,
    render: (value, record, index) => {
      return getRefStatus(record);
    },
  },
];

export const issue_fields = {
  issue_id: null,
  issue_no: null,
  tg_issue_due_date: null,
  issue_description: null,
  issue_agreement: null,
  issue_remark: null,
  issue_lock: null,
  issue_actived: null,
  issue_created: null,
  issue_created_by: null,
  issue_updated: null,
  issue_updated_by: null,
  branch_id: null,
  process_id: null,
  tg_trans_status_id: 1,
  tg_trans_close_id: null,
  commit: 1,
};
export const issue_detail_fields = {
  issue_detail_id: null,
  issue_detail_qty: null,
  issue_detail_remark: null,
  issue_detail_request_date: null,
  issue_detail_due_date: null,
  issue_id: null,
  item_id: null,
  uom_id: null,
  shelf_id: null,
  tg_issue_detail_qty_balance: null,
  commit: 1,
};

export const select_item_columns = [
  {
    title: "Item",
    dataIndex: "item_no_name",
    key: "item_no_name",
    width: "40%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Item Type",
    dataIndex: "type_name",
    key: "type_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "On Hand",
    dataIndex: "tg_item_qty",
    key: "tg_item_qty",
    width: "10%",
    align: "right",
    ellipsis: true,
    render: (value, record, index) => {
      return convertDigit(value, 4);
    },
  },
  {
    title: "Unit",
    dataIndex: "uom_no",
    key: "uom_no",
    width: "10%",
    align: "left",
    ellipsis: true,
  },
];
export const issue_detail_columns = [
  {
    id: 0,
    name: "Item",
    size: 9,
    require: true,
  },
  {
    id: 1,
    name: "Destination Location",
    size: 5,
    require: true,
  },
  {
    id: 2,
    name: "Quantity",
    size: 3,
    require: true,
  },
  {
    id: 3,
    name: "Unit",
    size: 3,
    require: true,
  },
  {
    id: 4,
    name: "Due Date",
    size: 3,
    require: true,
  },
];

// Disburse
export const disburse_columns = [
  {
    title: "Disburse No.",
    dataIndex: "disburse_no",
    key: "disburse_no",
    width: "10%",
    align: "left",
    sorter: {
      compare: (a, b) => a.disburse_id - b.disburse_id,
      multiple: 3,
    },
  },
  {
    title: "Issue Ref.",
    dataIndex: "issue_no",
    key: "issue_no",
    width: "10%",
    align: "left",
    sorter: {
      compare: (a, b) => a.issue_id - b.issue_id,
      multiple: 3,
    },
  },
  {
    title: "Issue Due Date",
    dataIndex: "disburse_due_date",
    key: "disburse_due_date",
    width: "10%",
    align: "center",
  },
  {
    title: "Cost Center",
    dataIndex: "cost_center_no_name",
    key: "cost_center_no_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Disburse By",
    dataIndex: "disburse_created_by_no_name",
    key: "disburse_created_by_no_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "disburse_no_description",
    key: "disburse_no_description",
    align: "left",
  },

  {
    title: "Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "10%",
    align: "center",
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

export const disburse_detail_columns = [
  {
    id: 0,
    name: "Item",
    size: 6,
  },
  {
    id: 1,
    name: "Destination Location",
    size: 4,
  },
  {
    id: 2,
    name: "Qty.(Issue)",
    size: 3,
  },
  {
    id: 3,
    name: "Qty. Balance",
    size: 3,
  },
  {
    id: 4,
    name: "Qty. Done",
    size: 3,
  },
  {
    id: 5,
    name: "Unit",
    size: 2,
  },
  {
    id: 6,
    name: "Due Date",
    size: 2,
  },
];

export const disburse_sub_detail_columns = [
  { id: 0, name: "Source Location/Shelf", size: 7 },
  { id: 1, name: "Lot / Batch No.", size: 8 },
  { id: 2, name: "Disburse Qty.", size: 3 },
  { id: 3, name: "Unit", size: 2 },
  { id: 4, name: "Disburse Date", size: 3 },
];

export const disburse_fields = {
  disburse_id: null,
  disburse_no: null,
  disburse_description: null,
  disburse_no_description: null,
  issue_id: null,
  issue_no: null,
  issue_no_description: null,
  disburse_agreement: null,
  disburse_remark: null,
  disburse_lock: 0,
  disburse_rows: null,
  disburse_actived: 1,
  disburse_due_date: null,
  disburse_created: null,
  disburse_created_by: null,
  disburse_updated: null,
  disburse_updated_by: null,
  cost_center_id: null,
  cost_center_no: null,
  cost_center_name: null,
  cost_center_no_name: null,
  branch_id: 1,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  process_id: null,
  tg_trans_status_id: 1,
  process_complete: null,
  trans_status_name: null,
  trans_close_name: null,
  disburse_created_by_no_name: null,
  node_stay: null,
  tg_flow_max_node_id: null,
  commit: 1,
};

export const disburse_detail_fields = {
  disburse_detail_id: null,
  disburse_detail_due_date: null,
  issue_detail_qty: null,
  tg_disburse_detail_qty: null,
  tg_disburse_detail_qty_balance: null,
  disburse_detail_remark: null,
  disburse_id: null,
  item_id: null,
  uom_id: null,
  disburse_no: null,
  disburse_description: null,
  disburse_no_description: null,
  item_no: null,
  item_name: null,
  item_no_name: null,
  uom_no: null,
  uom_name: null,
  uom_no_name: null,
  location_id: null,
  location_no: null,
  location_name: null,
  location_no_name: null,
  shelf_id: null,
  shelf_no: null,
  shelf_name: null,
  shelf_no_name: null,
  disburse_sub_detail: [],
  commit: 1,
};

export const disburse_sub_detail_fields = {
  disburse_detail_sub_id: null,
  disburse_detail_sub_disburse_date: null,
  disburse_detail_sub_qty: null,
  disburse_detail_sub_remark: null,
  disburse_detail_id: null,
  stock_lot_no: null,
  stock_batch: null,
  stock_mfg_date: null,
  stock_exp_date: null,
  shelf_id: null,
  shelf_no_name: null,
  location_id: null,
  location_no_name: null,
  commit: 1,
};
