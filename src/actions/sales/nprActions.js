/** @format */

import { message } from "antd";
import axios from "axios";
import { sortData } from "../../include/js/function_main";
import { errorText, header_config } from "../../include/js/main_config";
import { SET_LOADING } from "../types";

const GET_NPR_LIST = "GET_NPR_LIST";
const GET_NPR_ITEM_LIST = "GET_NPR_ITEM_LIST";
const GET_NPR_SMD_MASTER_DATA = "GET_NPR_SMD_MASTER_DATA";
const apiNPR = `/sales/npr`;
const apiNPRItems = `/list/item/npr`;
const apiNPRRD = `/sales/npr_rd`;
const apiGetNPRFormula = `/sales/npr_formula/npr`;
const apiNPRFormula = `/sales/npr_formula`;
const apiGetNPRFeedback = `/sales/npr_satisfication/formula`;
const apiNPRSMDMasterData = `/list/smd_item_master_data`;
const apiNPRSaveFormulaRemark = `/sales/npr_formula/remark`;
const apiNPRAllRevisionFormula = `/sales/npr_formula/running`;
const apiGetNPRByYear = `/list/npr/npr_formula/year`;
const apiNPRPkPrice = `/sales/npr_price`;

const getNPRItemList = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiNPRItems}`, header_config)
      .then((res) => {
        if (res.data) {
          dispatch({
            type: GET_NPR_ITEM_LIST,
            payload: sortData(res.data[0]),
          });
        } else {
          message.error(errorText.getData);
        }
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        dispatch({ type: GET_NPR_ITEM_LIST, payload: [] });
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    dispatch({ type: SET_LOADING, payload: false });
  }
};
const getNPRList = (branch_id) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiNPR}`, header_config)
      .then((res) => {
        if (res.data) {
          const data = res.data.filter((obj) =>
            branch_id === 3 ? obj.branch_id === branch_id : obj
          );
          dispatch({ type: GET_NPR_LIST, payload: sortData(data) });
        } else {
          message.error(errorText.getData);
        }
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        dispatch({ type: GET_NPR_LIST, payload: [] });
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    dispatch({ type: SET_LOADING, payload: false });
  }
};
const getNPRByID = (id = null) => {
  try {
    return axios
      .get(`${apiNPR}/${id}`, header_config)
      .then((res) => {
        if (res.data) {
          return { success: true, data: res.data };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null };
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};
const saveNPRAssignment = (id = null, data) => {
  try {
    if (id === null || id === undefined)
      return message.error("Error! Missing NPR ID.");
    return axios
      .put(`${apiNPRRD}/${id}`, data, header_config)
      .then((res) => {
        if (res.data) {
          return { success: true, data: res.data };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};
const getNPRFormula = (id) => {
  try {
    if (id === null || id === undefined)
      return message.error("Error! Missing NPR ID.");
    return axios
      .get(`${apiGetNPRFormula}/${id}`, header_config)
      .then((res) => {
        if (res.data) {
          return { success: true, data: res.data };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

const saveNPRFormula = (id = null, data) => {
  try {
    return id
      ? axios
          .put(`${apiNPRFormula}/${id}`, [data], header_config)
          .then((res) => {
            if (res.data) {
              message.success("Update Successfully..");
              return { success: true, data: res.data };
            } else {
              message.error(errorText.getData);
              return { success: false, data: null };
            }
          })
          .catch((error) => {
            if (!error.response) {
              message.error(errorText.network);
            } else {
              message.error(errorText.formValid);
            }
            return { success: false, data: null, error: error.response };
          })
      : axios
          .post(`${apiNPRFormula}/`, [data], header_config)
          .then((res) => {
            if (res.data) {
              message.success("Save Successfully..");
              return { success: true, data: res.data };
            } else {
              message.error(errorText.getData);
              return { success: false, data: null };
            }
          })
          .catch((error) => {
            if (!error.response) {
              message.error(errorText.network);
            } else {
              message.error(errorText.formValid);
            }
            return { success: false, data: null, error: error.response };
          });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

const getNPRFeedback = (id) => {
  try {
    if (id === null || id === undefined)
      return message.error("Error! Missing NPR ID.");
    return axios
      .get(`${apiGetNPRFeedback}/${id}`, header_config)
      .then((res) => {
        const { data } = res.data;
        return { success: true, data: data };
      })
      .catch((error) => {
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};
const getNPRSMDMasterData = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiNPRSMDMasterData}`, header_config)
      .then((res) => {
        if (res.data) {
          dispatch({ type: GET_NPR_SMD_MASTER_DATA, payload: res.data });
        } else {
          message.error(errorText.getData);
          dispatch({ type: SET_LOADING, payload: false });
        }
      })
      .catch((error) => {
        dispatch({ type: SET_LOADING, payload: false });
        if (!error.response) message.error(errorText.network);
        if (error.response) message.error(errorText.getData);
      });
  } catch (error) {
    dispatch({ type: SET_LOADING, payload: false });
    console.log(error);
    message.error(errorText.getData);
  }
};

const saveNPRFormulaRemark = (npr_formula_id = null, data) => {
  try {
    if (!npr_formula_id)
      return { success: false, data: null, message: "Missing npr_formula_id " };
    return axios
      .post(`${apiNPRSaveFormulaRemark}/${npr_formula_id}`, data, header_config)
      .then((res) => {
        const {
          return_data: { success, data: returnData },
        } = res.data;
        if (success) {
          message.success("Save Successfully..");
          return { success: true, data: returnData };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        if (!error.response) {
          message.error(errorText.network);
        } else {
          message.error(errorText.formValid);
        }
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

const getNPRAllRevisionFormula = (npr_running_id = null) => {
  try {
    if (!npr_running_id)
      return { success: false, data: null, message: "Missing npr_running_id " };
    return axios
      .get(`${apiNPRAllRevisionFormula}/${npr_running_id}`, header_config)
      .then((res2) => {
        if (res2.status === 200) {
          return { success: true, data: res2.data };
        } else {
          message.error(errorText.getData);
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        console.log("catch");
        if (!error.response) {
          message.error(errorText.network);
        } else {
          message.error(errorText.formValid);
        }
        return { success: false, data: null, error: error.response };
      });
  } catch (error) {
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

const getNPRByYear = (
  year = "2020",
  customer_name = "0",
  product_name = "0"
) => {
  try {
    return axios
      .get(
        `${apiGetNPRByYear}/${year}&${customer_name}&${product_name}`,
        header_config
      )
      .then((resp) => {
        if (resp.status === 200) {
          console.log("resp.data", resp.data);
          return { success: true, data: resp.data, message: "Success" };
        } else {
          return { success: false, data: [], message: resp };
        }
      })
      .catch((error) => {
        console.error(error);
        if (error?.response) {
          console.error(error.response);
        }
        return { success: false, data: [], message: error };
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: [], message: error };
  }
};
const getNPRPkPrice = (npr_id) => {
  try {
    console.log("getNPRPkPrice", npr_id);
    if (!npr_id) return { success: false, data: {}, message: "Missing npr_id" };
    return axios
      .get(`${apiNPRPkPrice}/${npr_id}`, header_config)
      .then((resp) => {
        if (resp.status === 200) {
          console.log("resp.data", resp.data);
          return { success: true, data: resp.data, message: "Success" };
        } else {
          return { success: false, data: {}, message: resp };
        }
      })
      .catch((error) => {
        console.error(error);
        if (error?.response) {
          console.error(error.response);
        }
        return { success: false, data: [], message: error };
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: {}, message: error };
  }
};

const saveNPRPkPrice = (data) => {
  try {
    return data.npr_price_id
      ? axios
          .put(`${apiNPRPkPrice}/${data.npr_price_id}`, [data], header_config)
          .then((res) => {
            console.log("PUT res", res);
            if (res.status === 200) {
              message.success("Update Successfully..");
              return { success: true, data: res.data };
            } else {
              message.error(errorText.getData);
              return { success: false, data: null };
            }
          })
          .catch((error) => {
            if (!error.response) {
              message.error(errorText.network);
            } else {
              message.error(errorText.formValid);
            }
            return { success: false, data: null, error: error.response };
          })
      : axios
          .post(`${apiNPRPkPrice}`, [data], header_config)
          .then((res) => {
            console.log("POST res", res);
            if (res.status === 200) {
              message.success("Update Successfully..");
              return { success: true, data: res.data };
            } else {
              message.error(errorText.getData);
              return { success: false, data: null };
            }
          })
          .catch((error) => {
            if (!error.response) {
              message.error(errorText.network);
            } else {
              message.error(errorText.formValid);
            }
            return { success: false, data: null, error: error.response };
          });
  } catch (error) {
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

export {
  GET_NPR_LIST,
  GET_NPR_ITEM_LIST,
  GET_NPR_SMD_MASTER_DATA,
  getNPRList,
  getNPRByID,
  getNPRItemList,
  saveNPRAssignment,
  getNPRFormula,
  saveNPRFormula,
  getNPRFeedback,
  getNPRSMDMasterData,
  saveNPRFormulaRemark,
  getNPRAllRevisionFormula,
  getNPRByYear,
  getNPRPkPrice,
  saveNPRPkPrice,
};
