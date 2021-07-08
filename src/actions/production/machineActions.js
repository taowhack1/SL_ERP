import { message } from "antd";
import axios from "axios";
import { api_machine } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { GET_ALL_MACHINE, GET_MACHINE_BY_ID, SET_LOADING } from "../types";

export const getAllMachine = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  axios
    .get(api_machine, header_config)
    .then((res) =>
      dispatch({
        type: GET_ALL_MACHINE,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.log(error.response);
      dispatch({ type: SET_LOADING, payload: false });
    });
};

export const createMachine = (data, redirect) => (dispatch) => {
  console.log("createMachine", data);

  axios
    .post(api_machine, data, header_config)
    .then((res) => {
      const machine_id = res.data[0][0].machine_id;
      message.success({
        content: "Machine Created.",
        key: "success",
        duration: 2,
      });
      machine_id && dispatch(getMachineByID(machine_id, redirect));
    })
    .catch((error) => {
      message.error({
        content: "Somethings went wrong. \n" + error,
        key: "error",
        duration: 2,
      });
      dispatch({ type: SET_LOADING, payload: false });
    });
};

export const updateMachine = (machine_id, data, redirect) => (dispatch) => {
  console.log("updateMachine", data);
  axios
    .put(`${api_machine}/${machine_id}`, data, header_config)
    .then((res) => {
      message.success({
        content: "Machine Updated.",
        key: "success",
        duration: 2,
      });
      machine_id && dispatch(getMachineByID(machine_id, redirect));
    })
    .catch((error) => {
      message.error({
        content: "Somethings went wrong. \n" + error,
        key: "error",
        duration: 2,
      });
    });
};

export const getMachineByID = (machine_id, redirect) => (dispatch) => {
  try {
    console.log(`${api_machine}/${machine_id}`);
    axios
      .get(`${api_machine}/${machine_id}`, header_config)
      .then(async (res) => {
        console.log(res.data);
        await dispatch({
          type: GET_MACHINE_BY_ID,
          payload: { data_head: res.data[0], data_detail: [] },
        });
        redirect(machine_id);
      })
      .catch((error) => {
        message.error({
          content: "Somethings went wrong. \n" + error,
          key: "error",
          duration: 2,
        });
      });
  } catch (error) {
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "error",
      duration: 2,
    });
  }
};
