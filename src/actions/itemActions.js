import { GET_ITEM_DETAIL } from "../actions/types";
import { api_url } from "../include/js/main_config";
import axios from "axios";
const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getSelectDetail = () => async (dispatch) => {
  console.log("getSelectDetail running..");
  const api_path = "/query/sql";
  const query_uom = {
    query_sql:
      "SELECT uom_id, uom_no, uom_name, uom_remark FROM [INVENTORY].[dbo].[tb_uom] WHERE uom_actived = 1",
  };
  const query_item_type = {
    query_sql:
      "SELECT type_id, type_no, type_name FROM [INVENTORY].[dbo].[tb_type] WHERE type_actived = 1",
  };
  const query_categ = {
    query_sql:
      "SELECT category_id, category_no, category_name FROM [INVENTORY].[dbo].[tb_category] WHERE category_actived = 1",
  };
  const query_benefit = {
    query_sql:
      "SELECT identify_benefit_id, identify_benefit_no, identify_benefit_name FROM [INVENTORY].[dbo].[tb_identify_benefit] WHERE identify_benefit_actived = 1",
  };
  let select_detail = {
    item_uom: [],
    item_type: [],
    item_benefit: [],
    item_category: [],
  };
  let item_categ = [];
  console.log(query_uom);
  await axios.post(api_url + api_path, query_uom, header_config).then((res) => {
    select_detail.item_uom.push(...res.data[0]);
  });
  await axios
    .post(api_url + api_path, query_item_type, header_config)
    .then((res) => {
      select_detail.item_type.push(...res.data[0]);
    });
  await axios
    .post(api_url + api_path, query_benefit, header_config)
    .then((res) => {
      select_detail.item_benefit.push(...res.data[0]);
    });
  await axios
    .post(api_url + api_path, query_categ, header_config)
    .then((res) => {
      select_detail.item_category.push(...res.data[0]);
    });

  dispatch({
    type: GET_ITEM_DETAIL,
    payload: select_detail,
  });
};
