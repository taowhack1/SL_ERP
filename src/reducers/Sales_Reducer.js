/** @format */

import {
  GET_NPR_ITEM_LIST,
  GET_NPR_LIST,
  GET_NPR_SMD_MASTER_DATA,
} from "../actions/sales/nprActions";
import {
  SET_QN_LIST,
  RESET_QN,
  GET_ALL_CUSTOMER,
  GET_CUSTOMER_BY_ID,
  GET_SO_LIST,
  GET_MASTER_DATA,
  RESET_ALL_SALES,
  RESET_SO,
  GET_QN_OPEN_SO,
  GET_QN_BY_ID,
  GET_SO_BY_ID,
  SET_LOADING,
} from "../actions/types";

const inititalState = {
  loading: false,
  qn: {
    qn_list: [],
    qn_head: {},
    qn_detail: [],
  },
  so: {
    qn_ref: [],
    so_list: [],
    so_head: {},
    so_detail: [],
  },
  operations: {
    npr: {
      itemList: [],
      list: [],
    },
  },
  customer: {
    customer_list: [],
    customer: {},
    customer: {
      data_head: {},
      dataDetail: [],
    },
  },
  master_data: {
    customers: [],
    smd: {},
  },
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_QN_LIST:
      return { ...state, qn: { ...state.qn, qn_list: action.payload } };
    case GET_QN_BY_ID:
      return { ...state, qn: { ...state.qn, ...action.payload } };
    case RESET_QN:
      return { ...state, qn: { ...inititalState.qn } };
    case RESET_SO:
      return { ...state, so: { ...inititalState.so } };
    case GET_ALL_CUSTOMER:
      return {
        ...state,
        customer: { ...state.customer, customer_list: action.payload },
      };
    case GET_CUSTOMER_BY_ID:
      return {
        ...state,
        customer: { ...state.customer, customer: action.payload },
      };

    case GET_SO_LIST:
      return { ...state, so: { ...state.so, so_list: action.payload } };
    case GET_QN_OPEN_SO:
      return { ...state, so: { ...state.so, qn_ref: action.payload } };
    case GET_SO_BY_ID:
      return { ...state, so: { ...state.so, ...action.payload } };
    case GET_MASTER_DATA:
      return { ...state, master_data: { ...action.payload } };
    case GET_NPR_LIST:
      return {
        ...state,
        loading: false,
        operations: {
          ...state.operations,
          npr: {
            ...state.npr,
            list: action.payload,
          },
        },
      };
    case GET_NPR_ITEM_LIST:
      return {
        ...state,
        loading: false,
        operations: {
          ...state.operations,
          npr: {
            ...state.npr,
            itemList: action.payload,
          },
        },
      };
    case GET_NPR_SMD_MASTER_DATA:
      return {
        ...state,
        loading: false,
        master_data: {
          ...state.master_data,
          smd: action.payload,
        },
      };
    case RESET_ALL_SALES:
      return inititalState;
    default:
      return state;
  }
};
