import {
  GET_MASTER_DATA_ITEM,
  GET_LOCATION_SHELF_BY_ITEM_ID,
  GET_LOT_BATCH_BY_ITEM_ID_SHELF,
  GET_REPORT_STOCK,
  GET_ITEM_TYPE,
  GET_ITEM_CATEGORY,
  GET_UOM,
  SET_LOADING,
} from "../types";

import {
  api_approve,
  api_get_all_item_list,
  api_get_configuration_type,
  api_get_item_list,
} from "../../include/js/api";

import { errorText, header_config } from "../../include/js/main_config";
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
import { message } from "antd";
import { sortData } from "../../include/js/function_main";
const GET_SAMPLE_ITEMS = "GET_SAMPLE_ITEMS";
const CLEAR_STATE_ITEM = "CLEAR_STATE_ITEM";
const FILTER_STOCK_ON_HAND = "FILTER_STOCK_ON_HAND";
const CLEAR_FILTER_STOCK_ON_HAND = "CLEAR_FILTER_STOCK_ON_HAND";
const apiSampleItem = `/sales/item_sample`;
const apiGetItemCodeType = `/list/item_type`;
const apiGetSubReportStockOnHand = `/inventory/stock/history`;
const apiGetBulkFG = `/list/item/mrp/sample`;
const getItemType = () => {
  console.log("getItemType");
  return axios
    .get(api_get_item_type, header_config)
    .catch((error) => console.error(error));
};
const getUOM = () => {
  console.log("getUOM");
  return axios
    .get(`${api_get_item_uom}`, header_config)
    .catch((error) => console.error(error));
};

const getItemCodeType = () => {
  try {
    return axios
      .get(`${apiGetItemCodeType}`, header_config)
      .then((resp) => {
        if (resp.status === 200) {
          console.log("resp.data", resp.data);
          return { success: true, data: resp.data, message: "Success" };
          // dispatch({type:GET_ITEM_CODE_TYPE,payload:resp.data});
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

const getMasterDataItem = (user, setLoading, auth) => async (dispatch) => {
  try {
    const user_name = user ?? "";
    const get_type = axios.get(
      `${api_get_item_type}/${user_name && auth ? user_name : ""}`,
      header_config
    );
    const get_categoty = axios.get(`${api_get_item_category}`, header_config);
    const get_uom = axios.get(`${api_get_item_uom}`, header_config);
    const get_benefit = axios.get(
      `${api_get_item_identify_benefit}`,
      header_config
    );
    const get_item = axios.get(
      user_name ? `${api_get_all_item_list}/${user_name}` : api_get_item_list,
      header_config
    );
    const get_shelf = axios.get(api_shelf, header_config);
    const get_item_control = axios.get(api_get_item_control, header_config);
    await Promise.allSettled([
      get_type,
      get_categoty,
      get_uom,
      get_benefit,
      get_item_control,
      get_item,
      get_shelf,
      getItemCodeType(),
    ])
      .then((res) => {
        console.log("GET MASTER ITEMS", res);
        let master_data = {
          item_type: res[0].value.data[0] ?? [],
          item_category: res[1].value.data[0] ?? [],
          item_uom: res[2].value.data[0] ?? [],
          item_benefit: res[3].value.data[0] ?? [],
          item_control: res[4].value.data[0] ?? [],
          item_list: res[5].value.data ?? [],
          shelf: res[6].value.data[0] ?? [],
          item_code_type: res[7].value.data ?? [],
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

const get_location_shelf_by_item_id = (item_id) => async (dispatch) => {
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

const get_lot_batch_by_item_id_shelf = (item_id) => async (dispatch) => {
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

const get_report_stock = () => (dispatch) => {
  axios.get(get_stock_on_hand, header_config).then((res) => {
    dispatch({ type: GET_REPORT_STOCK, payload: sortData(res.data[0]) });
  });
};

const getReportStockOnHand = (user_name) => {
  try {
    return axios
      .get(`${get_stock_on_hand}/${user_name}`, header_config)
      .then((resp) => {
        if (resp.status === 200) {
          return {
            success: true,
            data: sortData(resp.data[0]),
            message: "Success",
          };
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
const getSubReportStockOnHand = ({
  user_name = "",
  item_id = 1,
  startDate = "01-01-2021",
  endDate = "31-12-2021",
}) => {
  console.log(
    "getSubReportStockOnHand",
    `${apiGetSubReportStockOnHand}/${user_name}&${item_id}&${startDate}&${endDate}`
  );
  if (!user_name)
    return { success: false, data: {}, message: "Missing user_name" };
  try {
    return axios
      .get(
        `${apiGetSubReportStockOnHand}/${user_name}&${item_id}&${startDate}&${endDate}`,
        header_config
      )
      .then((resp) => {
        if (resp.status === 200) {
          return {
            success: true,
            data: resp.data,
            message: "Success",
          };
        } else {
          return { success: false, data: {}, message: resp };
        }
      })
      .catch((error) => {
        console.error(error);
        if (error?.response) {
          console.error(error.response);
        }
        return { success: false, data: {}, message: error };
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: {}, message: error };
  }
};

const getItemCategoryList = () => (dispatch) => {
  axios.get(api_get_item_category, header_config).then((res) => {
    console.log(res);
    dispatch({ type: GET_ITEM_CATEGORY, payload: res.data[0] });
  });
};
const getUOMList = () => (dispatch) => {
  axios.get(api_get_item_uom, header_config).then((res) => {
    dispatch({ type: GET_UOM, payload: res.data[0] });
  });
};

const updateProcessStatus = (data, callback) => {
  console.log("updateStatus");
  data.commit = 1;
  // data = {process_status_id : '3', user_name : '2563003', process_id : '30', commit : 1}
  return axios.put(`${api_approve}/${data.process_id}`, data, header_config);
};

const getSampleItems = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiSampleItem}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: GET_SAMPLE_ITEMS, payload: sortData(res.data[0]) });
        }
      })
      .catch((error) => {
        if (!error.response) return message.error(errorText.network);
        if (error.response) return message.error(errorText.getData);
        console.log(error.response);
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    dispatch({ type: SET_LOADING, payload: false });
  }
};

const getSampleItemById = (id = null) => {
  console.log("getSampleItem", id);
  if (id === null || id === undefined)
    return message.error("Error ! Missing Sameple ID.");
  try {
    return axios
      .get(`${apiSampleItem}/${id}`, header_config)
      .then((res) => {
        console.log("then");
        console.log("res ", res);
        if (res.data) {
          return { success: true, data: res.data };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        console.log("catch");
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

const clearStateItems = () => (dispatch) =>
  dispatch({ type: CLEAR_STATE_ITEM });

const filterStockOnHand = (data) => (dispatch) =>
  dispatch({ type: FILTER_STOCK_ON_HAND, payload: data });
const clearFilterStockOnHand = () => (dispatch) => {
  message.success("Clear filter");
  dispatch({ type: CLEAR_FILTER_STOCK_ON_HAND });
};
export {
  getItemType,
  getUOM,
  getMasterDataItem,
  get_location_shelf_by_item_id,
  get_lot_batch_by_item_id_shelf,
  get_report_stock,
  getItemCategoryList,
  getUOMList,
  updateProcessStatus,
  getSampleItems,
  getSampleItemById,
  clearStateItems,
  apiSampleItem,
  GET_SAMPLE_ITEMS,
  CLEAR_STATE_ITEM,
  FILTER_STOCK_ON_HAND,
  CLEAR_FILTER_STOCK_ON_HAND,
  filterStockOnHand,
  getReportStockOnHand,
  clearFilterStockOnHand,
  getSubReportStockOnHand,
  apiGetBulkFG,
};
