import {
  GET_ALL_PR,
  CREATE_PR,
  GET_PR_DETAIL,
  RESET_PR_DATA,
  SET_PR_HEAD,
  UPDATE_PR_HEAD,
} from "../types";
import { api_purchase, api_get_pr_detail,api_approve } from "../../include/js/api";
import {
  pr_detail_fields,
  pr_fields,
} from "../../modules/purchasing/fields_config/pr";
import axios from "axios";
import $ from "jquery";

const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const get_pr_list = () => (dispatch) => {
  axios.get(`${api_purchase}/pr`, header_config).then((res) => {
    dispatch({
      type: GET_ALL_PR,
      payload: res.data[0],
    });
  });
};
export const update_pr = (pr_id, user_name, data_head, data_detail) => (
  dispatch
) => {
  console.log(1, "start", data_head, data_detail);
  axios
    .put(`${api_purchase}/pr/${pr_id}`, data_head, header_config)
    .then(async (res) => {
      console.log(2, "clear detail");
      axios
        .post(`${api_purchase}/pr_detail/${pr_id}`, data_detail, header_config)
        .then(() => {
          console.log(3, "get head and detail");
          dispatch(get_pr_detail(pr_id));
          dispatch(get_pr_by_id(pr_id, user_name));
          console.log(4, "done..");
        });
    });
};

export const create_pr = (user_name, data_head, data_detail) => (dispatch) => {
  console.log(data_head);
  axios
    .post(`${api_purchase}/pr`, data_head, header_config)
    .then(async (res) => {
      dispatch({
        type: CREATE_PR,
        payload: res.data[0][0],
      });
      console.log(2, "clear detail");
      console.log("data_detail", data_detail);
      const pr_id = res.data[0][0].pr_id;
      axios
        .post(`${api_purchase}/pr_detail/${pr_id}`, data_detail, header_config)
        .then(() => {
          console.log(3, "get head and detail");
          dispatch(get_pr_detail(pr_id));
          dispatch(get_pr_by_id(pr_id, user_name));
          console.log(4, "done..");
        });
    });
};
export const get_pr_by_id = (id, user_name) => (dispatch) => {
  console.log("Getting PR Head..");
  try {
    axios
      .get(`${api_purchase}/pr/${id}&${user_name}`, header_config)
      .then((res) => {
        dispatch({
          type: SET_PR_HEAD,
          payload: res.data.main_master,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const set_pr_head = (id, pr_list) => (dispatch) => {
  try {
    dispatch({
      type: SET_PR_HEAD,
      payload: pr_list.filter((pr) => pr.pr_id === id)[0],
    });
  } catch (error) {
    console.log(error);
  }
};

export const pr_actions = (data, pr_id) => (dispatch) => {
  data.commit = 1;
  // data = {process_status_id : '3', user_name : '2563003', process_id : '30', commit : 1}
  axios
    .put(`${api_approve}/${data.process_id}`, data, header_config)
    .then((res) => {
      console.log(res);
      dispatch(get_pr_by_id(pr_id, data.user_name));
    });
};

export const update_pr_head = (data) => (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PR_HEAD,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const get_pr_detail = (pr_id) => (dispatch) => {
  console.log("Getting PR Detail..");
  pr_id &&
    axios.get(`${api_get_pr_detail}/${pr_id}`, header_config).then((res) => {
      console.log("Done Getting PR Detail..");
      dispatch({
        type: GET_PR_DETAIL,
        payload: res.data[0],
      });
    });
};
export const reset_pr_data = () => (dispatch) => {
  try {
    dispatch({
      type: RESET_PR_DATA,
      payload: {
        pr_fields: pr_fields,
        pr_detail: [pr_detail_fields],
      },
    });
  } catch (error) {
    console.log(error);
  }
};
