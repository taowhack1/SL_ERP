import {
  GET_ALL_VENDOR,
  ADD_ITEM_LINE,
  DEL_ITEM_LINE,
  UPDATE_ITEM_LINE,
  PO_ADD_ITEM_LINE,
  PO_DEL_ITEM_LINE,
  PO_UPDATE_ITEM_LINE,
} from "../types";
import { api_query } from "../../include/js/main_config";
import { query_select_pr } from "../query_sql";
import axios from "axios";
const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllVendor = () => (dispatch) => {
  const query = {
    query_sql: `SELECT vendor_id, vendor_no, vendor_name, vendor_no +' : ' +vendor_name AS vendor_no_name 
      FROM [PURCHASE].[dbo].[tb_vendor]`,
  };
  axios.post(api_query, query, header_config).then((res) =>
    dispatch({
      type: GET_ALL_VENDOR,
      payload: res.data[0],
    })
  );
};
// PR Item
export const addItemLine = (data) => (dispatch) => {
  dispatch({
    type: ADD_ITEM_LINE,
    payload: data,
  });
};
export const delItemLine = (id) => (dispatch) => {
  console.log(id);
  dispatch({
    type: DEL_ITEM_LINE,
    payload: {
      id: id,
    },
  });
};
export const updateValueItemLine = (id, data) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM_LINE,
    payload: {
      id: id,
      data: data,
    },
  });
};

//PO Item
export const PO_addItemLine = (data) => (dispatch) => {
  dispatch({
    type: PO_ADD_ITEM_LINE,
    payload: data,
  });
};
export const PO_delItemLine = (id) => (dispatch) => {
  console.log(id);
  dispatch({
    type: PO_DEL_ITEM_LINE,
    payload: {
      id: id,
    },
  });
};
export const PO_updateValueItemLine = (id, data) => (dispatch) => {
  dispatch({
    type: PO_UPDATE_ITEM_LINE,
    payload: {
      id: id,
      data: data,
    },
  });
};
