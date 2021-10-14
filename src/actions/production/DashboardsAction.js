/** @format */

import axios from "axios";
import { header_config } from "../../include/js/main_config";
import moment from "moment";
const apiGraph = `/graph/machine`;
// url/api/graph/machine/25-08-2021&28-08-2021&0
// 25-08-2021 วันที่เริ่ม
// 28-08-2021 วันสุดท้าย
// 0 ถ้าเลือกเป็น ปี ตรงนี้ใส่ปี ถ้าเลือกเป็นวันใส่ 0
const getGraph360Day = (date) => {
  console.log("date getGraph360Day:>> ", date);

  try {
    return axios
      .get(`${apiGraph}/0&0&${moment(date).format("YYYY")}`, header_config)
      .then((response) => {
        if (response.status === 200) {
          console.log("response :>> ", response);
          return { success: true, data: response.data, message: "Success" };
        } else {
          return { success: false, data: [], message: response };
        }
      })
      .catch((error) => {
        console.log("error :>> ", error);
        if (error?.response) {
          console.error(error.response);
        }
        return { success: false, data: [], message: error };
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: [], message: error };
  }
};
export { getGraph360Day };
