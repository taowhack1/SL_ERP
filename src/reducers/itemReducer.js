import {
  GET_ITEM_DETAIL,
  GET_ALL_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
} from "../actions/types";
const initialState = {
  select_detail: {
    item_uom: [],
    item_type: [],
    item_benefit: [],
    item_category: [],
  },
  items: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_DETAIL:
      return { ...state, select_detail: action.payload };
    case GET_ALL_ITEMS:
      return { ...state, items: action.payload };
    case CREATE_ITEM:
      return {
        ...state,
        items: [action.payload, ...state["items"]],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: [action.payload, ...state["items"]],
      };
    default:
      return state;
  }
};
