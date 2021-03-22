/** @format */

import axios from "axios";
import { header_config } from "../../include/js/main_config";
import {
  api_country,
  api_district,
  api_language,
  api_province,
  api_tambon,
  api_vat_id,
  api_vendor,
  api_vendor_category,
  api_vendor_group,
  api_zip,
} from "../../include/js/api";
import {
  GET_ALL_VENDOR,
  GET_COUNTRY,
  GET_DISTRICT,
  GET_LANGUAGE,
  GET_PROVINCE,
  GET_TAMBON,
  GET_VENDOR_BY_ID,
  GET_VENDOR_CATEGORY,
  GET_VENDOR_GROUP,
  GET_VENDOR_VAT,
  GET_ZIP,
} from "../types";
import { message } from "antd";

export const get_vendor_group = () => (dispatch) => {
  axios.get(api_vendor_group, header_config).then((res) => {
    dispatch({
      type: GET_VENDOR_GROUP,
      payload: res.data[0],
    });
  });
};
export const get_vendor_category = () => (dispatch) => {
  axios.get(api_vendor_category, header_config).then((res) => {
    dispatch({
      type: GET_VENDOR_CATEGORY,
      payload: res.data[0],
    });
  });
};
export const get_all_vendor = () => (dispatch) => {
  axios.get(api_vendor, header_config).then((res) => {
    dispatch({
      type: GET_ALL_VENDOR,
      payload: res.data[0],
    });
  });
};

export const get_vendor_by_id = (vendor_id, redirect) => (dispatch) => {
  try {
    const get_head = axios.get(`${api_vendor}/${vendor_id}`, header_config);
    Promise.allSettled([get_head]).then(async (data) => {
      const vendorData = {
        data_head: data[0].value.data[0],
        dataDetail: data[0].value.data[0].vendor_detail,
      };
      await dispatch({
        type: GET_VENDOR_BY_ID,
        payload: vendorData,
      });
      redirect(vendor_id);
    });
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};
export const create_vendor = (data, redirect) => (dispatch) => {
  console.log("vendor_create");
  try {
    axios
      .post(`${api_vendor}`, data, header_config)
      .then((res) => {
        console.log("res", res.data);
        const vendor_id = res.data[0].vendor_id;
        dispatch(get_vendor_by_id(vendor_id, redirect));
        message.success({
          content: "Vendor Created.",
          key: "validate",
          duration: 2,
        });
      })
      .catch((error) => {
        console.log(error);
        message.error({
          content: "Somethings went wrong.\n" + error,
          key: "validate",
          duration: 2,
        });
      });
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};

export const update_vendor = (vendor_id, data, redirect) => (dispatch) => {
  try {
    axios
      .put(`${api_vendor}/${vendor_id}`, data, header_config)
      .then((res) => {
        const vendor_id = res.data[0].vendor_id;
        dispatch(get_vendor_by_id(vendor_id, redirect));
        message.success({
          content: "Vendor Updated.",
          key: "validate",
          duration: 2,
        });
        // redirect(vendor_id);
      })
      .catch((error) => {
        console.log(error);
        message.error({
          content: "Somethings went wrong.\n" + error,
          key: "validate",
          duration: 2,
        });
      });
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};

export const Language = () => (dispatch) => {
  axios.get(api_language, header_config).then((res) => {
    dispatch({
      type: GET_LANGUAGE,
      payload: res.data[0],
    });
  });
};
export const Country = () => (dispatch) => {
  axios.get(api_country, header_config).then((res) => {
    dispatch({
      type: GET_COUNTRY,
      payload: res.data[0],
    });
  });
};
export const Province = () => (dispatch) => {
  axios.get(api_province, header_config).then((res) => {
    dispatch({
      type: GET_PROVINCE,
      payload: res.data[0],
    });
  });
};
export const District = (province_id) => (dispatch) => {
  axios.get(`${api_district}/${province_id}`, header_config).then((res) => {
    dispatch({
      type: GET_DISTRICT,
      payload: res.data[0],
    });
  });
};
export const Tambon = (district_id) => (dispatch) => {
  axios.get(`${api_tambon}/${district_id}`, header_config).then((res) => {
    dispatch({
      type: GET_TAMBON,
      payload: res.data[0],
    });
  });
};
export const Zip = (tambon_id) => (dispatch) => {
  axios.get(`${api_zip}/${tambon_id}`, header_config).then((res) => {
    dispatch({
      type: GET_ZIP,
      payload: res.data[0],
    });
  });
};
export const VatID = () => (dispatch) => {
  axios.get(api_vat_id, header_config).then((res) => {
    dispatch({
      type: GET_VENDOR_VAT,
      payload: res.data[0],
    });
  });
};
