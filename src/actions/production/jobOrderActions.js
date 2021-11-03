/** @format */

import { message } from "antd";
import axios from "axios";
import { header_config } from "../../include/js/main_config";

const apiJobOrder = `/production/job_order`;
const SEARCH_JOB_ORDER = "SEARCH_JOB_ORDER";
const getJobOrderData = (job_order_id = null) => {
  try {
    return job_order_id
      ? axios
          .get(`${apiJobOrder}/${job_order_id}`, header_config)
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
          .get(`${apiJobOrder}/0`, header_config)
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

const saveJobOrder = (data) => {
  try {
    if (!data) return { success: false, data: [], message: "Missing data" };
    return axios
      .post(`${apiJobOrder}`, data, header_config)
      .then(async (resp) => {
        if (resp.status === 200) {
          console.log("resp.data", resp.data);
          // Save Plan
          message.success("Save Job Order Success.");
          console.log("Save Job Order Success.");
          if (data[0]?.plan_job?.length) {
            const { job_order_id, job_order_no } = resp?.data[0];
            const savePlanJob = data[0]?.plan_job?.map((obj) => ({
              ...obj,
              job_order_id,
              plan_job_description: `PLAN FROM ${job_order_no}`,
            }));
            console.log("saveData PlanJob", savePlanJob);
            const respPlan = await saveJobOrderPlan(savePlanJob);
            if (respPlan.success) {
              console.log("respPlan", respPlan);
              message.success("Save Plan Success.");
              return { success: true, data: resp.data, message: "Success" };
            } else {
              console.log("save job order plan fail.", respPlan);
              return { success: false, data: [], message: resp };
            }
          } else {
            return { success: true, data: resp.data, message: "Success" };
          }
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
const saveJobOrderPlan = (data) => {
  const apiJobOrderPlan = `/production/job_order/plan_job`;
  try {
    if (!data) return { success: false, data: [], message: "Missing data" };
    return axios
      .post(`${apiJobOrderPlan}`, data, header_config)
      .then((resp) => {
        console.log("saveJobOrderPlan", resp);
        if (resp.status === 200) {
          console.log("saveJobOrderPlan resp.data", resp.data);
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

const jobOrderUpdateStatus = (data) => {
  try {
    if (!data) return { success: false, data: [], message: "Missing Data." };
    return axios
      .put(`${apiJobOrder}/status`, data, header_config)
      .then((resp) => {
        if (resp.status === 200) {
          console.log("resp.data", resp.data);
          return { success: true, data: resp.data, message: "Success" };
        } else {
          console.log("error", resp);
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

export {
  SEARCH_JOB_ORDER,
  getJobOrderData,
  saveJobOrder,
  searchJobOrder,
  jobOrderUpdateStatus,
};
