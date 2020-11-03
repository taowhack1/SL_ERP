import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_approve, api_issue, api_issue_detail } from "../../include/js/api";
import { GET_ISSUE_LIST, RESET_ISSUE, GET_ISSUE_BY_ID } from "../types";

export const get_issue_list = () => (dispatch) => {
  axios.get(api_issue, header_config).then((res) => {
    dispatch({ type: GET_ISSUE_LIST, payload: res.data[0] });
  });
};
export const get_issue_by_id = (issue_id, user_name) => async (dispatch) => {
  try {
    if (user_name) {
      console.log(`${api_issue}/${issue_id}&${user_name}`);
      const res_head = axios.get(
        `${api_issue}/${issue_id}&${user_name}`,
        header_config
      );
      const res_detail = axios.get(
        `${api_issue_detail}/${issue_id}`,
        header_config
      );
      const issue = {
        issue_head:
          res_head &&
          (await res_head.then((res) => {
            return res.data.main_master;
          })),
        issue_detail:
          res_detail &&
          (await res_detail.then((res) => {
            return res.data[0];
          })),
      };
      console.log(`GET_ISSUE_BY_ID ${issue_id}/${user_name}`);
      await dispatch({ type: GET_ISSUE_BY_ID, payload: issue });
    }
  } catch (error) {
    console.log(error);
  }
};

export const create_issue = (data_head, data_detail) => async (dispatch) => {
  try {
    if (data_head && data_detail) {
      console.log("Create issue", data_head, data_detail);
      await axios
        .post(api_issue, data_head, header_config)
        .then(async (res) => {
          const issue_id = res.data[0][0].issue_id;
          console.log("INSERT_HEAD", res);

          await axios
            .post(`${api_issue_detail}/${issue_id}`, data_detail, header_config)
            .then((res) => {
              console.log("INSERT_DETAIL", res);
              dispatch(get_issue_by_id(issue_id, data_head.user_name));
            });
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const update_issue = (issue_id, data_head, data_detail) => async (
  dispatch
) => {
  try {
    if (data_head && data_detail) {
      console.log("Create issue", data_head, data_detail);
      await axios
        .put(`${api_issue}/${issue_id}`, data_head, header_config)
        .then(async (res) => {
          console.log("UPDATE_ISSUE", res);

          await axios
            .post(`${api_issue_detail}/${issue_id}`, data_detail, header_config)
            .then((res) => {
              console.log("INSERT_DETAIL", res);
              dispatch(get_issue_by_id(issue_id, data_head.user_name));
            });
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const issue_actions = (data, issue_id) => async (dispatch) => {
  console.log("issue_actions");
  data.commit = 1;
  console.log(data);
  // data = {process_status_id : '3', user_name : '2563003', process_id : '30', commit : 1}
  data.process_id &&
    axios
      .put(`${api_approve}/${data.process_id}`, data, header_config)
      .then((res) => {
        dispatch(get_issue_by_id(issue_id, data.user_name));
      });
};

export const reset_issue = () => (dispatch) => {
  dispatch({ type: RESET_ISSUE });
};
