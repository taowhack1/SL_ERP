import axios from "axios";
import { header_config } from "../../include/js/main_config";
import {
  api_qc_receive_detail_list,
  api_qc_receive_list,
} from "../../include/js/api";
import { GET_QC_RECEIVE_LIST, GET_QC_RECEIVE_DETAIL_LIST } from "../types";
import { message } from "antd";

export const get_qc_receive_list = async () => {
  const get_qc_item = await axios
    .get(api_qc_receive_list, header_config)
    .then((res) => {
      console.log(res.data);
      return res.data;
      // dispatch({
      //   type: GET_QC_RECEIVE_LIST,
      //   payload: res.data,
      // });
    });
  const get_qc_item_detail = await axios
    .get(api_qc_receive_detail_list, header_config)
    .then((res) => {
      return res.data[0];
      // dispatch({
      //   type: GET_QC_RECEIVE_DETAIL_LIST,
      //   payload: res.data[0],
      // });
    });
  return await Promise.allSettled([
    get_qc_item,
    get_qc_item_detail,
  ]).catch((error) => console.log(error));
};
export const update_qc_receive_list = (data) => {
  return axios.post(api_qc_receive_list, data, header_config);
};
