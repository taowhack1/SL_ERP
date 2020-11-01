import {
  AUTH_USER,
  USER_PROJECT,
  USER_MENU,
  UNAUTH_USER,
  CURRENT_PROJECT,
} from "../actions/types";
const initialState = {
  authData: [],
  authenticated: false,
  projects: [],
  menus: [],
  currentProject: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, authData: action.payload };
    case USER_PROJECT:
      return { ...state, authenticated: true, projects: action.payload };
    case USER_MENU:
      return { ...state, authenticated: true, menus: action.payload };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        authData: null,
        projects: null,
        menus: null,
      };
    case CURRENT_PROJECT:
      return { ...state, authenticated: true, currentProject: action.payload };
    default:
      return state;
  }
};
