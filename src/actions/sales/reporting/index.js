import axios from "axios";
import { header_config } from "../../../include/js/main_config";
const apiGetCompareFormula = `/sales/npr_formula/separate`;
const apiGetFormulaNoByNPRId = `/list/npr/npr_formula`;
const getCompareFormula = (npr_formula_id_1, npr_formula_id_2) => {
  try {
    if (!npr_formula_id_1 || !npr_formula_id_2)
      return { success: false, data: [], message: "Missing npr_formula_id" };
    return axios
      .get(
        `${apiGetCompareFormula}/${npr_formula_id_1}&${npr_formula_id_2}`,
        header_config
      )
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          return { success: true, data: resp.data, message: "success" };
        } else {
          return { success: false, data: [], message: resp };
        }
      })
      .catch((error) => {
        console.log(error);
        return { success: false, data: [], message: error };
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: [], message: error };
  }
};
const getFormulaNoByNPRId = (npr_id) => {
  try {
    if (!npr_id) return { success: false, data: [], message: "Missing npr_id" };
    return axios
      .get(`${apiGetFormulaNoByNPRId}/${npr_id}`, header_config)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          return { success: true, data: resp.data, message: "success" };
        } else {
          return { success: false, data: [], message: resp };
        }
      })
      .catch((error) => {
        console.log(error);
        return { success: false, data: [], message: error };
      });
  } catch (error) {
    console.log(error);
    return { success: false, data: [], message: error };
  }
};

export { getCompareFormula, getFormulaNoByNPRId };
