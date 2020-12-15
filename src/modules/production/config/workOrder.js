import { getRefStatus } from "../../../include/js/function_main";
import { convertDigit } from "../../../include/js/main_config";

export const work_order_columns = [
  {
    title: "WO Code",
    dataIndex: "work_order_no",
    width: "8%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Source",
    dataIndex: "work_order_source",
    width: "8%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Item",
    dataIndex: "item_no_name",
    // width: "20%",
    ellipsis: true,
  },
  {
    title: "Job Name",
    dataIndex: "work_order_job_name",
    ellipsis: true,
  },

  {
    title: "Plan Start",
    dataIndex: "work_order_plan_date_start",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Plan End",
    dataIndex: "work_order_plan_date_end",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Deadline",
    dataIndex: "work_order_deadline_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Qty.",
    dataIndex: "work_order_qty",
    width: "8%",
    align: "right",
    ellipsis: true,
    render: (value, record, index) => {
      return convertDigit(value);
    },
  },
  {
    title: "UOM",
    dataIndex: "uom_name",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "WO Status",
    dataIndex: "trans_close_name",
    key: "trans_close_name",
    width: "8%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return getRefStatus(record);
    },
  },
];
export const workOrderFields = {
  wo_id: null,
  wo_no: null,
  wo_order_date: null,
  wo_plan_start_date: null,
  wo_plan_end_date: null,
  wo_delivery_date: null,
  wo_description: null,
  wo_agreement: null,
  wo_qty: 0,
  wo_spare_qty: 0,
  wo_remark: null,
  wo_lock: null,
  wo_rows: null,
  wo_actived: null,
  wo_created: null,
  wo_created_by: null,
  wo_updated: null,
  wo_updated_by: null,
  so_id: null,
  branch_id: null,
  item_id: null,
  process_id: null,
  tg_trans_status_id: null,
  tg_trans_close_id: null,
};
export const workOrderRMColumns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "RM Item",
    size: 11,
    require: true,
  },
  {
    id: 3,
    name: "System Cal. Qty.",
    size: 3,
    require: true,
  },
  {
    id: 4,
    name: "Stock Qty.",
    size: 3,
    require: true,
  },
  {
    id: 5,
    name: "Qty. To PR",
    size: 3,
    require: true,
  },

  {
    id: 6,
    name: "Unit",
    size: 2,
    require: true,
  },
];

export const workOrderRMDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
};

export const workOrderPKColumns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "PK Item",
    size: 11,
    require: true,
  },
  {
    id: 3,
    name: "System Cal. Qty.",
    size: 3,
    require: true,
  },
  {
    id: 4,
    name: "Stock Qty.",
    size: 3,
    require: true,
  },
  {
    id: 5,
    name: "Qty. To PR",
    size: 3,
    require: true,
  },

  {
    id: 6,
    name: "Unit",
    size: 2,
    require: true,
  },
];

export const workOrderPKDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
};
