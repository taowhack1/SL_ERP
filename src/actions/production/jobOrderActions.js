import axios from "axios";
import { header_config } from "../../include/js/main_config";

const getJobOrder = `/production/job_order`;
const SEARCH_JOB_ORDER = "SEARCH_JOB_ORDER";
const getJobOrderData = (job_order_id = null) => {
  try {
    return job_order_id
      ? axios
          .get(`${getJobOrder}/${job_order_id}`, header_config)
          .then((resp) => {
            if (resp.status === 200) {
              console.log("resp.data", resp.data);
              return { success: true, data: resp.data, message: "Success" };
            } else {
              return { success: false, data: {}, message: resp };
            }
          })
          .catch((error) => {
            console.error(error);
            if (error?.response) {
              console.error(error.response);
            }
            return { success: false, data: {}, message: error };
          })
      : axios
          .get(`${getJobOrder}/0`, header_config)
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

const searchJobOrder = (data) => (dispatch) => {
  dispatch({ type: SEARCH_JOB_ORDER, payload: data });
};

export { getJobOrderData, searchJobOrder };
