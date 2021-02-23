/** @format */

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import systemConfigReducer from "./systemConfigReducer";
import salaryReducer from "./salaryReducer";
import inventoryReducer from "./Inventory_reducer";
import purchaseReducer from "./Purchase_Reducer";
import hrmReducer from "./HRM_Reducer";
import comments from "./Comment_Log_Reducer";
import salesReducer from "./Sales_Reducer";
import QAReducer from "./QA_Reducer";
import AccountingReducer from "./Accounting_Reducer";
import { USER_LOGOUT } from "../actions/types";
import ProductionReducer from "./ProductionReducer";
import { reducer as formReducer } from "redux-form";
export const appReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  systemConfig: systemConfigReducer,
  salary: salaryReducer,
  inventory: inventoryReducer,
  sales: salesReducer,
  purchase: purchaseReducer,
  qa: QAReducer,
  hrm: hrmReducer,
  log: comments,
  accounting: AccountingReducer,
  production: ProductionReducer,
});
export const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};
// export default combineReducers({
//   auth: authReducer,
//   systemConfig: systemConfigReducer,
//   salary: salaryReducer,
//   inventory: inventoryReducer,
//   sales: salesReducer,
//   purchase: purchaseReducer,
//   qa: QAReducer,
//   hrm: hrmReducer,
//   log: comments,
//   accounting: AccountingReducer,
// });
