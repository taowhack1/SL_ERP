import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_qc_receive_list } from "../../include/js/api";
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
