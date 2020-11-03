import axios from "axios";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  USER_PROJECT,
  USER_MENU,
  CURRENT_PROJECT,
} from "../actions/types";
import {
  api_url,
  api_query,
  api_authen,
  api_change_password,
} from "../include/js/api";
import { header_config } from "../include/js/main_config";
import { getVat } from "./systemConfigActions";
const url = api_url;
// const url = "";
export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("state");
    console.log("signout");
    dispatch({ type: UNAUTH_USER });
  };
};
export const signIn2 = (user) => async (dispatch) => {
  let status = 0;
  const query = {
    query_sql: `SELECT
    A.user_name,
    emp.employee_id,
    emp.employee_no,
    emp.employee_firstname_eng + ' ' + emp.employee_lastname_eng AS employee_name,
    '[ ' + emp.employee_no + ' ] ' + emp.employee_firstname_eng + ' ' + emp.employee_lastname_eng AS create_by,
    emp.employee_nickname_eng as employee_nickname,
    dep.department_id,
  dep.department_no,
  '[ ' +dep.department_no+ ' ] ' + department_name as department_name
  FROM
    HRM.dbo.tb_user A
  LEFT JOIN HRM.dbo.tb_employee emp ON 	A.employee_id = emp.employee_id
  LEFT JOIN HRM.dbo.tb_department  dep ON emp.department_id = dep.department_no
  WHERE 1=1  AND ( user_name = '${user.user_name}' AND user_password = '${user.user_password}' ) AND user_actived = 1
  
  `,
  };
  try {
    const response = await axios.post(api_authen, user, header_config);
    if (response.data[0].length) {
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
