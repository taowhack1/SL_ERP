import { useReducer } from "react";
import { reducer } from "../../modules/production/reducers";

class ReducerClass {
  constructor(data, dispatch, initialState, commonData) {
    this.data = data;
    // this.dispatch = dispatch;
    // this.data = initialState;
    this.initialState = initialState;
    this.commonData = commonData;
  }
  resetDataObject = () => {
    this.dispatch({
      type: "SET_HEAD",
      payload: this.initialState,
    });
  };
  resetDataArray = () => {
    this.dispatch({
      type: "SET_HEAD",
      payload: [this.initialState],
    });
  };
  setReducer = (dataType = "object") => {
    [this.data, this.dispatch] = useReducer(
      reducer,
      dataType === "object"
        ? this.data ?? this.initialState
        : [this.data ?? this.initialState]
    );
  };
  setDataObject = (data = {}) => {
    this.dispatch({
      type: "SET_HEAD",
      payload: data ? data : this.initialState,
    });
  };
  setDataArray = (data = []) => {
    console.log("setDataArray", data);
    this.dispatch({
      type: "SET_DETAIL",
      payload: data && data.length ? data : [this.initialState],
    });
  };
  setDataArray2D = (data = []) => {
    this.dispatch({
      type: "SET_ARRAY_2D",
      payload: data && data.length ? data : [this.initialState],
    });
  };
  getFlow = () => {
    this.flow =
      this.data &&
      this.data.data_flow_process &&
      this.data.data_flow_process.map((step) => {
        return step.all_group_in_node;
      });
    return this.flow;
  };
  setDispatch = (dispatch) => {
    this.dispatch = dispatch;
  };
  setInitialState = (initialState) => {
    this.initialState = initialState;
  };

  setData = (data) => {
    return (this.data = data);
  };
  getData = () => {
    return this.data;
  };
  addNewRow = (dataRow, id) => {
    id !== undefined && id !== null
      ? this.dispatch({
          type: "ADD_ROW_2D_DETAIL",
          payload: {
            id: id,
            data: dataRow ?? this.initialState,
          },
        })
      : this.dispatch({
          type: "ADD_ROW",
          payload: dataRow ?? this.initialState,
        });
  };
  addNewRow2D = (dataRow) => {
    this.dispatch({
      type: "ADD_ROW_2D",
      payload: dataRow ?? this.initialState,
    });
  };
  addNewRowNoCommit = () => {
    this.dispatch({
      type: "ADD_ROW_WOC",
      payload: { ...this.initialState, ...this.commonData },
    });
  };

  deleteRow = (id, field_id) => {
    id !== undefined &&
      id !== null &&
      this.dispatch({
        type: "DEL_ROW",
        payload: { id: id, field_id: field_id },
      });
  };
  deleteRow2D = (id, id2) => {
    if (id2 !== null && id2 !== undefined) {
      this.dispatch({
        type: "DEL_ROW_2D_DETAIL",
        payload: { id: id, id2: id2 },
      });
    } else {
      id !== undefined &&
        id !== null &&
        this.dispatch({ type: "DEL_ROW_2D", payload: { id: id } });
    }
  };

  updateRowStatus = (id, objStatus) => {
    id !== undefined &&
      id !== null &&
      this.dispatch({
        type: "CHANGE_DETAIL_VALUE",
        payload: {
          id: id,
          data: { ...objStatus, ...this.commonData },
        },
      });
  };
  onChangeHeadValue = (data) => {
    this.dispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  onChangeDetailValue = (id, data) => {
    id !== undefined &&
      id !== null &&
      data &&
      this.dispatch({
        type: "CHANGE_DETAIL_VALUE",
        payload: {
          id: id,
          data: { ...data, ...this.commonData },
        },
      });
  };
  onChangeDetailValue2D = (id, id2, data) => {
    id !== undefined &&
      id !== null &&
      data &&
      this.dispatch({
        type: "CHANGE_DETAIL_VALUE_2D",
        payload: {
          id: id,
          id2: id2,
          data: { ...data, ...this.commonData },
        },
      });
  };
}
export default ReducerClass;
