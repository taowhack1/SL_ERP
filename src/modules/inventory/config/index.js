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
