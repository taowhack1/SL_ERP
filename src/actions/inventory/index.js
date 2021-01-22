import {
  GET_MASTER_DATA_ITEM,
  GET_LOCATION_SHELF_BY_ITEM_ID,
  GET_LOT_BATCH_BY_ITEM_ID_SHELF,
  GET_REPORT_STOCK,
  GET_ITEM_TYPE,
  GET_ITEM_CATEGORY,
  GET_UOM,
} from "../types";

import {
  api_get_configuration_type,
  api_get_item_list,
} from "../../include/js/api";

import { header_config } from "../../include/js/main_config";
import axios from "axios";
import {
  api_get_item_category,
  api_get_item_identify_benefit,
  api_get_item_type,
  api_get_item_uom,
  api_get_location_shelf_by_item_id,
  api_get_lot_batch_by_item_id_shelf,
  api_shelf,
  get_stock_on_hand,
  api_get_item_control,
} from "../../include/js/api";

export const getItemType = () => {
  console.log("getItemType");
  return axios
    .get(api_get_item_type, header_config)
    .catch((error) => console.error(error));
};
export const getMasterDataItem = (user, setLoading) => async (dispatch) => {
  try {
    const user_name = user ?? "";
    const get_type = axios.get(
      `${api_get_item_type}/${user_name ?? ""}`,
      header_config
    );
    const get_categoty = axios.get(`${api_get_item_category}`, header_config);
    const get_uom = axios.get(`${api_get_item_uom}`, header_config);
    const get_benefit = axios.get(
      `${api_get_item_identify_benefit}`,
      header_config
    );
    const get_item = axios.get(api_get_item_list, header_config);
    const get_shelf = axios.get(api_shelf, header_config);
    const get_item_control = axios.get(api_get_item_control, header_config);
    Promise.allSettled([
      get_type,
      get_categoty,
      get_uom,
      get_benefit,
      get_item_control,
      get_item,
      get_shelf,
    ])
      .then((res) => {
        console.log(res);
        let master_data = {
          item_type: res[0].value.data[0] ?? [],
          item_category: res[1].value.data[0] ?? [],
          item_uom: res[2].value.data[0] ?? [],
          item_benefit: res[3].value.data[0] ?? [],
          item_control: res[4].value.data[0] ?? [],
          item_list: res[5].value.data[0] ?? [],
          shelf: res[6].value.data[0] ?? [],
        };
        dispatch({ type: GET_MASTER_DATA_ITEM, payload: master_data });
        setLoading && setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading && setLoading(false);
      });
  } catch (error) {
    console.log(error);
  }
};

export const get_location_shelf_by_item_id = (item_id) => async (dispatch) => {
  try {
    await axios
      .get(`${api_get_location_shelf_by_item_id}/${item_id}`, header_config)
      .then((res) => {
        dispatch({ type: GET_LOCATION_SHELF_BY_ITEM_ID, payload: res.data[0] });
      });
  } catch (error) {
    console.log(error);
  }
};

export const get_lot_batch_by_item_id_shelf = (item_id) => async (dispatch) => {
  try {
    await axios
      .get(`${api_get_lot_batch_by_item_id_shelf}/${item_id}`, header_config)
      .then((res) => {
        dispatch({
          type: GET_LOT_BATCH_BY_ITEM_ID_SHELF,
          payload: res.data[0],
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const get_report_stock = () => (dispatch) => {
  axios.get(get_stock_on_hand, header_config).then((res) => {
    dispatch({ type: GET_REPORT_STOCK, payload: res.data[0] });
  });
};

export const getItemCategoryList = () => (dispatch) => {
  axios.get(api_get_item_category, header_config).then((res) => {
    console.log(res);
    dispatch({ type: GET_ITEM_CATEGORY, payload: res.data[0] });
  });
};
export const getUomList = () => (dispatch) => {
  axios.get(api_get_item_uom, header_config).then((res) => {
    dispatch({ type: GET_UOM, payload: res.data[0] });
  });
};
