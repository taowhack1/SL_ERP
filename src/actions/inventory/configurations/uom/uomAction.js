import { message } from "antd";
import axios from "axios";
import {
  api_get_configuration_uom,
  api_get_item_uom,
} from "../../../../include/js/api";
import { header_config } from "../../../../include/js/main_config";
import { GET_UOM, GET_UOM_IN_ROW, GET_UOM_BY_ID } from "../../../types";

export const getConfigurationUoM = () => (dispatch) => {
  axios.get(api_get_configuration_uom, header_config).then((res) => {
    dispatch({ type: GET_UOM, payload: res.data[0] });
  });
};

export const getConfigurationUoMById = (uom_id, redirect) => (dispatch) => {
  axios
    .get(`${api_get_configuration_uom}/${uom_id}`, header_config)
    .then((res) => {
      dispatch({
        type: GET_UOM_BY_ID,
        payload: res.data[0][0],
      });
      redirect(uom_id);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getUoMInRow = (record) => (dispatch) => {
  dispatch({
    type: GET_UOM_IN_ROW,
    payload: record,
  });
};

export const createConfigurationUoM = (dataUoMCreate, redirect) => (
  dispatch
) => {
  console.log("actionSave", dataUoMCreate);
  const dataCreate = [dataUoMCreate];
  try {
    axios
      .post(`${api_get_configuration_uom}`, dataCreate, header_config)
      .then((res) => {
        console.log("actionres", res);
        const uom_id = res.data[0][0].uom_id;
        dispatch(getConfigurationUoMById(uom_id, redirect));
        message.success({
          content: "category Created",
          key: "validate",
          duration: 2,
        });
      })
      .catch((error) => {
        message.error({
          content: "Somethings went wrong.\n" + error,
          key: "validate",
          duration: 2,
        });
      });
  } catch (error) {
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};

export const upDateConfigurationUoM = (uom_id, dataUoMCreate, redirect) => (
  dispatch
) => {
  const dataUpDate = [dataUoMCreate];
  try {
    axios
      .put(`${api_get_configuration_uom}`, dataUpDate, header_config)
      .then((res) => {
        console.log(res.data);
        const uom_id = res.data[0][0].uom_id;
        dispatch(getConfigurationUoMById(uom_id, redirect));
        message.success({
          content: "Vendor Updated.",
          key: "validate",
          duration: 2,
        });
        // redirect(type_id);
      })
      .catch((error) => {
        console.log(error);
        message.error({
          content: "Somethings went wrong.\n" + error,
          key: "validate",
          duration: 2,
        });
      });
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};
