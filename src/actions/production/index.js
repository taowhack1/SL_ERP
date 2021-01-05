import axios from "axios";
import {
  api_machine_category,
  api_machine_item_type,
  api_machine_type,
  api_work_center_capacity_categ,
  api_work_center_category,
  api_work_center_type,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import { GET_PRODUCTION_MASTER_DATA, RESET_PRODUCTION } from "../types";

export const getProductionMasterData = () => (dispatch) => {
  try {
    const get_machine_item_type = axios.get(
      api_machine_item_type,
      header_config
    );
    const get_machine_type = axios.get(api_machine_type, header_config);
    const get_machine_category = axios.get(api_machine_category, header_config);

    const get_work_center_type = axios.get(api_work_center_type, header_config);
    const get_work_center_category = axios.get(
      api_work_center_category,
      header_config
    );
    const get_work_center_capacity_categ = axios.get(
      api_work_center_capacity_categ,
      header_config
    );

    Promise.allSettled([
      get_machine_item_type,
      get_machine_type,
      get_machine_category,
      get_work_center_type,
      get_work_center_category,
      get_work_center_capacity_categ,
    ])
      .then((data) => {
        console.log(data);
        const masterData = {
          machine: {
            itemType: data[0].value.data[0],
            machineType: data[1].value.data[0],
            machineCategory: data[2].value.data[0],
          },
          workCenter: {
            workCenterType: data[3].value.data[0],
            workCenterCategory: data[4].value.data[0],
            capacityCategory: data[5].value.data[0],
          },
        };
        dispatch({
          type: GET_PRODUCTION_MASTER_DATA,
          payload: masterData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const resetProductionData = () => (dispatch) => {
  console.log("RESET PRODUCTION");
  dispatch({
    type: RESET_PRODUCTION,
  });
};
