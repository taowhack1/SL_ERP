import {
  GET_ALL_PO,
  CREATE_PO,
  UPDATE_PO_STATUS,
  PR_TO_PO_DETAIL,
  RESET_PO_DATA,
  GET_PO_HEAD,
  GET_PAYMENT_TERM_LIST,
  GET_PO_DETAIL,
  UPDATE_PO_HEAD,
  GET_PR_OPEN_PO,
} from "../types";
import {
  api_query,
  api_purchase,
  header_config,
  api_approve,
  api_payment_term_vendor,
  api_get_po_detail,
  api_purchase_po_list,
  api_get_pr_detail_ref,
  api_get_pr_open_po,
} from "../../include/js/main_config";
import axios from "axios";

export const get_open_po_list = () => (dispatch) => {
  axios.get(api_get_pr_open_po, header_config).then((res) => {
    dispatch({
      type: GET_PR_OPEN_PO,
      payload: res.data[0],
    });
  });
};
export const get_po_list = () => (dispatch) => {
  axios.get(api_purchase_po_list, header_config).then((res) => {
    dispatch({
      type: GET_ALL_PO,
      payload: res.data[0],
    });
  });
};

export const get_po_by_id = (id, user_name) => (dispatch) => {
  console.log(`${api_purchase}/po/${id}&${user_name}`);
  try {
    id &&
      axios
        .get(`${api_purchase}/po/${id}&${user_name}`, header_config)
        .then((res) => {
          console.log("get_po_by_id", res.data.main_master);
          dispatch({
            type: GET_PO_HEAD,
            payload: res.data.main_master,
          });
        });
  } catch (error) {
    console.log(error);
  }
};

export const po_actions = (data, po_id) => (dispatch) => {
  data.commit = 1;
  console.log(data);
  // data = {process_status_id : '3', user_name : '2563003', process_id : '30', commit : 1}
  data.process_id &&
    axios
      .put(`${api_approve}/${data.process_id}`, data, header_config)
      .then((res) => {
        dispatch(get_po_by_id(po_id, data.user_name));
      });
};

export const create_po = (user_name, data_head, data_detail) => (dispatch) => {
  console.log(data_head);
  try {
    axios
      .post(`${api_purchase}/po`, data_head, header_config)
      .then(async (res) => {
        console.log(1, "Create Head");
        dispatch({
          type: CREATE_PO,
          payload: res.data[0][0],
        });

        const po_id = res.data[0][0].po_id;
        console.log(data_detail);
        axios
          .post(
            `${api_purchase}/po_detail/${po_id}`,
            data_detail,
            header_config
          )
          .then(() => {
            console.log(2, "Insert Detail");
            dispatch(get_po_detail(po_id));
            dispatch(get_po_by_id(po_id, user_name));
            console.log(4, "done..");
          });
      });
  } catch (error) {
    console.log(error);
  }

  //   // do respone here
};

export const update_po_head = (data) => (dispatch) => {
  console.log("update_po_head", data);
  try {
    dispatch({
      type: UPDATE_PO_HEAD,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
// const update_po_detail = (po_id, data_detail, user_name) => (dispatch) => {
//   const del = axios
//     .delete(`${api_purchase}/po_detail/${po_id}`, header_config)
//     .then((res) => {
//       console.log(res);
//       dispatch(reset_po_data());
//     });
//   const insert = del.then(() => {
//     data_detail.map((line) => {
//       return axios
//         .post(`${api_purchase}/po_detail/${po_id}`, line, header_config)
//         .then((res) => {
//           console.log("insert po detail", line, res);
//         });
//     });
//   });
//   insert.then(() => {
//     dispatch(get_po_detail(po_id));
//     dispatch(get_po_by_id(po_id, user_name));
//   });
// };

export const update_po = (po_id, user_name, data_head, data_detail) => (
  dispatch
) => {
  console.log(1, "start", data_head, data_detail);
  axios
    .put(`${api_purchase}/po/${po_id}`, data_head, header_config)
    .then(async (res) => {
      console.log(2, "insert detail");
      axios
        .post(`${api_purchase}/po_detail/${po_id}`, data_detail, header_config)
        .then(() => {
          console.log(3, "get head and detail");
          dispatch(get_po_detail(po_id));
          dispatch(get_po_by_id(po_id, user_name));
          console.log(4, "done..");
        });
    });
};

// export const update_po = (po_id, po_head, po_detail) => (dispatch) => {
//   console.log("Update", po_head, po_detail);
//   const res = axios.put(`${api_purchase}/po/${po_id}`, po_head, header_config);
//   console.log(res);
//   res.then((res) => {
//     console.log(res);
//     dispatch(update_po_detail(po_id, po_detail, res.data[0][0].po_updated_by));
//   });
// };

export const update_po_status = (data) => (dispatch) => {
  axios.put(api_query, data, header_config).then((res) => {
    dispatch({
      type: UPDATE_PO_STATUS,
      payload: res.data[0],
    });
    // do respone here
  });
};

export const get_pr_detail = (pr_id) => (dispatch) => {
  axios.get(`${api_get_pr_detail_ref}/${pr_id}`, header_config).then((res) => {
    dispatch({
      type: PR_TO_PO_DETAIL,
      payload: res.data[0],
    });
    // do respone here
  });
};
export const get_po_detail = (po_id) => (dispatch) => {
  axios.get(`${api_get_po_detail}/${po_id}`, header_config).then((res) => {
    dispatch({
      type: GET_PO_DETAIL,
      payload: res.data[0],
    });
    // do respone here
  });
};

export const reset_po_data = () => (dispatch) => {
  try {
    dispatch({
      type: RESET_PO_DATA,
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_payment_term_list = () => async (dispatch) => {
  try {
    await axios.get(api_payment_term_vendor, header_config).then((res) => {
      dispatch({
        type: GET_PAYMENT_TERM_LIST,
        payload: res.data[0],
      });
    });
  } catch (error) {
    console.log(error);
  }
};
