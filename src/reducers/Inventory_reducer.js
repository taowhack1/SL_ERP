import {
  GET_SELECT_UOM,
  GET_ITEM_DETAIL,
  GET_ALL_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  GET_SELECT_ITEM,
  GET_RECEIVE_LIST,
  GET_RECEIVE_SUB_DETAIL,
  GET_RECEIVE_DETAIL,
  GET_RECEIVE_HEAD,
  GET_PO_RECEIVE_LIST,
} from "../actions/types";
const initialState = {
  select_box_uom: [],
  select_box_item: [],
  master_data: {
    item_uom: [],
    item_type: [],
    item_benefit: [],
    item_category: [],
  },
  items: null,
  receive: {
    po_ref: [],
    receive_list: [],
    receive_head: {},
    receive_detail: [],
    receive_sub_detail: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECT_UOM:
      return { ...state, select_box_uom: action.payload };
    case GET_SELECT_ITEM:
      return { ...state, select_box_item: action.payload };
    case GET_ITEM_DETAIL:
      return {
        ...state,
        master_data: action.payload,
      };
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

    case GET_RECEIVE_LIST:
      return {
        ...state,
        receive: { ...state.receive, receive_list: action.payload },
      };
    case GET_PO_RECEIVE_LIST:
      return {
        ...state,
        receive: { ...state.receive, po_ref: action.payload },
      };
    case GET_RECEIVE_HEAD:
      return {
        ...state,
        receive: { ...state.receive, receive_head: action.payload },
      };
    case GET_RECEIVE_DETAIL:
      return {
        ...state,
        receive: { ...state.receive, receive_detail: action.payload },
      };
    case GET_RECEIVE_SUB_DETAIL:
      return {
        ...state,
        receive: { ...state.receive, receive_sub_detail: action.payload },
      };
    default:
      return state;
  }
};
