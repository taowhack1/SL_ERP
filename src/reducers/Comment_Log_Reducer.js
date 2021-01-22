import { GET_LOG_BY_ID, RESET_COMMENTS } from "../actions/types";
const initialState = {
  comment_log: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOG_BY_ID:
      return { ...state, comment_log: action.payload };
    case RESET_COMMENTS:
      return { ...state, comment_log: [] };
    default:
      return state;
  }
};
