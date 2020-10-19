import { combineReducers } from "redux";
import authReducer from "./authReducer";
import systemConfigReducer from "./systemConfigReducer";
import salaryReducer from "./salaryReducer";
import inventoryReducer from "./Inventory_reducer";
import purchaseReducer from "./Purchase_Reducer";
import hrmReducer from "./HRM_Reducer";
import comments from "./Comment_Log_Reducer";
import salesReducer from "./Sales_Reducer";

export default combineReducers({
  auth: authReducer,
  systemConfig: systemConfigReducer,
  salary: salaryReducer,
  inventory: inventoryReducer,
  sales: salesReducer,
  purchase: purchaseReducer,
  hrm: hrmReducer,
  log: comments,
});
