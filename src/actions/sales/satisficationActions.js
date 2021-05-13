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

const saveSatisfication = (id, postData, putData) => {
  try {
    return Promise.allSettled([
      postData.length &&
        axios
          .post(`${apiSatisfication}`, postData, header_config)
          .then((res) => {
            // Do Res.
            console.log("Save Post", res);
            // if (res.status === 200) return { success: true, data: res.data };
            return { success: true };
          }),
      putData.length &&
        axios
          .put(`${apiSatisfication}/${id}`, putData, header_config)
          .then((res) => {
            // Do Res.
            console.log("Save Put", res);
            // if (res.status === 200) return { success: true, data: res.data };
            return { success: true };
          }),
    ])
      .then((resp) => {
        console.log("Promise All then");
        return resp;
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

export { getSatisfication, saveSatisfication };
