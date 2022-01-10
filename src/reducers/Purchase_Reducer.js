/** @format */

import { useSelector } from "react-redux";
import {
  PERSIST_FORM_PO,
  RESET_PERSIST_FORM_PO,
  SEARCH_PO,
} from "../actions/purchase/PO_Actions";
import { SEARCH_PR } from "../actions/purchase/PR_Actions";
import {
  GET_ALL_PR,
  GET_ALL_PO,
  CREATE_PO,
  GET_ALL_VENDOR,
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
  GET_VENDOR_CATEGORY,
  GET_VENDOR_GROUP,
  GET_LANGUAGE,
  GET_VAT,
  GET_ZIP,
  GET_TAMBON,
  GET_PROVINCE,
  GET_COUNTRY,
  GET_VENDOR_VAT,
  GET_DISTRICT,
} from "../actions/types";
import { sortData } from "../include/js/function_main";

const initialState = {
  operations: {
    po: {
      form: {},
    },
  },
  pr: {
    pr_list: [],
    pr_head: {},
    pr_detail: [],
    filter: {
      keyword: null,
      page: 1,
      pageSize: 20,
      vendor_id: null,
    },
  },
  po: {
    pr_ref: [],
    po_list: [],
    po_head: {},
    po_detail: [],
    filter: {
      keyword: null,
      page: 1,
      pageSize: 20,
      vendor_id: null,
      po_status: null,
    },
  },
  vendor: {
    vendor_list: [],
    vendor: {
      data_head: {},
      dataDetail: [],
    },
    vendor_group: [],
    vendor_category: [],
    vendor_language: [],
    vendor_country: [],
    vendor_province: [],
    vendor_district: [],
    vendor_tambon: [],
    vendor_zip: [],
    vendor_vat: [],
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
    case GET_VENDOR_GROUP:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_group: action.payload },
      };
    case GET_VENDOR_CATEGORY:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_category: action.payload },
      };
    case GET_VENDOR_BY_ID:
      return {
        ...state,
        vendor: { ...state.vendor, vendor: action.payload },
      };
    case GET_LANGUAGE:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_language: action.payload },
      };
    case GET_COUNTRY:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_country: action.payload },
      };
    case GET_PROVINCE:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_province: action.payload },
      };
    case GET_DISTRICT:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_district: action.payload },
      };
    case GET_TAMBON:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_tambon: action.payload },
      };
    case GET_ZIP:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_zip: action.payload },
      };
    case GET_VENDOR_VAT:
      return {
        ...state,
        vendor: { ...state.vendor, vendor_vat: action.payload },
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

    case SEARCH_PO:
      return {
        ...state,
        po: {
          ...state.po,
          filter: {
            ...state.po.filter,
            ...action.payload,
          },
        },
      };
    case SEARCH_PR:
      return {
        ...state,
        pr: {
          ...state.pr,
          filter: {
            ...state.pr.filter,
            ...action.payload,
          },
        },
      };
    case PERSIST_FORM_PO:
      return {
        ...state,
        operations: {
          ...state?.operations,
          po: {
            ...state?.operations?.po,
            form: action.payload,
          },
        },
      };
    case RESET_PERSIST_FORM_PO:
      return {
        ...state,
        operations: {
          ...state?.operations,
          po: {
            ...state?.operations?.po,
            form: state?.operations?.po?.form,
          },
        },
      };
    default:
      return state;
  }
};
