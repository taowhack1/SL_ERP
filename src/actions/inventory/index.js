import {
  GET_MASTER_DATA_ITEM,
  GET_LOCATION_SHELF_BY_ITEM_ID,
  GET_LOT_BATCH_BY_ITEM_ID_SHELF,
  GET_REPORT_STOCK,
} from "../types";
import {
  api_get_item_list,
  api_get_uom_list,
  api_query,
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
} from "../../include/js/api";

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
  } catch (error) {
    console.log(error);
  }
};

export const get_location_shelf_by_item_id = (item_id) => async (dispatch) => {
  console.log(`${api_get_location_shelf_by_item_id}/${item_id}`);
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
