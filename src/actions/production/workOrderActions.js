import { message } from "antd";
import axios from "axios";
import { api_work_order, api_wo_so_ref } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import {
  GET_ALL_WORK_ORDER,
  GET_WO_SO_REF,
  GET_WORK_ORDER_BY_ID,
} from "../types";

const updateWorkOrderRMDetail = (id, data_rm_detail) => {
  return axios.post(
    `${api_work_order}/rm/${id}`,
    data_rm_detail,
    header_config
  );
};
const updateWorkOrderPKDetail = (id, data_pk_detail) => {
  return axios.post(
    `${api_work_order}/pk/${id}`,
    data_pk_detail,
    header_config
  );
};

export const getSOReference = () => (dispatch) => {
  axios.get(`${api_wo_so_ref}`, header_config).then((res) => {
    console.log(res.data);
    dispatch({ type: GET_WO_SO_REF, payload: res.data });
  });
};
export const getAllWorkOrder = () => (dispatch) => {
  axios.get(api_work_order, header_config).then((res) => {
    dispatch({ type: GET_ALL_WORK_ORDER, payload: res.data[0] });
  });
};
export const getWorkOrderByID = (id, user_name, redirect) => (dispatch) => {
  axios.get(`${api_work_order}/${id}`, user_name, header_config).then((res) => {
    dispatch({ type: GET_WORK_ORDER_BY_ID, payload: res.data[0] });
    redirect(id);
  });
};

export const createWorkOrder = (data, user_name, redirect) => (dispatch) => {
  try {
    const { data_head, data_rm_detail, data_pk_detail } = data;
    axios.post(`${api_work_order}`, data_head, header_config).then((res) => {
      const work_order_id = res.data[0].work_order_id;
      Promise.allSettled([
        updateWorkOrderRMDetail(work_order_id, data_rm_detail),
        updateWorkOrderPKDetail(work_order_id, data_pk_detail),
      ])
        .then((res) => {
          message.success({
            content: "Work Order Created.",
            duration: 2,
            key: "validate",
          });
          getWorkOrderByID(work_order_id, user_name, redirect);
        })
        .catch((error) => {
          console.log(error);
          message.error({
            content: "Somethings went wrong. Please contact programmer.",
            duration: 4,
            key: "validate",
          });
        });
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateWorkOrder = (id, data, user_name, redirect) => (
  dispatch
) => {
  try {
    const { data_head, data_rm_detail, data_pk_detail } = data;
    axios
      .put(`${api_work_order}/${id}`, data_head, header_config)
      .then((res) => {
        const work_order_id = res.data[0].work_order_id;
        Promise.allSettled([
          updateWorkOrderRMDetail(work_order_id, data_rm_detail),
          updateWorkOrderPKDetail(work_order_id, data_pk_detail),
        ])
          .then((res) => {
            message.success({
              content: "Work Order Updated.",
              duration: 2,
              key: "validate",
            });
            getWorkOrderByID(work_order_id, user_name, redirect);
          })
          .catch((error) => {
            console.log(error);
            message.error({
              content: "Somethings went wrong. Please contact programmer.",
              duration: 4,
              key: "validate",
            });
          });
      });
  } catch (error) {
    console.log(error);
  }
};
