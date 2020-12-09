import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_vendor } from "../../include/js/api";
import { GET_ALL_VENDOR, GET_VENDOR_BY_ID } from "../types";
import { message } from "antd";

export const get_all_vendor = () => (dispatch) => {
  axios.get(api_vendor, header_config).then((res) => {
    dispatch({
      type: GET_ALL_VENDOR,
      payload: res.data[0],
    });
  });
};

export const get_vendor_by_id = (vendor_id, redirect) => (dispatch) => {
  axios
    .get(`${api_vendor}/${vendor_id}`, header_config)
    .then((res) => {
      dispatch({
        type: GET_VENDOR_BY_ID,
        payload: res.data[0][0],
      });
      redirect(vendor_id);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const create_vendor = (data_head, redirect) => (dispatch) => {
  console.log("vendor_create");
  try {
    axios
      .post(`${api_vendor}`, data_head, header_config)
      .then((res) => {
        const vendor_id = res.data[0][0].vendor_id;
        dispatch(get_vendor_by_id(vendor_id, redirect));
        message.success({
          content: "Vendor Created.",
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

export const update_vendor = (vendor_id, data_head, redirect) => (dispatch) => {
  try {
    axios
      .put(`${api_vendor}/${vendor_id}`, data_head, header_config)
      .then((res) => {
        const vendor_id = res.data[0][0].vendor_id;
        dispatch(get_vendor_by_id(vendor_id, redirect));
        message.success({
          content: "Vendor Updated.",
          key: "validate",
          duration: 2,
        });
        // redirect(vendor_id);
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
