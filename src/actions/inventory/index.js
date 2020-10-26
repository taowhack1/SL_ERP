import { GET_MASTER_DATA_ITEM } from "../types";
import {
  api_get_item_list,
  api_get_uom_list,
  api_query,
  header_config,
} from "../../include/js/main_config";
import { query_select_uom, query_select_item } from "../query_sql";
import axios from "axios";
import {
  api_get_item_category,
  api_get_item_identify_benefit,
  api_get_item_type,
  api_get_item_uom,
  api_shelf,
} from "../api";

export const getMasterDataItem = () => async (dispatch) => {
  try {
    const get_type = axios.get(`${api_get_item_type}`, header_config);
    const get_categoty = axios.get(`${api_get_item_category}`, header_config);
    const get_uom = axios.get(`${api_get_item_uom}`, header_config);
    const get_benefit = axios.get(
      `${api_get_item_identify_benefit}`,
      header_config
    );
    const get_item = axios.get(api_get_item_list, header_config);
    const get_shelf = axios.get(api_shelf, header_config);
    let master_data = {
      item_type: await get_type.then((res) => {
        return res.data[0];
      }),
      item_category: await get_categoty.then((res) => {
        return res.data[0];
      }),
      item_uom: await get_uom.then((res) => {
        return res.data[0];
      }),
      item_benefit: await get_benefit.then((res) => {
        return res.data[0];
      }),
      item_list: await get_item.then((res) => {
        return res.data[0];
      }),
      shelf: await get_shelf.then((res) => {
        return res.data[0];
      }),
    };
    await dispatch({ type: GET_MASTER_DATA_ITEM, payload: master_data });

    // http://192.168.5.222:3009/api/list/category/1
    // http://192.168.5.222:3009/api/list/uom
    // http://192.168.5.222:3009/api/list/identify_benefit
  } catch (error) {
    console.log(error);
  }
};
