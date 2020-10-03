import {
  GET_ITEM_DETAIL,
  GET_ALL_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
} from "../actions/types";
import { api_url } from "../include/js/main_config";
import axios from "axios";

const header_config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const api_path = api_url + "/query/sql";
export const getAllItems = () => async (dispatch) => {
  const query_items = {
    query_sql: `SELECT A.*,B.uom_name, C.type_name, D.category_name, E.vat_name, 
      F.branch_name, G.identify_benefit_name FROM [INVENTORY].[dbo].[tb_item] A 
      LEFT JOIN [INVENTORY].[dbo].[tb_uom] B ON A.uom_id = B.uom_id 
      LEFT JOIN [INVENTORY].[dbo].[tb_type] C ON A.type_id = C.type_id 
      LEFT JOIN [INVENTORY].[dbo].[tb_category] D ON A.category_id = D.category_id 
      LEFT JOIN [PURCHASE].[dbo].[tb_vat] E ON A.vat_id = E.vat_id LEFT JOIN [HRM].[dbo].[tb_branch] F ON A.branch_id = F.branch_id LEFT JOIN [INVENTORY].[dbo].[tb_identify_benefit] G ON A.identify_benefit_id = G.identify_benefit_id`,
  };
  await axios.post(api_path, query_items).then((res) => {
    dispatch({
      type: GET_ALL_ITEMS,
      payload: res.data[0],
    });
  });
};

export const getSelectDetail = () => async (dispatch) => {
  console.log("getSelectDetail running..");
  // const api_path = "/query/sql";
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
  await axios.post(api_path, query_uom, header_config).then((res) => {
    select_detail.item_uom.push(...res.data[0]);
  });
  await axios.post(api_path, query_item_type, header_config).then((res) => {
    select_detail.item_type.push(...res.data[0]);
  });
  await axios.post(api_path, query_benefit, header_config).then((res) => {
    select_detail.item_benefit.push(...res.data[0]);
  });
  await axios.post(api_path, query_categ, header_config).then((res) => {
    select_detail.item_category.push(...res.data[0]);
  });

  dispatch({
    type: GET_ITEM_DETAIL,
    payload: select_detail,
  });
};

export const createNewItems = (data) => async (dispatch) => {
  console.log("Create item...");
  try {
    axios.post(api_url + "/inventory/item", data, header_config).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: CREATE_ITEM,
          payload: res.data[0][0],
        });
        return true;
      } else {
        alert("Something went wrong please try again...");
        return false;
      }
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const upDateItem = (data, id) => async (dispatch) => {
  console.log("Update item...");
  console.log(data);
  try {
    axios
      .put(api_url + "/inventory/item/" + id, data, header_config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: UPDATE_ITEM,
            payload: res.data[0][0],
          });
          return true;
        } else {
          alert("Something went wrong please try again...");
          return false;
        }
      });
  } catch (error) {
    console.log("error", error);
  }
};

// --EXEC [INVENTORY].[dbo].[sp_ups_ins_tb_item]
// --/*required*/
// -- @item_id = 1, @user_name = '2563002',

// --/*not-required*/
// --  @item_name = 'ทดสอบ 10', @uom_id = '14', @vat_id='1', @branch_id = '1',
// --  @item_name_th = 'ทดสอบ 10', @item_image_path = '', @item_barcode = '',
// --  @item_sale = true, @item_purchase = true, @item_price = '10.50',
// --  @item_cost = '5.5', @item_qty_tg = '0', @item_weight = '5',@item_mfd_leadtime = '15',
// --  @item_min='5', @item_max='10',
// --  @item_remark = 'remark 1',
// --  @commit = 0 ไม่เซฟลงดาต้าเบส 1 เซฟลงดาต้าเบส

// --  @item_customer_run_no nvarchar(20) = null, Can't update
// --  @type_id nvarchar(20) = null, Can't update
// --  @category_id nvarchar(20) = null, Can't update
// --  @identify_benefit_id nvarchar(20) = null, Can't update

// //Create a new Item
// router.post("/inventory/item", item.create);

// // Retrieve all Item
// router.get("/item", item.findAll);

// // Retrieve a single Item with item_id
// router.get("/item/:item_id", item.findOne);

// // Update a Item with item_id
// router.put("/item/:item_id", item.update);

// // Retrieve all type
// router.get("/type", item.listtypeAll);

// // Retrieve a all category with type
// router.get("/category/:type_id", item.listcategory);

// // Retrieve all uom
// router.get("/uom", item.listuom);

// // Retrieve all identify_benefit
// router.get("/identify_benefit", item.listidentify_benefit);
