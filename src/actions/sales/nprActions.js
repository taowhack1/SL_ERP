/** @format */

import { message } from "antd";
import axios from "axios";
import { sortData } from "../../include/js/function_main";
import { errorText, header_config } from "../../include/js/main_config";
import { SET_LOADING } from "../types";

const GET_NPR_LIST = "GET_NPR_LIST";
const GET_NPR_ITEM_LIST = "GET_NPR_ITEM_LIST";
const GET_NPR_SMD_MASTER_DATA = "GET_NPR_SMD_MASTER_DATA";
const apiNPR = `/sales/npr`;
const apiNPRItems = `/list/item/npr`;
const apiNPRRD = `/sales/npr_rd`;
const apiGetNPRFormula = `/sales/npr_formula/npr`;
const apiNPRFormula = `/sales/npr_formula`;
const apiGetNPRFeedback = `/sales/npr_satisfication/formula`;
const apiNPRSMDMasterData = `/list/smd_item_master_data`;
const getNPRItemList = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiNPRItems}`, header_config)
      .then((res) => {
        if (res.data) {
          dispatch({
            type: GET_NPR_ITEM_LIST,
            payload: sortData(res.data[0]),
          });
        } else {
          message.error(errorText.getData);
        }
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        dispatch({ type: GET_NPR_ITEM_LIST, payload: [] });
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    dispatch({ type: SET_LOADING, payload: false });
  }
};
const getNPRList = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiNPR}`, header_config)
      .then((res) => {
        if (res.data) {
          dispatch({ type: GET_NPR_LIST, payload: sortData(res.data) });
        } else {
          message.error(errorText.getData);
        }
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        dispatch({ type: GET_NPR_LIST, payload: [] });
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    dispatch({ type: SET_LOADING, payload: false });
  }
};
const getNPRByID = (id = null) => {
  try {
    return axios
      .get(`${apiNPR}/${id}`, header_config)
      .then((res) => {
        console.log("res ", res);
        if (res.data) {
          return { success: true, data: res.data };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null };
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};
const saveNPRAssignment = (id = null, data) => {
  console.log("saveNPRAssignment", id, data);
  try {
    if (id === null || id === undefined)
      return message.error("Error! Missing NPR ID.");
    return axios
      .put(`${apiNPRRD}/${id}`, data, header_config)
      .then((res) => {
        console.log("then");
        console.log("res ", res);
        if (res.data) {
          return { success: true, data: res.data };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        console.log("catch");
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};
const getNPRFormula = (id) => {
  try {
    if (id === null || id === undefined)
      return message.error("Error! Missing NPR ID.");
    return axios
      .get(`${apiGetNPRFormula}/${id}`, header_config)
      .then((res) => {
        console.log("then");
        console.log("res ", res);
        if (res.data) {
          return { success: true, data: res.data };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        console.log("catch");
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

const saveNPRFormula = (id = null, data) => {
  console.log("saveNPRFormula", data);
  try {
    return id
      ? axios
          .put(`${apiNPRFormula}/${id}`, [data], header_config)
          .then((res) => {
            console.log("then");
            console.log("res ", res);
            if (res.data) {
              message.success("Update Successfully..");
              return { success: true, data: res.data };
            } else {
              message.error(errorText.getData);
              return { success: false, data: null };
            }
          })
          .catch((error) => {
            console.log("catch");
            console.log(error.response);
            if (!error.response) {
              message.error(errorText.network);
            } else {
              message.error(errorText.formValid);
            }
            return { success: false, data: null, error: error.response };
          })
      : axios
          .post(`${apiNPRFormula}/`, [data], header_config)
          .then((res) => {
            console.log("then");
            console.log("res ", res);
            if (res.data) {
              message.success("Save Successfully..");
              return { success: true, data: res.data };
            } else {
              message.error(errorText.getData);
              return { success: false, data: null };
            }
          })
          .catch((error) => {
            console.log("catch");
            if (!error.response) {
              message.error(errorText.network);
            } else {
              message.error(errorText.formValid);
            }
            return { success: false, data: null, error: error.response };
          });
  } catch (error) {
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};
const getNPRFeedback = (id) => {
  try {
    if (id === null || id === undefined)
      return message.error("Error! Missing NPR ID.");
    return axios
      .get(`${apiGetNPRFeedback}/${id}`, header_config)
      .then((res) => {
        const { data } = res.data;
        console.log("res ", res);
        return { success: true, data: data };
      })
      .catch((error) => {
        console.log("catch");
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};
const getNPRSMDMasterData = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiNPRSMDMasterData}`, header_config)
      .then((res) => {
        console.log("then");
        console.log("res ", res);
        if (res.data) {
          dispatch({ type: GET_NPR_SMD_MASTER_DATA, payload: res.data });
        } else {
          message.error(errorText.getData);
          dispatch({ type: SET_LOADING, payload: false });
        }
      })
      .catch((error) => {
        console.log("catch");
        dispatch({ type: SET_LOADING, payload: false });
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
      });
  } catch (error) {
    dispatch({ type: SET_LOADING, payload: false });
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
  }
};

export {
  GET_NPR_LIST,
  GET_NPR_ITEM_LIST,
  GET_NPR_SMD_MASTER_DATA,
  getNPRList,
  getNPRByID,
  getNPRItemList,
  saveNPRAssignment,
  getNPRFormula,
  saveNPRFormula,
  getNPRFeedback,
  getNPRSMDMasterData,
};
