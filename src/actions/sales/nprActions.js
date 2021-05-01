import { message } from "antd";
import axios from "axios";
import { sortData } from "../../include/js/function_main";
import { errorText, header_config } from "../../include/js/main_config";
import { SET_LOADING } from "../types";

const GET_NPR_LIST = "GET_NPR_LIST";
const apiNPR = `/sales/npr`;

const getNPRList = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiNPR}`, header_config)
      .then((res) => {
        if (res.data) {
          dispatch({ type: GET_NPR_LIST, payload: sortData(res.data[0]) });
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

export { GET_NPR_LIST, getNPRList, getNPRByID };
