import {
  api_quo_list,
  api_get_select_list_customers,
  api_create_quotation,
  api_create_quotation_detail,
  api_approve,
  api_get_qn_by_id,
  api_qn_detail,
  api_so,
  api_so_detail,
  api_get_qn_open_so,
} from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
import {
  SET_QN_HEAD,
  SET_QN_DETAIL,
  RESET_QN,
  SET_QN_LIST,
  GET_SO_LIST,
  SET_SO_HEAD,
  SET_SO_DETAIL,
  GET_MASTER_DATA,
  GET_QN_OPEN_SO,
  RESET_SO,
} from "../types";
import axios from "axios";
export const get_quotation_list = (user_name) => (dispatch) => {
  axios.get(`${api_quo_list}/all/${user_name}`, header_config).then((res) => {
    dispatch({ type: SET_QN_LIST, payload: res.data[0] });
  });
};

export const get_so_list = (user_name) => (dispatch) => {
  axios.get(`${api_so}/all/${user_name}`, header_config).then((res) => {
    console.log(res);
    dispatch({
      type: GET_SO_LIST,
      payload: res.data[0],
    });
  });
};
export const get_qn_open_so = () => (dispatch) => {
  axios.get(api_get_qn_open_so, header_config).then((res) => {
    dispatch({
      type: GET_QN_OPEN_SO,
      payload: res.data[0],
    });
  });
};
export const so_get_qn_ref = (qn_id) => async (dispatch) => {
  let ref = await axios
    .get(`${api_qn_detail}/ref/${qn_id}`, header_config)
    .then((res) => {
      return res.data[0];
    });
  return ref;
};
export const get_so_by_id = (id, user_name) => (dispatch) => {
  console.log("get_so_by_id");
  console.log(`${api_so}/${id}&${user_name}`);
  axios
    .get(`${api_so}/${id}&${user_name}`, header_config)
    .then((res) => {
      console.log("GET_HEAD");
      dispatch({
        type: SET_SO_HEAD,
        payload: res.data.main_master,
      });
      axios
        .get(`${api_so_detail}/${id}`)
        .then((res) => {
          console.log("GET_DETAIL");
          dispatch({
            type: SET_SO_DETAIL,
            payload: res.data[0],
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get_sale_master_data = () => (dispatch) => {
  let master = {};
  axios
    .get(api_get_select_list_customers, header_config)
    .then((res) => {
      master.customers = res.data[0];
      dispatch({
        type: GET_MASTER_DATA,
        payload: master,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const create_so = (data_head, data_detail) => async (dispatch) => {
  console.log("Create SO", data_head, data_detail);
  await axios.post(api_so, data_head, header_config).then(async (res) => {
    console.log("INSERT_HEAD", res);
    const so_id = res.data[0][0].so_id;
    await axios
      .post(`${api_so_detail}/${so_id}`, data_detail, header_config)
      .then((res) => {
        console.log("INSERT_DETAIL", res);
        dispatch(get_so_by_id(so_id, data_head.user_name));
      });
  });
};
export const update_so = (so_id, data_head, data_detail) => async (
  dispatch
) => {
  console.log("update_so_data", so_id, data_head, data_detail);
  await axios
    .put(`${api_so}/${so_id}`, data_head, header_config)
    .then(async (res) => {
      console.log("Update SO");
      await axios
        .post(`${api_so_detail}/${so_id}`, data_detail, header_config)
        .then((res) => {
          console.log("Update_DETAIL", res);
          dispatch(get_so_by_id(so_id, data_head.user_name));
        });
    });
};

export const create_quotation = (data_head, data_detail) => async (
  dispatch
) => {
  console.log(data_head, data_detail);
  console.log("Create QN");
  await axios
    .post(api_create_quotation, data_head, header_config)
    .then(async (res) => {
      console.log("INSERT_HEAD", res);
      const qn_id = res.data[0][0].qn_id;
      await axios
        .post(
          `${api_create_quotation_detail}/${qn_id}`,
          data_detail,
          header_config
        )
        .then((res) => {
          console.log("INSERT_DETAIL", res);
          dispatch(get_quotation_by_id(qn_id, data_head.user_name));
        });
    });
};

export const get_quotation_by_id = (id, user_name) => (dispatch) => {
  console.log("get_quotation_by_id", id, user_name);
  console.log(`${api_get_qn_by_id}/${id}&${user_name}`);
  try {
    axios.get(`${api_get_qn_by_id}/${id}&${user_name}`).then((res) => {
      console.log(res);
      dispatch({ type: SET_QN_HEAD, payload: res.data.main_master });
      console.log("SET_QN_HEAD");
      axios.get(`${api_qn_detail}/${id}`).then((res) => {
        console.log(res);
        dispatch({ type: SET_QN_DETAIL, payload: res.data[0] });
        console.log("SET_QN_DETAIL");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export const update_quotation = (qn_id, data_head, data_detail) => async (
  dispatch
) => {
  console.log(data_head);
  await axios
    .put(`${api_create_quotation}/${qn_id}`, data_head, header_config)
    .then(async (res) => {
      console.log("Update QN");
      await axios
        .post(
          `${api_create_quotation_detail}/${qn_id}`,
          data_detail,
          header_config
        )
        .then((res) => {
          console.log("Update_DETAIL", res);
          dispatch(get_quotation_by_id(qn_id, data_head.user_name));
        });
    });
};

export const qn_actions = (data, qn_id) => (dispatch) => {
  console.log("qn_actions");
  data.commit = 1;
  // data = {process_status_id : '3', user_name : '2563003', process_id : '30', commit : 1}
  axios
    .put(`${api_approve}/${data.process_id}`, data, header_config)
    .then((res) => {
      console.log(res);
      dispatch(get_quotation_by_id(qn_id, data.user_name));
    });
};
export const so_actions = (data, so_id) => (dispatch) => {
  console.log("so_actions");
  data.commit = 1;
  // data = {process_status_id : '3', user_name : '2563003', process_id : '30', commit : 1}
  axios
    .put(`${api_approve}/${data.process_id}`, data, header_config)
    .then((res) => {
      console.log(res);
      dispatch(get_so_by_id(so_id, data.user_name));
    });
};

export const reset_qn = () => (dispatch) => {
  dispatch({ type: RESET_QN });
};
export const reset_so = () => (dispatch) => {
  dispatch({ type: RESET_SO });
};
