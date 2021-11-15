/** @format */

import {
  getRefStatus,
  getSelfStepStatus,
} from "../../../include/js/function_main";
import { convertDigit } from "../../../include/js/main_config";

export const quotation_fields = {
  flow_id: null,
  qn_id: null,
  qn_no: null,
  npr_id: null,
  qn_description: null,
  qn_no_description: null,
  qn_exp_date: null,
  qn_contact_description: null,
  qn_remark: null,
  qn_lock: 0,
  qn_actived: 1,
  qn_created: null,
  qn_created_by: null,
  qn_updated: null,
  qn_updated_by: null,
  branch_id: 1,
  customer_id: null,
  vat_id: 1,
  currency_id: 1,
  process_id: null,
  tg_qn_amount: 0,
  tg_qn_discount: 0,
  tg_qn_sum_amount: 0,
  tg_qn_vat_amount: 0,
  tg_qn_total_amount: 0,
  tg_trans_status_id: 1,
  tg_trans_close_id: 0,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  payment_term_no: null,
  payment_term_name: null,
  payment_term_no_name: null,
  customer_no: null,
  customer_name: null,
  customer_no_name: null,
  currency_name: null,
  currency_no_name: null,
  vat_no: null,
  vat_name: null,
  vat_no_name: null,
  vat_rate: 0.07,
  vat_include: false,
  currency_no: "THB",
  process_complete: null,
  trans_status_name: null,
  trans_close_name: null,
  qn_created_by_no_name: null,
  node_stay: null,
  tg_flow_max_node_id: null,
  button_edit: null,
  button_confirm: null,
  button_approve: null,
  button_reject: null,
  button_cancel: null,
};

export const quotation_detail_fields = {
  qn_detail_id: null,
  qn_detail_due_date: null,
  qn_detail_qty: 0,
  qn_detail_price: 0,
  qn_detail_discount: 0,
  qn_detail_total_price: 0,
  qn_detail_remark: null,
  qn_id: null,
  item_id: null,
  uom_id: null,
  qn_no: null,
  qn_description: null,
  qn_no_description: null,
  item_no: null,
  item_name: null,
  item_no_name: null,
  uom_no: null,
  uom_name: null,
  uom_no_name: null,
  id: 0,
  commit: 1,
};

export const quotation_require_fields = [
  "qn_exp_date",
  "qn_description",
  // "qn_agreement",
  "payment_term_id",
  "customer_id",
];

export const quotation_require_fields_detail = [
  "item_id",
  "uom_id",
  "qn_detail_qty",
];

export const quotation_detail_columns = [
  {
    id: 0,
    name: "Item",
    size: 12,
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
  // {
  //   id: 4,
  //   name: "Discount",
  //   size: 3,
  // },
  {
    id: 5,
    name: "Total Price",
    size: 3,
  },
];

export const so_detail_columns = [
  {
    id: 0,
    name: "Item",
    size: 9,
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
    id: 5,
    name: "Total Price",
    size: 3,
    require: true,
  },
  {
    id: 6,
    name: "Delivery Date",
    size: 3,
    require: true,
  },
];
export const so_fields = {
  so_id: null,
  so_no: null,
  so_description: null,
  so_no_description: null,
  qn_id: null,
  qn_no: null,
  qn_no_description: null,
  so_order_date: null,
  tg_so_delivery_date: null,
  so_agreement: null,
  so_remark: null,
  so_lock: 0,
  so_actived: 1,
  so_created: null,
  so_created_by: null,
  so_updated: null,
  so_updated_by: null,
  branch_id: 1,
  customer_id: null,
  vat_id: 1,
  currency_id: 1,
  process_id: null,
  tg_so_amount: 0,
  tg_so_discount: 0,
  tg_so_sum_amount: 0,
  tg_so_vat_amount: 0,
  tg_so_total_amount: 0,
  tg_trans_status_id: 1,
  tg_trans_close_id: null,
  branch_no: null,
  branch_name: null,
  branch_no_name: null,
  payment_term_no: null,
  payment_term_name: null,
  payment_term_no_name: null,
  customer_no: null,
  customer_name: null,
  customer_no_name: null,
  currency_name: null,
  currency_no_name: null,
  vat_no: null,
  vat_name: null,
  vat_no_name: null,
  vat_rate: 0.07,
  currency_no: "THB",
  process_complete: null,
  trans_status_name: null,
  trans_close_name: null,
  so_created_by_no_name: null,
  node_stay: null,
  tg_flow_max_node_id: null,
  so_type_id: null,
  qn_tg_trans_close_id: 1,
  so_production_type_id: null,
  so_production_ref_id: null,
};
export const so_detail_fields = {
  id: 0,
  so_detail_id: null,
  so_detail_delivery_date: null,
  so_detail_qty: 0,
  so_detail_price: 0,
  so_detail_discount: 0,
  so_detail_total_price: 0,
  so_detail_remark: null,
  so_id: null,
  item_id: null,
  uom_id: null,
  tg_so_detail_qty_remain: 0,
  tg_so_detail_qty_over: 0,
  so_no: null,
  so_description: null,
  so_no_description: null,
  item_no: null,
  item_name: null,
  item_no_name: null,
  uom_no: null,
  uom_name: null,
  uom_no_name: null,
};

export const so_require_fields = [
  "so_order_date",
  "so_description",
  // "so_agreement",
  "qn_id",
  "payment_term_id",
  "customer_id",
  "so_type_id",
];

export const so_require_fields_detail = [
  "item_id",
  "uom_id",
  "so_detail_qty",
  // "so_detail_price",
  "so_detail_delivery_date",
];
