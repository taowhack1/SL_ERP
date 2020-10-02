import {
  GET_ALL_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  INACTIVE_CUSTOMER,
} from "../actions/types";

const initialState = {
  customers: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMER:
      return { ...state, customers: action.payload };
    default:
      return state;
  }
};
