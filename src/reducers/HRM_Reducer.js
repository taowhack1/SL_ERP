import { GET_SELECT_DEP, GET_COST_CENTER_LIST } from "../actions/types";
const initialState = {
  department: null,
  cost_center: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECT_DEP:
      return { ...state, department: action.payload };
    case GET_COST_CENTER_LIST:
      return { ...state, cost_center: action.payload };
    default:
      return state;
  }
};
