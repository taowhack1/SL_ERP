import axios from "axios";
import {
  GET_ALL_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  INACTIVE_CUSTOMER,
} from "../actions/types";
import { api_url } from "../include/js/main_config";
const url = api_url;
const api_query = url + "/query/sql";
const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const getAllCustomer = () => (dispatch) => {
  const query = {
    query_sql: "select * from SALES.dbo.tb_customer",
  };
  axios.post(api_query, query, header_config).then((res) => {
    dispatch({
      type: GET_ALL_CUSTOMER,
      payload: res.data[0],
    });
  });
};
