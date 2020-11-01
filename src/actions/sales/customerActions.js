import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_customer } from "../api";
import { GET_ALL_CUSTOMER, GET_CUSTOMER_BY_ID } from "../types";

export const get_customer_list = () => (dispatch) => {
  axios.get(api_customer, header_config).then((res) => {
    console.log("get_customer_list");
    dispatch({ type: GET_ALL_CUSTOMER, payload: res.data[0] });
  });
};

export const get_customer_by_id = (customer_id) => (dispatch) => {
  axios.get(`${api_customer}/${customer_id}`, header_config).then((res) => {
    console.log("get_customer", res);
    dispatch({ type: GET_CUSTOMER_BY_ID, payload: res.data[0][0] });
  });
};

export const create_customer = (data_head) => (dispatch) => {
  console.log("customer_create");
  axios
    .post(`${api_customer}`, data_head, header_config)
    .then((res) => {
      console.log(res);
      dispatch(get_customer_by_id(res.data[0][0].customer_id));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const update_customer = (customer_id, data_head) => (dispatch) => {
  console.log("customer_update", data_head);
  axios
    .put(`${api_customer}/${customer_id}`, data_head, header_config)
    .then((res) => {
      console.log(res);
      dispatch(get_customer_by_id(res.data[0][0].customer_id));
    })
    .catch((err) => {
      console.log(err);
    });
};
