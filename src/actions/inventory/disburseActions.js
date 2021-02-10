import axios from "axios";
import { sortData } from "../../include/js/function_main";
import { header_config } from "../../include/js/main_config";
import {
  api_disburse,
  api_disburse_detail,
  api_disburse_sub_detail_by_disburse_id,
  api_issue_ref_list,
  api_approve,
} from "../../include/js/api";
import {
  GET_DISBURSE_LIST,
  RESET_DISBURSE,
  GET_DISBURSE_BY_ID,
  GET_ISSUE_REF_LIST,
} from "../types";
import { message } from "antd";
export const get_issue_ref_list = () => async (dispatch) => {
  return await axios
    .get(api_issue_ref_list, header_config)
    .then((res) => {
      console.log("GET_ISSUE_REF_LIST");
      dispatch({ type: GET_ISSUE_REF_LIST, payload: res.data[0] });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get_disburse_list = (user_name) => async (dispatch) => {
  return await axios
    .get(`${api_disburse}/all/${user_name}`, header_config)
    .then((res) => {
      dispatch({ type: GET_DISBURSE_LIST, payload: res.data[0] });
    });
};

export const get_disburse_by_id = (disburse_id, user_name, redirect) => async (
  dispatch
) => {
  try {
    if (user_name) {
      console.log(`${api_disburse}/${disburse_id}&${user_name}`);
      const res_head = axios.get(
        `${api_disburse}/${disburse_id}&${user_name}`,
        header_config
      );
      const res_detail = axios.get(
        `${api_disburse_detail}/${disburse_id}`,
        header_config
      );
      const disburse = {};

      disburse.disburse_head = await res_head.then((res) => {
        console.log("GET_DISBURSE_HEAD");
        return res.data.main_master;
      });

      disburse.disburse_detail = await res_detail.then(async (res) => {
        console.log("GET_DISBURSE_DETAIL");

        let details_temp = res.data[0];
        console.log(`${api_disburse_sub_detail_by_disburse_id}/${disburse_id}`);
        const details = await axios
          .get(
            `${api_disburse_sub_detail_by_disburse_id}/${disburse_id}`,
            header_config
          )
          .then(async (res) => {
            console.log("res sub Detail ", res);
            console.log("details_temp before", details_temp);
            const sub_detail = res.data[0];
            await details_temp.map((detail) => {
              detail.disburse_sub_detail = sortData(
                sub_detail.filter(
                  (sub) => sub.disburse_detail_id === detail.disburse_detail_id
                )
              );
            });
            console.log("details_temp after", details_temp);
            return details_temp;
          });
        console.log("disburse detail ", details);
        return details;
      });
      console.log(`GET_DISBURSE_BY_ID ${disburse_id}/${user_name}`, disburse);
      await dispatch({ type: GET_DISBURSE_BY_ID, payload: disburse });
      await redirect(disburse_id);
    }
  } catch (error) {
    console.log(error);
  }
};

export const create_disburse = (
  user_name,
  data_head,
  data_detail,
  redirect
) => async (dispatch) => {
  let temp_sub_detail = [];
  let temp_detail = data_detail;
  temp_detail.map((detail) => temp_sub_detail.push(detail.disburse_sub_detail));

  try {
    if (data_head && data_detail) {
      console.log("Create disburse", data_head, data_detail);
      await axios
        .post(api_disburse, data_head, header_config)
        .then(async (res) => {
          const disburse_id = res.data[0][0].disburse_id;
          console.log("INSERT_HEAD", res);

          await axios
            .post(
              `${api_disburse_detail}/${disburse_id}`,
              data_detail,
              header_config
            )
            .then(async (res) => {
              const data_detail = res.data[0];
              let data_sub_detail = [];

              data_detail.map((detail, index) => {
                temp_sub_detail[index].map((sub) => {
                  sub.disburse_detail_id = detail.disburse_detail_id;
                  data_sub_detail.push(sub);
                });
              });

              console.log("temp_sub_detail", temp_sub_detail);
              console.log("data_sub_detail", data_sub_detail);
              console.log("INSERT_DETAIL", res);

              await axios
                .post(
                  `${api_disburse_sub_detail_by_disburse_id}/${disburse_id}`,
                  data_sub_detail,
                  header_config
                )
                .then((res) => {
                  console.log("INSERT SUB DETAIL", res);
                });

              message.success({
                content: "Disburse Created.",
                key: "validate",
                duration: 2,
              });
              await dispatch(
                get_disburse_by_id(disburse_id, user_name, redirect)
              );
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => {
          console.log(error);
          message.error({
            content: "Somethings went wrong. \n" + error,
            key: "validate",
            duration: 2,
          });
        });
    }
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};

export const update_disburse = (
  disburse_id,
  user_name,
  data_head,
  data_detail,
  redirect
) => async (dispatch) => {
  let temp_sub_detail = [];
  let temp_detail = data_detail;
  temp_detail.map((detail) => temp_sub_detail.push(detail.disburse_sub_detail));

  try {
    if (data_head && data_detail) {
      console.log("Create disburse", data_head, data_detail);
      await axios
        .put(`${api_disburse}/${disburse_id}`, data_head, header_config)
        .then(async (res) => {
          console.log("UPDATE_DISBURSE", res);

          try {
            await axios
              .post(
                `${api_disburse_detail}/${disburse_id}`,
                data_detail,
                header_config
              )
              .then(async (res) => {
                const data_detail = res.data[0];
                let data_sub_detail = [];

                data_detail.map((detail, index) => {
                  temp_sub_detail[index].map((sub) => {
                    sub.disburse_detail_id = detail.disburse_detail_id;
                    data_sub_detail.push(sub);
                  });
                });

                console.log("temp_sub_detail", temp_sub_detail);
                console.log("data_sub_detail", data_sub_detail);
                console.log("UPDATE_DETAIL", res);

                await axios
                  .post(
                    `${api_disburse_sub_detail_by_disburse_id}/${disburse_id}`,
                    data_sub_detail,
                    header_config
                  )
                  .then((res) => {
                    console.log("UPDATE SUB DETAIL", res);
                  });
                message.success({
                  content: "Disburse Updated.",
                  key: "validate",
                  duration: 2,
                });
                await dispatch(
                  get_disburse_by_id(disburse_id, user_name, redirect)
                );
              })
              .catch((error) => console.log("error !!!!!!!!!", error));
          } catch (error) {
            console.log("error !!!!!!!!!", error);
          }
        })
        .catch((error) => {
          console.log(error);
          message.error({
            content: "Somethings went wrong. \n" + error,
            key: "validate",
            duration: 2,
          });
        });
    }
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};

export const disburse_actions = (data, disburse_id) => async (dispatch) => {
  console.log("disburse_actions");
  data.commit = 1;
  console.log(data);
  // data = {process_status_id : '3', user_name : '2563003', process_id : '30', commit : 1}
  data.process_id &&
    axios
      .put(`${api_approve}/${data.process_id}`, data, header_config)
      .then((res) => {
        dispatch(get_disburse_by_id(disburse_id, data.user_name));
      });
};

export const reset_issue = () => (dispatch) => {
  dispatch({ type: RESET_DISBURSE });
};
