import { message } from "antd";
import axios from "axios";
import { api_get_configuration_type } from "../../../../include/js/api";
import { header_config } from "../../../../include/js/main_config";
import {
  GET_ITEM_TYPE,
  GET_ITEM_TYPE_BY_ID,
  GET_ITEM_TYPE_IN_ROW,
} from "../../../types";

export const getConfigurationItemType = () => (dispatch) => {
  axios.get(api_get_configuration_type, header_config).then((res) => {
    dispatch({ type: GET_ITEM_TYPE, payload: res.data[0] });
  });
};
export const getConfigurationItemTypeById = (type_id, redirect) => (
  dispatch
) => {
  axios
    .get(`${api_get_configuration_type}/${type_id}`, header_config)
    .then((res) => {
      dispatch({
        type: GET_ITEM_TYPE_BY_ID,
        payload: res.data[0][0],
      });
      redirect(type_id);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getConfigurationItemTypeInRow = (record) => (dispatch) => {
  dispatch({
    type: GET_ITEM_TYPE_IN_ROW,
    payload: record,
  });
};

export const createConfigurationItemType = (data_typeCreate, redirect) => (
  dispatch
) => {
  console.log("actionSave", data_typeCreate);
  const dataCreate = [data_typeCreate];
  try {
    axios
      .post(`${api_get_configuration_type}`, dataCreate, header_config)
      .then((res) => {
        console.log("actionres", res);
        const type_id = res.data[0][0].type_id;
        dispatch(getConfigurationItemTypeById(type_id, redirect));
        message.success({
          content: "Type Created",
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

export const upDateConfigurationItemType = (
  type_id,
  data_typeCreate,
  redirect
) => (dispatch) => {
  const dataUpDate = [data_typeCreate];
  try {
    axios
      .put(`${api_get_configuration_type}`, dataUpDate, header_config)
      .then((res) => {
        console.log(res.data);
        const type_id = res.data[0][0].type_id;
        dispatch(getConfigurationItemTypeById(type_id, redirect));
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
