import numeral from "numeral";
const errorText = {
  formValid: "ERROR ! Please fill your form completely.",
  getData:
    "ERROR ! Can't get any data from the server. Please Try again later.",
  tokenExpired: "ERROR ! Session has been expired. Please Sign-in again.",
  notFound: "ERROR ! Data not found.",
  network: "Network Error. Please Check your internet conection.",
};
const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30 * 1000, //2*1000ms = 2 วิ
};
const header_config_form = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 30 * 1000, //2*1000ms
};
// export const numberFormat = {
//   precision: 6,
//   formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
//   parser: (value) => value.replace(/\$\s?|(,*)/g, ""),
// };
const numberFormat = {
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
const getNumberFormat = (decimalPoint = 6, symbol) => {
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
const convertDigit = (value, decimalPoint = 6) => {
  const format = "0,0." + "0".repeat(decimalPoint);
  return typeof value === "number" && numeral(value).format(format);
};
// Sv.Test
export {
  getNumberFormat,
  convertDigit,
  numberFormat,
  header_config,
  header_config_form,
  errorText,
};
