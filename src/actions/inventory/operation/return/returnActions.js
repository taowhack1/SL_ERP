import { message } from "antd";
import axios from "axios";
import { api_return, api_return_issue_ref } from "../../../../include/js/api";
import { header_config } from "../../../../include/js/main_config";
const GET_RETURN_ISSUE_REF_REQUEST = "GET_RETURN_ISSUE_REF_REQUEST";
const GET_RETURN_ISSUE_REF_SUCCESS = "GET_RETURN_ISSUE_REF_SUCCESS";
const GET_RETURN_ISSUE_REF_FAILURE = "GET_RETURN_ISSUE_REF_FAILURE";
const GET_RETURN_LIST_REQUEST = "GET_RETURN_LIST_REQUEST";
const GET_RETURN_LIST_SUCCESS = "GET_RETURN_LIST_SUCCESS";
const GET_RETURN_LIST_FAILURE = "GET_RETURN_LIST_FAILURE";

const getAllReturnList = (user_name) => async (dispatch) => {
  dispatch({ type: GET_RETURN_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      `${api_return}/all/${user_name}`,
      header_config
    );
    dispatch({
      type: GET_RETURN_LIST_SUCCESS,
      payload: { issueReturnList: data[0] },
    });
  } catch (error) {
    dispatch({ type: GET_RETURN_LIST_FAILURE });
  }
};
// axios.get(`${api_return}/all/${user_name}`);

const getReturnByID = (id, user_name) => {
  try {
    return axios
      .get(`${api_return}/${id}&${user_name}`, header_config)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

const getIssueRefList = () => async (dispatch) => {
  dispatch({ type: GET_RETURN_ISSUE_REF_REQUEST });
  try {
    const { data } = await axios.get(api_return_issue_ref, header_config);
    dispatch({
      type: GET_RETURN_ISSUE_REF_SUCCESS,
      payload: { issueRef: data },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_RETURN_ISSUE_REF_FAILURE });
  }
};

const saveIssueReturn = (data) => {
  console.log("saveIssueReturn", data);
  try {
    console.log("saveIssue", data);
    return data.return_id
      ? axios.put(`${api_return}/${data.return_id}`, [data], header_config)
      : axios.post(`${api_return}`, [data], header_config);
  } catch (error) {
    message.error("Error. Please contact programmer.. !!", 2);
    console.log(error);
  }
};

const returnUpdateStatus = () => {};
export {
  GET_RETURN_ISSUE_REF_REQUEST,
  GET_RETURN_ISSUE_REF_SUCCESS,
  GET_RETURN_ISSUE_REF_FAILURE,
  GET_RETURN_LIST_REQUEST,
  GET_RETURN_LIST_SUCCESS,
  GET_RETURN_LIST_FAILURE,
  getAllReturnList,
  getReturnByID,
  getIssueRefList,
  returnUpdateStatus,
  saveIssueReturn,
};
