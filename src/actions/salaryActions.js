import { ADD_SALARY, DEL_SALARY } from "./types";

// const url = "http://192.168.5.230:8080/upload";
// const url = "";
export const addSalary = (salary) => (dispatch) => {
  try {
    dispatch({
      type: ADD_SALARY,
      payload: salary + 1000,
    });
  } catch (err) {
    console.log(err);
  }
};
export const delSalary = (salary) => (dispatch) => {
  try {
    dispatch({
      type: DEL_SALARY,
      payload: salary - 1000,
    });
  } catch (err) {
    console.log(err);
  }
};
