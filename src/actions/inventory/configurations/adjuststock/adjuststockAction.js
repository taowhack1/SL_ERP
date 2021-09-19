/** @format */

import axios from "axios";
import { header_config } from "../../include/js/main_config";
const apiAdjustStock = "/inventory/stock/";

const saveAdjustStock = (data) => {
  try {
    return axios
      .post(`${apiAdjustStock}`, data)
      .then((response) => {
        if (response.status === 200) {
          console.log("response.data :>> ", response.data);
          return { success: true, data: response.data, message: "Success" };
        } else {
          return { success: false, data: {}, message: response };
        }
      })
      .catch((err) => {});
  } catch {}
};
