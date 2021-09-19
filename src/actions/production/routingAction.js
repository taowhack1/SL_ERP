/** @format */
import axios from "axios";
import React from "react";
import { header_config } from "../../include/js/main_config";
import { api_list_fg, api_routing } from "../../include/js/api";
import { GET_FGITEM, GET_ROUTING_ALL, GET_ROUTING_ONE } from "../types";
import { message } from "antd";
import { sortData } from "../../include/js/function_main";

export const getRoutingAll = () => (dispatch) => {
  axios.get(api_routing, header_config).then((res) => {
    dispatch({ type: GET_ROUTING_ALL, payload: res.data[0] });
  });
};
export const getFgItem = () => (dispatch) => {
  axios.get(api_list_fg, header_config).then((res) => {
    dispatch({ type: GET_FGITEM, payload: res.data });
  });
};
export const getRoutingByID = (routing_id, redirect) => (dispatch) => {
  try {
    const get_head = axios.get(`${api_routing}/${routing_id}`, header_config);
    Promise.allSettled([get_head]).then(async (data) => {
      console.log("GET", data);
      await dispatch({
        type: GET_ROUTING_ONE,
        payload: {
          ...data[0].value.data[0],
          routing_detail: {
            bulk: sortData(
              data[0].value.data[0].routing_detail.filter(
                (obj) => obj.routing_detail_type_id === 1
              )
            ),
            fg: sortData(
              data[0].value.data[0].routing_detail.filter(
                (obj) => obj.routing_detail_type_id === 2
              )
            ),
          },
        },
      });
      redirect(routing_id);
    });
  } catch (error) {
    console.log(error);
  }
};

export const createRouting = (data, redirect) => (dispatch) => {
  axios
    .post(api_routing, data, header_config)
    .then((res) => {
      console.log("resdata", res.data[0].routing_id);
      const routing_id = res.data[0].routing_id;
      dispatch(getRoutingByID(routing_id, redirect));
      message.success({
        content: "Routing Created",
        key: "validate",
        duration: 2,
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

export const updateRouting = (routing_id, data, redirect) => (dispatch) => {
  axios.put(`${api_routing}/${routing_id}`, data, header_config).then((res) => {
    message.success({
      content: "Routing Updated",
      key: "success",
      duration: 2,
    });
    dispatch(getRoutingByID(routing_id, redirect));
  });
};

const saveRouting = (data) => {
  try {
    if (!data) return { success: false, data: [], message: "Missing id" };
    return !data[0].routing_id
      ? axios
          .post(`${api_routing}`, data, header_config)
          .then((resp) => {
            if (resp.status === 200) {
              console.log("post resp.data", resp.data);
              return { success: true, data: resp.data, message: "Success" };
            } else {
              return { success: false, data: [], message: resp };
            }
          })
          .catch((error) => {
            console.error(error);
            if (error?.response) {
              console.error(error.response);
            }
            return { success: false, data: [], message: error };
          })
      : axios
          .put(`${api_routing}/${data[0].routing_id}`, data, header_config)
          .then((resp) => {
            if (resp.status === 200) {
              console.log("put resp.data", resp.data);
              return { success: true, data: resp.data, message: "Success" };
            } else {
              return { success: false, data: [], message: resp };
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
    return { success: false, data: [], message: error };
  }
};

export { saveRouting };
