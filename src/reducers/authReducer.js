import {
  AUTH_USER,
  USER_PROJECT,
  USER_MENU,
  UNAUTH_USER,
  CURRENT_PROJECT,
  CURRENT_MENU,
} from "../actions/types";
export const initialStateAuth = {
  authData: {},
  authenticated: false,
  projects: [],
  menus: [],
  currentProject: null,
  currentMenu: {},
};
export default (state = initialStateAuth, action) => {
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
        authData: [],
        projects: [],
        menus: [],
      };
    case CURRENT_PROJECT:
      return { ...state, authenticated: true, currentProject: action.payload };
    case CURRENT_MENU:
      return { ...state, authenticated: true, currentMenu: action.payload };
    default:
      return state;
  }
};
