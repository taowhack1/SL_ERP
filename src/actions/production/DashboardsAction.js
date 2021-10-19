/** @format */

import axios from "axios";
import { header_config } from "../../include/js/main_config";
import moment from "moment";
const apiGraph = `/graph/machine`;
// url/api/graph/machine/25-08-2021&28-08-2021&0
// 25-08-2021 วันที่เริ่ม
// 28-08-2021 วันสุดท้าย
// 0 ถ้าเลือกเป็น ปี ตรงนี้ใส่ปี ถ้าเลือกเป็นวันใส่ 0
const getGraph360Day = (date, change) => {
  let Date = 0;
  let new_date_start = 0;
  let new_date_end = 0;
  console.log("date getGraph360Day:>> ", date);
  //console.log('${moment(date).format("YYYY")} :>> ', ${moment(date).format("YYYY")});
  if (change) {
    //change = เปลี่ยนปีที่ต้องการดูแผน
    Date = moment().format("DD-MM-YYYY");
    new_date_start = moment(Date, "DD-MM-YYYY")
      .add(-3, "days")
      .format("DD-MM-YYYY");
    new_date_end = `31-12-${moment(date).format("YYYY")}`;
    console.log("newDate :>> ", Date);
    console.log("new_date_start if:>> ", new_date_start);
    console.log("new_date_end if:>> ", new_date_end);
  } else {
    //change = ค่าเริ่มต้น
    new_date_start = `01-01-${moment(date).format("YYYY")}`;
    new_date_end = `31-12-${moment(date).format("YYYY")}`;
    console.log("new_date_start :>> ", new_date_start);
    console.log("new_date_end :>> ", new_date_end);
  }

  try {
    return axios
      .get(`${apiGraph}/${new_date_start}&${new_date_end}&0`, header_config)
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
