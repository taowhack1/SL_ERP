import { sortData } from "../../../include/js/function_main";

export const reducer = (state, action) => {
  const { head_id, detail_field, id, data } = action.payload;
  const getDetailTemp = (index, field) => {
    let tempDetail = [];
    if ((index !== null || index !== undefined) && field) {
      tempDetail = state[index][field];
    }
    return tempDetail;
  };
  let copyState = state;
  let newState = [];
  let detailTemp = getDetailTemp(head_id, detail_field);
  switch (action.type) {
    case "ADD_ROW":
      if (head_id !== null && head_id !== undefined) {
        copyState[head_id][detail_field] = sortData([
          ...copyState[head_id][detail_field],
          data,
        ]);
        newState = copyState;
      } else {
        newState = sortData([...state, action.payload]);
      }
      console.log("Reducer", newState);
      return newState;

    case "DEL_ROW":
      if (head_id !== null && head_id !== undefined) {
        copyState[head_id][detail_field] = sortData(
          detailTemp.filter((line) => line.id !== id)
        );
        newState = copyState;
      } else {
        newState = sortData(state.filter((line) => line.id !== id));
      }
      return newState;
    case "CHANGE_DETAIL_VALUE":
      return state.map((line) =>
        line.id === id ? { ...line, ...data } : line
      );
    case "SET_DETAIL":
      return sortData(action.payload);
    case "SET_HEAD":
      return action.payload;
    case "RESET_DATA":
      return action.payload;
    case "CHANGE_HEAD_VALUE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
