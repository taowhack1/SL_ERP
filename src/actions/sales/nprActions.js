/** @format */

import { message } from "antd";
import axios from "axios";
import { sortData } from "../../include/js/function_main";
import { errorText, header_config } from "../../include/js/main_config";
import {
  SEARCH_NPR,
  SEARCH_NPR_ESTIMATE,
  SEARCH_NPR_PD,
  SEARCH_NPR_PU,
  SEARCH_NPR_RD,
  SET_LOADING,
} from "../types";

const GET_NPR_LIST = "GET_NPR_LIST";
const GET_NPR_ITEM_LIST = "GET_NPR_ITEM_LIST";
const GET_NPR_SMD_MASTER_DATA = "GET_NPR_SMD_MASTER_DATA";
const apiNPR = `/sales/npr`;
// const apiNPR = `/sales/npr_rd`;
const apiNPRItems = `/list/item/npr`;
export const apiNPRRD = `/sales/npr_rd`;
const apiGetNPRFormula = `/sales/npr_formula/npr`;
const apiNPRFormula = `/sales/npr_formula`;
const apiGetNPRFeedback = `/sales/npr_satisfication/formula`;
const apiNPRSMDMasterData = `/list/smd_item_master_data`;
const apiNPRSaveFormulaRemark = `/sales/npr_formula/remark`;
const apiNPRAllRevisionFormula = `/sales/npr_formula/running`;
const apiGetNPRByYear = `/list/npr/npr_formula/year`;
const apiNPRPkPrice = `/sales/npr_price`;
// const apiGetNPRPDCost = `/sales/npr_product_cost`;
const apiNPRPDCost = `/sales/npr_product_cost`;
const apiNPREstimate = `/sales/npr_estimate`;
const apiNPREstimateCalculator = `/sales/npr_estimate/calculate`;

const apiNPRUpdatePIC = `/sales/npr/update`;
const apiNPRRequestSample = `/sales/npr_additional`;

const apiUpdateNPRStatus = `/sales/npr/status`;
const apiUpdateNPRFormulaCost = `/sales/npr_formula/cost`;
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
const getNPRList = () => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    axios
      .get(`${apiNPRRD}`, header_config)
      .then((res) => {
        console.log("res.data", res.data);
        if (res.data) {
          // const data = res.data.filter((obj) =>
          //   branch_id === 3
          //     ? obj.branch_id === branch_id && obj.npr_rd_type_id === 2
          //     : obj
          // );
          dispatch({ type: GET_NPR_LIST, payload: sortData(res.data) });
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
        console.log("getNPRByID", res);
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
const updateNPRRDStatus = (id = null, data) => {
  try {
    if (id === null || id === undefined)
      return message.error("Error! Missing NPR ID.");
    return axios
      .put(`${apiNPRUpdatePIC}/${id}`, data, header_config)
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
    console.log(
      `getNPRAllRevisionFormula : ${apiNPRAllRevisionFormula}/${npr_running_id}`
    );
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

const getNPRPDCost = (npr_id) => {
  try {
    console.log("getNPRPkPrice", npr_id);
    if (!npr_id) return { success: false, data: {}, message: "Missing npr_id" };
    return axios
      .get(`${apiNPRPDCost}/${npr_id}`, header_config)
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

const saveNPRPDCost = (data) => {
  try {
    return data.npr_product_cost_id
      ? axios
          .put(
            `${apiNPRPDCost}/${data.npr_product_cost_id}`,
            [data],
            header_config
          )
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
          .post(`${apiNPRPDCost}`, [data], header_config)
          .then((res) => {
            console.log("POST res", res);
            if (res.status === 200) {
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
    console.log("try catch");
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

const getNPREstimate = (id) => {
  try {
    if (!id) return { success: false, data: {}, message: "Missing id" };
    return axios
      .get(`${apiNPREstimate}/${id}`, header_config)
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

const getEstimateCalculate = (data) => {
  const { npr_id, npr_formula_id, npr_product_cost_detail_id } = data;
  const estimateMarkup = data.npr_estimate_detail_sub
    .map((obj) => obj.npr_estimate_detail_sub_mark_up_percent_qty)
    .toString()
    .replaceAll(",", "&");
  console.log("estimateMarkup", estimateMarkup);
  console.log("getEstimate");
  const queryString = `${npr_id}&${npr_formula_id}&${npr_product_cost_detail_id}&${estimateMarkup}`;
  console.log("queryString", queryString);
  try {
    if (!queryString)
      return { success: false, data: {}, message: "Missing queryString" };
    return axios
      .get(`${apiNPREstimateCalculator}/${queryString}`, header_config)
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

const saveEstimate = (data, alert) => {
  console.log("Save Estimate data", data);
  try {
    return data.npr_estimate_id
      ? axios
          .put(
            `${apiNPREstimate}/${data.npr_estimate_id}`,
            [data],
            header_config
          )
          .then((res) => {
            console.log("PUT res", res);
            if (res.status === 200) {
              alert && message.success("Update Successfully..");
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
          .post(`${apiNPREstimate}`, [data], header_config)
          .then((res) => {
            console.log("POST res", res);
            if (res.status === 200) {
              alert && message.success("Save Successfully..");
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

const getNPRRequestSample = (id) => {
  try {
    if (!id) {
      message.error("Error! Missing ID.");
      return { success: false, data: null };
    }
    return axios
      .get(`${apiNPRRequestSample}/${id}`, header_config)
      .then((res) => {
        console.log("res", res);
        if (res?.status === 200) {
          return { success: true, data: res.data };
        } else {
          return { success: false, data: null };
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(errorText.getData);
        return { success: false, data: null };
      });
  } catch (error) {
    console.log(error);
    message.error(errorText.getData);
    return { success: false, data: null };
  }
};

const saveSampleRequest = (data, alert) => {
  console.log("Save saveSampleRequest data", data);
  try {
    return axios
      .put(
        `${apiNPRRequestSample}/${data.npr_additional_id}`,
        [data],
        header_config
      )
      .then((res) => {
        console.log("PUT res", res);
        if (res.status === 200) {
          alert && message.success("Update Successfully..");
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
const updateNPRStatus = (data, alert) => {
  console.log("updateNPRStatus data", data);
  try {
    return axios
      .put(`${apiUpdateNPRStatus}/${data.npr_id}`, [data], header_config)
      .then((res) => {
        console.log("PUT res", res);
        if (res.status === 200) {
          alert && message.success("Update Successfully..");
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
const updateNPRFormulaCost = (npr_formula_id, alert) => {
  console.log("updateNPRFormulaCost");
  try {
    return axios
      .put(`${apiUpdateNPRFormulaCost}/${npr_formula_id}&0`, header_config)
      .then((res) => {
        console.log("PUT res", res);
        if (res.status === 200) {
          alert && message.success("Update Successfully..");
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
export const filterNPR_RD = (data) => (dispatch) =>
  dispatch({ type: SEARCH_NPR_RD, payload: data });
export const filterNPR_PU = (data) => (dispatch) =>
  dispatch({ type: SEARCH_NPR_PU, payload: data });
export const filterNPR_PD = (data) => (dispatch) =>
  dispatch({ type: SEARCH_NPR_PD, payload: data });
export const filterNPR_ESTIMATE = (data) => (dispatch) =>
  dispatch({ type: SEARCH_NPR_ESTIMATE, payload: data });
export {
  GET_NPR_LIST,
  GET_NPR_ITEM_LIST,
  GET_NPR_SMD_MASTER_DATA,
  getNPRList,
  getNPRByID,
  getNPRItemList,
  updateNPRRDStatus,
  getNPRFormula,
  saveNPRFormula,
  getNPRFeedback,
  getNPRSMDMasterData,
  saveNPRFormulaRemark,
  getNPRAllRevisionFormula,
  getNPRByYear,
  getNPRPkPrice,
  saveNPRPkPrice,
  getNPRPDCost,
  saveNPRPDCost,
  getNPREstimate,
  getEstimateCalculate,
  saveEstimate,
  getNPRRequestSample,
  saveSampleRequest,
  updateNPRStatus,
  updateNPRFormulaCost,
};
