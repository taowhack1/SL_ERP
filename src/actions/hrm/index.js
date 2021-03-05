import { query_select_dep } from "../query_sql";
import { GET_SELECT_DEP, GET_COST_CENTER_LIST, GET_COUNTRY } from "../types";
import axios from "axios";
import { api_query, api_cost_center, api_country } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";

export const get_select_dep = () => (dispatch) => {
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
export const get_select_cost_center = (department_id) => (dispatch) => {
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

export const getCountry = () => async (dispatch) => {
  try {
    await axios
      .get(api_country, header_config)
      .then((res) => dispatch({ type: GET_COUNTRY, payload: res.data[0] }));
  } catch (error) {
    console.log(error);
  }
};
