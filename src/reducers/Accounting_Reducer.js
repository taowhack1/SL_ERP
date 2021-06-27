import {
  GET_VENDOR_PAYMENT_TERM_LIST,
  GET_CUSTOMER_PAYMENT_TERM_LIST,
  GET_CURRENCY,
  GET_VAT,
} from "../actions/types";

const initialState = {
  master_data: {
    vendor_payment_terms: [],
    customer_payment_terms: [],
    currency: [],
    vat: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_PAYMENT_TERM_LIST:
      return {
        ...state,
        master_data: {
          ...state.master_data,
          customer_payment_terms: action.payload,
        },
      };
    case GET_VENDOR_PAYMENT_TERM_LIST:
      return {
        ...state,
        master_data: {
          ...state.master_data,
          vendor_payment_terms: action.payload,
        },
      };
    case GET_CURRENCY:
      return {
        ...state,
        master_data: {
          ...state.master_data,
          currency: action.payload,
        },
      };
    case GET_VAT:
      return {
        ...state,
        master_data: {
          ...state.master_data,
          vat: action.payload,
        },
      };
    default:
      return state;
  }
};
