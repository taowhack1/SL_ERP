import { GET_ITEM_DETAIL } from "../actions/types";
const initialState = {
  select_detail: {
    item_uom: [],
    item_type: [],
    item_benefit: [],
    item_category: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_DETAIL:
      return { ...state, select_detail: action.payload };
    default:
      return state;
  }
};
