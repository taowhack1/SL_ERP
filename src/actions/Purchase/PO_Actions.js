import {
  GET_ALL_PO,
  CREATE_PO,
  PR_TO_PO_DETAIL,
  RESET_PO_DATA,
  GET_PR_OPEN_PO,
  GET_PO_BY_ID,
} from "../types";
import {
  api_purchase,
  api_approve,
  api_get_po_detail,
  api_get_pr_detail_ref,
  api_get_pr_open_po,
  api_purchase_get_all_po,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import axios from "axios";
import { sortData } from "../../include/js/function_main";
import { message } from "antd";

export const get_open_po_list = () => (dispatch) => {
  axios.get(api_get_pr_open_po, header_config).then((res) => {
    dispatch({
      type: GET_PR_OPEN_PO,
      payload: res.data[0],
    });
  });
};
export const get_po_list = (user_name) => (dispatch) => {
  console.log(`${api_purchase_get_all_po}/${user_name}`);
  axios
    .get(`${api_purchase_get_all_po}/${user_name}`, header_config)
    .then((res) => {
      dispatch({
        type: GET_ALL_PO,
        payload: res.data[0],
      });
    });
};

export const get_po_by_id = (po_id, user_name) => async (dispatch) => {
  console.log("get_po_by_id");

  try {
    if (po_id) {
      console.log(`${api_purchase}/po/${po_id}&${user_name}`);
      const res_head = axios.get(
        `${api_purchase}/po/${po_id}&${user_name}`,
        header_config
      );

      const res_detail = axios.get(
        `${api_get_po_detail}/${po_id}`,
        header_config
      );
      const po_data = {
        po_head:
          res_head &&
          (await res_head.then((res) => {
            return res.data.main_master;
          })),
        po_detail:
          res_detail &&
          (await res_detail.then((res) => {
            return sortData(res.data[0]);
          })),
      };
      console.log(`GET_PO_BY_ID ${po_id}`, po_data);
      await dispatch({ type: GET_PO_BY_ID, payload: po_data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const create_po = (user_name, data_head, data_detail, redirect) => (
  dispatch
) => {
  console.log(user_name, data_head, data_detail);
  try {
    axios
      .post(`${api_purchase}/po`, data_head, header_config)
      .then(async (res) => {
        console.log(res);
        console.log(1, "Create Head");
        dispatch({
          type: CREATE_PO,
          payload: res.data[0][0],
        });

        const po_id = res.data[0][0].po_id;
        console.log(data_detail);
        axios
          .post(
            `${api_purchase}/po_detail/${po_id}`,
            data_detail,
            header_config
          )
          .then(() => {
            console.log(2, "Insert Detail");
            dispatch(get_po_by_id(po_id, user_name));
            console.log(4, "done..");
            message.success({
              content: "PO Created.",
              key: "validate",
              duration: 2,
            });
            redirect(po_id);
          });
      })
      .catch((error) => {
        console.log(error);
        message.error({
          content: "Somethings went wrong. \n" + error,
          key: "validate",
          duration: 2,
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

  //   // do respone here
};

export const update_po = (
  po_id,
  user_name,
  data_head,
  data_detail,
  redirect
) => (dispatch) => {
  console.log(1, "start", data_head, data_detail);
  try {
    axios
      .put(`${api_purchase}/po/${po_id}`, data_head, header_config)
      .then(async (res) => {
        console.log(2, "insert detail");
        axios
          .post(
            `${api_purchase}/po_detail/${po_id}`,
            data_detail,
            header_config
          )
          .then(() => {
            console.log(3, "get head and detail");

            dispatch(get_po_by_id(po_id, user_name));
            console.log(4, "done..");
            message.success({
              content: "PO Updated.",
              key: "validate",
              duration: 2,
            });
            redirect(po_id);
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

export const get_pr_detail = (pr_id) => (dispatch) => {
  axios.get(`${api_get_pr_detail_ref}/${pr_id}`, header_config).then((res) => {
    dispatch({
      type: PR_TO_PO_DETAIL,
      payload: res.data[0],
    });
    console.log("pr_detail_ref", res.data);
    // do respone here
  });
};
export const reset_po_data = () => (dispatch) => {
  try {
    dispatch({
      type: RESET_PO_DATA,
    });
  } catch (error) {
    console.log(error);
  }
};

export const po_actions = (data, po_id) => (dispatch) => {
  data.commit = 1;
  console.log(data);
  data.process_id &&
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
        dispatch(get_po_by_id(po_id, data.user_name));
      });
};
