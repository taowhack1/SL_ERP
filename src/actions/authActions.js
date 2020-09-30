import axios from "axios";
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  USER_PROJECT,
  USER_MENU,
} from "../actions/types";
// const url = "http://192.168.5.230:8080/upload";
const url = "";
export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("authData");
    localStorage.removeItem("user_id");
    dispatch({ type: UNAUTH_USER });
  };
};

export const signIn = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(`${url}/login`, user, config);
    if (response.data.user_login) {
      if (response.data.user_login_active === false) {
        console.log("คุณถูกระงับการใช้งานชั่วคราว โปรดติดต่อผู้ดูแลระบบ");
      } else {
        localStorage.setItem(
          "authData",
          JSON.stringify(response.data.user_data)
        );
        localStorage.setItem("user_id", response.data.user_data.user_id);
        dispatch({
          type: AUTH_USER,
          payload: response.data.user_data,
        });
      }
    } else {
      console.log("ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง!");
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
    console.log(err);
  }
};

export const signIn2 = (user) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return function (dispatch) {
    return axios
      .post(`${url}/authorize/project`, user, config)
      .then((res) => {
        localStorage.setItem("projects", JSON.stringify(res.data[0]));
        dispatch({
          type: USER_PROJECT,
          payload: res.data[0],
        });
      })
      .then(() => {
        axios.post(`${url}/authorize/menu`, user, config).then(async (res) => {
          localStorage.setItem("menus", JSON.stringify(res.data[0]));

          dispatch({
            type: USER_MENU,
            payload: res.data[0],
          });
        });
      });
  };
};
