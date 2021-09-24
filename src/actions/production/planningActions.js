import axios from "axios";
import { header_config } from "../../include/js/main_config";

const apiAllPlanByMRPID = `/production/plan_job/all`;
const apigetAllPlanByJobOrderID = `/production/plan_job/job_order`;
const apiPlanJob = `/production/plan_job`;
const FILTER_PANNING_CALENDAR = "FILTER_PANNING_CALENDAR";
const CLEAR_FILTER_PANNING_CALENDAR = "CLEAR_FILTER_PANNING_CALENDAR";

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
            .put(`${apiPlanJob}/${obj.plan_job_id}`, [obj], header_config)
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

const getPlanJobById = (plan_job_id) => {
  try {
    if (!plan_job_id)
      return { success: false, data: [], message: "Missing ID." };
    return axios
      .get(`${apiPlanJob}/${plan_job_id}`, header_config)
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

const savePlanJobCalendar = (data) => {
  try {
    if (!data?.length) {
      return { success: false, data: [], message: "Missing data to update." };
    }
    return axios
      .put(`${apiPlanJob}`, data, header_config)
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

const filterPlanningCalendar = (filter) => (dispatch) =>
  dispatch({ type: FILTER_PANNING_CALENDAR, payload: filter });
const clearPlanningCalendar = () => (dispatch) =>
  dispatch({ type: CLEAR_FILTER_PANNING_CALENDAR });

export {
  getOtherPlanRef,
  savePlanJob,
  getPlanByJobOrderID,
  FILTER_PANNING_CALENDAR,
  CLEAR_FILTER_PANNING_CALENDAR,
  filterPlanningCalendar,
  clearPlanningCalendar,
  getPlanJobById,
  savePlanJobCalendar,
};
