/** @format */

//HRM
export const api_get_production_emp = `/hrm/employees/production`;
export const api_get_rd_emp = `/hrm/employees/rd`;
//qc
export const api_qc_receive_list = `/qa/qc/item`;
export const api_qc_receive_detail_list = `/qa/qc/item/detail`;
export const api_qc_report_item = `/qa/qc/reports/item/`;
//qa Condition
export const api_qa_conditions = `/qa/qa_conditions`;
export const api_qa_subject_list = `/list/qa_subject`;
export const api_qa_specification_list = `/list/qa_specification`;
export const api_qa_method_list = `/list/qa_method`;
export const api_qa_subject = `/qa/qa_subject`;
export const api_qa_specification = `/qa/qa_specification`;
export const api_qa_method = `/qa/qa_method`;

//vendor
export const api_vendor = `/purchase/vendor`;
export const api_vendor_list = `/list/vendor`;
export const api_vendor_group = `/list/vendor/group`;
export const api_vendor_category = `/list/vendor/category`;
export const api_vat_id = `/list/vat`;
//customer
export const api_customer = `/sales/customer`;
export const api_customer_file = `/upload/customer/file`;
//address
export const api_language = `/list/language`;
export const api_country = `/list/country`;
export const api_province = `/list/province`;
export const api_district = `/list/district`;
export const api_tambon = `/list/tambon`;
export const api_zip = `/list/zip`;

//accounting
export const api_payment_term_vendor = `/list/payment_term/vendor`;
export const api_payment_term_customer = `/list/payment_term/customer`;
export const api_currency = `/list/currency`;

//stock
export const get_stock_on_hand = `/inventory/stock`;

//Authen
export const api_change_password = `/authorize/change_password`;
export const api_keep_log = `/log/keeplog`;

export const api_url = ``;
export const api_query = `/query/sql`;
export const api_approve = `/approve/process`;
export const api_authen = `/authorize/login`;
export const api_cost_center = `/list/cost_center`;
export const api_comments_log = `/approve/process`;

// Purchase
export const api_purchase = `/purchase`;
export const api_purchase_po_list = `/purchase/po`;
export const api_purchase_get_all_po = `/purchase/po/all`;
export const api_purchase_get_all_pr = `/purchase/pr/all`;
export const api_po_detail = `/purchase/po_detail`;
export const api_get_po_detail = `/purchase/po_detail`;
export const api_get_pr_detail = `/purchase/pr_detail`;
export const api_put_pr_detail = `/purchase/pr_detail`;

export const api_quo_list = `/sales/qn`;

export const api_get_select_list_customers = `/list/customer`;

export const api_create_quotation = `/sales/qn`;
export const api_create_quotation_detail = `/sales/qn_detail`;
export const api_get_pr_detail_ref = `/purchase/pr_detail/ref`;
export const api_get_pr_open_po = `/list/pr`;

// inventory
export const api_get_uom_list = `/list/uom`;
export const api_get_item_list = `/list/item`;

export const api_receive_get_ref_po_head = `/list/po`;
export const api_receive_get_ref_po_detail = `/purchase/po_detail/ref`;
export const api_receive = `/inventory/receive`;
export const api_receive_detail = `/inventory/receive_detail`;
export const api_receive_sub_detail = `/inventory/receive_detail_sub/receive_detail`;

export const api_pd_receive = `/inventory/receive_pd`;

export const api_issue = `/inventory/issue`;
export const api_issue_detail = `/inventory/issue_detail`;

export const api_shelf = `/list/shelf`;
// inventory -> configuration
export const api_get_configuration_type = `/configuration/inventory/type`;
export const api_get_configuration_category = `/configuration/inventory/category`;
export const api_get_configuration_uom = `/configuration/inventory/uom`;

// disburse
export const api_issue_ref_list = `/list/issue`;
export const api_disburse = `/inventory/disburse`;
export const api_disburse_detail = `/inventory/disburse_detail`;
export const api_disburse_sub_detail = `/inventory/disburse_detail_sub`;
export const api_disburse_sub_detail_by_disburse_id = `/inventory/disburse_detail_sub/disburse_detail`;
export const api_disburse_get_ref_issue_head = `/list/po`;
export const api_disburse_get_ref_issue_detail = `/inventory/issue_detail/ref`;

// return
export const api_return = `/inventory/return`;
export const api_return_issue_ref = `/inventory/return/list/issue`;
// item
export const api_get_all_item_list = `/inventory/item/all`;
export const api_get_item_type = `/list/type`;
export const api_get_item_category = `/list/category`;
export const api_get_item_uom = `/list/uom`;
export const api_get_item_identify_benefit = `/list/identify_benefit`;
export const api_get_item_control = `/list/item_control`;

export const api_upload_file = `/upload/item/file`;
export const api_get_item_by_id = `/inventory/item`;
export const api_get_location_shelf_by_item_id = `/list/location/shelf`;
export const api_get_lot_batch_by_item_id_shelf = `/list/lot_no/batch`;
export const api_get_master_part = `/list/item_part`;
// item -> Active / In-active
export const api_item_status = `/inventory/item/actived`;
// item -> vendor
export const api_item_vendor = `/inventory/item_vendor`;
export const api_upload_vendor_document = `/upload/item/item_vendor/file`;
// item -> part & formula
export const api_part_and_formula = `/inventory/item_part_specification`;
export const api_get_part_and_formula_all = `/inventory/item_part_specification_all`;
export const api_get_part_by_item_id = `/inventory/item_part_specification_detail2`;
// item -> formula
export const api_item_formula = `/inventory/item_formula`;
// item -> qa
export const api_item_qa = `/inventory/item_qa`;
// item -> weight
export const api_item_weight = `/inventory/item_weight`;
// item -> packaging
export const api_item_packaging = `/inventory/item_packaging`;
// item -> process
export const api_item_process = `/inventory/item_process`;
// item -> filling process
export const api_filling_process = `/inventory/item_filling_process`;
// item -> item uom conversion
export const api_item_uom_conversion = `/inventory/uom_convert`;

//Sale
export const api_get_qn_by_id = `/sales/qn`;
export const api_qn_detail = `/sales/qn_detail`;
export const api_so = `/sales/so`;
export const api_so_detail = `/sales/so_detail`;
export const api_get_qn_open_so = `/list/qn`;

// Machine
export const api_machine = `/production/machine`;
export const api_machine_type = `/list/machine_type_tool`;
export const api_machine_item_type = `/list/machine_type`;
export const api_machine_category = `/list/machine_category`;
// Work Center
export const api_work_center = `/production/work_center`;
export const api_work_center_detail = `/production/work_center_detail`;
export const api_work_center_type = `/list/work_center_type`;
export const api_work_center_category = `/list/work_center_category`;
export const api_work_center_capacity_categ = `/list/capacity_category`;

// Work Order
export const api_mrp = `/production/mrp`;
export const api_mrp_detail = `/production/mrp_detail`;
export const api_mrp_so_ref = `/list/so`;
export const api_get_fg_material = `/production/mrp/calculate`;

//routing
export const api_routing = `/production/routing`;
export const api_list_fg = `/list/item/fg`;
