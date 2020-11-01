export const api_url = "http://192.168.5.222:3009/api";
export const api_query = "http://192.168.5.222:3009/api/query/sql";
export const api_purchase = "http://192.168.5.222:3009/api/purchase";
export const api_purchase_po_list = "http://192.168.5.222:3009/api/purchase/po";
export const api_get_po_detail =
  "http://192.168.5.222:3009/api/purchase/po_detail";
export const api_get_pr_detail =
  "http://192.168.5.222:3009/api/purchase/pr_detail";
export const api_approve = "http://192.168.5.222:3009/api/approve/process";
export const api_authen = "http://192.168.5.222:3009/api/authorize/login";
export const api_cost_center = "http://192.168.5.222:3009/api/list/cost_center";
export const api_comments_log = "http://192.168.5.222:3009/api/approve/process";

export const api_quo_list = "http://192.168.5.222:3009/api/sales/qn";

export const api_get_select_list_customers =
  "http://192.168.5.222:3009/api/list/customer";

export const api_create_quotation = "http://192.168.5.222:3009/api/sales/qn";
export const api_create_quotation_detail =
  "http://192.168.5.222:3009/api/sales/qn_detail";
export const api_get_pr_detail_ref =
  "http://192.168.5.222:3009/api/purchase/pr_detail/ref";
export const api_get_pr_open_po = "http://192.168.5.222:3009/api/list/pr";

// inventory
export const api_get_uom_list = "http://192.168.5.222:3009/api/list/uom";
export const api_get_item_list = "http://192.168.5.222:3009/api/list/item";

export const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const action_type = [
  {
    id: 1,
    value: 1,
    name: "Decision",
  },
  {
    id: 2,
    value: 2,
    name: "Create",
  },
  {
    id: 3,
    value: 3,
    name: "Cancel",
  },
  {
    id: 4,
    value: 4,
    name: "Complete",
  },
  {
    id: 5,
    value: 5,
    name: "Approve",
  },
  {
    id: 6,
    value: 6,
    name: "Reject",
  },
];
