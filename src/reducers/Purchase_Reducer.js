import {
  GET_ALL_PR,
  CREATE_PR,
  UPDATE_PR,
  UPDATE_PR_STATUS,
  GET_ALL_PO,
  CREATE_PO,
  UPDATE_PO,
  UPDATE_PO_STATUS,
  GET_PR_DETAIL,
  UPDATE_PR_DETAIL,
  ADD_ITEM_LINE,
  DEL_ITEM_LINE,
  GET_ALL_VENDOR,
  UPDATE_ITEM_LINE,
  PR_TO_PO_DETAIL,
  PO_ADD_ITEM_LINE,
  PO_DEL_ITEM_LINE,
  PO_UPDATE_ITEM_LINE,
  RESET_PR_DATA,
  RESET_PO_DATA,
  SET_PR_HEAD,
  UPDATE_PR_HEAD,
  GET_PO_HEAD,
  GET_PO_DETAIL,
  UPDATE_PO_HEAD,
  GET_PR_OPEN_PO,
  GET_VENDOR_BY_ID,
  GET_CURRENCY,
} from "../actions/types";
import { sortData } from "../include/js/function_main";
const initialState = {
  pr_list: [],
  pr_head: {},
  pr_detail: [],
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
    case GET_ALL_PR:
      return { ...state, pr_list: action.payload };

    case CREATE_PR:
      return { ...state, pr_list: [...state.pr_list, action.payload] };
    case GET_ALL_PO:
      return { ...state, po: { ...state.po, po_list: action.payload } };
    case GET_PR_OPEN_PO:
      return { ...state, po: { ...state.po, pr_ref: action.payload } };
    case CREATE_PO:
      return {
        ...state,
        po: { ...state.po, po_list: [...state.po.po_list, action.payloa] },
      };
    case GET_PO_HEAD:
      return { ...state, po: { ...state.po, po_head: action.payload } };
    case UPDATE_PO_HEAD:
      return {
        ...state,
        po: {
          ...state.po,
          po_head: { ...state.po.po_head, ...action.payload },
        },
      };
    case GET_PO_DETAIL:
      return {
        ...state,
        po: { ...state.po, po_detail: sortData(action.payload) },
      };
    // PR
    case SET_PR_HEAD:
      return { ...state, pr_head: action.payload };
    case UPDATE_PR_HEAD:
      return {
        ...state,
        pr_head: { ...state.pr_head, ...action.payload },
      };
    case PR_TO_PO_DETAIL:
      return {
        ...state,
        po: { ...state.po, po_detail: sortData(action.payload) },
      };
    case GET_PR_DETAIL:
      return { ...state, pr_detail: sortData(action.payload) };
    // pr item
    case ADD_ITEM_LINE:
      return {
        ...state,
        pr_detail: sortData([...state.pr_detail, action.payload]),
      };
    case DEL_ITEM_LINE:
      return {
        ...state,
        pr_detail: state.pr_detail.filter(
          (line) => line.id !== action.payload.id
        ),
      };
    case UPDATE_ITEM_LINE:
      return {
        ...state,
        pr_detail: state.pr_detail.map((line) =>
          line.id === action.payload.id
            ? { ...line, ...action.payload.data }
            : line
        ),
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
        pr_head: action.payload.pr_fields,
        pr_detail: action.payload.pr_detail,
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
