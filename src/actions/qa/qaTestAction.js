import axios from "axios";
import {
  api_qa_method,
  api_qa_method_list,
  api_qa_specification,
  api_qa_specification_list,
  api_qa_subject,
  api_qa_subject_list,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { GET_QA_MASTER_DATA, GET_QA_TEST_BY_ID } from "../types";

export const get_qa_subject_by_type_id = (type_id) => {
  console.log(`${api_qa_subject_list}/${type_id}`);
  return axios.get(`${api_qa_subject_list}/${type_id}`, header_config);
};

export const get_qa_specification_by_type_id = (type_id) =>
  axios.get(`${api_qa_specification_list}/${type_id}`, header_config);

export const get_qa_method_by_type_id = (type_id) =>
  axios.get(`${api_qa_method_list}/${type_id}`, header_config);

export const get_qa_test_case_master = (
  type_id,
  get_subject,
  get_spec,
  get_method,
  redirect
) => async (dispatch) => {
  try {
    Promise.allSettled([
      get_subject ? get_qa_subject_by_type_id(type_id) : false,
      get_spec ? get_qa_specification_by_type_id(type_id) : false,
      get_method ? get_qa_method_by_type_id(type_id) : false,
    ])
      .then((res) => {
        // console.log(res);
        const test_case_master = {
          test_case_subject: res[0].value ? res[0].value.data[0] : [],
          test_case_specification: res[1].value ? res[1].value.data[0] : [],
          test_case_method: res[2].value ? res[2].value.data[0] : [],
        };
        console.log("test_case_master", test_case_master);
        dispatch({ type: GET_QA_MASTER_DATA, payload: test_case_master });
        redirect && redirect(type_id);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const get_qa_test_case = async () => {
  console.log("get_qa_test_case");
  try {
    const get_subject = axios.get(api_qa_subject, header_config);
    const get_spec = axios.get(api_qa_specification, header_config);
    const get_method = axios.get(api_qa_method, header_config);
    await Promise.allSettled([get_subject, get_spec, get_method])
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const getQATestByTypeID = (type_id, redirect) => (dispatch) => {
  try {
    Promise.allSettled([
      get_qa_subject_by_type_id(type_id),
      get_qa_specification_by_type_id(type_id),
      get_qa_method_by_type_id(type_id),
    ])
      .then((res) => {
        // console.log(res);
        const data = {
          subject: res[0].value ? res[0].value.data[0] : [],
          specification: res[1].value ? res[1].value.data[0] : [],
          method: res[2].value ? res[2].value.data[0] : [],
        };
        console.log("data", data);
        // dispatch({ type: GET_QA_TEST_BY_ID, payload: data });
        // redirect && redirect(type_id);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
