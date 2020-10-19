import {
  GET_RECEIVE_LIST,
  GET_PO_RECEIVE_LIST,
  GET_RECEIVE_HEAD,
  GET_RECEIVE_DETAIL,
  GET_RECEIVE_SUB_DETAIL,
} from "../types";
import axios from "axios";
import {
  api_get_receive_list,
  header_config,
} from "../../include/js/main_config";
export const get_receive_list = () => async (dispatch) => {
  axios.get(api_get_receive_list, header_config).then((res) => {
    dispatch({ type: GET_RECEIVE_LIST, payload: res.data[0] });
  });
};
export const get_po_receive_list = () => async (dispatch) => {
  console.log("get_po_receive_list");
};
export const get_receive_by_id = () => async (dispatch) => {
  console.log("get_receive_by_id");
};
export const receive_actions = () => async (dispatch) => {
  console.log("receive_actions");
};
