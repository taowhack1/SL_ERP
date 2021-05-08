import {
  GET_SELECT_DEP,
  GET_COST_CENTER_LIST,
  GET_COUNTRY,
  SET_LOADING,
  GET_PRODUCTION_EMP,
  GET_RD_EMP,
} from "../actions/types";
const initialState = {
  loading: false,
  department: null,
  cost_center: [],
  country: [],
  employee: {
    production: [],
    rd: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case GET_SELECT_DEP:
      return { ...state, department: action.payload };
    case GET_COST_CENTER_LIST:
      return { ...state, cost_center: action.payload };
    case GET_COUNTRY:
      return { ...state, country: action.payload };
    case GET_PRODUCTION_EMP:
      return {
        ...state,
        loading: false,
        employee: {
          ...state.employee,
          production: action.payload,
        },
      };
    case GET_RD_EMP:
      return {
        ...state,
        loading: false,
        employee: {
          ...state.employee,
          rd: action.payload,
        },
      };
    default:
      return state;
  }
};
