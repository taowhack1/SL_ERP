import { message } from "antd";
import axios from "axios";
import { api_get_configuration_category } from "../../../../include/js/api";

import { header_config } from "../../../../include/js/main_config";
import {
  GET_CATEGORY_IN_ROW,
  GET_ITEM_CATEGORY,
  GET_ITEM_CATEGORY_BY_ID,
} from "../../../types";

export const getConfigurationCategory = () => (dispatch) => {
  axios.get(api_get_configuration_category, header_config).then((res) => {
    dispatch({ type: GET_ITEM_CATEGORY, payload: res.data[0] });
  });
};

export const getCategoryInRow = (record) => (dispatch) => {
  dispatch({
    type: GET_CATEGORY_IN_ROW,
    payload: record,
  });
};

export const getConfigurationCategoryById = (category_id, redirect) => (
  dispatch
) => {
  axios
    .get(`${api_get_configuration_category}/${category_id}`, header_config)
    .then((res) => {
      dispatch({
        type: GET_ITEM_CATEGORY_BY_ID,
        payload: res.data[0][0],
      });
      redirect(category_id);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createConfigurationCategory = (dataCategoryCreate, redirect) => (
  dispatch
) => {
  console.log("actionSave", dataCategoryCreate);
  const dataCreate = [dataCategoryCreate];
  try {
    axios
      .post(`${api_get_configuration_category}`, dataCreate, header_config)
      .then((res) => {
        const category_id = res.data[0][0].category_id;
        dispatch(getConfigurationCategoryById(category_id, redirect));
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

export const upDateConfigurationCategory = (
  category_id,
  dataCategoryCreate,
  redirect
) => (dispatch) => {
  const dataUpDate = [dataCategoryCreate];
  try {
    axios
      .put(`${api_get_configuration_category}`, dataUpDate, header_config)
      .then((res) => {
        const category_id = res.data[0][0].category_id;
        dispatch(getConfigurationCategoryById(category_id, redirect));
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
