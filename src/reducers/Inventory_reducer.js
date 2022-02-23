/** @format */

import { combineReducers } from "redux";
import {
  GET_ALL_ITEMS,
  GET_RECEIVE_LIST,
  GET_RECEIVE_SUB_DETAIL,
  GET_RECEIVE_DETAIL,
  GET_RECEIVE_HEAD,
  GET_PO_RECEIVE_LIST,
  RESET_RECEIVE,
  GET_MASTER_DATA_ITEM,
  GET_ISSUE_LIST,
  RESET_ISSUE,
  GET_ISSUE_BY_ID,
  GET_ALL_SHELF,
  GET_ISSUE_REF_LIST,
  GET_DISBURSE_LIST,
  GET_DISBURSE_BY_ID,
  GET_LOCATION_SHELF_BY_ITEM_ID,
  GET_LOT_BATCH_BY_ITEM_ID_SHELF,
  GET_REPORT_STOCK,
  GET_ITEM_BY_ID,
  GET_RECEIVE_BY_ID,
  GET_ITEM_TYPE,
  GET_ITEM_TYPE_IN_ROW,
  GET_ITEM_CATEGORY,
  GET_CATEGORY_IN_ROW,
  GET_TYPE_UOM,
  GET_TYPE_UOM_IN_ROW,
  GET_UOM,
  GET_UOM_IN_ROW,
  GET_ITEM_TYPE_BY_ID,
  GET_ITEM_CATEGORY_BY_ID,
  GET_UOM_BY_ID,
  GET_PD_RECEIVE_LIST,
  RESET_PD_RECEIVE,
  GET_PD_RECEIVE_JOB_LIST,
  SET_LOADING,
  SEARCH_ISSUE,
  RESET_ISSUE_DATA,
  SEARCH_RETURN,
  RESET_RETURN_DATA,
  SEARCH_ITEMS,
  SEARCH_DISBURSE,
  SEARCH_RECEIVE,
} from "../actions/types";

import {
  GET_RETURN_ISSUE_REF_FAILURE,
  GET_RETURN_ISSUE_REF_REQUEST,
  GET_RETURN_ISSUE_REF_SUCCESS,
  GET_RETURN_LIST_FAILURE,
  GET_RETURN_LIST_REQUEST,
  GET_RETURN_LIST_SUCCESS,
} from "../actions/inventory/operation/return/returnActions";
import {
  CLEAR_FILTER_STOCK_ON_HAND,
  CLEAR_STATE_ITEM,
  FILTER_STOCK_ON_HAND,
  GET_SAMPLE_ITEMS,
} from "../actions/inventory";
import {
  CLEAR_FILTER_REPORT_GR,
  FILTER_REPORT_GR,
} from "../actions/inventory/receiveActions";
const initialState = {
  loading: false,
  item: {
    data_head: {},
    data_detail: [],
    data_part: [],
    data_weight_detail: [],
    data_packaging_detail: [],
    data_file: [],
    data_filling: [],
  },
  master_data: {
    item_uom: [],
    item_type: [],
    item_benefit: [],
    item_control: [],
    item_category: [],
    item_list: [],
    shelf: [],
    item_part: [],
    sampleItems: [],
    item_code_type: [],
  },
  filter_item_list: {
    keyword: null,
    page: 1,
    pageSize: 20,
    item_id: null,
    status_name: "All",
    status_id: 99,
    search_text: "",
    category_id: null,
    type_id: null,
    type_no_name: null,
    category_no_name: null,
  },
  configurations: {
    type: [],
    typeInRow: [],
    category: [],
    categoryInRow: [],
    typeUOM: [],
    typeUOMInRow: [],
    uom: [],
    uomInRow: [],
  },
  stock: {
    item_location_shelf: [],
    item_lot_batch: [],
  },
  receive: {
    po_ref: [],
    receive_list: [],
    receive_head: {},
    receive_detail: [],
    receive_sub_detail: [],
    filter: {
      keyword: null,
      page: 1,
      pageSize: 20,
      receive_id: null,
    },
  },
  issue: {
    issue_list: [],
    issue_head: {},
    issue_detail: [],
    filter: {
      keyword: null,
      page: 1,
      pageSize: 20,
      issue_id: null,
    },
  },
  disburse: {
    issue_ref: [],
    disburse_list: [],
    disburse_head: {},
    disburse_detail: [],
    disburse_sub_detail: [],
    filter: {
      keyword: null,
      page: 1,
      pageSize: 20,
      disburse_id: null,
    },
  },
  report: {
    stock_on_hand: {
      filter: {
        keyword: null,
        page: 1,
        pageSize: 15,
        itemType: 0,
        codeType: 0,
        expandedId: [],
      },
      dataSource: [],
    },
    gr: {
      filter: {
        itemType: 0,
        startDate: null,
        endDate: null,
      },
    },
  },
  operations: {
    productionReceive: {
      list: [],
      jobList: [],
    },
    issueReturn: {
      isLoading: false,
      issueRef: [],
      issueReturnList: [],
    },
    filter: {
      keyword: null,
      page: 1,
      pageSize: 20,
      issue_id: null,
    },
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case GET_MASTER_DATA_ITEM:
      return {
        ...state,
        master_data: action.payload,
      };
    case GET_ALL_ITEMS:
      return {
        ...state,
        master_data: { ...state.master_data, item_list: action.payload },
      };
    case SEARCH_ITEMS:
      return {
        ...state,
        filter_item_list: {
          ...state.filter_item_list,
          ...action.payload,
        },
      };
    case CLEAR_STATE_ITEM:
      return {
        ...state,
        master_data: { ...state.master_data, item_list: [] },
      };
    case GET_SAMPLE_ITEMS:
      return {
        ...state,
        loading: false,
        master_data: { ...state.master_data, sampleItems: action.payload },
      };
    case GET_ITEM_BY_ID:
      return {
        ...state,
        item: action.payload,
      };
    case GET_LOCATION_SHELF_BY_ITEM_ID:
      return {
        ...state,
        stock: { ...state.stock, item_location_shelf: action.payload },
      };
    case GET_LOT_BATCH_BY_ITEM_ID_SHELF:
      return {
        ...state,
        stock: { ...state.stock, item_lot_batch: action.payload },
      };
    // CONFIGURATIONS TYPE
    case GET_ITEM_TYPE:
      return {
        ...state,
        configurations: { ...state.configurations, type: action.payload },
      };
    case GET_ITEM_TYPE_IN_ROW:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          typeInRow: action.payload,
        },
      };
    case GET_ITEM_TYPE_BY_ID:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          typeInRow: action.payload,
        },
      };
    case GET_ITEM_CATEGORY:
      return {
        ...state,
        configurations: { ...state.configurations, category: action.payload },
      };
    case GET_CATEGORY_IN_ROW:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          categoryInRow: action.payload,
        },
      };
    case GET_ITEM_CATEGORY_BY_ID:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          categoryInRow: action.payload,
        },
      };
    case GET_TYPE_UOM:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          typeUOM: action.payload,
        },
      };
    case GET_TYPE_UOM_IN_ROW:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          typeUOMInRow: action.payload,
        },
      };
    case GET_UOM:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          uom: action.payload,
        },
      };
    case GET_UOM_IN_ROW:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          uomInRow: action.payload,
        },
      };
    case GET_UOM_BY_ID:
      return {
        ...state,
        configurations: {
          ...state.configurations,
          uomInRow: action.payload,
        },
      };
    // RECEIVE
    case GET_RECEIVE_LIST:
      return {
        ...state,
        receive: { ...state.receive, receive_list: action.payload },
      };
    case GET_PO_RECEIVE_LIST:
      return {
        ...state,
        receive: { ...state.receive, po_ref: action.payload },
      };
    case GET_RECEIVE_BY_ID:
      return {
        ...state,
        receive: { ...state.receive, ...action.payload },
      };
    case GET_RECEIVE_HEAD:
      return {
        ...state,
        receive: { ...state.receive, receive_head: action.payload },
      };
    case GET_RECEIVE_DETAIL:
      return {
        ...state,
        receive: { ...state.receive, receive_detail: action.payload },
      };
    case GET_RECEIVE_SUB_DETAIL:
      return {
        ...state,
        receive: { ...state.receive, receive_sub_detail: action.payload },
      };
    case SEARCH_RECEIVE:
      return {
        ...state,
        receive: {
          ...state.receive,
          filter: {
            ...state.receive.filter,
            ...action.payload,
          },
        },
      };
    case RESET_RECEIVE:
      return {
        ...state,
        receive: initialState.receive,
      };

    // RECEIVE -> PRODUCTION
    case GET_PD_RECEIVE_LIST:
      return {
        ...state,
        operations: {
          ...state.operations,
          productionReceive: {
            ...state.operations.productionReceive,
            list: action.payload,
          },
        },
      };
    case GET_PD_RECEIVE_JOB_LIST:
      return {
        ...state,
        operations: {
          ...state.operations,
          productionReceive: {
            ...state.operations.productionReceive,
            jobList: action.payload,
          },
        },
      };
    case RESET_PD_RECEIVE:
      return {
        ...state,
        operations: {
          ...state.operations,
          productionReceive: initialState.operations.productionReceive,
        },
      };
    case GET_ALL_SHELF:
      return {
        ...state,
        master_data: { ...state.master_data, shelf: action.payload },
      };
    case GET_ISSUE_BY_ID:
      return {
        ...state,
        issue: { ...state.issue, ...action.payload },
      };
    case GET_ISSUE_LIST:
      return {
        ...state,
        issue: { issue_list: action.payload },
      };
    case RESET_ISSUE:
      return {
        ...state,
        issue: initialState.issue,
      };
    case RESET_ISSUE_DATA:
      return {
        ...state,
        issue: initialState.issue,
      };

    case SEARCH_ISSUE:
      return {
        ...state,
        issue: {
          ...state.issue,
          filter: {
            ...state.issue.filter,
            ...action.payload,
          },
        },
      };
    // DISBURSE
    case GET_DISBURSE_LIST:
      return {
        ...state,
        disburse: { ...state.disburse, disburse_list: action.payload },
      };
    case GET_ISSUE_REF_LIST:
      return {
        ...state,
        disburse: { ...state.disburse, issue_ref: action.payload },
      };
    case GET_DISBURSE_BY_ID:
      return {
        ...state,
        disburse: { ...state.disburse, ...action.payload },
      };
    case SEARCH_DISBURSE:
      return {
        ...state,
        disburse: {
          ...state.disburse,
          filter: {
            ...state.disburse.filter,
            ...action.payload,
          },
        },
      };
    //REPORT
    case GET_REPORT_STOCK:
      return {
        ...state,
        report: {
          ...state.report,
          stock_on_hand: {
            ...state.report.stock_on_hand,
            dataSource: action.payload,
          },
        },
      };
    // ค้นหาข้อมูลหน้า /stock_on_hand
    case FILTER_STOCK_ON_HAND:
      return {
        ...state,
        report: {
          ...state.report,
          stock_on_hand: {
            ...state.report.stock_on_hand,
            filter: {
              ...state.report.stock_on_hand.filter,
              ...action.payload,
            },
          },
        },
      };
    // ล้างค่าการค้นหาทั้งหมดของหน้า /stock_on_hand
    case CLEAR_FILTER_STOCK_ON_HAND:
      return {
        ...state,
        report: {
          ...state.report,
          stock_on_hand: {
            ...state.report.stock_on_hand,
            filter: initialState.report.stock_on_hand.filter,
          },
        },
      };

    // ค้นหาข้อมูลหน้า /gr
    case FILTER_REPORT_GR:
      return {
        ...state,
        report: {
          ...state.report,
          gr: {
            ...state.report.gr,
            filter: {
              ...state.report.gr.filter,
              ...action.payload,
            },
          },
        },
      };
    // ล้างค่าการค้นหาทั้งหมดของหน้า /gr
    case CLEAR_FILTER_REPORT_GR:
      return {
        ...state,
        report: {
          ...state.report,
          gr: {
            ...state.report.gr,
            filter: initialState.report.gr.filter,
          },
        },
      };

    //ISSUE RETURN
    case GET_RETURN_ISSUE_REF_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          issueReturn: { ...state.issueReturn, isLoading: true, issueRef: [] },
        },
      };
    case GET_RETURN_ISSUE_REF_SUCCESS:
      return {
        ...state,
        operations: {
          ...state.operations,
          issueReturn: {
            ...state.issueReturn,
            isLoading: false,

            issueRef: action.payload.issueRef,
          },
        },
      };
    case GET_RETURN_ISSUE_REF_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          issueReturn: { ...state.issueReturn, isLoading: false },
        },
      };
    case GET_RETURN_LIST_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          issueReturn: {
            ...state.issueReturn,
            isLoading: true,
            issueReturnList: [],
          },
        },
      };
    case GET_RETURN_LIST_SUCCESS:
      return {
        ...state,
        operations: {
          ...state.operations,
          issueReturn: {
            ...state.issueReturn,
            isLoading: false,
            issueReturnList: action.payload.issueReturnList,
          },
        },
      };
    case GET_RETURN_LIST_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          issueReturn: { ...state.issueReturn, isLoading: false },
        },
      };
    case RESET_RETURN_DATA:
      return {
        ...state,
        operations: {
          ...state.operations,
          issueReturn: { ...state.issueReturn, isLoading: false },
        },
      };
    case SEARCH_RETURN:
      return {
        ...state,
        operations: {
          ...state.operations,
          issueReturn: {
            ...state.operations.issueReturn,
          },
          filter: {
            ...state.operations.filter,
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};
