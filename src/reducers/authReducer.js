import { AUTH_USER, USER_PROJECT, USER_MENU } from "../actions/types";
const initialState = {
  authdata: null,
  authenticated: null,
  project: null,
  menu: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, authdata: action.payload };
    case USER_PROJECT:
      return { ...state, authenticated: true, project: action.payload };
    case USER_MENU:
      return { ...state, authenticated: true, menu: action.payload };
    default:
      return state;
  }
};
