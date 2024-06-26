/** @format */

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
const SET_TIMESHEET = "SET_TIMESHEET";
const RESET_TIMESHEET = "RESET_TIMESHEET";
const GET_MACHINE_PLAN = "GET_MACHINE_PLAN";
const GET_TIMESHEET_SCAN_RM_LIST = "GET_TIMESHEET_SCAN_RM_LIST";
const START_TIMESHEET = "START_TIMESHEET";
const UPDATE_TIMESHEET = "UPDATE_TIMESHEET";
const CLOSE_TIMESHEET = "CLOSE_TIMESHEET";

const SET_TIMESHEET_CONTROLLER = "SET_TIMESHEET_CONTROLLER";
const RESET_TIMESHEET_CONTROLLER = "RESET_TIMESHEET_CONTROLLER";

const SET_SCAN_TIMESHEET_RPM_CHECKING = "SET_SCAN_TIMESHEET_RPM_CHECKING";
const SCAN_TIMESHEET_RPM_CHECKING = "SCAN_TIMESHEET_RPM_CHECKING";
const RESET_SCAN_TIMESHEET_RPM_CHECKING = "RESET_SCAN_TIMESHEET_RPM_CHECKING";

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
    message.error("Missing barcode.");
  }
  try {
    return axios
      .get(`${apiGetScanBarcodeDetail}/${barcode}`)
      .then((res) => {
        if (res?.data?.length) {
          return { success: true, data: res.data };
        } else {
          message.warning(
            `Invalid barcode or barcode not match to this job.`,
            4
          );
          return { success: false, data: [] };
        }
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
// const updateTimesheet = (data, time_sheet_id, update_time_sheet_type_id) => {
//   if (!data) {
//     message.error("Can't Start. Please Contact Programmer.");
//   }
//   console.log(
//     "UPDATE TIMESHEET ",
//     data,
//     time_sheet_id,
//     update_time_sheet_type_id
//   );
//   // dispatch({ type: SET_LOADING, payload: true });
//   try {
//     return (
//       axios
//         .put(
//           `${apiTimesheet}/${time_sheet_id}`,
//           [{ ...data, time_sheet_type_id: update_time_sheet_type_id }],
//           header_config
//         )
//         .then((res) => {
//           console.log("UPDATED.... ", res.data);
//           if (!res.data) {
//             return { success: false };
//           } else {
//             switch (update_time_sheet_type_id) {
//               case 2:
//                 message.success(`Timesheet has been started..`);
//                 break;
//               case 3:
//                 message.success(`Timesheet has been stopped..`);
//                 break;
//               case 4:
//                 message.success(`Timesheet has been finished..`);
//                 break;
//               case 5:
//                 message.warning(`Timesheet has been canceled..`);
//                 break;
//               default:
//                 break;
//             }
//             const {
//               time_sheet_id,
//               time_sheet_log_detail,
//               time_sheet_type_id,
//               time_sheet_type_name,
//               time_sheet_no,
//               tg_time_sheet_time,
//               tg_time_sheet_qty,
//             } = res.data;
//             return {
//               success: true,
//               data: {
//                 ...data,
//                 time_sheet_id,
//                 time_sheet_log_detail: sortData(time_sheet_log_detail, "ids"),
//                 time_sheet_type_id,
//                 time_sheet_type_name,
//                 time_sheet_no,
//                 tg_time_sheet_time,
//                 tg_time_sheet_qty,
//               },
//             };
//           }
//         })
//         // .then((res) => {
//         //   console.log("UPDATED.... ", res.data);
//         //   if (!res.data) {
//         //     dispatch({ type: START_TIMESHEET, payload: {} });
//         //   } else {
//         //     const {
//         //       time_sheet_id,
//         //       time_sheet_log_detail,
//         //       time_sheet_type_id,
//         //       time_sheet_type_name,
//         //       time_sheet_no,
//         //       tg_time_sheet_time,
//         //       tg_time_sheet_qty,
//         //     } = res.data;
//         //     dispatch({
//         //       type: START_TIMESHEET,
//         //       payload: {
//         //         ...data,
//         //         time_sheet_id,
//         //         time_sheet_log_detail: sortData(time_sheet_log_detail),
//         //         time_sheet_type_id,
//         //         time_sheet_type_name,
//         //         time_sheet_no,
//         //         tg_time_sheet_time,
//         //         tg_time_sheet_qty,
//         //       },
//         //     });
//         //   }
//         // })
//         .catch((error) => {
//           console.log(error);
//           // dispatch({ type: SET_LOADING, payload: false });
//           error.response &&
//             message.error(
//               `Error ${error.response.status}. Can't Start. Please Contact Programmer.`
//             );
//           !error.response &&
//             message.error(
//               `Network Error. Please check your internet conection.`
//             );
//           return {
//             success: false,
//             error: `Network Error. Please check your internet conection.`,
//           };
//         })
//     );
//   } catch (error) {
//     console.log(error);
//     // dispatch({ type: SET_LOADING, payload: false });
//     error.response &&
//       message.error(
//         `Error ${error.response.status}. Can't Start. Please Contact Programmer.`
//       );
//     !error.response &&
//       message.error(`Network Error. Please check your internet conection.`);

//     return {
//       success: false,
//       error: `Network Error. Please check your internet conection.`,
//     };
//   }
// };

// const updateTimesheetLog = (data) => {
//   try {
//     const { time_sheet_log_detail, fields } = data;
//     console.log("data", data);
//     console.log("fields_save", fields);
//     fields.forEach((field, index) => {
//       if (!field.time_sheet_log_id)
//         return { success: false, data: {}, message: "Missing id" };
//       const saveData = [
//         {
//           time_sheet_id: field.time_sheet_id,
//           time_sheet_log_qty: time_sheet_log_detail[index].time_sheet_log_qty,
//           time_sheet_log_remark: field.time_sheet_log_remark,
//           commit: 1,
//         },
//       ];
//       console.log("saveData", saveData);
//       return axios
//         .put(
//           `${apiTimesheetLog}/${field.time_sheet_log_id}`,
//           saveData,
//           header_config
//         )
//         .then((resp) => {
//           if (resp.status === 200) {
//             console.log("resp.data", resp.data);
//             return { success: true, data: resp.data, message: "Success" };
//           } else {
//             return { success: false, data: {}, message: resp };
//           }
//         })
//         .catch((error) => {
//           console.error(error);
//           if (error?.response) {
//             console.error(error.response);
//           }
//           return { success: false, data: [], message: error };
//         });
//     });
//   } catch (error) {
//     console.log(error);
//     return { success: false, data: {}, message: error };
//   }
// };

const updateTimesheetLog = (data) => {
  try {
    const { time_sheet_log_detail, fields } = data;
    if (fields.length) {
      return Promise.allSettled(
        fields.forEach((field, index) => {
          if (!field.time_sheet_log_id)
            return { success: false, data: {}, message: "Missing id" };
          const saveData = [
            {
              time_sheet_id: field.time_sheet_id,
              time_sheet_log_qty:
                time_sheet_log_detail[index].time_sheet_log_qty,
              time_sheet_log_remark: field.time_sheet_log_remark,
              commit: 1,
            },
          ];
          console.log("saveData", saveData);
          return axios
            .put(
              `${apiTimesheetLog}/${field.time_sheet_log_id}`,
              saveData,
              header_config
            )
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
        })
      )
        .then((respSet) => {
          return {
            success: true,
            data: respSet.data,
            message: "All set finished",
          };
        })
        .catch((error) => {
          console.error(error);
          if (error?.response) {
            console.error(error.response);
          }
          return { success: false, data: [], message: error };
        });
    } else {
      return {
        success: true,
        data: fields,
        message: "Not have any data to update.",
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, data: {}, message: error };
  }
};

const setTimesheet = (data) => (dispatch) =>
  dispatch({ type: SET_TIMESHEET, payload: data });

const resetTimesheet = () => (dispatch) => {
  dispatch({ type: RESET_TIMESHEET });
};

const setTimesheetCtrl = (data) => (dispatch) =>
  dispatch({ type: SET_TIMESHEET_CONTROLLER, payload: data });

const resetTimesheetCtrl = () => (dispatch) => {
  dispatch({ type: RESET_TIMESHEET_CONTROLLER });
};
const setScanTimesheetRPMChecking = (data) => (dispatch) =>
  dispatch({ type: SET_SCAN_TIMESHEET_RPM_CHECKING, payload: data });

const resetScanTimesheetRPMChecking = () => (dispatch) => {
  dispatch({ type: RESET_SCAN_TIMESHEET_RPM_CHECKING });
};
const scanTimesheetRPMChecking = (data) => (dispatch) => {
  dispatch({ type: SCAN_TIMESHEET_RPM_CHECKING, payload: data });
};

const confirmTimesheet = (data) => {
  return axios
    .post(`${apiTimesheet}`, data, header_config)
    .then((resp) => {
      console.log("confirmTimesheet", resp);
      if (resp.status === 200) {
        return { success: true, data: resp?.data, message: "Confirm Success." };
      } else {
        return { success: false, data: {}, message: "Internal Server Error." };
      }
    })
    .catch((error) => {
      console.log(error);
      return { success: false, data: {}, message: `Error! ${error}` };
    });
};

const updateTimesheet = (id, data) => {
  try {
    console.log("updateTimesheet", id, data);
    // return { success: true, data: {}, message: "TEST" };
    if (!id || !data)
      return { success: false, data: {}, message: "Missing id or data" };
    return axios
      .put(`${apiTimesheet}/${id}`, data, header_config)
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

export {
  GET_MACHINE_PLAN,
  GET_TIMESHEET_SCAN_RM_LIST,
  START_TIMESHEET,
  UPDATE_TIMESHEET,
  SET_TIMESHEET,
  RESET_TIMESHEET,
  CLOSE_TIMESHEET,
  SET_TIMESHEET_CONTROLLER,
  RESET_TIMESHEET_CONTROLLER,
  SET_SCAN_TIMESHEET_RPM_CHECKING,
  SCAN_TIMESHEET_RPM_CHECKING,
  RESET_SCAN_TIMESHEET_RPM_CHECKING,
  getMachinePlan,
  getTimesheetScanRMList,
  getBarcodeDetail,
  startTimesheet,
  updateTimesheet,
  setTimesheet,
  resetTimesheet,
  updateTimesheetLog,
  setTimesheetCtrl,
  resetTimesheetCtrl,
  confirmTimesheet,
  setScanTimesheetRPMChecking,
  scanTimesheetRPMChecking,
  resetScanTimesheetRPMChecking,
};
