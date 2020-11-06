export const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const numberFormat = {
  precision: 3,
  formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};
// Sv.Test
export const api_server = `http://192.168.5.222:3009`;
export const report_server = `http://192.168.1.211`;
// Sv.Production
// export const api_server = `http://192.168.1.210:3009`;
// export const report_server = `http://192.168.5.207`;
