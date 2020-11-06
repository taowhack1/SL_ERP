import {
  GET_ALL_PR,
  UPDATE_PR,
  UPDATE_PR_STATUS,
  GET_ALL_PO,
  CREATE_PO,
  GET_ALL_VENDOR,
  UPDATE_ITEM_LINE,
  PR_TO_PO_DETAIL,
  PO_ADD_ITEM_LINE,
  PO_DEL_ITEM_LINE,
  PO_UPDATE_ITEM_LINE,
  RESET_PR_DATA,
  RESET_PO_DATA,
  GET_PR_OPEN_PO,
  GET_VENDOR_BY_ID,
  GET_CURRENCY,
  GET_PR_BY_ID,
  GET_PO_BY_ID,
} from "../actions/types";
import { sortData } from "../include/js/function_main";
const initialState = {
  pr: {
    pr_list: [],
    pr_head: {},
    pr_detail: [],
  },
  po: {
    pr_ref: [],
    po_list: [],
    po_head: {},
    po_detail: [],
  },
  vendor: {
    vendor_list: [],
    vendor: {},
  },
  currency: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VENDOR:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_list: action.payload },
      };
    case GET_VENDOR_BY_ID:
      return {
        ...state,
        vendor: { ...state.vendor, vendor: action.payload },
      };
    case GET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case GET_PR_BY_ID:
      return { ...state, pr: { ...state.pr, ...action.payload } };
    case GET_ALL_PR:
      return { ...state, pr: { ...state.pr, pr_list: action.payload } };
    case GET_ALL_PO:
      return { ...state, po: { ...state.po, po_list: action.payload } };
    case GET_PR_OPEN_PO:
      return { ...state, po: { ...state.po, pr_ref: action.payload } };
    case CREATE_PO:
      return {
        ...state,
        po: { ...state.po, po_list: [...state.po.po_list, action.payloa] },
      };
    case GET_PO_BY_ID:
      return { ...state, po: { ...state.po, ...action.payload } };
    // PR
    case PR_TO_PO_DETAIL:
      return {
        ...state,
        po: { ...state.po, po_detail: sortData(action.payload) },
      };

    // po item
    case PO_ADD_ITEM_LINE:
      return {
        ...state,
        po: {
          ...state.po,
          po_detail: sortData([...state.po.po_detail, action.payload]),
        },
      };
    case PO_DEL_ITEM_LINE:
      return {
        ...state,
        po: {
          ...state.po,
          po_detail: state.po.po_detail.filter(
            (line) => line.id !== action.payload.id
          ),
        },
      };
    case PO_UPDATE_ITEM_LINE:
      return {
        ...state,
        po: {
          ...state.po,
          po_detail: state.po.po_detail.map((line) =>
            line.id === action.payload.id
              ? { ...line, ...action.payload.data }
              : line
          ),
        },
      };
    case RESET_PR_DATA:
      return {
        ...state,
        pr: initialState.pr,
      };
    case RESET_PO_DATA:
      return {
        ...state,
        po: {
          ...state.po,
          po_head: {},
          po_detail: [],
        },
      };
    default:
      return state;
  }
};
