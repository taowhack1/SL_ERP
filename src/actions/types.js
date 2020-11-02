export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const USER_PROJECT = "USER_PROJECT";
export const USER_MENU = "USER_MENU";
export const CURRENT_PROJECT = "CURRENT_PROJECT";
//HRM
export const GET_SELECT_DEP = "GET_SELECT_DEP";

// System Config.
export const DECIMAL_UPDATE = "DECIMAL_UPDATE";
export const GET_VAT = "GET_VAT";
// Salary
export const ADD_SALARY = "ADD_SALARY";
export const DEL_SALARY = "DEL_SALARY";

//Inventory
export const GET_SELECT_UOM = "GET_SELECT_UOM";
export const GET_SELECT_ITEM = "GET_SELECT_ITEM";
export const GET_ALL_SHELF = "GET_ALL_SHELF";
//Inventory Report
export const GET_REPORT_STOCK = "GET_REPORT_STOCK";
//Inventory -> Issue
export const GET_ISSUE_LIST = "GET_ISSUE_LIST";
export const RESET_ISSUE = "RESET_ISSUE";
export const GET_ISSUE_BY_ID = "GET_ISSUE_BY_ID";

//Inventory -> DISBURSE
export const RESET_DISBURSE = "RESET_DISBURSE";
export const GET_DISBURSE_LIST = "GET_DISBURSE_LIST";
export const GET_ISSUE_REF_LIST = "GET_ISSUE_DISBURSE_LIST";
export const GET_ISSUE_DETAIL_REF = "GET_ISSUE_DETAIL_REF";
export const GET_DISBURSE_BY_ID = "GET_DISBURSE_BY_ID";

export const GET_DISBURSE_HEAD = "GET_DISBURSE_HEAD";
export const GET_DISBURSE_DETAIL = "GET_DISBURSE_DETAIL";
export const GET_DISBURSE_SUB_DETAIL = "GET_DISBURSE_SUB_DETAIL";

//Inventory -> Receive
export const RESET_RECEIVE = "RESET_RECEIVE";
export const GET_RECEIVE_LIST = "GET_RECEIVE_LIST";
export const GET_PO_RECEIVE_LIST = "GET_PO_RECEIVE_LIST";
export const GET_PO_DETAIL_REF = "GET_PO_DETAIL_REF";
export const GET_RECEIVE_HEAD = "GET_RECEIVE_HEAD";
export const GET_RECEIVE_DETAIL = "GET_RECEIVE_DETAIL";
export const GET_RECEIVE_SUB_DETAIL = "GET_RECEIVE_SUB_DETAIL";

// item
export const GET_ITEM_BY_ID = "GET_ITEM_BY_ID";
export const GET_ITEM_DETAIL = "GET_ITEM_DETAIL";
export const GET_ALL_ITEMS = "GET_ALL_ITEMS";
export const CREATE_ITEM = "CREATE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const GET_MASTER_DATA_ITEM = "GET_MASTER_DATA_ITEM";
export const GET_LOCATION_SHELF_BY_ITEM_ID = "GET_LOCATION_SHELF_BY_ITEM_ID";
export const GET_LOT_BATCH_BY_ITEM_ID_SHELF = "GET_LOT_BATCH_BY_ITEM_ID_SHELF";

// Sales
export const GET_ALL_CUSTOMER = "GET_ALL_CUSTOMER";
export const GET_CUSTOMER_BY_ID = "GET_CUSTOMER_BY_ID";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const INACTIVE_CUSTOMER = "INACTIVE_CUSTOMER";

//Purchase Main
export const GET_COST_CENTER_LIST = "GET_COST_CENTER_LIST";
export const RESET_COMMENTS = "RESET_COMMENTS";
//Purchase -> Vendor
export const GET_ALL_VENDOR = "GET_ALL_VENDOR";
export const GET_VENDOR_BY_ID = "GET_VENDOR_BY_ID";
//Purchase -> PR
export const GET_ALL_PR = "GET_ALL_PR";
export const GET_PR_DETAIL = "GET_PR_DETAIL";
export const UPDATE_PR_DETAIL = "UPDATE_PR_DETAIL";
export const CREATE_PR = "CREATE_PR";
export const UPDATE_PR = "UPDATE_PR";
export const UPDATE_PR_STATUS = "UPDATE_PR_STATUS";
export const ADD_ITEM_LINE = "ADD_ITEM_LINE";
export const DEL_ITEM_LINE = "DEL_ITEM_LINE";
export const UPDATE_ITEM_LINE = "UPDATE_ITEM_LINE";
export const RESET_PR_DATA = "RESET_PR_DATA";

export const SET_PR_HEAD = "SET_PR_HEAD";
export const UPDATE_PR_HEAD = "UPDATE_PR_HEAD";

//Purchase -> PO
export const GET_ALL_PO = "GET_ALL_PO";
export const GET_PR_OPEN_PO = "GET_PR_OPEN_PO";
export const GET_PO_HEAD = "GET_PO_HEAD";
export const GET_PO_DETAIL = "GET_PO_DETAIL";
export const CREATE_PO = "CREATE_PO";
export const UPDATE_PO = "UPDATE_PO";
export const UPDATE_PO_HEAD = "UPDATE_PO_HEAD";
export const UPDATE_PO_STATUS = "UPDATE_PO_STATUS";
export const PR_TO_PO_DETAIL = "PR_TO_PO_DETAIL";

export const PO_ADD_ITEM_LINE = "PO_ADD_ITEM_LINE";
export const PO_DEL_ITEM_LINE = "PO_DEL_ITEM_LINE";
export const PO_UPDATE_ITEM_LINE = "PO_UPDATE_ITEM_LINE";
export const RESET_PO_DATA = "RESET_PO_DATA";

//Log & comment
export const GET_LOG_BY_ID = "GET_LOG_BY_ID";

//Sale -> Quo
export const RESET_ALL_SALES = "RESET_ALL_SALES";
export const GET_MASTER_DATA = "GET_MASTER_DATA";
export const GET_QN_OPEN_SO = "GET_QN_OPEN_SO";

export const CREATE_QUOTATION = "CREATE_QUOTATION";
export const SET_QN_HEAD = "SET_QN_HEAD";
export const SET_QN_DETAIL = "SET_QN_DETAIL";
export const RESET_QN = "RESET_QN";
export const SET_QN_LIST = "SET_QN_LIST";

export const GET_SO_LIST = "GET_SO_LIST";
export const SET_SO_HEAD = "SET_SO_HEAD";
export const SET_SO_DETAIL = "SET_SO_DETAIL";
export const RESET_SO = "RESET_SO";

//QC
export const GET_QC_RECEIVE_LIST = "GET_QC_RECEIVE_LIST";
export const GET_QC_RECEIVE_DETAIL_LIST = "GET_QC_RECEIVE_DETAIL_LIST";

//ACCOUNTING
export const GET_VENDOR_PAYMENT_TERM_LIST = "GET_VENDOR_PAYMENT_TERM_LIST";
export const GET_CUSTOMER_PAYMENT_TERM_LIST = "GET_CUSTOMER_PAYMENT_TERM_LIST";
export const GET_CURRENCY = "GET_CURRENCY";
