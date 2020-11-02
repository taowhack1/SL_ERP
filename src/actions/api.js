export const api_receive_get_ref_po_head = `http://192.168.5.222:3009/api/list/po`;
export const api_receive_get_ref_po_detail = `http://192.168.5.222:3009/api/purchase/po_detail/ref`;
export const api_receive = "http://192.168.5.222:3009/api/inventory/receive";
export const api_receive_detail =
  "http://192.168.5.222:3009/api/inventory/receive_detail";
export const api_receive_sub_detail =
  "http://192.168.5.222:3009/api/inventory/receive_detail_sub/receive_detail";

export const api_get_item_type = "http://192.168.5.222:3009/api/list/type";
export const api_get_item_category =
  "http://192.168.5.222:3009/api/list/category";
export const api_get_item_uom = "http://192.168.5.222:3009/api/list/uom";
export const api_get_item_identify_benefit =
  "http://192.168.5.222:3009/api/list/identify_benefit";
export const api_issue = "http://192.168.5.222:3009/api/inventory/issue";
export const api_issue_detail =
  "http://192.168.5.222:3009/api/inventory/issue_detail";

export const api_shelf = "http://192.168.5.222:3009/api/list/shelf";

// disburse
export const api_issue_ref_list = "http://192.168.5.222:3009/api/list/issue";
export const api_disburse = "http://192.168.5.222:3009/api/inventory/disburse";
export const api_disburse_detail =
  "http://192.168.5.222:3009/api/inventory/disburse_detail";
export const api_disburse_sub_detail =
  "http://192.168.5.222:3009/api/inventory/disburse_detail_sub";
export const api_disburse_sub_detail_by_disburse_id =
  "http://192.168.5.222:3009/api/inventory/disburse_detail_sub/disburse_detail";
export const api_disburse_get_ref_issue_head = `http://192.168.5.222:3009/api/list/po`;
export const api_disburse_get_ref_issue_detail = `http://192.168.5.222:3009/api/inventory/issue_detail/ref`;

// item
export const api_get_location_shelf_by_item_id = `http://192.168.5.222:3009/api/list/location/shelf`;
export const api_get_lot_batch_by_item_id_shelf = `http://192.168.5.222:3009/api/list/lot_no/batch`;

//qc
export const api_qc_receive_list = "http://192.168.5.222:3009/api/qa/qc/item";
export const api_qc_receive_detail_list =
  "http://192.168.5.222:3009/api/qa/qc/item/detail";

//vendor
export const api_vendor = "http://192.168.5.222:3009/api/purchase/vendor";
//customer
export const api_customer = "http://192.168.5.222:3009/api/sales/customer";

//accounting
export const api_payment_term_vendor =
  "http://192.168.5.222:3009/api/list/payment_term/vendor";
export const api_payment_term_customer =
  "http://192.168.5.222:3009/api/list/payment_term/customer";
export const api_currency = "http://192.168.5.222:3009/api/list/currency";

//stock
export const get_stock_on_hand =
  "http://192.168.5.222:3009/api/inventory/stock";

//Authen
export const api_change_password =
  "http://192.168.5.222:3009/api/authorize/change_password";
