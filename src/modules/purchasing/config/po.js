import { getSelfStepStatus } from "../../../include/js/function_main";

export const po_require_fields = [
  "pr_id",
  "vendor_id",
  "po_description",
  "branch_id",
  "currency_id",
  "payment_term_id",
];

export const po_require_fields_detail = [
  "item_id",
  "uom_id",
  "po_detail_qty",
  "po_detail_due_date",
  "po_detail_price",
];

export const po_list_columns = [
  {
    title: "PO No",
    dataIndex: "po_no",
    key: "po_no",
    width: "10%",
    align: "left",
  },
  {
    title: "PR Ref.",
    dataIndex: "pr_no",
    key: "pr_no",
    width: "10%",
    align: "left",
  },
  {
    title: "PO Date",
    dataIndex: "po_created",
    key: "po_created",
    width: "10%",
    align: "center",
  },
  {
    title: "Due Date",
    dataIndex: "tg_po_due_date",
    key: "tg_po_due_date",
    width: "10%",
    align: "center",
  },
  {
    title: "Vendor",
    dataIndex: "vendor_no_name",
    key: "vendor_no_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Purchase User",
    dataIndex: "po_created_by_no_name",
    key: "po_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "po_description",
    key: "po_description",
    width: "18%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return getSelfStepStatus(record ? record : []);
      // console.log("PO record", record);
      // return getSelfStepStatus(record);
    },
  },
];

export const po_fields = {
  po_id: null,
  po_no: null,
  cost_center_id: null,
  po_description: null,
  po_due_date: null,
  po_contact_description: "",
  po_remark: null,
  po_lock: 0,
  po_actived: 1,
  po_created: null,
  po_created_by: null,
  po_updated: null,
  po_updated_by: null,
  payment_term_id: null,
  branch_id: 1,
  vendor_id: null,
  vat_id: 1,
  currency_id: 1,
  process_id: null,

  tg_trans_status_id: 1,
  tg_po_amount: 0,
  tg_po_discount: 0,
  tg_po_sum_amount: 0,
  tg_po_vat_amount: 0,
  tg_po_total_amount: 0,

  cost_center_no: null,
  cost_center_name: null,
  branch_no_name: null,
  branch_no: null,
  branch_name: null,
  vendor_no: null,
  vendor_name: null,
  vendor_no_name: null,
  vat_no: null,
  vat_name: null,
  vat_no_name: null,
  po_created_by_no_name: null,
  pr_id: null,
  pr_no: null,
  pr_no_description: null,
  commit: 1,
};
export const po_detail_fields = {
  id: 0,
  po_id: null,
  item_id: null,
  uom_id: null,
  po_detail_id: null,
  po_detail_qty: 0,
  po_detail_price: 0,
  po_detail_discount: 0,
  po_detail_discount_pct: 0,
  po_detail_total_price: 0,
  po_detail_remark: null,
  po_detail_actived: 1,
  po_detail_created: null,
  po_detail_created_by: null,
  po_detail_updated: null,
  po_detail_updated_by: null,
  //diff. from pr
  po_detail_qty_remain_tg: 0,
  po_detail_qty_over_tg: 0,
  //show Only
  uom_no: null,
  item_no_name: null,
  commit: 1,
};

export const poItemColumns = [
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
