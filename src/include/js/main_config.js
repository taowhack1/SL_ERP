import numeral from "numeral";
export const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 3 * 1000, //2*1000ms
};
export const header_config_form = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
// export const numberFormat = {
//   precision: 6,
//   formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
//   parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
// };
export const numberFormat = {
  precision: 6,
  formatter: (value) => {
    const checkDecimal = value.toString().includes(".");
    const copyValue = value.toString().split(".");
    const number1 = `${copyValue[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const number2 = copyValue[1] ?? 0;
    const totalNumber = checkDecimal ? number1 + "." + number2 : number1;
    return totalNumber;
  },
  parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
};
export const getNumberFormat = (decimalPoint = 6, symbol) => {
  return {
    precision: decimalPoint,
    formatter: (value) => {
      const checkDecimal = value.toString().includes(".");
      const copyValue = value.toString().split(".");
      const number1 = `${copyValue[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const number2 =
        copyValue[1] && copyValue[1].length > decimalPoint
          ? copyValue[1].substr(0, decimalPoint)
          : copyValue[1];
      const totalNumber = checkDecimal
        ? number1 + "." + (number2 ?? 0)
        : number1;
      return symbol ? totalNumber + symbol : totalNumber;
    },
    parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
  };
};
export const convertDigit = (value, decimalPoint = 6) => {
  const format = "0,0." + "0".repeat(decimalPoint);
  return typeof value === "number" && numeral(value).format(format);
};
// Sv.Test
export const api_server = `http://192.168.5.222:3009`;
export const report_server = `http://192.168.1.211:8080`;
// Sv.Production
// export const api_server = `http://192.168.1.210:3009`;
// export const report_server = `http://192.168.5.207`;
