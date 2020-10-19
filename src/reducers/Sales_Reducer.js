import {
  SET_QN_LIST,
  SET_QN_DETAIL,
  SET_QN_HEAD,
  RESET_QN,
  GET_ALL_CUSTOMER,
  GET_SO_LIST,
  SET_SO_HEAD,
  SET_SO_DETAIL,
  GET_MASTER_DATA,
  RESET_ALL_SALES,
  RESET_SO,
  GET_QN_OPEN_SO,
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
  customers: [],
  master_data: {
    customers: [],
    payment_terms: [],
  },
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case SET_QN_LIST:
      return { ...state, qn: { ...state.qn, qn_list: action.payload } };
    case SET_QN_HEAD:
      return { ...state, qn: { ...state.qn, qn_head: action.payload } };
    case SET_QN_DETAIL:
      return { ...state, qn: { ...state.qn, qn_detail: action.payload } };
    case RESET_QN:
      return { ...state, qn: { ...inititalState.qn } };
    case RESET_SO:
      return { ...state, so: { ...inititalState.so } };
    case GET_ALL_CUSTOMER:
      return { ...state, customers: action.payload };

    case GET_SO_LIST:
      return { ...state, so: { ...state.so, so_list: action.payload } };
    case GET_QN_OPEN_SO:
      return { ...state, so: { ...state.so, qn_ref: action.payload } };
    case SET_SO_HEAD:
      return { ...state, so: { ...state.so, so_head: action.payload } };
    case SET_SO_DETAIL:
      return { ...state, so: { ...state.so, so_detail: action.payload } };
    case GET_MASTER_DATA:
      return { ...state, master_data: { ...action.payload } };

    case RESET_ALL_SALES:
      return inititalState;
    default:
      return state;
  }
};
