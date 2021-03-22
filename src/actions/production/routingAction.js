/** @format */
import axios from "axios";
import React from "react";
import { header_config } from "../../include/js/main_config";
import { api_list_fg, api_routing } from "../../include/js/api";
import { GET_FGITEM, GET_ROUTING_ALL, GET_ROUTING_ONE } from "../types";
import { message } from "antd";

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
      const routingData = {
        data_head: data[0].value.data[0],
        dataDetail: data[0].value.data[0].routing_detail,
      };
      await dispatch({
        type: GET_ROUTING_ONE,
        payload: routingData,
      });
      redirect(routing_id);
    });
  } catch (error) {}
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
