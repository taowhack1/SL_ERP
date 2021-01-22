import axios from "axios";
import {
  api_qa_method,
  api_qa_method_list,
  api_qa_specification,
  api_qa_specification_list,
  api_qa_subject,
  api_qa_subject_list,
  api_qa_conditions,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import {
  GET_ALL_CONDITIONS,
  GET_QA_MASTER_DATA,
  GET_QA_TEST_BY_ID,
  SET_LOADING,
} from "../types";
export const get_qa_subject_by_type_id = (type_id) => {
  console.log(`${api_qa_subject_list}/${type_id}`);
  return axios.get(`${api_qa_subject_list}/${type_id}`, header_config);
};

export const get_qa_specification_by_type_id = (type_id) =>
  axios.get(`${api_qa_specification_list}/${type_id}`, header_config);

export const get_qa_method_by_type_id = (type_id) =>
  axios.get(`${api_qa_method_list}/${type_id}`, header_config);

export const get_qa_conditions_master = (
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
        const conditions_master = {
          conditions_subject: res[0].value ? res[0].value.data[0] : [],
          conditions_specification: res[1].value ? res[1].value.data[0] : [],
          conditions_method: res[2].value ? res[2].value.data[0] : [],
        };
        console.log("conditions_master", conditions_master);
        dispatch({ type: GET_QA_MASTER_DATA, payload: conditions_master });
        redirect && redirect(type_id);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const getAllQAConditionsGroupByItemType = () => async (dispatch) => {
  console.log("get_qa_conditions");
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    await axios.get(api_qa_conditions, header_config).then((res) => {
      dispatch({ type: GET_ALL_CONDITIONS, payload: res.data ?? [] });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const saveSubject = (data, saveType) => {
  if (!saveType) {
    return false;
  } else {
    return saveType === "put"
      ? axios.put(api_qa_subject, data, header_config)
      : axios.post(api_qa_subject, data, header_config);
  }
};
const saveSpecification = (data, saveType) => {
  if (!saveType) {
    return false;
  } else {
    return saveType === "put"
      ? axios.put(api_qa_specification, data, header_config)
      : axios.post(api_qa_specification, data, header_config);
  }
};
const saveMethod = (data, saveType) => {
  if (!saveType) {
    return false;
  } else {
    return saveType === "put"
      ? axios.put(api_qa_method, data, header_config)
      : axios.post(api_qa_method, data, header_config);
  }
};
export const getQATestByTypeID = (type_id, redirect) => {
  try {
    return (
      type_id &&
      axios
        .get(`${api_qa_conditions}/${type_id}`, header_config)
        .catch((error) => {
          console.error(error);
        })
    );
  } catch (error) {
    console.log(error);
  }
};

export const saveQAConditions = (data, redirect) => {
  console.log(data);
  try {
    const { type_id, subjectData, specData, methodData } = data;
    const saveData = {
      subject_create:
        subjectData.length &&
        subjectData.filter((obj) => obj.commit === 1 && !obj.qa_subject_id),
      spec_create:
        specData.length &&
        specData.filter((obj) => obj.commit === 1 && !obj.qa_specification_id),
      method_create:
        methodData.length &&
        methodData.filter((obj) => obj.commit === 1 && !obj.qa_method_id),
      subject_update:
        subjectData.length &&
        subjectData.filter(
          (obj) => obj.commit === 1 && obj.qa_subject_id !== null
        ),
      spec_update:
        specData.length &&
        specData.filter(
          (obj) => obj.commit === 1 && obj.qa_specification_id !== null
        ),
      method_update:
        methodData.length &&
        methodData.filter(
          (obj) => obj.commit === 1 && obj.qa_method_id !== null
        ),
    };
    console.log(saveData);
    const {
      subject_create,
      spec_create,
      method_create,
      subject_update,
      spec_update,
      method_update,
    } = saveData;
    Promise.allSettled([
      subject_create.length && saveSubject(subject_create, "post"),
      subject_update.length && saveSubject(subject_update, "put"),
      spec_create.length && saveSpecification(spec_create, "post"),
      spec_update.length && saveSpecification(spec_update, "put"),
      method_create.length && saveMethod(method_create, "post"),
      method_update.length && saveMethod(method_update, "put"),
    ])
      .then((res) => {
        redirect();
      })
      .catch((error) => {
        alert(error);
      });
  } catch (error) {
    console.error(error);
  }
};
