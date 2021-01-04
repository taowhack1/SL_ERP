import { message } from "antd";
import axios from "axios";
import {
  api_approve,
  api_work_order,
  api_work_order_detail,
  api_wo_so_ref,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import {
  GET_ALL_WORK_ORDER,
  GET_WO_SO_REF,
  GET_WORK_ORDER_BY_ID,
} from "../types";

const updateWorkOrderMaterial = (id, data_material) => {
  return axios.post(
    `${api_work_order_detail}/${id}`,
    data_material,
    header_config
  );
};
const getWorkOrderMaterial = (id) => {
  return axios.get(`${api_work_order_detail}/${id}`, header_config);
};

export const getSOReference = () => (dispatch) => {
  axios.get(`${api_wo_so_ref}`, header_config).then((res) => {
    dispatch({ type: GET_WO_SO_REF, payload: res.data });
  });
};
export const getAllWorkOrder = (user_name) => async (dispatch) => {
  await axios
    .get(`${api_work_order}/all/${user_name}`, header_config)
    .then((res) => {
      console.log("getAllWO", res.data);
      dispatch({ type: GET_ALL_WORK_ORDER, payload: res.data[0] });
    });
};
export const getWorkOrderByID = (id, user_name, redirect) => (dispatch) => {
  console.log("getWorkOrderByID");
  axios
    .get(`${api_work_order}/${id}&${user_name}`, header_config)
    .then((res1) => {
      Promise.allSettled([getWorkOrderMaterial(id)]).then((res2) => {
        console.log(res1, res2);
        dispatch({
          type: GET_WORK_ORDER_BY_ID,
          payload: {
            data_head: res1.data[0],
            data_material: res2[0].value.data[0],
          },
        });
        redirect && redirect(id);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createWorkOrder = (data, user_name, redirect) => async (
  dispatch
) => {
  try {
    console.log("createWorkOrder", data);
    const { data_head, data_material } = data;
    await axios
      .post(`${api_work_order}`, data_head, header_config)
      .then((res) => {
        const wo_id = res.data[0][0].wo_id;
        Promise.allSettled([updateWorkOrderMaterial(wo_id, data_material)])
          .then((res) => {
            message.success({
              content: "Work Order Created.",
              duration: 2,
              key: "validate",
            });
            dispatch(getWorkOrderByID(wo_id, user_name, redirect));
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
    console.log("createWorkOrder", data);
    const { data_head, data_material } = data;
    axios
      .put(`${api_work_order}/${id}`, data_head, header_config)
      .then((res) => {
        Promise.allSettled([updateWorkOrderMaterial(id, data_material)])
          .then((res) => {
            message.success({
              content: "Work Order Updated.",
              duration: 2,
              key: "validate",
            });
            dispatch(getWorkOrderByID(id, user_name, redirect));
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

export const wo_actions = (data, wo_id) => (dispatch) => {
  data.commit = 1;

  data.process_id
    ? axios
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
          dispatch(getWorkOrderByID(wo_id, data.user_name));
        })
    : message.error({
        content: "Somethings went wrong. please contact programmer.",
        key: "validate",
        duration: 4,
      });
};
