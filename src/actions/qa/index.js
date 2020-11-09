import axios from "axios";
import { header_config } from "../../include/js/main_config";
import {
  api_qc_receive_detail_list,
  api_qc_receive_list,
} from "../../include/js/api";
import { GET_QC_RECEIVE_LIST, GET_QC_RECEIVE_DETAIL_LIST } from "../types";
import { message } from "antd";

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
export const update_qc_receive_list = (data, loading) => (dispatch) => {
  axios.post(api_qc_receive_list, data, header_config).then((res) => {
    console.log(res.data);
    dispatch(get_qc_receive_list());
    setTimeout(() => {
      loading(false);
      message.success({
        content: "QC Receive Updated.",
        key: "validate",
        duration: 2,
      });
    }, 1000);
  });
};
