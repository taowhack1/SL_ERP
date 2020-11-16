import {
  GET_ITEM_DETAIL,
  GET_ALL_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  GET_ITEM_BY_ID,
} from "../types";
import { header_config } from "../../include/js/main_config";
import {
  api_get_item_by_id,
  api_url,
  api_get_item_detail,
} from "../../include/js/api";
import axios from "axios";
import { message } from "antd";
const api_path = api_url + "/query/sql";
export const getAllItems = () => async (dispatch) => {
  const query_items = {
    query_sql: `SELECT
    A.*, 
    '( '+B.uom_no+' ) '+B.uom_name as uom_name,
    '( '+C.type_no+' ) '+C.type_name as type_name,
    D.category_name,
    E.vat_name,
    F.branch_name,
    G.identify_benefit_name
  FROM
    [INVENTORY].[dbo].[tb_item] A
  LEFT JOIN [INVENTORY].[dbo].[tb_uom] B ON A.uom_id = B.uom_id
  LEFT JOIN [INVENTORY].[dbo].[tb_type] C ON A.type_id = C.type_id
  LEFT JOIN [INVENTORY].[dbo].[tb_category] D ON A.category_id = D.category_id
  LEFT JOIN [PURCHASE].[dbo].[tb_vat] E ON A.vat_id = E.vat_id
  LEFT JOIN [HRM].[dbo].[tb_branch] F ON A.branch_id = F.branch_id
  LEFT JOIN [INVENTORY].[dbo].[tb_identify_benefit] G ON A.identify_benefit_id = G.identify_benefit_id`,
  };
  await axios.post(api_path, query_items).then((res) => {
    dispatch({
      type: GET_ALL_ITEMS,
      payload: res.data[0],
    });
  });
};

export const createNewItems = (data_head, data_detail, redirect) => async (
  dispatch
) => {
  console.log("Create item...");
  try {
    axios
      .post(api_url + "/inventory/item", data_head, header_config)
      .then(async (res) => {
        if (res.status === 200 && res.data[0].length) {
          console.log("res", res);
          const item_id = res.data[0][0].item_id;
          const data_detail_copy = data_detail.filter(
            (detail) =>
              detail.vendor_id !== null &&
              detail.item_vendor_price !== 0 &&
              detail.uom_id !== null &&
              detail.type_id !== null &&
              detail.category_id !== null
          );
          data_detail_copy.length &&
            (await axios.post(
              `${api_get_item_detail}/${item_id}`,
              data_detail,
              header_config
            ));
          await dispatch(get_item_by_id(item_id));
          message.success({
            content: "Item Created.",
            key: "validate",
            duration: 2,
          });
          redirect(item_id);
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

export const upDateItem = (item_id, data_head, data_detail, redirect) => async (
  dispatch
) => {
  console.log("Update item...");
  try {
    axios
      .put(api_url + "/inventory/item/" + item_id, data_head, header_config)
      .then(async (res) => {
        if (res.status === 200 && res.data[0].length) {
          await axios.post(
            `${api_get_item_detail}/${item_id}`,
            data_detail,
            header_config
          );
          await dispatch(get_item_by_id(item_id));
          message.success({
            content: "Item Update.",
            key: "validate",
            duration: 2,
          });
          redirect(item_id);
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

export const get_item_by_id = (item_id) => async (dispatch) => {
  console.log("get_item_by_id");

  try {
    if (item_id) {
      console.log(`${api_get_item_by_id}/${item_id}`);
      const res_head = axios.get(
        `${api_get_item_by_id}/${item_id}`,
        header_config
      );
      const res_detail = axios.get(
        `${api_get_item_detail}/${item_id}`,
        header_config
      );
      const item = {
        item_head:
          res_head &&
          (await res_head.then((res) => {
            return res.data[0][0];
          })),
        item_detail:
          res_detail &&
          (await res_detail.then((res) => {
            return res.data[0];
          })),
      };
      console.log(`GET_ITEM_BY_ID ${item_id}`, item);
      await dispatch({ type: GET_ITEM_BY_ID, payload: item });
    }
  } catch (error) {
    console.log(error);
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
