/** @format */

import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_qc_receive_list, api_qc_report_item } from "../../include/js/api";
import { GET_QC_REPORT_ITEM } from "../types";

export const get_qc_receive_list = async () => {
  const get_qc_item = await axios
    .get(api_qc_receive_list, header_config)
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
  return await Promise.allSettled([get_qc_item]).catch((error) =>
    console.log(error)
  );
};
export const update_qc_receive_list = (data) => {
  console.log("UPDATE_QC");
  return axios.post(api_qc_receive_list, data, header_config);
};

// export const get_report_item = () => (dispatch) => {
//   try {
//     const get_head = axios.get(api_qc_report_item, header_config);
//     Promise.allSettled([get_head]).then(async (data) => {
//       const reportData = {
//         data_head: data[0].value.data[0],
//         dataDetail: data[0].value.data[0].stock_detail,
//       };
//       await dispatch({
//         type: GET_QC_REPORT_ITEM,
//         payload: reportData,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     message.error({
//       content: "Somethings went wrong. \n" + error,
//       key: "validate",
//       duration: 2,
//     });
//   }
// };
export const get_report_item = () => (dispatch) => {
  axios.get(api_qc_report_item, header_config).then((res) => {
    console.log(res);
    dispatch({ type: GET_QC_REPORT_ITEM, payload: res.data[0] });
  });
};
