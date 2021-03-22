/** @format */

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
} from "../actions/types";

const inititalState = {
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
  },
};

export default (state = inititalState, action) => {
  switch (action.type) {
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

    case RESET_ALL_SALES:
      return inititalState;
    default:
      return state;
  }
};
