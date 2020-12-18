import { useReducer } from "react";
import { reducer } from "../../modules/production/reducers";

class ReducerClass {
  // dispatch = null;
  // initialState = null;
  constructor(data, dispatch, initialState, commonData) {
    // this.data = data;
    // this.dispatch = dispatch;
    this.data = initialState;
    this.initialState = initialState;
    this.commonData = commonData;
    console.log("ReducerConstuctor");
  }
  setReducer = (type = 1) => {
    console.log("setReducer");

    [this.data, this.dispatch] = useReducer(
      reducer,
      type === 1 ? this.initialState : [this.initialState]
    );
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
  setDispatch = (commonData) => {
    this.commonData = commonData;
  };

  setData = (data) => {
    return (this.data = data);
  };
  getData = () => {
    return this.data;
  };
  addNewRow = () => {
    this.dispatch({
      type: "ADD_ROW",
      payload: this.initialState,
    });
  };
  addNewRowNoCommit = () => {
    this.dispatch({
      type: "ADD_ROW_WOC",
      payload: { ...this.initialState, ...this.commonData },
    });
  };

  deleteRow = (id) => {
    id !== undefined &&
      id !== null &&
      this.dispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  updateRowStatus = (id, objStatus) => {
    console.log(id);
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
}
export default ReducerClass;
