import { message } from "antd";
import axios from "axios";
import { header_config } from "../include/js/main_config";

const api_approve = `/approve/process`;

const approveFunction = async ({
  status = null,
  process_id = null,
  user_name = null,
  remark = null,
  line = null,
}) => {
  // require status
  // 2 = Confirm , 3 = Cancel , 4 = Complete , 5 = Approve , 6 = Reject
  if (!status || !process_id || !user_name)
    return { success: false, message: "Error missing require fields." };
  try {
    const app_detail = {
      process_status_id: status,
      user_name,
      process_id,
      commit: 1,
      process_member_remark: remark,
    };
    // ส่งแจ้งเตือน LINE (เฉพาะเอกสารที่ส่ง config line เข้ามา เช่น PO)
    // ใช้เงื่อนไขเดียวกับ Sales Order: status 2/3/5 ส่งปกติ, reject (6) เฉพาะ node_stay ที่กำหนด
    if (line && line.url) {
      const sendNormal = status >= 2 && status != 6 && status != 7;
      const sendReject = status == 6 && line.node_stay == 3;
      if (sendNormal || sendReject) {
        const linePayload = {
          [line.docIdKey]: line.docId,
          ...app_detail,
          node_stay: line.node_stay,
        };
        if (sendReject) linePayload.reject = true;
        axios
          .post(`${line.url}`, linePayload, header_config)
          .then((res) => console.log("sending Line approve:>> ", res))
          .catch((err) => console.log("sending Line approve error:>> ", err));
      }
    }
    return await axios
      .put(`${api_approve}/${process_id}`, app_detail, header_config)
      .then((res) => {
        switch (status) {
          //   case 2:
          //     message.success("Confirm Success.");
          //     break;
          //   case 3:
          //     message.success("Cancel Success.");
          //     break;
          //   case 5:
          //     message.success("Confirm Success.");
          //     break;
          case 6:
            message.success("Rejected.");
            break;

          default:
            break;
        }
        return { success: true, data: res.data, message: "Success" };
      });
  } catch (error) {
    if (error?.response)
      return { success: false, message: `Error ${error?.response}` };
    console.log("error", error);
  }
};

const getDataFunction = (url = null, params = "") => {
  try {
    if (!url) return { success: false, data: [], message: "Missing Url" };
    console.info(
      "getDataFunction : ",
      `${process.env.REACT_APP_API_SERVER}${url}${params}`
    );
    return axios
      .get(`${url}${params}`, header_config)
      .then((resp) => {
        if (resp.status === 200) {
          console.log("resp.data", resp.data);
          return { success: true, data: resp.data, message: "Success" };
        } else {
          return { success: false, data: [], message: resp };
        }
      })
      .catch((error) => {
        console.error(error);
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

export { approveFunction, getDataFunction };
