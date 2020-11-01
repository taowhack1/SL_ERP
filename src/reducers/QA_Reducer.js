import {
  GET_QC_RECEIVE_DETAIL_LIST,
  GET_QC_RECEIVE_LIST,
} from "../actions/types";

const initialState = {
  qc_receive_list: [],
  qc_receive_detail_list: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QC_RECEIVE_LIST:
      return { ...state, qc_receive_list: action.payload };
    case GET_QC_RECEIVE_DETAIL_LIST:
      return { ...state, qc_receive_detail_list: action.payload };
    default:
      return state;
  }
};
