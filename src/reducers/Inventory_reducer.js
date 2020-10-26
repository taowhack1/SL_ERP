import {
  GET_SELECT_UOM,
  GET_ITEM_DETAIL,
  GET_ALL_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  GET_SELECT_ITEM,
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
} from "../actions/types";
const initialState = {
  master_data: {
    item_uom: [],
    item_type: [],
    item_benefit: [],
    item_category: [],
    item_list: [],
    shelf: [],
  },
  receive: {
    po_ref: [],
    receive_list: [],
    receive_head: {},
    receive_detail: [],
    receive_sub_detail: [],
  },
  issue: {
    issue_list: [],
    issue_head: {},
    issue_detail: [],
  },
  disburse: {
    issue_ref: [],
    disburse_list: [],
    disburse_head: {},
    disburse_detail: [],
    disburse_sub_detail: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MASTER_DATA_ITEM:
      return {
        ...state,
        master_data: action.payload,
      };
    case GET_ALL_ITEMS:
      return { ...state, items: action.payload };
    case CREATE_ITEM:
      return {
        ...state,
        items: [action.payload, ...state["items"]],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: [action.payload, ...state["items"]],
      };

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
    case RESET_RECEIVE:
      return {
        ...state,
        receive: initialState.receive,
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
    default:
      return state;
  }
};
