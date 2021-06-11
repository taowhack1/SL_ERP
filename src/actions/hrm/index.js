import { query_select_dep } from "../query_sql";
import {
  GET_SELECT_DEP,
  GET_COST_CENTER_LIST,
  GET_COUNTRY,
  GET_PRODUCTION_EMP,
  GET_RD_EMP,
  SET_LOADING,
} from "../types";
import axios from "axios";
import {
  api_query,
  api_cost_center,
  api_country,
  api_get_production_emp,
  api_get_rd_emp,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { message } from "antd";

const apiGetPurchaseEmp = `/hrm/employees/purchase`;
const GET_PU_EMP = "GET_PU_EMP";
const get_select_dep = () => (dispatch) => {
  try {
    axios.post(api_query, query_select_dep, header_config).then((res) =>
      dispatch({
        type: GET_SELECT_DEP,
        payload: res.data[0],
      })
    );
  } catch (error) {
    console.log(error);
  }
};
const get_select_cost_center = (department_id) => (dispatch) => {
  try {
    axios
      .get(`${api_cost_center}/${department_id}`, header_config)
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_COST_CENTER_LIST,
          payload: res.data[0],
        });
      });
  } catch (error) {
    console.log(error);
  }
};

const getCountry = () => async (dispatch) => {
  try {
    await axios
      .get(api_country, header_config)
      .then((res) => dispatch({ type: GET_COUNTRY, payload: res.data[0] }));
  } catch (error) {
    console.log(error);
  }
};

const getProductionEmp = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(api_get_production_emp, header_config)
      .then((res) => {
        // do with res.data
        if (res.status === 200) {
          dispatch({ type: GET_PRODUCTION_EMP, payload: res.data });
        } else {
          dispatch({ type: GET_PRODUCTION_EMP, payload: [] });
        }
      })
      .catch((error) => {
        // do with error.response
        dispatch({ type: GET_PRODUCTION_EMP, payload: [] });
        dispatch({ type: SET_LOADING, payload: false });
        if (!error.response)
          return message.error("Network Error. Try gain later.");
        console.log(error.response);
        message.error(
          `Error ${error.response.status}. Can't get any data from the server. Please try again later.`
        );
      });
  } catch (error) {
    dispatch({ type: GET_PRODUCTION_EMP, payload: [] });
    message.error(
      `Error! Can't get any data from the server. Please try again later.`
    );
    dispatch({ type: SET_LOADING, payload: false });
  }
};
const getRDEmp = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(api_get_rd_emp, header_config)
      .then((res) => {
        // do with res.data
        if (res.status === 200) {
          dispatch({ type: GET_RD_EMP, payload: res.data });
        } else {
          dispatch({ type: GET_RD_EMP, payload: [] });
        }
      })
      .catch((error) => {
        // do with error.response
        dispatch({ type: GET_RD_EMP, payload: [] });
        dispatch({ type: SET_LOADING, payload: false });
        if (!error.response)
          return message.error("Network Error. Try gain later.");
        console.log(error.response);
        message.error(
          `Error ${error.response.status}. Can't get any data from the server. Please try again later.`
        );
      });
  } catch (error) {
    dispatch({ type: GET_RD_EMP, payload: [] });
    message.error(
      `Error! Can't get any data from the server. Please try again later.`
    );
    dispatch({ type: SET_LOADING, payload: false });
  }
};
const getPUEmp = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(apiGetPurchaseEmp, header_config)
      .then((res) => {
        // do with res.data
        if (res.status === 200) {
          dispatch({ type: GET_PU_EMP, payload: res.data });
        } else {
          dispatch({ type: GET_PU_EMP, payload: [] });
        }
      })
      .catch((error) => {
        // do with error.response
        dispatch({ type: GET_PU_EMP, payload: [] });
        dispatch({ type: SET_LOADING, payload: false });
        if (!error.response)
          return message.error("Network Error. Try gain later.");
        console.log(error.response);
        message.error(
          `Error ${error.response.status}. Can't get any data from the server. Please try again later.`
        );
      });
  } catch (error) {
    dispatch({ type: GET_PU_EMP, payload: [] });
    message.error(
      `Error! Can't get any data from the server. Please try again later.`
    );
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export {
  get_select_dep,
  get_select_cost_center,
  getCountry,
  getProductionEmp,
  getRDEmp,
  GET_PU_EMP,
  getPUEmp,
};
