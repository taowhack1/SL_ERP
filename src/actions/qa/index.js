import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_qc_receive_detail_list, api_qc_receive_list } from "../api";
import { GET_QC_RECEIVE_LIST, GET_QC_RECEIVE_DETAIL_LIST } from "../types";

export const get_qc_receive_list = () => (dispatch) => {
  axios.get(api_qc_receive_list, header_config).then((res) => {
    console.log(res.data);
    dispatch({
      type: GET_QC_RECEIVE_LIST,
      payload: res.data,
    });
    axios.get(api_qc_receive_detail_list, header_config).then((res) => {
      dispatch({
        type: GET_QC_RECEIVE_DETAIL_LIST,
        payload: res.data[0],
      });
    });
  });
};
export const update_qc_receive_list = (data) => (dispatch) => {
  axios.post(api_qc_receive_list, data, header_config).then((res) => {
    console.log(res.data);
    dispatch(get_qc_receive_list());
  });
};
