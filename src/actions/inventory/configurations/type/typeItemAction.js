import axios from "axios";
import { GET_ITEM_TYPE_IN_ROW } from "../../../types";
export const get_item_type_in_row = (record) => (dispatch) => {
  dispatch({
    type: GET_ITEM_TYPE_IN_ROW,
    payload: record,
  });
};
