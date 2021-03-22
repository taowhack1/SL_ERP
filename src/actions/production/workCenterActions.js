/** @format */

import { message } from "antd";
import axios from "axios";
import { api_work_center, api_work_center_detail } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { GET_ALL_WORK_CENTER, GET_WORK_CENTER_BY_ID } from "../types";

const bindWorkCenterDetail = (work_center_id, data_detail) => {
  console.log("bindWorkCenterDetail");
  return axios
    .post(
      `${api_work_center_detail}/${work_center_id}`,
      data_detail,
      header_config
    )
    .then((res) => {
      console.log("BIND DETAIL");
    });
};
export const getWorkCenterDetailByID = (work_center_id) => {
  return axios.get(
    `${api_work_center_detail}/${work_center_id}`,
    header_config
  );
};
export const getAllWorkCenter = (user_name) => (dispatch) => {
  axios.get(api_work_center, header_config).then((res) =>
    dispatch({
      type: GET_ALL_WORK_CENTER,
      payload: res.data[0],
    })
  );
};

export const createWorkCenter = ({ data_head, data_detail }, redirect) => (
  dispatch
) => {
  // console.log(data_head, data_detail);
  axios
    .post(api_work_center, data_head, header_config)
    .then((res) => {
      console.log("Create Head");
      const work_center_id = res.data[0][0].work_center_id;

      bindWorkCenterDetail(work_center_id, data_detail).then(async (data) => {
        message.success({
          content: "Work Center Created.",
          key: "success",
          duration: 2,
        });
        work_center_id && dispatch(getWorkCenterByID(work_center_id, redirect));
      });
    })
    .catch((error) => {
      message.error({
        content: "Somethings went wrong. \n" + error,
        key: "error",
        duration: 2,
      });
    });
};
export const updateWorkCenter = (
  work_center_id,
  { data_head, data_detail },
  redirect
) => (dispatch) => {
  axios
    .put(`${api_work_center}/${work_center_id}`, data_head, header_config)
    .then((res) => {
      bindWorkCenterDetail(work_center_id, data_detail).then(async (data) => {
        message.success({
          content: "Work Center Updated.",
          key: "success",
          duration: 2,
        });
        work_center_id && dispatch(getWorkCenterByID(work_center_id, redirect));
      });
    })
    .catch((error) => {
      message.error({
        content: "Somethings went wrong. \n" + error,
        key: "error",
        duration: 2,
      });
    });
};

export const getWorkCenterByID = (work_center_id, redirect) => (dispatch) => {
  try {
    const get_head = axios.get(
      `${api_work_center}/${work_center_id}`,
      header_config
    );
    const get_detail = axios.get(
      `${api_work_center_detail}/${work_center_id}`,
      header_config
    );

    Promise.allSettled([get_head, get_detail])
      .then(async (data) => {
        console.log(data);
        const workCenterData = {
          data_head: data[0].value.data[0][0],
          data_detail: data[1].value.data[0],
        };
        await dispatch({
          type: GET_WORK_CENTER_BY_ID,
          payload: workCenterData,
        });
        redirect(work_center_id);
      })
      .catch((error) => {
        console.log(error);
        message.error({
          content: "Somethings went wrong. \n" + error,
          key: "error",
          duration: 2,
        });
      });
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "error",
      duration: 2,
    });
  }
};
