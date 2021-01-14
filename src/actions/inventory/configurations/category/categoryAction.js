import axios from "axios";
import { GET_CATEGORY_IN_ROW } from "../../../types";
export const get_category_in_row = (record) => (dispatch) => {
  dispatch({
    type: GET_CATEGORY_IN_ROW,
    payload: record,
  });
};
