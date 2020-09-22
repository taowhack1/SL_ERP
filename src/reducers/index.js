import { combineReducers } from "redux";
import authReducer from "./authReducer";
import systemConfigReducer from "./systemConfigReducer";
import salaryReducer from "./salaryReducer";

export default combineReducers({
  auth: authReducer,
  systemConfig: systemConfigReducer,
  salary: salaryReducer,
});
