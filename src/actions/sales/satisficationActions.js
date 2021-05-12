import { message } from "antd";
import axios from "axios";
import { errorText, header_config } from "../../include/js/main_config";

const apiSatisfication = `/sales/npr_satisfaction_spec`;

const getSatisfication = (id = "") => {
  try {
    return axios
      .get(`${apiSatisfication}/${id}`, header_config)
      .then((res) => {
        // Do Res.
        if (res.status === 200) return { success: true, data: res.data };
        return { success: true, data: [] };
      })
      .catch((error) => {
        if (!error.response) {
          message.error(errorText.network);
        } else {
          console.log(error.response);
          message.error(errorText.getData);
        }
        // Do Error.
        return { success: false, data: [] };
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: [] };
  }
};

export { getSatisfication };
