/** @format */

import axios from "axios";
import { header_config } from "../../include/js/main_config";
import { api_customer, api_customer_file } from "../../include/js/api";
import { GET_ALL_CUSTOMER, GET_CUSTOMER_BY_ID } from "../types";
import { message } from "antd";

export const get_customer_list = () => (dispatch) => {
  axios.get(api_customer, header_config).then((res) => {
    console.log("get_customer_list");
    dispatch({ type: GET_ALL_CUSTOMER, payload: res.data[0] });
  });
};

export const get_customer_by_id = (customer_id, redirect) => (dispatch) => {
  try {
    const get_head = axios.get(`${api_customer}/${customer_id}`, header_config);
    Promise.allSettled([get_head]).then(async (data) => {
      const customerData = {
        data_head: data[0].value.data[0],
        dataDetail: data[0].value.data[0].customer_detail,
      };

      await dispatch({ type: GET_CUSTOMER_BY_ID, payload: customerData });
      redirect(customer_id);
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

export const create_customer = (data, data_file, redirect) => (dispatch) => {
  console.log("customer_create", data);
  try {
    const saveData = [...data];
    console.log("saveData", saveData);
    axios
      .post(`${api_customer}`, saveData, header_config)
      .then((res) => {
        console.log(res);
        const customer_id = res.data[0].customer_id;
        //dispatch(get_customer_by_id(customer_id, redirect));
        dispatch(saveFile(customer_id, data_file, redirect));
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

export const update_customer =
  (customer_id, data, data_file, redirect) => (dispatch) => {
    console.log("customer_update_customer_id", customer_id);
    try {
      const saveData = [...data];
      console.log("saveData", saveData);
      axios
        .put(`${api_customer}/${customer_id}`, saveData, header_config)
        .then((res) => {
          console.log(res);
          console.log("customer_update", res);
          const customer_id = res.data[0].customer_id;
          //dispatch(get_customer_by_id(customer_id, redirect));
          dispatch(saveFile(customer_id, data_file, redirect));
          message.success({
            content: "Customer Updated.",
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
export const saveFile = (customer_id, data_file, redirect) => (dispatch) => {
  console.log("Savedata_file", data_file);
  try {
    let promiseFunction = [];
    let promiseFunction2 = [];
    // data_file.forEach((file, key) => {
    const formData = new FormData();
    const formData2 = new FormData();
    const fileList =
      data_file && data_file?.companycer?.length !== 0
        ? data_file?.companycer[0].originFileObj
        : "nofile";
    const fileList2 =
      data_file && data_file?.memorandum?.length !== 0
        ? data_file?.memorandum[0].originFileObj
        : "nofile";
    formData.append("file", fileList);
    formData.append("user_name", data_file.user_name);
    formData.append("commit", 1);
    formData.append("item_file_remark", 11);
    formData.append("file_type_id", 11);
    formData2.append("file", fileList2);
    formData2.append("user_name", data_file.user_name);
    formData2.append("commit", 1);
    formData2.append("item_file_remark", 12);
    formData2.append("file_type_id", 12);
    if (fileList != "nofile") {
      promiseFunction.push(
        axios
          .post(`${api_customer_file}/${customer_id}`, formData)
          .then((res) => {
            console.log("Uploaded_1.", res);
          })
      );
    } else {
      console.log("no_file_1.");
    }
    if (fileList2 != "nofile") {
      promiseFunction2.push(
        axios
          .post(`${api_customer_file}/${customer_id}`, formData2)
          .then((res) => {
            console.log("Uploaded_2.", res);
          })
      );
    } else {
      console.log("no_file_2.");
    }
    // });
    dispatch(get_customer_by_id(customer_id, redirect));
  } catch (error) {
    console.log(error);
    error &&
      message.error({
        content: "Missing some file data. \n" + error,
        key: "error",
        duration: 3,
      });
  }
};
