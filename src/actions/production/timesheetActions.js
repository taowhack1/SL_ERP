import { message } from "antd";
import axios from "axios";
import { sortData } from "../../include/js/function_main";
import { header_config } from "../../include/js/main_config";
import { SET_LOADING } from "../types";

// const apiGetTimesheetMachine = `/production/machine`;
// const apiGetPlanByMachineId = `/production/time_sheet/machine_process_scan`;
const apiGetMachinePlan = `/production/machine/plan_job`;
const apiGetTimesheetScanRMList = `/production/time_sheet/machine_process_scan`;
const apiGetScanBarcodeDetail = `/production/time_sheet/machine_process_scan/barcode`;
const apiTimesheet = `/production/time_sheet`;
const apiTimesheetLog = `/production/time_sheet_log`;

// const GET_TIMESHEET_MACHINE = "GET_TIMESHEET_MACHINE";
const RESET_TIMESHEET = "RESET_TIMESHEET";
const GET_MACHINE_PLAN = "GET_MACHINE_PLAN";
const GET_TIMESHEET_SCAN_RM_LIST = "GET_TIMESHEET_SCAN_RM_LIST";
const START_TIMESHEET = "START_TIMESHEET";
const UPDATE_TIMESHEET = "UPDATE_TIMESHEET";
const CLOSE_TIMESHEET = "CLOSE_TIMESHEET";

const getMachinePlan = (machine_id) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  if (!machine_id) dispatch({ type: GET_MACHINE_PLAN, payload: {} });
  try {
    axios
      .get(`${apiGetMachinePlan}/${machine_id}`, header_config)
      .then((res) => {
        dispatch({ type: GET_MACHINE_PLAN, payload: res.data });
      })
      .catch((error) => {
        console.error(error.response);
        message.error("Error !! Can't get any data from the server.");
        dispatch({ type: GET_MACHINE_PLAN, payload: {} });
      });
  } catch (error) {
    console.error(error);
    message.error("Error !! Can't get any data from the server.");
    dispatch({ type: GET_MACHINE_PLAN, payload: {} });
  }
};

const getTimesheetScanRMList = (plan_job_id) => {
  if (!plan_job_id) {
    message.error("Missing Plan No. Please go back to select Plan No. first !");
  }
  // dispatch({ type: SET_LOADING, payload: true });
  try {
    return axios
      .get(`${apiGetTimesheetScanRMList}/${plan_job_id}`)
      .then((res) => {
        if (!res.data) {
          return {
            success: false,
            data: [],
            error: `Data is empty. Please contact programmer`,
          };
        } else {
          return { success: true, data: sortData(res.data) || [] };
        }
      })
      .catch((error) => {
        // dispatch({ type: SET_LOADING, payload: false });
        console.log(error);
        error.response &&
          message.error(
            `Error ${error.response.status}. Can't get any data from the server. Please try again later.`
          );
        !error.response &&
          message.error(`Network Error. Please check your internet conection.`);
        return {
          success: false,
          data: [],
          error: `Network Error. Please check your internet conection.`,
        };
      });
  } catch (error) {
    // dispatch({ type: SET_LOADING, payload: false });
    console.log(error);
    error.response &&
      message.error(
        `Error ${error.response.status}. Can't get any data from the server. Please try again later.`
      );
    !error.response &&
      message.error(`Network Error. Please check your internet conection.`);
    return {
      success: false,
      data: [],
      error: `Network Error. Please check your internet conection.`,
    };
  }
};
const getBarcodeDetail = (barcode) => {
  if (!barcode) {
    message.error("Missing Plan No. Please go back to select Plan No. first !");
  }
  try {
    return axios
      .get(`${apiGetScanBarcodeDetail}/${barcode}`)
      .then((res) => {
        return { success: true, data: res.data };
      })
      .catch((error) => {
        console.log(error);
        error.response &&
          message.error(
            `Error ${error.response.status}. Can't get any data from the server. Please try again later.`
          );
        !error.response &&
          message.error(`Network Error. Please check your internet conection.`);
        return { success: false };
      });
  } catch (error) {
    console.log(error);
    error.response &&
      message.error(
        `Error ${error.response.status}. Can't get any data from the server. Please try again later.`
      );
    !error.response &&
      message.error(`Network Error. Please check your internet conection.`);
    return { success: false };
  }
};
const startTimesheet = (data) => {
  if (!data) {
    message.error("Can't Start. Please Contact Programmer.");
  }
  console.log("START ", data);
  const saveData = {
    ...data,
    user_name: data.time_sheet_user_detail[0].user_name,
  };
  // dispatch({ type: SET_LOADING, payload: true });
  try {
    return axios
      .post(`${apiTimesheet}`, [saveData], header_config)
      .then(async (res) => {
        console.log("BEING START ", res.data);
        if (!res.data) {
          console.log("ERROR POST TIMESHEET");
          // dispatch({ type: START_TIMESHEET, payload: {} });
          return {
            success: false,
            error: `Network Error. Please check your internet conection.`,
          };
        } else {
          const {
            time_sheet_id,
            time_sheet_log_detail,
            time_sheet_type_id,
            time_sheet_type_name,
          } = res.data;
          const newData = {
            ...saveData,
            time_sheet_id,
            time_sheet_log_detail,
            time_sheet_type_id,
            time_sheet_type_name,
          };
          return await updateTimesheet(newData, time_sheet_id, 2);
        }
      })
      .catch((error) => {
        console.log(error);
        // dispatch({ type: SET_LOADING, payload: false });
        error.response &&
          message.error(
            `Error ${error.response.status}. Can't Start. Please Contact Programmer.`
          );
        !error.response &&
          message.error(`Network Error. Please check your internet conection.`);
        return {
          success: false,
          error: `Network Error. Please check your internet conection.`,
        };
      });
  } catch (error) {
    console.log(error);
    // dispatch({ type: SET_LOADING, payload: false });
    error.response &&
      message.error(
        `Error ${error.response.status}. Can't Start. Please Contact Programmer.`
      );
    !error.response &&
      message.error(`Network Error. Please check your internet conection.`);
    return {
      success: false,
      error: `Network Error. Please check your internet conection.`,
    };
  }
};
const updateTimesheet = (data, time_sheet_id, update_time_sheet_type_id) => {
  if (!data) {
    message.error("Can't Start. Please Contact Programmer.");
  }
  console.log(
    "UPDATE TIMESHEET ",
    data,
    time_sheet_id,
    update_time_sheet_type_id
  );
  // dispatch({ type: SET_LOADING, payload: true });
  try {
    return (
      axios
        .put(
          `${apiTimesheet}/${time_sheet_id}`,
          [{ ...data, time_sheet_type_id: update_time_sheet_type_id }],
          header_config
        )
        .then((res) => {
          console.log("UPDATED.... ", res.data);
          if (!res.data) {
            return { success: false };
          } else {
            switch (update_time_sheet_type_id) {
              case 2:
                message.success(`Timesheet has been started..`);
                break;
              case 3:
                message.success(`Timesheet has been stopped..`);
                break;
              case 4:
                message.success(`Timesheet has been finished..`);
                break;
              case 5:
                message.warning(`Timesheet has been canceled..`);
                break;
              default:
                break;
            }
            const {
              time_sheet_id,
              time_sheet_log_detail,
              time_sheet_type_id,
              time_sheet_type_name,
              time_sheet_no,
              tg_time_sheet_time,
              tg_time_sheet_qty,
            } = res.data;
            return {
              success: true,
              data: {
                ...data,
                time_sheet_id,
                time_sheet_log_detail: sortData(time_sheet_log_detail, "ids"),
                time_sheet_type_id,
                time_sheet_type_name,
                time_sheet_no,
                tg_time_sheet_time,
                tg_time_sheet_qty,
              },
            };
          }
        })
        // .then((res) => {
        //   console.log("UPDATED.... ", res.data);
        //   if (!res.data) {
        //     dispatch({ type: START_TIMESHEET, payload: {} });
        //   } else {
        //     const {
        //       time_sheet_id,
        //       time_sheet_log_detail,
        //       time_sheet_type_id,
        //       time_sheet_type_name,
        //       time_sheet_no,
        //       tg_time_sheet_time,
        //       tg_time_sheet_qty,
        //     } = res.data;
        //     dispatch({
        //       type: START_TIMESHEET,
        //       payload: {
        //         ...data,
        //         time_sheet_id,
        //         time_sheet_log_detail: sortData(time_sheet_log_detail),
        //         time_sheet_type_id,
        //         time_sheet_type_name,
        //         time_sheet_no,
        //         tg_time_sheet_time,
        //         tg_time_sheet_qty,
        //       },
        //     });
        //   }
        // })
        .catch((error) => {
          console.log(error);
          // dispatch({ type: SET_LOADING, payload: false });
          error.response &&
            message.error(
              `Error ${error.response.status}. Can't Start. Please Contact Programmer.`
            );
          !error.response &&
            message.error(
              `Network Error. Please check your internet conection.`
            );
          return {
            success: false,
            error: `Network Error. Please check your internet conection.`,
          };
        })
    );
  } catch (error) {
    console.log(error);
    // dispatch({ type: SET_LOADING, payload: false });
    error.response &&
      message.error(
        `Error ${error.response.status}. Can't Start. Please Contact Programmer.`
      );
    !error.response &&
      message.error(`Network Error. Please check your internet conection.`);

    return {
      success: false,
      error: `Network Error. Please check your internet conection.`,
    };
  }
};

const updateTimesheetLog = (data) => {
  try {
    const { time_sheet_log_id: id } = data;
    if (!id) return { success: false, data: {}, message: "Missing id" };
    return axios
      .put(`${apiTimesheetLog}/${id}`, header_config)
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
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: {}, message: error };
  }
};

const resetTimesheet = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: false });
  dispatch({ type: RESET_TIMESHEET });
};

export {
  GET_MACHINE_PLAN,
  GET_TIMESHEET_SCAN_RM_LIST,
  START_TIMESHEET,
  UPDATE_TIMESHEET,
  RESET_TIMESHEET,
  CLOSE_TIMESHEET,
  // GET_TIMESHEET_MACHINE,
  getMachinePlan,
  getTimesheetScanRMList,
  getBarcodeDetail,
  startTimesheet,
  updateTimesheet,
  resetTimesheet,
  updateTimesheetLog,
  // getTimesheetMachine,
};
