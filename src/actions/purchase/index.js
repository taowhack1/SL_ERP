import {
  GET_ALL_VENDOR,
  ADD_ITEM_LINE,
  DEL_ITEM_LINE,
  UPDATE_ITEM_LINE,
  PO_ADD_ITEM_LINE,
  PO_DEL_ITEM_LINE,
  GET_CURRENCY,
  PO_UPDATE_ITEM_LINE,
} from "../types";
import { api_query } from "../../include/js/main_config";
import { query_select_pr } from "../query_sql";
import axios from "axios";
import { api_currency } from "../api";
const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
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
