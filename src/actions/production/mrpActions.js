import { message } from "antd";
import axios from "axios";
import moment from "moment";
import {
  api_approve,
  api_mrp,
  api_mrp_detail,
  api_mrp_so_ref,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { GET_ALL_MRP, GET_MRP_SO_REF, GET_MRP_BY_ID } from "../types";
const apiMRPTest = `/production/mrp/calculate/sample`;
const getMRPHead = (id, user_name) =>
  axios.get(`${api_mrp}/${id}&${user_name}`, header_config);

export const getSOReference = () => (dispatch) => {
  axios
    .get(`${api_mrp_so_ref}`, header_config)
    .then((res) => {
      dispatch({ type: GET_MRP_SO_REF, payload: res.data });
    })
    .catch((error) => console.log(error));
};
export const getAllMRP = (user_name) => async (dispatch) => {
  await axios
    .get(`${api_mrp}/all/${user_name}`, header_config)
    .then((res) => {
      console.log("getAllMRP", res.data);
      dispatch({ type: GET_ALL_MRP, payload: res.data[0] });
    })
    .catch((error) => console.log(error));
};
export const getMRPByID = async (id, user_name, redirect) => {
  console.log("getMRPByID");
  return await Promise.allSettled([
    getMRPHead(id, user_name),
    // getMRPMaterial(id),
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
    // const { data_head, data_material } = data;
    const { data_head } = data;
    await axios
      .post(`${api_mrp}`, data_head, header_config)
      .then((res) => {
        console.log("created..", res);
        const mrp_id = res.data[0].mrp_id;
        message.success({
          content: "Work Order Created.",
          duration: 2,
          key: "validate",
        });
        redirect && redirect(mrp_id);
      })
      .catch((error) => {
        console.log(error);
        message.error({
          content: "Somethings went wrong. Please contact programmer.",
          duration: 4,
          key: "validate",
        });
      });
  } catch (error) {
    console.log(error);
  }
};
export const updateMRP = async (mrp_id, data, user_name, redirect) => {
  try {
    console.log("createMRP", data);
    const { data_head } = data;
    axios
      .put(`${api_mrp}/${mrp_id}`, data_head, header_config)
      .then((res) => {
        message.success({
          content: "Work Order Created.",
          duration: 2,
          key: "validate",
        });
        redirect && redirect(mrp_id);
      })
      .catch((error) => {
        console.log(error);
        message.error({
          content: "Somethings went wrong. Please contact programmer.",
          duration: 4,
          key: "validate",
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

const getMRPTest = ({
  item_id,
  qty_batch,
  due_date = moment().format("DD-MM-YYYY"),
  include_bulk_on_stock = 0,
}) => {
  try {
    if (!item_id && !qty_batch && !due_date)
      return { success: false, data: {}, message: "Missing Params" };
    console.log(
      "API Params",
      `${apiMRPTest}/${item_id}&${qty_batch}&${due_date}&${include_bulk_on_stock}&0`
    );
    return axios
      .get(
        `${apiMRPTest}/${item_id}&${qty_batch}&${due_date}&${include_bulk_on_stock}&0`,
        header_config
      )
      .then((resp) => {
        if (resp.status === 200) {
          console.log("resp.data", resp.data);
          return { success: true, data: resp.data, message: "Success" };
        } else {
          return { success: false, data: {}, message: resp };
        }
      })
      .catch((error) => {
        console.error(error);
        if (error?.response) {
          console.error(error.response);
        }
        return { success: false, data: [], message: error };
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: {}, message: error };
  }
};

export { getMRPTest };
