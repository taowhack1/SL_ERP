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
} from "../actions/types";
const initialState = {
  pr_list: [],
  pr_detail: [],
  po_list: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PR:
    case CREATE_PR:
      return { ...state, pr_list: action.payload };
    case GET_ALL_PO:
    case CREATE_PO:
      return { ...state, po_list: action.payload };
    case GET_PR_DETAIL:
      return { ...state, pr_detail: action.payload };
    //   case CREATE_ITEM:
    //     return {
    //       ...state,
    //       items: [action.payload, ...state["items"]],
    //     };
    //   case UPDATE_PR:
    //     return {
    //       ...state,
    //       pr: [action.payload, ...state["items"]],
    //     };
    default:
      return state;
  }
};
