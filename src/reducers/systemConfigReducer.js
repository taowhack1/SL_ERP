import { DECIMAL_UPDATE, GET_VAT } from "../actions/types";
const initialState = {
  decimalFormat: { unitDigit: 2, priceDigit: 2 },
  vat: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DECIMAL_UPDATE:
      return { ...state, decimalFormat: action.payload };
    case GET_VAT:
      return { ...state, vat: action.payload };
    default:
      return state;
  }
};
