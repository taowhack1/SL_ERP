import axios from "axios";
import { api_approve, header_config } from "../../include/js/main_config";
import {
  api_disburse,
  api_disburse_detail,
  api_disburse_sub_detail,
  api_issue,
} from "../api";
import {
  GET_DISBURSE_LIST,
  RESET_DISBURSE,
  GET_DISBURSE_BY_ID,
  GET_DISBURSE_SUB_DETAIL,
  GET_DISBURSE_DETAIL,
  GET_ISSUE_REF_LIST,
} from "../types";
export const get_issue_ref_list = () => async (dispatch) => {
  axios
    .get(api_issue, header_config)
    .then((res) => {
      console.log("GET_ISSUE_REF_LIST");
      dispatch({ type: GET_ISSUE_REF_LIST, payload: res.data[0] });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get_disburse_list = () => (dispatch) => {
  axios.get(api_disburse, header_config).then((res) => {
    dispatch({ type: GET_DISBURSE_LIST, payload: res.data[0] });
  });
};
export const get_disburse_by_id = (disburse_id, user_name) => async (
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
      const disburse = {
        disburse_head:
          res_head &&
          (await res_head.then((res) => {
            return res.data.main_master;
          })),
        disburse_detail:
          res_detail &&
          (await res_detail
            .then((res) => {
              console.log("GET_DISBURSE_DETAIL");

              let details = res.data[0];
              axios
                .get(`${api_disburse_sub_detail}/${disburse_id}`, header_config)
                .then((res) => {
                  const sub_detail = res.data[0];
                  details.map((detail) => {
                    detail.disburse_sub_detail = sub_detail.filter(
                      (sub) =>
                        sub.disburse_detail_id === detail.disburse_detail_id
                    );
                  });
                  return details;
                  // dispatch({
                  //   type: GET_DISBURSE_DETAIL,
                  //   payload: details,
                  // });

                  // dispatch({
                  //   type: GET_DISBURSE_SUB_DETAIL,
                  //   payload: sub_detail,
                  // });
                });
            })
            .catch((error) => {
              console.log(error);
            })),
      };
      console.log(`GET_DISBURSE_BY_ID ${disburse_id}/${user_name}`, disburse);
      await dispatch({ type: GET_DISBURSE_BY_ID, payload: disburse });
    }
  } catch (error) {
    console.log(error);
  }
};

export const create_disburse = (data_head, data_detail) => async (dispatch) => {
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
            .then((res) => {
              console.log("INSERT_DETAIL", res);
              dispatch(get_disburse_by_id(disburse_id, data_head.user_name));
            });
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const update_disburse = (disburse_id, data_head, data_detail) => async (
  dispatch
) => {
  try {
    if (data_head && data_detail) {
      console.log("Create disburse", data_head, data_detail);
      await axios
        .put(`${api_disburse}/${disburse_id}`, data_head, header_config)
        .then(async (res) => {
          console.log("UPDATE_DISBURSE", res);

          await axios
            .post(
              `${api_disburse_detail}/${disburse_id}`,
              data_detail,
              header_config
            )
            .then((res) => {
              console.log("INSERT_DETAIL", res);
              dispatch(get_disburse_by_id(disburse_id, data_head.user_name));
            });
        });
    }
  } catch (error) {
    console.log(error);
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
