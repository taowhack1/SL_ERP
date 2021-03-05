import {
  GET_SELECT_DEP,
  GET_COST_CENTER_LIST,
  GET_COUNTRY,
} from "../actions/types";
const initialState = {
  department: null,
  cost_center: [],
  country: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECT_DEP:
      return { ...state, department: action.payload };
    case GET_COST_CENTER_LIST:
      return { ...state, cost_center: action.payload };
    case GET_COUNTRY:
      return { ...state, country: action.payload };
    default:
      return state;
  }
};
