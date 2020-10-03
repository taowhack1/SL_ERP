import { GET_ALL_PO, CREATE_PO, UPDATE_PO, UPDATE_PO_STATUS } from "../types";
import { api_url } from "../../include/js/main_config";
import axios from "axios";

const api_path = api_url + "/query/sql";
const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const get_po_list = () => (dispatch) => {
  axios.get(api_query, header_config).then((res) => {
    dispatch({
      type: GET_ALL_PO,
      payload: res.data[0],
    });
  });
};
export const create_po = (data) => (dispatch) => {
  axios.post(api_query, data, header_config).then((res) => {
    dispatch({
      type: CREATE_PO,
      payload: res.data[0],
    });
    // do respone here
  });
};
export const update_po = (data) => (dispatch) => {
  axios.put(api_query, data, header_config).then((res) => {
    dispatch({
      type: UPDATE_PO,
      payload: res.data[0],
    });
    // do respone here
  });
};
export const update_po_status = (data) => (dispatch) => {
  axios.put(api_query, data, header_config).then((res) => {
    dispatch({
      type: UPDATE_PO_STATUS,
      payload: res.data[0],
    });
    // do respone here
  });
};
