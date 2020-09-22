// import axios from "axios";
import { DECIMAL_UPDATE } from "../actions/types";
// const url = "http://192.168.5.230:8080/upload";
const url = "";
export const decimalUpdate = (config) => {
  const configs = {
    unitDigit: config.unitDigit,
    priceDigit: config.priceDigit,
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
