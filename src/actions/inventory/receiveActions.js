/** @format */

import {
  GET_RECEIVE_LIST,
  GET_PO_RECEIVE_LIST,
  GET_PO_DETAIL_REF,
  RESET_RECEIVE,
  GET_RECEIVE_BY_ID,
} from "../types";
import axios from "axios";
import { sortData } from "../../include/js/function_main";
import { header_config } from "../../include/js/main_config";
import {
  api_receive_get_ref_po_detail,
  api_receive_get_ref_po_head,
  api_receive_detail,
  api_receive,
  api_receive_sub_detail,
  api_approve,
} from "../../include/js/api";
import { message } from "antd";

const FILTER_REPORT_GR = "FILTER_REPORT_GR";
const CLEAR_FILTER_REPORT_GR = "CLEAR_FILTER_REPORT_GR";
const apiProduction_for_fg_receive = `sales/so/production_for_fg_receive`;
export const get_receive_list = (user_name) => async (dispatch) => {
  return await axios
    .get(`${api_receive}/all/${user_name}`, header_config)
    .then((res) => {
      console.log("GET_RECEIVE_LIST");
      dispatch({ type: GET_RECEIVE_LIST, payload: res.data[0] });
    });
};
export const production_for_fg_receive = async () => {
  console.log("Production_for_fg");
  try {
    return await axios
      .get(`${apiProduction_for_fg_receive}`, header_config)
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
export const reset_receive = () => async (dispatch) => {
  dispatch({ type: RESET_RECEIVE });
};

export const get_po_receive_list = () => async (dispatch) => {
  return await axios
    .get(api_receive_get_ref_po_head, header_config)
    .then((res) => {
      dispatch({ type: GET_PO_RECEIVE_LIST, payload: res.data[0] });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get_po_detail_ref = (po_id) => async (dispatch) => {
  return await axios
    .get(`${api_receive_get_ref_po_detail}/${po_id}`, header_config)
    .then((res) => {
      console.log("GET_PO_DETAIL_REF");
      dispatch({ type: GET_PO_DETAIL_REF, payload: res.data[0] });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getReceiveById = (id, user_name) => {
  console.log("getReceiveById New");
  console.log(`${api_receive}/${id}&${user_name}`);

  try {
    const get_head = axios.get(
      `${api_receive}/${id}&${user_name}`,
      header_config
    );

    const get_detail = axios.get(`${api_receive_detail}/${id}`).then((res) => {
      let details = res.data[0];
      return axios
        .get(`${api_receive_sub_detail}/${id}`, header_config)
        .then((res) => {
          const sub_detail = res.data[0];
          details.forEach((detail) => {
            detail.receive_sub_detail = sortData(
              sub_detail.filter(
                (sub) => sub.receive_detail_id === detail.receive_detail_id
              )
            );
          });
          return details;
        });
    });
    return Promise.allSettled([get_head, get_detail]);
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};
export const get_receive_by_id = (id, user_name) => async (dispatch) => {
  console.log("get_receive_by_id");
  console.log(`${api_receive}/${id}&${user_name}`);

  try {
    const res_head = axios.get(
      `${api_receive}/${id}&${user_name}`,
      header_config
    );

    const res_detail = axios.get(`${api_receive_detail}/${id}`);
    const receive_data = {
      receive_head:
        res_head &&
        (await res_head.then((res) => {
          return res.data.main_master;
        })),
      receive_detail:
        res_detail &&
        (await res_detail
          .then((res) => {
            console.log("GET_RECEIVE_DETAIL");

            let details = res.data[0];
            axios
              .get(`${api_receive_sub_detail}/${id}`, header_config)
              .then((res) => {
                const sub_detail = res.data[0];
                details.forEach((detail) => {
                  detail.receive_sub_detail = sortData(
                    sub_detail.filter(
                      (sub) =>
                        sub.receive_detail_id === detail.receive_detail_id
                    )
                  );
                });

                // dispatch({ type: GET_RECEIVE_SUB_DETAIL, payload: sub_detail });
              });
            return details;
          })
          .catch((error) => {
            console.log(error);
          })),
    };
    console.log(`GET_RECEIVE_BY_ID ${id}`, receive_data);
    await dispatch({ type: GET_RECEIVE_BY_ID, payload: receive_data });
  } catch (error) {
    console.log(error);
    message.error({
      content: "Somethings went wrong. \n" + error,
      key: "validate",
      duration: 2,
    });
  }
};

export const create_receive =
  (user_name, data, redirect) => async (dispatch) => {
    const data_detail = data.receive_detail ?? [];
    let temp_sub_detail = [];
    let temp_detail = data_detail;
    temp_detail.map((detail) =>
      temp_sub_detail.push(detail.receive_sub_detail)
    );
    console.log("Create Receive", data, data_detail);
    try {
      await axios
        .post(api_receive, data, header_config)
        .then(async (res) => {
          console.log("INSERT_HEAD", res);
          if (res.data[0][0]) {
            console.log("res", res);
            const receive_id = res.data[0][0].receive_id;
            await axios
              .post(
                `${api_receive_detail}/${receive_id}`,
                data_detail,
                header_config
              )
              .then((res) => {
                const data_detail = res.data[0];
                let data_sub_detail = [];

                data_detail.forEach((detail, index) => {
                  temp_sub_detail[index].forEach((sub) => {
                    sub.receive_detail_id = detail.receive_detail_id;
                    data_sub_detail.push(sub);
                  });
                });

                axios
                  .post(
                    `${api_receive_sub_detail}/${receive_id}`,
                    data_sub_detail,
                    header_config
                  )
                  .then((res) => {
                    console.log("INSERT SUB DETAIL", res);
                    dispatch(get_receive_by_id(receive_id, user_name));
                    message.success({
                      content: "Receive Created.",
                      key: "validate",
                      duration: 2,
                    });
                    redirect(receive_id);
                  });
              });
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
    } catch (error) {
      console.log(error);
      message.error({
        content: "Somethings went wrong. \n" + error,
        key: "validate",
        duration: 2,
      });
    }
  };

export const update_receive =
  (receive_id, user_name, data, redirect) => async (dispatch) => {
    const data_detail = data.receive_detail;
    let temp_sub_detail = [];
    let temp_detail = data_detail;
    temp_detail.map((detail) =>
      temp_sub_detail.push(detail.receive_sub_detail)
    );
    const agi_post_sub_detail = `/inventory/receive_detail_sub/receive_detail`;

    console.log("update_receive_data", receive_id, data, data_detail);
    try {
      await axios
        .put(`${api_receive}/${receive_id}`, data, header_config)
        .then(async (res) => {
          console.log("Update Receive");
          await axios
            .post(
              `${api_receive_detail}/${receive_id}`,
              data_detail,
              header_config
            )
            .then((res) => {
              console.log("Update_DETAIL", res);
              const data_detail = res.data[0];
              let data_sub_detail = [];

              data_detail.map((detail, index) => {
                temp_sub_detail[index].map((sub) => {
                  sub.receive_detail_id = detail.receive_detail_id;
                  data_sub_detail.push(sub);
                });
              });

              console.log("data_sub_detail", data_sub_detail);
              console.log("INSERT_DETAIL", res);

              axios
                .post(
                  `${agi_post_sub_detail}/${receive_id}`,
                  data_sub_detail,
                  header_config
                )
                .then((res) => {
                  console.log("INSERT SUB DETAIL", res);
                  dispatch(get_receive_by_id(receive_id, user_name));
                  message.success({
                    content: "Receive Updated.",
                    key: "validate",
                    duration: 2,
                  });
                  redirect(receive_id);
                });
            })
            .catch((error) => {
              console.log(error);
              message.error({
                content: "Somethings went wrong.\n" + error,
                key: "validate",
                duration: 2,
              });
            });
        });
    } catch (error) {
      console.log(error);
      message.error({
        content: "Somethings went wrong. \n" + error,
        key: "validate",
        duration: 2,
      });
    }
  };

export const receive_actions = async (data, receive_id, setReload) => {
  console.log("receive_actions");
  data.commit = 1;
  console.log(data);
  // data = {process_status_id : '3', user_name : '2563003', process_id : '30', commit : 1}
  return (
    data.process_id &&
    (await axios.put(`${api_approve}/${data.process_id}`, data, header_config))
  );
};

const filterReportGR = (data) => (dispatch) =>
  dispatch({ type: FILTER_REPORT_GR, payload: data });
const clearFilterReportGR = () => (dispatch) => {
  dispatch({ type: CLEAR_FILTER_REPORT_GR });
};

export {
  FILTER_REPORT_GR,
  CLEAR_FILTER_REPORT_GR,
  filterReportGR,
  clearFilterReportGR,
};
