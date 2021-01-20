import { api_server } from "./main_config";

//qc
export const api_qc_receive_list = `${api_server}/api/qa/qc/item`;
export const api_qc_receive_detail_list = `${api_server}/api/qa/qc/item/detail`;
//qa test case
export const api_qa_test_case = `${api_server}/api/qa/qa_testcase`;
export const api_qa_subject_list = `${api_server}/api/list/qa_subject`;
export const api_qa_specification_list = `${api_server}/api/list/qa_specification`;
export const api_qa_method_list = `${api_server}/api/list/qa_method`;
export const api_qa_subject = `${api_server}/api/qa/qa_subject`;
export const api_qa_specification = `${api_server}/api/qa/qa_specification`;
export const api_qa_method = `${api_server}/api/qa/qa_method`;

//vendor
export const api_vendor = `${api_server}/api/purchase/vendor`;
//customer
export const api_customer = `${api_server}/api/sales/customer`;

//accounting
export const api_payment_term_vendor = `${api_server}/api/list/payment_term/vendor`;
export const api_payment_term_customer = `${api_server}/api/list/payment_term/customer`;
export const api_currency = `${api_server}/api/list/currency`;

//stock
export const get_stock_on_hand = `${api_server}/api/inventory/stock`;

//Authen
export const api_change_password = `${api_server}/api/authorize/change_password`;
export const api_keep_log = `${api_server}/api/log/keeplog`;

export const api_url = `${api_server}/api`;
export const api_query = `${api_server}/api/query/sql`;
export const api_purchase = `${api_server}/api/purchase`;
export const api_purchase_po_list = `${api_server}/api/purchase/po`;
export const api_purchase_get_all_po = `${api_server}/api/purchase/po/all`;
export const api_purchase_get_all_pr = `${api_server}/api/purchase/pr/all`;
export const api_get_po_detail = `${api_server}/api/purchase/po_detail`;
export const api_get_pr_detail = `${api_server}/api/purchase/pr_detail`;
export const api_approve = `${api_server}/api/approve/process`;
export const api_authen = `${api_server}/api/authorize/login`;
export const api_cost_center = `${api_server}/api/list/cost_center`;
export const api_comments_log = `${api_server}/api/approve/process`;

export const api_quo_list = `${api_server}/api/sales/qn`;

export const api_get_select_list_customers = `${api_server}/api/list/customer`;

export const api_create_quotation = `${api_server}/api/sales/qn`;
export const api_create_quotation_detail = `${api_server}/api/sales/qn_detail`;
export const api_get_pr_detail_ref = `${api_server}/api/purchase/pr_detail/ref`;
export const api_get_pr_open_po = `${api_server}/api/list/pr`;

// inventory
export const api_get_uom_list = `${api_server}/api/list/uom`;
export const api_get_item_list = `${api_server}/api/list/item`;

export const api_receive_get_ref_po_head = `${api_server}/api/list/po`;
export const api_receive_get_ref_po_detail = `${api_server}/api/purchase/po_detail/ref`;
export const api_receive = `${api_server}/api/inventory/receive`;
export const api_receive_detail = `${api_server}/api/inventory/receive_detail`;
export const api_receive_sub_detail = `${api_server}/api/inventory/receive_detail_sub/receive_detail`;

export const api_issue = `${api_server}/api/inventory/issue`;
export const api_issue_detail = `${api_server}/api/inventory/issue_detail`;

export const api_shelf = `${api_server}/api/list/shelf`;
// inventory -> configuration
export const api_get_configuration_type = `${api_server}/api/configuration/inventory/type`;
export const api_get_configuration_category = `${api_server}/api/configuration/inventory/category`;
export const api_get_configuration_uom = `${api_server}/api/configuration/inventory/uom`;

// disburse
export const api_issue_ref_list = `${api_server}/api/list/issue`;
export const api_disburse = `${api_server}/api/inventory/disburse`;
export const api_disburse_detail = `${api_server}/api/inventory/disburse_detail`;
export const api_disburse_sub_detail = `${api_server}/api/inventory/disburse_detail_sub`;
export const api_disburse_sub_detail_by_disburse_id = `${api_server}/api/inventory/disburse_detail_sub/disburse_detail`;
export const api_disburse_get_ref_issue_head = `${api_server}/api/list/po`;
export const api_disburse_get_ref_issue_detail = `${api_server}/api/inventory/issue_detail/ref`;

// item
export const api_get_all_item_list = `${api_server}/api/inventory/item/all`;
export const api_get_item_type = `${api_server}/api/list/type`;
export const api_get_item_category = `${api_server}/api/list/category`;
export const api_get_item_uom = `${api_server}/api/list/uom`;
export const api_get_item_identify_benefit = `${api_server}/api/list/identify_benefit`;
export const api_get_item_control = `${api_server}/api/list/item_control`;

export const api_upload_file = `${api_server}/api/upload/item/file`;
export const api_get_item_by_id = `${api_server}/api/inventory/item`;
export const api_get_location_shelf_by_item_id = `${api_server}/api/list/location/shelf`;
export const api_get_lot_batch_by_item_id_shelf = `${api_server}/api/list/lot_no/batch`;
export const api_get_master_part = `${api_server}/api/list/item_part`;
// item -> Active / In-active
export const api_item_status = `${api_server}/api/inventory/item/actived`;
// item -> vendor
export const api_item_vendor = `${api_server}/api/inventory/item_vendor`;
// item -> part & formula
export const api_part_and_formula = `${api_server}/api/inventory/item_part_specification`;
export const api_get_part_and_formula_all = `${api_server}/api/inventory/item_part_specification_all`;
export const api_get_part_by_item_id = `${api_server}/api/inventory/item_part_specification_detail2`;
// item -> formula
export const api_item_formula = `${api_server}/api/inventory/item_formula`;
// item -> qa
export const api_item_qa = `${api_server}/api/inventory/item_qa`;
// item -> weight
export const api_item_weight = `${api_server}/api/inventory/item_weight`;
// item -> packaging
export const api_item_packaging = `${api_server}/api/inventory/item_packaging`;
// item -> process
export const api_item_process = `${api_server}/api/inventory/item_process`;

//Sale
export const api_get_qn_by_id = `${api_server}/api/sales/qn`;
export const api_qn_detail = `${api_server}/api/sales/qn_detail`;
export const api_so = `${api_server}/api/sales/so`;
export const api_so_detail = `${api_server}/api/sales/so_detail`;
export const api_get_qn_open_so = `${api_server}/api/list/qn`;

// Machine
export const api_machine = `${api_server}/api/production/machine`;
export const api_machine_type = `${api_server}/api/list/machine_type_tool`;
export const api_machine_item_type = `${api_server}/api/list/machine_type`;
export const api_machine_category = `${api_server}/api/list/machine_category`;
// Work Center
export const api_work_center = `${api_server}/api/production/work_center`;
export const api_work_center_detail = `${api_server}/api/production/work_center_detail`;
export const api_work_center_type = `${api_server}/api/list/work_center_type`;
export const api_work_center_category = `${api_server}/api/list/work_center_category`;
export const api_work_center_capacity_categ = `${api_server}/api/list/capacity_category`;

// Work Order
export const api_work_order = `${api_server}/api/production/wo`;
export const api_work_order_detail = `${api_server}/api/production/wo_detail`;
export const api_wo_so_ref = `${api_server}/api/list/so`;
export const api_get_fg_material = `${api_server}/api/production/wo/calculate`;
