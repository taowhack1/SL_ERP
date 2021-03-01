import { message } from "antd";
import axios from "axios";
import {
  api_approve,
  api_mrp,
  api_mrp_detail,
  api_mrp_so_ref,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { GET_ALL_MRP, GET_MRP_SO_REF, GET_MRP_BY_ID } from "../types";

const updateMRPMaterial = (id, data_material) => {
  return axios.post(`${api_mrp_detail}/${id}`, data_material, header_config);
};
const getMRPMaterial = (id) => {
  return axios.get(`${api_mrp_detail}/${id}`, header_config);
};
const getMRPHead = (id, user_name) =>
  axios.get(`${api_mrp}/${id}&${user_name}`, header_config);

export const getSOReference = () => (dispatch) => {
  axios.get(`${api_mrp_so_ref}`, header_config).then((res) => {
    dispatch({ type: GET_MRP_SO_REF, payload: res.data });
  });
};
export const getAllMRP = (user_name) => async (dispatch) => {
  await axios.get(`${api_mrp}/all/${user_name}`, header_config).then((res) => {
    console.log("getAllMRP", res.data);
    dispatch({ type: GET_ALL_MRP, payload: res.data[0] });
  });
};
export const getMRPByID = (id, user_name, redirect) => {
  console.log("getMRPByID");
  return Promise.allSettled([
    getMRPHead(id, user_name),
    getMRPMaterial(id),
  ]).catch((err) => {
    console.log(err);
  });
  // .then((res) => {
  //   console.log(res1, res2);
  //   return {
  //     data_head: res[0].value.data[0],
  //     data_material: res[1].value.data[0],
  //   };
  // });
};

export const createMRP = async (data, user_name, redirect) => {
  try {
    console.log("createMRP", data);
    const { data_head, data_material } = data;
    await axios.post(`${api_mrp}`, data_head, header_config).then((res) => {
      const mrp_id = res.data[0][0].mrp_id;
      Promise.allSettled([updateMRPMaterial(mrp_id, data_material)])
        .then((res) => {
          message.success({
            content: "Work Order Created.",
            duration: 2,
            key: "validate",
          });
          redirect && redirect(mrp_id);
          // dispatch(getMRPByID(mrp_id, user_name, redirect));
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
export const updateMRP = async (mrp_id, data, user_name, redirect) => {
  try {
    console.log("createMRP", data);
    const { data_head, data_material } = data;
    axios.put(`${api_mrp}/${mrp_id}`, data_head, header_config).then((res) => {
      Promise.allSettled([updateMRPMaterial(mrp_id, data_material)])
        .then((res) => {
          message.success({
            content: "Work Order Updated.",
            duration: 2,
            key: "validate",
          });
          redirect && redirect(mrp_id);
          // dispatch(getMRPByID(id, user_name, redirect));
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

export const mrp_actions = (data, mrp_id) => (dispatch) => {
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
          // dispatch(getMRPByID(mrp_id, data.user_name));
        })
    : message.error({
        content: "Somethings went wrong. please contact programmer.",
        key: "validate",
        duration: 4,
      });
};
