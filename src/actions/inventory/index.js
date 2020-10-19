import { GET_SELECT_UOM, GET_SELECT_ITEM } from "../types";
import {
  api_get_item_list,
  api_get_uom_list,
  api_query,
  header_config,
} from "../../include/js/main_config";
import { query_select_uom, query_select_item } from "../query_sql";
import axios from "axios";

export const getSelectUOM = () => (dispatch) => {
  try {
    axios.get(api_get_uom_list, header_config).then((res) =>
      dispatch({
        type: GET_SELECT_UOM,
        payload: res.data[0],
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const getSelectItem = () => (dispatch) => {
  try {
    axios.get(api_get_item_list, header_config).then((res) => {
      dispatch({
        type: GET_SELECT_ITEM,
        payload: res.data[0],
      });
    });
  } catch (error) {
    console.log(error);
  }
};
