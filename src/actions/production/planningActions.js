import {
  GET_PLANNING_CALENDAR_DATA,
  SET_LOADING_PLANNING_CALENDAR,
} from "../types";
import axios from "axios";
import { api_routing_calendar } from "../../include/js/api";
import { message } from "antd";
import { rawData } from "../../modules/production/Operation/planning/data";
export const getPlanningCalendarData = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_PLANNING_CALENDAR,
    payload: true,
  });
  axios
    .get(`${api_routing_calendar}/0`)
    .then((res) =>
      dispatch({
        type: GET_PLANNING_CALENDAR_DATA,
        payload: { costCenter: res.data, plan: rawData.mockupApiData.plan },
      })
    )
    .catch((error) => message.error(error));
};
