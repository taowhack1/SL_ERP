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
    axios.get(`${api_customer}/${customer_id}`, header_config).then((res) => {
      console.log("get_customer", res);
      dispatch({ type: GET_CUSTOMER_BY_ID, payload: res.data[0][0] });
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

export const create_customer = (data_head, redirect) => (dispatch) => {
  console.log("customer_create");
  try {
    axios
      .post(`${api_customer}`, data_head, header_config)
      .then((res) => {
        console.log(res);
        const customer_id = res.data[0][0].customer_id;
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

export const update_customer = (customer_id, data_head, redirect) => (
  dispatch
) => {
  console.log("customer_update", data_head);
  try {
    axios
      .put(`${api_customer}/${customer_id}`, data_head, header_config)
      .then((res) => {
        console.log(res);
        const customer_id = res.data[0][0].customer_id;
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
