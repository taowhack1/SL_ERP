/** @format */

import {
  GET_QC_RECEIVE_DETAIL_LIST,
  GET_QC_RECEIVE_LIST,
  GET_QA_MASTER_DATA,
  GET_QA_TEST_BY_ID,
  GET_ALL_CONDITIONS,
  SET_DEFUALT_CONDITIONS,
  SET_LOADING,
  GET_QC_REPORT_ITEM,
} from "../actions/types";

const initialState = {
  // qc_receive_list: [],
  // qc_receive_detail_list: [],
  qa_master_data: {
    conditions_subject: [],
    conditions_specification: [],
    conditions_method: [],
  },
  qc_report: {
    qc_report: [],
  },
  conditions: {
    list: [],
    type: {},
    subject: [],
    specification: [],
    method: [],
  },
  loading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    // case GET_QC_RECEIVE_LIST:
    //   return { ...state, qc_receive_list: action.payload, loading: false };
    // case GET_QC_RECEIVE_DETAIL_LIST:
    //   return {
    //     ...state,
    //     qc_receive_detail_list: action.payload,
    //     loading: false,
    //   };
    case GET_QC_REPORT_ITEM:
      return { ...state, qc_report: action.payload, loading: false };
    case GET_QA_MASTER_DATA:
      return { ...state, qa_master_data: action.payload, loading: false };
    case GET_QA_TEST_BY_ID:
      return { ...state, qa_test: action.payload, loading: false };
    case GET_ALL_CONDITIONS:
      return {
        ...state,
        conditions: { ...state.conditions, list: action.payload },
        loading: false,
      };
    case SET_DEFUALT_CONDITIONS:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          list: initialState.conditions.list,
        },
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
