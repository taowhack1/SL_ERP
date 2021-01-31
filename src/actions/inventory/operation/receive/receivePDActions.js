import axios from "axios";
import { api_pd_receive } from "../../../../include/js/api";
import { GET_PD_RECEIVE_LIST } from "../../../types";

export const getAllPDReceiveList = (user_name) => async (dispatch) => {
  await axios
    .get(`${api_pd_receive}/all/${user_name}`)
    .then((res) => {
      console.log(`${api_pd_receive}/all/${user_name}`);
      console.log(res);
      dispatch({
        type: GET_PD_RECEIVE_LIST,
        payload: res.data[0],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
