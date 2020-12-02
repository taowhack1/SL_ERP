import { sortData } from "../../../include/js/function_main";

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return sortData([...state, action.payload]);
    case "DEL_ROW":
      return sortData(state.filter((line) => line.id !== action.payload.id));
    case "CHANGE_DETAIL_VALUE":
      return state.map((line) =>
        line.id === action.payload.id
          ? { ...line, ...action.payload.data }
          : line
      );
    case "SET_DETAIL":
      return sortData(action.payload);
    case "SET_HEAD":
      return action.payload;
    case "RESET_DATA":
      return action.payload;
    case "CHANGE_HEAD_VALUE":
      return { ...state, ...action.payload };
  }
};
