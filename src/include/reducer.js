import { data } from "jquery";
import { api_create_quotation } from "./js/api";
import { sortData, sortDataWithoutCommit } from "./js/function_main";

export const mainReducer = (state, action) => {
  const { key, detailKey, rowId, data, id } = action.payload;
  switch (action.type) {
    case "ADD_ROW":
      return sortData([...state, action.payload]);
    case "ADD_ROW_WOC":
      return sortDataWithoutCommit([...state, action.payload]);
    case "ADD_ROW_2D":
      return [...state, sortData(action.payload)];
    case "ADD_ROW_2D_DETAIL":
      state[action.payload.id].push(action.payload.data);
      state[action.payload.id] = sortData(state[action.payload.id]);
      console.log(state);
      return state;
    case "DEL_ROW":
      state = sortData(state.filter((line) => line.id !== action.payload.id));
      state = action.payload.field_id
        ? state.map((data, index) => {
            return { ...data, [action.payload.field_id]: index + 1 };
          })
        : state;
      return state;
    case "DEL_ROW_WOC":
      state = sortDataWithoutCommit(
        state.filter((line) => line.id !== action.payload.id)
      );
      state = action.payload.field_id
        ? state.map((data, index) => {
            return { ...data, [action.payload.field_id]: index + 1 };
          })
        : state;
      console.log(state);
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
    case "SET_ARRAY":
    case "SET_DETAIL":
      return sortData(action.payload);
    case "SET_DETAIL_WOC":
      return sortDataWithoutCommit(action.payload);
    case "SET_ARRAY_2D":
      // console.log("SET_ARRAY_2D", action.payload);
      return action.payload.map((data) => sortData(data));
    case "SET_HEAD":
    case "SET_DATA_OBJECT":
    case "RESET_DATA":
      return action.payload;
    case "RESET_DETAIL":
      return action.payload ?? [];
    case "CHANGE_OBJ_VALUE":
    case "CHANGE_HEAD_VALUE":
      return { ...state, ...action.payload };
    case "SEARCH_DETAIL":
      return action.payload;
    case "ADD_ROW_ARRAY_OBJ_DETAIL":
      // {...obj,[detail.key]:[...old,new]}
      return state.map((obj, index) =>
        obj.id === action.payload.headId
          ? {
              ...obj,
              [action.payload.key]: sortData([
                ...obj[action.payload.key],
                action.payload.data,
              ]),
            }
          : obj
      );
    case "DEL_ROW_ARRAY_OBJ_DETAIL":
      return state.map((obj) =>
        obj.id === action.payload.headId
          ? {
              ...obj,
              [action.payload.key]: sortData(
                obj[action.payload.key].filter(
                  (obj) => obj.id !== action.payload.rowId
                )
              ),
            }
          : obj
      );
    case "CHANGE_OBJ_ARRAY_DETAIL_VALUE":
      console.log(action.payload);
      // [{...,detail:[...,{...}]}]
      const newState = state.map((obj) =>
        obj.id === action.payload.headId
          ? {
              ...obj,
              [action.payload.key]: obj[action.payload.key].map((objDetail) =>
                objDetail.id === action.payload.rowId
                  ? { ...objDetail, ...action.payload.data }
                  : objDetail
              ),
            }
          : obj
      );
      console.log("newState", newState);
      return newState;

    case "ADD_ROW_OBJ_OBJ_DETAIL_ARRAY_VALUE":
      // ex. {...,key:{ ...otherKey, yourKey : [...old,new] }}
      // require key , detailKey , data : newRow
      return {
        ...state,
        [key]: {
          ...state[key],
          [detailKey]: sortData([...state[key][detailKey], data]),
        },
      };
    case "DEL_ROW_OBJ_OBJ_DETAIL_ARRAY_VALUE":
      // ex. {...,key:{ ...otherKey, yourKey : [new] }}
      // require key , detailKey , data : newRow
      return {
        ...state,
        [key]: {
          ...state[key],
          [detailKey]: sortData(
            state[key][detailKey].filter((obj) => obj.id !== id)
          ),
        },
      };
    case "CHANGE_OBJ_OBJ_DETAIL_ARRAY_VALUE":
      // ex. {...,key:{ ...otherKey, yourKey : [{...},{...},{...yourRow,...data}] }}
      // require key, detailKey, rowId, data
      return {
        ...state,
        [key]: {
          ...state[key],
          [detailKey]: state[key][detailKey].map((obj) =>
            obj.id === rowId ? { ...obj, ...data } : obj
          ),
        },
      };
    case "CHANGE_OBJ_DETAIL_VALUE":
      // { ...,detail:[newDetail]}
      return {
        ...state,
        [action.payload.key]: state[action.payload.key]?.map((obj) =>
          obj.id === action.payload.rowId
            ? { ...obj, ...action.payload.data }
            : obj
        ),
      };
    default:
      return state;
  }
};
