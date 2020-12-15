class ReducerClass {
  // dispatch = null;
  // initialState = null;
  constructor(dispatch, initialState, commonData) {
    this.dispatch = dispatch;
    this.initialState = initialState;
    this.commonData = commonData;
  }
  addLineNoCommit = () => {
    this.dispatch({
      type: "ADD_ROW_WOC",
      payload: { ...this.initialState, ...this.commonData },
    });
  };

  delLine = (id) => {
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

  onChangeValue = (id, data) => {
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
