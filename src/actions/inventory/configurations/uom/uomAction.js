import axios from "axios";
import { GET_UOM_IN_ROW } from "../../../types";

export const getUomInRow = (record) => (dispatch) => {
  dispatch({
    type: GET_UOM_IN_ROW,
    payload: record,
  });
};
