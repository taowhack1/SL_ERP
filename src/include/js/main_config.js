import numeral from "numeral";
export const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const header_config_form = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
export const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};
export const convertDigit = (value) => {
  return typeof value === "number" && numeral(value).format("0,0.000");
};
// Sv.Test
export const api_server = `http://192.168.5.222:3009`;
export const report_server = `http://192.168.1.211`;
// Sv.Production
// export const api_server = `http://192.168.1.210:3009`;
// export const report_server = `http://192.168.5.207`;
