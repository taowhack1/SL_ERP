import { sortData } from "../../../include/js/function_main";

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return sortData([...state, action.payload]);
    case "ADD_ROW_2D":
      return [...state, sortData(action.payload)];
    case "ADD_ROW_2D_DETAIL":
      state[action.payload.id].push(action.payload.data);
      state[action.payload.id] = sortData(state[action.payload.id]);
      console.log(state);
      return state;
    case "DEL_ROW":
      console.log("1", state);
      state = sortData(state.filter((line) => line.id !== action.payload.id));
      console.log("2", state);
      state = action.payload.field_id
        ? state.map((data, index) => {
            return { ...data, [action.payload.field_id]: index + 1 };
          })
        : state;
      console.log("3", state);

      return state;
    case "DEL_ROW_2D":
      return state.filter((state, index) => index !== action.payload.id);

    case "DEL_ROW_2D_DETAIL":
      console.log(`[${action.payload.id}][${action.payload.id2}]`);
      state[action.payload.id] = sortData(
        state[action.payload.id].filter(
          (state, index) => index !== action.payload.id2
        )
      );
      return state;
    case "CHANGE_DETAIL_VALUE":
      return state.map((line) =>
        line.id === action.payload.id
          ? { ...line, ...action.payload.data }
          : line
      );
    case "CHANGE_DETAIL_VALUE_2D":
      state[action.payload.id] = state[action.payload.id].map((line) => {
        return line.id === action.payload.id2
          ? { ...line, ...action.payload.data }
          : line;
      });
      return state;
    case "SET_DETAIL":
      return sortData(action.payload);
    case "SET_ARRAY_2D":
      // console.log("SET_ARRAY_2D", action.payload);
      return action.payload.map((data) => sortData(data));
    case "SET_HEAD":
      return action.payload;
    case "RESET_DATA":
      return action.payload;
    case "CHANGE_HEAD_VALUE":
      return { ...state, ...action.payload };
  }
};
