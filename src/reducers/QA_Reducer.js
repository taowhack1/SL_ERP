import {
  GET_QC_RECEIVE_DETAIL_LIST,
  GET_QC_RECEIVE_LIST,
  GET_QA_MASTER_DATA,
  GET_QA_TEST_BY_ID,
  GET_ALL_TEST_CASE,
} from "../actions/types";

const initialState = {
  qc_receive_list: [],
  qc_receive_detail_list: [],
  qa_master_data: {
    test_case_subject: [],
    test_case_specification: [],
    test_case_method: [],
  },
  qaTestCase: {
    list: [],
    type: {},
    subject: [],
    specification: [],
    method: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QC_RECEIVE_LIST:
      return { ...state, qc_receive_list: action.payload };
    case GET_QC_RECEIVE_DETAIL_LIST:
      return { ...state, qc_receive_detail_list: action.payload };
    case GET_QA_MASTER_DATA:
      return { ...state, qa_master_data: action.payload };
    case GET_QA_TEST_BY_ID:
      return { ...state, qa_test: action.payload };
    case GET_ALL_TEST_CASE:
      return {
        ...state,
        qaTestCase: { ...state.qaTestCase, list: action.payload },
      };
    default:
      return state;
  }
};
