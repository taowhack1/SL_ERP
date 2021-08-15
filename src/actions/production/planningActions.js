import { GET_PLANNING_CALENDAR_DATA } from "../types";
import axios from "axios";
import { api_routing_calendar } from "../../include/js/api";
import { message } from "antd";
import { rawData } from "../../modules/production/Operation/planning/data";
import { header_config } from "../../include/js/main_config";

const apiPlanCalendar = `/production/plan_job/calendar`;
const apiAllPlanByMRPID = `/production/plan_job/all`;
const apigetAllPlanByJobOrderID = `/production/plan_job/job_order`;
const apiSavePlanJob = `/production/plan_job`;
const getPlanningCalendarData = () => (dispatch) => {
  axios
    .get(`${api_routing_calendar}/0`)
    .then(async (res) => {
      axios.get(`${apiPlanCalendar}/0`).then((res2) => {
        dispatch({
          type: GET_PLANNING_CALENDAR_DATA,
          payload: { costCenter: res.data, plan: res2.data },
        });
      });
    })
    .catch((error) => message.error(error));
};

const getOtherPlanRef = (mrp_id) => {
  try {
    if (!mrp_id) return { success: false, data: {}, message: "Missing mrp_id" };
    return axios
      .get(`${apiAllPlanByMRPID}/${mrp_id}`, header_config)
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
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: {}, message: error };
  }
};

const savePlanJob = (data) => {
  try {
    return Promise.allSettled(
      data.map(
        (obj) =>
          obj.plan_job_id &&
          axios
            .put(`${apiSavePlanJob}/${obj.plan_job_id}`, [obj], header_config)
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
              return { success: false, data: [], message: error };
            })
      )
    )
      .then((resp) => {
        return { success: true };
      })
      .catch((error) => {
        console.log("error", error);
        return { success: false };
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: {}, message: error };
  }
};

const getPlanByJobOrderID = (id) => {
  try {
    if (!id) return { success: false, data: [], message: "Missing ID." };
    return axios
      .get(`${apigetAllPlanByJobOrderID}/${id}`, header_config)
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

export {
  getPlanningCalendarData,
  getOtherPlanRef,
  savePlanJob,
  getPlanByJobOrderID,
};
