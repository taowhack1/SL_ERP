import { AUTH_USER } from "../actions/types";
const initialState = {
  authdata: null,
  authenticated: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, authdata: action.payload };
    default:
      return state;
  }
};
