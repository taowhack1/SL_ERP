import { getSelfStepStatus } from "../../../../include/js/function_main";

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
  // { id: 0, name: "Source Location/Shelf", size: 7 },
  { id: 1, name: "Lot / Batch No.", size: 11 },
  { id: 2, name: "Disburse Qty.", size: 5 },
  { id: 3, name: "Unit", size: 3 },
  { id: 4, name: "Disburse Date", size: 4 },
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
  id: 0,
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

export const disburse_require_fields = [
  "disburse_description",
  "issue_id",
  "cost_center_id",
];
export const disburse_sub_detail_require_fields = [
  "location_id",
  "stock_id",
  "disburse_detail_sub_qty",
  "disburse_detail_sub_disburse_date",
];
