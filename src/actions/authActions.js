import axios from "axios";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  USER_PROJECT,
  USER_MENU,
  CURRENT_PROJECT,
  CURRENT_MENU,
  USER_LOGOUT,
} from "../actions/types";
import {
  api_url,
  api_query,
  api_authen,
  api_change_password,
} from "../include/js/api";
import { header_config } from "../include/js/main_config";
import Authorize from "../modules/system/Authorize";
import { getVat } from "./systemConfigActions";
const url = api_url;
// const url = "";
export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("state");
    console.log("signout");
    dispatch({ type: USER_LOGOUT });
  };
};
export const signIn2 = (user) => async (dispatch) => {
  let status = 0;
  try {
    const response = await axios.post(api_authen, user, header_config);
    // console.log(response);
    if (response.data[0].user_name) {
      status = 1;
      dispatch({
        type: AUTH_USER,
        payload: response.data[0],
      });
      dispatch(getVat());
      axios
        .post(`${url}/authorize/project`, user, header_config)
        .then((res) => {
          // localStorage.setItem("projects", JSON.stringify(res.data[0]));
          dispatch({
            type: USER_PROJECT,
            payload: res.data[0],
          });
        })
        .then(() =>
          axios
            .post(`${url}/authorize/menu`, user, header_config)
            .then(async (res) => {
              // localStorage.setItem("menus", JSON.stringify(res.data[0]));

              dispatch({
                type: USER_MENU,
                payload: res.data[0],
              });
            })
        );
    } else {
      alert("Username or password incorrect !");
      status = 0;
    }
  } catch (error) {
    alert("Oops! Somethings went wrong..\n" + error);
    status = 0;
  }
};

export const change_working_project = (project) => (dispatch) => {
  try {
    dispatch({
      type: CURRENT_PROJECT,
      payload: project,
    });
  } catch (error) {
    console.log(error);
  }
};
export const set_working_menu = (menu_detail) => (dispatch) => {
  console.log("set_working_menu", menu_detail);
  try {
    dispatch({
      type: CURRENT_MENU,
      payload: menu_detail,
    });
  } catch (error) {
    console.log(error);
  }
};
export const change_password = (value, redirect_fn) => async (dispatch) => {
  console.log(value);
  let status = false;
  try {
    const res = await axios.put(api_change_password, value, header_config);
    console.log(res);
    if (res.data[0].length) {
      alert("Your password has been updated !");
      redirect_fn();
      // return true;
    } else {
      alert("Old password incorrect !");
      return false;
    }
  } catch (error) {
    alert("Somethings went wrong. Please contact programmer. !");
  }
  console.log("status", status);
  // return status;
};
