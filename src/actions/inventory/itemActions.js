import { GET_ALL_ITEMS, GET_ITEM_BY_ID } from "../types";
import { api_server, header_config } from "../../include/js/main_config";
import {
  api_get_item_by_id,
  api_url,
  api_item_vendor,
  api_item_qa,
  api_item_weight,
  api_item_packaging,
  api_upload_file,
  api_approve,
  api_part_and_formula,
  api_item_status,
  api_get_item_list,
  api_get_part_and_formula_all,
  api_get_fg_material,
  api_get_all_item_list,
  api_filling_process,
} from "../../include/js/api";
import axios from "axios";
import { message, notification } from "antd";
import { item_save_file } from "../file&image/itemFileAction";
import React from "react";
import { sortData } from "../../include/js/function_main";

const openNotificationWithIcon = (type, title, text) => {
  notification[type]({
    message: <h4 className="notify-title">{title}</h4>,
    description: text,
  });
};
const convertFileField = (file) => {
  let file_temp = file;

  let path = file.item_file_path
    ? process.env.REACT_APP_SERVER + file.item_file_path
    : require("./no_image.svg");
  if (file.item_file_path) {
    path = process.env.REACT_APP_SERVER + file.item_file_path;
  } else {
    path = file.file_type_id === 1 ? require("./no_image.svg") : null;
    file_temp.item_file_original_type =
      file.file_type_id === 1 ? "image" : null;
  }
  file_temp.name = file.item_file_original_name;
  file_temp.path = path;
  file_temp.file_type_id = file.file_type_id;
  file_temp.uid = file.file_type_id;
  file_temp.thumbUrl = path;
  file_temp.url = path;
  return file_temp;
};

const bind_vendor_fn = (item_id, data_detail) => {
  console.log("bind_vendor_fn");
  //check authorize
  const data_detail_temp = data_detail.filter(
    (detail) =>
      detail.vendor_id !== null &&
      detail.uom_id !== null &&
      detail.type_id !== null &&
      detail.category_id !== null
  );
  return (
    data_detail_temp.length &&
    axios
      .post(`${api_item_vendor}/${item_id}`, data_detail_temp, header_config)
      .then((res) => {
        console.log("BIND VENDOR");
      })
  );
};

const bind_part_and_formula = (item_id, data_part) => {
  console.log("bind_part_and_formula");
  return (
    // data_formula_detail_temp.length &&
    axios
      .post(`${api_part_and_formula}/${item_id}`, data_part, header_config)
      .then((res) => {
        console.log("BIND PART");
      })
  );
};

const bind_qa_test = (item_id, data_qa_detail) => {
  console.log("bind_qa_test");
  const data_qa_detail_temp = data_qa_detail.filter(
    (detail) =>
      detail.qa_subject_id !== null &&
      detail.qa_specification_id !== null &&
      detail.qa_method_id !== null &&
      detail.commit === 1
  );
  return (
    data_qa_detail_temp.length &&
    axios
      .post(`${api_item_qa}/${item_id}`, data_qa_detail_temp, header_config)
      .then((res) => {
        console.log("BIND QA TEST");
      })
  );
};

const bind_weight = (item_id, data_weight_detail) => {
  console.log("bind_weight");
  const data_weight_detail_temp = data_weight_detail.filter(
    (detail) =>
      detail.weight_type_id !== null &&
      detail.item_weight_standard_qty !== null &&
      detail.item_weight_min_qty !== null &&
      detail.item_weight_max_qty !== null &&
      detail.commit === 1
  );
  return (
    data_weight_detail_temp.length &&
    axios
      .post(
        `${api_item_weight}/${item_id}`,
        data_weight_detail_temp,
        header_config
      )
      .then((res) => {
        console.log("BIND WEIGHT");
      })
  );
};

const bind_packaging = (item_id, data_packaging_detail) => {
  console.log("bind_packaging");
  const data_packaging_detail_temp = data_packaging_detail.filter(
    (detail) =>
      detail.qa_method_id !== null &&
      detail.item_packaging_qty !== null &&
      detail.commit === 1
  );
  return (
    data_packaging_detail_temp.length &&
    axios
      .post(
        `${api_item_packaging}/${item_id}`,
        data_packaging_detail_temp,
        header_config
      )
      .then((res) => {
        console.log("BIND PACKAGING");
      })
  );
};
const bind_filling = (item_id, data_filling) => {
  console.log("bind_filling", data_filling);
  const data_filling_temp = data_filling.filter(
    (detail) =>
      detail.item_filling_process_description &&
      detail.item_filling_process_description !== null &&
      detail.item_filling_process_worker &&
      detail.item_filling_process_worker !== null &&
      detail.commit === 1
  );
  console.log("filling data temp ", data_filling_temp);
  return (
    data_filling_temp.length &&
    axios
      .post(
        `${api_filling_process}/${item_id}`,
        data_filling_temp,
        header_config
      )
      .then((res) => {
        console.log("BIND FILLING");
      })
  );
};

export const getAllItems = (user_name) => async (dispatch) => {
  await axios
    .get(
      user_name ? `${api_get_all_item_list}/${user_name}` : api_get_item_list,
      header_config
    )
    .then((res) => {
      // console.log(`${api_get_all_item_list}/${user_name}`);
      // console.log(res.data);
      dispatch({
        type: GET_ALL_ITEMS,
        payload: res.data[0],
      });
    });
};

export const createNewItems = (data, user_name, redirect) => async (
  dispatch
) => {
  const {
    access_right,
    data_head,
    data_detail,
    data_part,
    // data_part_detail,
    // data_part_mix,
    // data_formula,
    data_qa_detail,
    data_weight_detail,
    data_packaging_detail,
    data_file,
    data_filling,
  } = data;
  console.log("createNewItems RawData :", data);
  try {
    // const groupPartData = data_part.map((part, index) => {
    //   return {
    //     ...part,
    //     item_part_specification_detail: data_part_detail[index],
    //     item_part_mix: data_part_mix[index],
    //     item_formula: data_formula[index],
    //   };
    // });
    axios
      .post(api_url + "/inventory/item", data_head, header_config)
      .then(async (res, rej) => {
        if (res.status === 200 && res.data[0].length) {
          const item_id = res.data[0][0].item_id;
          // access_right: {
          //   vendor: true,
          //   formula: true,
          //   qa: true,
          //   weight: true,
          //   packaging: true,
          //   attach_file: true,
          // },
          Promise.allSettled([
            access_right.vendor && bind_vendor_fn(item_id, data_detail),
            access_right.formula && bind_part_and_formula(item_id, data_part),
            access_right.qa && bind_qa_test(item_id, data_qa_detail),
            access_right.weight && bind_weight(item_id, data_weight_detail),
            access_right.packaging &&
              bind_packaging(item_id, data_packaging_detail),
            access_right.attach_file &&
              item_save_file(item_id, data_file, user_name),
            access_right.filling && bind_filling(item_id, data_filling),
          ])
            .then(async (data) => {
              console.log("Promise.allSettled. THEN ", data);
              await dispatch(get_item_by_id(item_id, user_name, redirect));
              message.success({
                content: "Item Created.",
                key: "validate",
                duration: 2,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          return true;
        } else {
          alert("Something went wrong please try again...");
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        openNotificationWithIcon(
          "error",
          "Error !",
          `${error}.
          Please contact admin.`
        );
      });
  } catch ({ response }) {
    openNotificationWithIcon(
      "error",
      "Error !",
      `${response.statusText}.\n Please contact admin.`
    );
    // message.error({
    //   content: "Somethings went wrong. \n" + error,
    //   key: "error",
    //   duration: 2,
    // });
  }
};

export const upDateItem = (item_id, data, user_name, redirect) => async (
  dispatch
) => {
  const {
    access_right,
    data_head,
    data_detail,
    data_part,
    // data_part_detail,
    // data_part_mix,
    // data_formula,
    data_qa_detail,
    data_weight_detail,
    data_packaging_detail,
    data_file,
    data_filling,
  } = data;
  console.log("upDateItem RawData :", data);
  try {
    // const groupPartData = data_part.map((part, index) => {
    //   return {
    //     ...part,
    //     item_part_specification_detail: data_part_detail[index],
    //     item_part_mix: data_part_mix[index],
    //     item_formula: data_formula[index],
    //   };
    // });
    axios
      .put(api_url + "/inventory/item/" + item_id, data_head, header_config)
      .then(async (res) => {
        if (res.status === 200 && res.data[0].length) {
          Promise.allSettled([
            access_right.vendor && bind_vendor_fn(item_id, data_detail),
            access_right.formula && bind_part_and_formula(item_id, data_part),
            access_right.qa && bind_qa_test(item_id, data_qa_detail),
            access_right.weight && bind_weight(item_id, data_weight_detail),
            access_right.packaging &&
              bind_packaging(item_id, data_packaging_detail),
            access_right.attach_file &&
              item_save_file(item_id, data_file, user_name),
            access_right.filling && bind_filling(item_id, data_filling),
          ])
            .then((data) => {
              console.log("Promise Then");
              dispatch(get_item_by_id(item_id, user_name, redirect));
              message.success({
                content: "Item Update.",
                key: "validate",
                duration: 2,
              });
            })
            .catch((error) => {
              console.log("Promise Catch");
            });

          // return true;
        } else {
          alert("Something went wrong please try again...");
          // return false;
        }
      });
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "error",
      duration: 2,
    });
  }
};

export const get_item_by_id = (item_id, user_name, redirect) => async (
  dispatch
) => {
  console.log("GET_ITEM_BY_ID FUNCTION");

  try {
    if (item_id) {
      console.log(`${api_get_item_by_id}/${item_id}&${user_name}`);
      const res_head = axios.get(
        `${api_get_item_by_id}/${item_id}&${user_name}`,
        header_config
      );
      const res_detail = axios.get(
        `${api_item_vendor}/${item_id}`,
        header_config
      );
      const res_part = axios.get(
        `${api_get_part_and_formula_all}/${item_id}`,
        header_config
      );
      const res_qa = axios.get(`${api_item_qa}/${item_id}`, header_config);
      const res_weight = axios.get(
        `${api_item_weight}/${item_id}`,
        header_config
      );
      const res_packaging = axios.get(
        `${api_item_packaging}/${item_id}`,
        header_config
      );
      const res_file = axios.get(
        `${api_upload_file}/${item_id}`,
        header_config
      );
      const res_filling = axios.get(
        `${api_filling_process}/${item_id}`,
        header_config
      );
      Promise.allSettled([
        res_head,
        res_detail,
        res_part,
        res_qa,
        res_weight,
        res_packaging,
        res_file,
        res_filling,
      ])
        .then((data) => {
          console.log("Promise.allSettled GET ITEM BY ID", data);
          const packingItemData = (data) => {
            const data_part = sortData(
              data[2].value.data &&
                data[2].value.data.map((obj) => {
                  return {
                    ...obj,
                    item_part_specification_detail: sortData(
                      obj.item_part_specification_detail
                    ),
                    item_formula: sortData(obj.item_formula),
                    item_part_mix: sortData(obj.item_part_mix),
                  };
                })
            );
            // let data_part_detail = [];
            // let data_part_mix = [];
            // let data_formula = [];
            // data_part.forEach((part, index) => {
            //   data_part_detail.push(
            //     sortData(part.item_part_specification_detail)
            //   );
            //   data_part_mix.push(sortData(part.item_part_mix));
            //   data_formula.push(sortData(part.item_formula));
            // });
            const data_file_temp = data[6].value.data[0];
            const item = {
              data_head: data[0].value.data.main_master,
              data_detail: sortData(data[1].value.data[0]),
              data_part: data_part,
              // data_part_detail: data_part_detail,
              // data_part_mix: data_part_mix,
              // data_formula: data_formula,
              data_qa_detail: sortData(data[3].value.data[0]),
              data_weight_detail: sortData(data[4].value.data[0]),
              data_packaging_detail: sortData(data[5].value.data[0]),
              data_file: {
                item_image:
                  data_file_temp.length &&
                  convertFileField(
                    data_file_temp.filter((file) => file.file_type_id === 1)[0]
                  ),
                certificate: {
                  2:
                    data_file_temp.length &&
                    convertFileField(
                      data_file_temp.filter(
                        (file) => file.file_type_id === 2
                      )[0]
                    ),
                  3:
                    data_file_temp.length &&
                    convertFileField(
                      data_file_temp.filter(
                        (file) => file.file_type_id === 3
                      )[0]
                    ),
                  4:
                    data_file_temp.length &&
                    convertFileField(
                      data_file_temp.filter(
                        (file) => file.file_type_id === 4
                      )[0]
                    ),
                  5:
                    data_file_temp.length &&
                    convertFileField(
                      data_file_temp.filter(
                        (file) => file.file_type_id === 5
                      )[0]
                    ),
                  6:
                    data_file_temp.length &&
                    convertFileField(
                      data_file_temp.filter(
                        (file) => file.file_type_id === 6
                      )[0]
                    ),
                  7:
                    data_file_temp.length &&
                    convertFileField(
                      data_file_temp.filter(
                        (file) => file.file_type_id === 7
                      )[0]
                    ),
                  8:
                    data_file_temp.length &&
                    convertFileField(
                      data_file_temp.filter(
                        (file) => file.file_type_id === 8
                      )[0]
                    ),
                },
              },
              data_filling: sortData(data[7].value.data[0]),
            };

            return item;
          };
          const itemData = packingItemData(data);
          console.log("itemData", itemData);
          dispatch({ type: GET_ITEM_BY_ID, payload: itemData });
          itemData.data_head && redirect && redirect(item_id);
        })
        .catch((error) => {
          console.log(error);
          message.error({
            content: "Somethings went wrong or Network Error.",
            key: "validate",
            duration: 4,
          });
        });
    }
  } catch (error) {
    alert("Oops! Somethings went wrong..\n" + error);
  }
};

export const item_actions = (data, item_id) => (dispatch) => {
  data.commit = 1;

  data.process_id
    ? axios
        .put(`${api_approve}/${data.process_id}`, data, header_config)
        .then((res) => {
          let msg = "";
          switch (data.process_status_id) {
            case 2:
              // Confirm
              msg = "Confirm.";
              break;
            case 3:
              msg = "Cancel.";
              break;
            // Cancel
            case 4:
              msg = "Complete.";
              break;
            // Complete
            case 5:
              msg = "Approve.";
              break;
            // Approve
            case 6:
              msg = "Reject.";
              break;
            // Reject
            default:
              break;
          }
          message.success({
            content: msg,
            key: "validate",
            duration: 2,
          });
          dispatch(get_item_by_id(item_id, data.user_name));
        })
    : message.error({
        content: "Somethings went wrong. please contact programmer.",
        key: "validate",
        duration: 4,
      });
};

export const itemUpdateStatus = (id, status) => {
  try {
    axios
      .put(
        `${api_item_status}/${id}`,
        {
          item_actived: status,
        },
        header_config
      )
      .then((res) => {
        res.data[0].length
          ? message.success({
              content:
                status === 0
                  ? "Item has been deleted."
                  : "Item has been actived.",
              key: "validate",
              duration: 2,
            })
          : message.error({
              content: "Somethings went wrong. please contact programmer.",
              key: "validate",
              duration: 4,
            });
      })
      .catch((error) => {
        message.error({
          content: "Somethings went wrong. please contact programmer.",
          key: "validate",
          duration: 4,
        });
      });
  } catch (error) {
    console.log(error);
  }
};

export const getFGMaterialList = async (
  so_id,
  item_id,
  qty_to_produce,
  mrp_qty_percent_spare_rm,
  mrp_qty_percent_spare_pk
) => {
  // so_id, item_id, item_qty_produce, mrp_qty_percent_spare_rm, mrp_qty_percent_spare_pk
  return await axios
    .get(
      `${api_get_fg_material}/${so_id}&${item_id}&${qty_to_produce}&${mrp_qty_percent_spare_rm}&${mrp_qty_percent_spare_pk}`
    )
    .then((res) => res.data[0]);
};
