import {
  api_currency,
  api_payment_term_customer,
  api_payment_term_vendor,
} from "../api";
import {
  GET_CURRENCY,
  GET_CUSTOMER_PAYMENT_TERM_LIST,
  GET_VENDOR_PAYMENT_TERM_LIST,
} from "../types";
import axios from "axios";
import { header_config } from "../../include/js/main_config";
export const get_currency_list = () => (dispatch) => {
  axios
    .get(api_currency, header_config)
    .then((res) => dispatch({ type: GET_CURRENCY, payload: res.data[0] }))
    .catch((err) => {
      console.log(err);
    });
};

export const get_vendor_payment_term_list = () => async (dispatch) => {
  try {
    await axios.get(api_payment_term_vendor, header_config).then((res) => {
      dispatch({
        type: GET_VENDOR_PAYMENT_TERM_LIST,
        payload: res.data[0],
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export const get_customer_payment_term_list = () => async (dispatch) => {
  try {
    await axios.get(api_payment_term_customer, header_config).then((res) => {
      dispatch({
        type: GET_CUSTOMER_PAYMENT_TERM_LIST,
        payload: res.data[0],
      });
    });
  } catch (error) {
    console.log(error);
  }
};
