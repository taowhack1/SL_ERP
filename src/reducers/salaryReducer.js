import { ADD_SALARY, DEL_SALARY } from "../actions/types";
const initialState = { salary: 15000 };
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SALARY:
      return { ...state, salary: action.payload };
    case DEL_SALARY:
      return { ...state, salary: action.payload };
    default:
      return state;
  }
};
