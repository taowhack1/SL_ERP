import { action_type, api_comments_log } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { GET_LOG_BY_ID, RESET_COMMENTS } from "../types";
import axios from "axios";

export const get_log_by_id = (process_id) => async (dispatch) => {
  const res = await axios.get(
    `${api_comments_log}/${process_id}`,
    header_config
  );
  if (res.data[0].length) {
    dispatch({
      type: GET_LOG_BY_ID,
      payload: res.data[0],
    });
  }
};
export const reset_comments = () => (dispatch) => {
  dispatch({
    type: RESET_COMMENTS,
  });
};
