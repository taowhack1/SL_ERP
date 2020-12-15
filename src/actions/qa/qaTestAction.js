import axios from "axios";
import {
  api_qa_method,
  api_qa_specification,
  api_qa_subject,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { GET_QA_MASTER_DATA } from "../types";

export const get_qa_subject_by_type_id = (type_id) =>
  axios.get(`${api_qa_subject}/${type_id}`, header_config);

export const get_qa_specification_by_type_id = (type_id) =>
  axios.get(`${api_qa_specification}/${type_id}`, header_config);

export const get_qa_method_by_type_id = (type_id) =>
  axios.get(`${api_qa_method}/${type_id}`, header_config);

export const get_qa_test_case_master = (
  type_id,
  get_subject,
  get_spec,
  get_method
) => async (dispatch) => {
  try {
    // const res_subject = await axios.get(
    //   `${api_qa_subject}/${type_id}`,
    //   header_config
    // );
    // const res_specification = await axios.get(
    //   `${api_qa_specification}/${type_id}`,
    //   header_config
    // );
    // const res_method = await axios.get(
    //   `${api_qa_method}/${type_id}`,
    //   header_config
    // );
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
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
