import { DECIMAL_UPDATE, GET_VAT } from "../actions/types";
import { api_query } from "../include/js/main_config";
import axios from "axios";
// const url = "http://192.168.5.230:8080/upload";
export const decimalUpdate = (config) => (dispatch) => {
  const configs = {
    unitDigit: config.unitDigit,
    priceDigit: config.priceDigit,
    vat: config.vat,
  };
  try {
    dispatch({
      type: DECIMAL_UPDATE,
      payload: configs,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getVat = () => (dispatch) => {
  const query = {
    query_sql:
      "SELECT vat_id, vat_no, vat_name,vat_cost FROM [PURCHASE].[dbo].[tb_vat] WHERE vat_actived = 1",
  };
  axios
    .post(api_query, query)
    .then((res) => {
      dispatch({
        type: GET_VAT,
        payload: res.data[0],
      });
    })
    .then(() => {
      console.log("GET_VAT");
    });
};
