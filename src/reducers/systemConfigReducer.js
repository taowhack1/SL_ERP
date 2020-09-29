import { DECIMAL_UPDATE } from "../actions/types";
const initialState = {
  decimalFormat: { unitDigit: 3, priceDigit: 4, vat: 7 },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case DECIMAL_UPDATE:
      return { ...state, decimalFormat: action.payload };
    default:
      return state;
  }
};
