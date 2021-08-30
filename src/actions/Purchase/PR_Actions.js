import { GET_ALL_PR, RESET_PR_DATA, GET_PR_BY_ID } from "../types";
import {
  api_purchase,
  api_get_pr_detail,
  api_approve,
  api_purchase_get_all_pr,
} from "../../include/js/api";
import {
  pr_detail_fields,
  pr_fields,
} from "../../modules/purchasing/config/pr";
import axios from "axios";

import { sortData } from "../../include/js/function_main";
import { message } from "antd";

const SEARCH_PR = "SEARCH_PR";
const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const get_pr_list = (user_name) => (dispatch) => {
  console.log(`${api_purchase_get_all_pr}/${user_name}`);
  axios
    .get(`${api_purchase_get_all_pr}/${user_name}`, header_config)
    .then((res) => {
      dispatch({
        type: GET_ALL_PR,
        payload: res.data[0],
      });
    });
};
export const update_pr =
  (pr_id, user_name, data_head, data_detail, redirect) => (dispatch) => {
    console.log(1, "start", data_head, data_detail);
    try {
      axios
        .put(`${api_purchase}/pr/${pr_id}`, data_head, header_config)
        .then(async (res) => {
          console.log(2, "clear detail");
          axios
            .post(
              `${api_purchase}/pr_detail/${pr_id}`,
              data_detail,
              header_config
            )
            .then(() => {
              console.log(3, "get head and detail");
              dispatch(get_pr_by_id(pr_id, user_name));
              console.log(4, "done..");
              message.success({
                content: "PR Updated.",
                key: "validate",
                duration: 2,
              });
              redirect();
            });
        });
    } catch (error) {
      console.log(error);
      message.error({
        content: "Somethings went wrong. \n" + error,
        key: "validate",
        duration: 2,
      });
    }
  };

export const create_pr =
  (user_name, data_head, data_detail, redirect) => (dispatch) => {
    console.log(data_head);
    try {
      axios
        .post(`${api_purchase}/pr`, data_head, header_config)
        .then(async (res) => {
          console.log(2, "clear detail");
          console.log("data_detail", data_detail);
          const pr_id = res.data[0][0].pr_id;
          axios
            .post(
              `${api_purchase}/pr_detail/${pr_id}`,
              data_detail,
              header_config
            )
            .then(() => {
              console.log(3, "get head and detail");
              dispatch(get_pr_by_id(pr_id, user_name));
              console.log(4, "done..");
              return_response(true, "Create PR Succesful.");
              message.success({
                content: "PR Created.",
                key: "validate",
                duration: 2,
              });
              redirect();
            });
        })
        .catch((error) => {
          console.log(error);
          return_response(true, error);
        });
    } catch (error) {
      console.log(error);
      return_response(true, error);
    }
  };
export const get_pr_by_id = (pr_id, user_name) => async (dispatch) => {
  console.log("get_pr_by_id");

  try {
    if (pr_id) {
      console.log(`${api_purchase}/pr/${pr_id}`);
      const res_head = axios.get(
        `${api_purchase}/pr/${pr_id}&${user_name}`,
        header_config
      );

      const res_detail = axios.get(
        `${api_get_pr_detail}/${pr_id}`,
        header_config
      );
      const pr_data = {
        pr_head:
          res_head &&
          (await res_head.then((res) => {
            return res.data.main_master;
          })),
        pr_detail:
          res_detail &&
          (await res_detail.then((res) => {
            return sortData(res.data[0]);
          })),
      };
      console.log(`GET_PR_BY_ID ${pr_id}`, pr_data);
      await dispatch({ type: GET_PR_BY_ID, payload: pr_data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const pr_actions = (data, pr_id) => (dispatch) => {
  data.commit = 1;
  axios
    .put(`${api_approve}/${data.process_id}`, data, header_config)
    .then((res) => {
      let msg = "";
      switch (data.process_status_id) {
        case 2:
          // Confirm
          msg = "Confirm.";
          break;
        case 3:
          msg = "Cancel.";
          break;
        // Cancel
        case 4:
          msg = "Complete.";
          break;
        // Complete
        case 5:
          msg = "Approve.";
          break;
        // Approve
        case 6:
          msg = "Reject.";
          break;
        // Reject
        default:
          break;
      }
      message.success({
        content: msg,
        key: "validate",
        duration: 2,
      });
      console.log(res);
      dispatch(get_pr_by_id(pr_id, data.user_name));
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

export const return_response = (status, message) => {
  const return_data = {
    status: status,
    message: message,
  };
  return return_data;
};

const filterPR = (data) => (dispatch) =>
  dispatch({ type: SEARCH_PR, payload: data });

export { filterPR, SEARCH_PR };
