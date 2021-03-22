/** @format */

import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_customer } from "../../include/js/api";
import { GET_ALL_CUSTOMER, GET_CUSTOMER_BY_ID } from "../types";
import { message } from "antd";

export const get_customer_list = () => (dispatch) => {
  axios.get(api_customer, header_config).then((res) => {
    console.log("get_customer_list");
    dispatch({ type: GET_ALL_CUSTOMER, payload: res.data[0] });
  });
};

export const get_customer_by_id = (customer_id, redirect) => (dispatch) => {
  try {
    const get_head = axios.get(`${api_customer}/${customer_id}`, header_config);
    Promise.allSettled([get_head]).then(async (data) => {
      const customerData = {
        data_head: data[0].value.data[0],
        dataDetail: data[0].value.data[0].customer_detail,
      };

      await dispatch({ type: GET_CUSTOMER_BY_ID, payload: customerData });
      redirect(customer_id);
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

export const create_customer = (data, redirect) => (dispatch) => {
  console.log("customer_create");
  try {
    axios
      .post(`${api_customer}`, data, header_config)
      .then((res) => {
        console.log(res);
        const customer_id = res.data[0].customer_id;
        dispatch(get_customer_by_id(customer_id, redirect));
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

export const update_customer = (customer_id, data, redirect) => (dispatch) => {
  console.log("customer_update_customer_id", customer_id);
  try {
    axios
      .put(`${api_customer}/${customer_id}`, data, header_config)
      .then((res) => {
        console.log(res);
        console.log("customer_update", res);
        const customer_id = res.data[0].customer_id;
        dispatch(get_customer_by_id(customer_id, redirect));
        message.success({
          content: "Customer Updated.",
          key: "validate",
          duration: 2,
        });
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
