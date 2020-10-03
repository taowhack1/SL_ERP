import {
  GET_ALL_PR,
  CREATE_PR,
  UPDATE_PR,
  UPDATE_PR_STATUS,
  GET_PR_DETAIL,
  UPDATE_PR_DETAIL,
} from "../types";
import { api_url } from "../../include/js/main_config";
import axios from "axios";
const api_query = api_url + "/query/sql";

const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const get_pr_list = () => (dispatch) => {
  const query = {
    query_sql: `
    SELECT
    p.pr_id,
    p.pr_no,
    CONVERT (VARCHAR, p.pr_due_date, 103) AS pr_due_date,
    CONVERT (VARCHAR, p.pr_created, 103) AS pr_created,
    p.pr_description,
    p.pr_contact_description,
    p.pr_remark,
    p.pr_created_by,
    p.branch_id,
    p.vendor_id,
      v.vendor_name,
    p.vat_id,
    p.process_id,
    CASE
    	WHEN process_id = 0 THEN 'Create' 
WHEN process_id = 1 THEN 'Confirm' 
WHEN process_id = 2 THEN 'Approve' 
WHEN process_id = 3 THEN 'Approve 2' 
WHEN process_id = 4 THEN 'Done' 
    ELSE 'N/A'
END AS process_name,
    p.tg_trans_status_id,
    p.tg_pr_amount,
    p.tg_pr_discount,
    p.tg_pr_sum_amount,
    p.tg_pr_vat_amount
    FROM
      [PURCHASE].[dbo].[tb_pr] p
    LEFT JOIN [PURCHASE].[dbo].[tb_vendor] v ON p.vendor_id = v.vendor_id`,
  };
  axios.post(api_query, query, header_config).then((res) => {
    console.log(res.data);
    dispatch({
      type: GET_ALL_PR,
      payload: res.data[0],
    });
  });
};
export const create_pr = (data) => (dispatch) => {
  axios.post(api_query, data, header_config).then((res) => {
    dispatch({
      type: CREATE_PR,
      payload: res.data[0],
    });
    // do respone here
  });
};
export const update_pr = (data) => (dispatch) => {
  axios.put(api_query, data, header_config).then((res) => {
    dispatch({
      type: UPDATE_PR,
      payload: res.data[0],
    });
    // do respone here
  });
};
export const update_pr_status = (data) => (dispatch) => {
  axios.put(api_query, data, header_config).then((res) => {
    dispatch({
      type: UPDATE_PR_STATUS,
      payload: res.data[0],
    });
    // do respone here
  });
};

export const get_pr_detail = (pr_id) => (dispatch) => {
  const query = {
    query_sql: `SELECT * from PURCHASE.dbo.tb_pr_detail WHERE pr_id = ${pr_id}`,
  };
  console.log(query);
  axios.post(api_query, query, header_config).then((res) => {
    console.log(res);
    dispatch({
      type: GET_PR_DETAIL,
      payload: res.data[0],
    });
    // do respone here
  });
};
