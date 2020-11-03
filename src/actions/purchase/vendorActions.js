import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_vendor } from "../../include/js/api";
import { GET_ALL_VENDOR, GET_VENDOR_BY_ID } from "../types";

export const get_all_vendor = () => (dispatch) => {
  axios.get(api_vendor, header_config).then((res) => {
    console.log("get_all_vendor", res);
    dispatch({
      type: GET_ALL_VENDOR,
      payload: res.data[0],
    });
  });
};

export const get_vendor_by_id = (vendor_id) => (dispatch) => {
  axios
    .get(`${api_vendor}/${vendor_id}`, header_config)
    .then((res) => {
      dispatch({
        type: GET_VENDOR_BY_ID,
        payload: res.data[0][0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const create_vendor = (data_head) => (dispatch) => {
  console.log("vendor_create");
  axios
    .post(`${api_vendor}`, data_head, header_config)
    .then((res) => {
      console.log(res);
      dispatch(get_vendor_by_id(res.data[0][0].vendor_id));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const update_vendor = (vendor_id, data_head) => (dispatch) => {
  console.log("vendor_update", data_head);
  axios
    .put(`${api_vendor}/${vendor_id}`, data_head, header_config)
    .then((res) => {
      console.log(res);
      dispatch(get_vendor_by_id(res.data[0][0].vendor_id));
    })
    .catch((err) => {
      console.log(err);
    });
};
