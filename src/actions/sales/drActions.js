import axios from "axios";
import { header_config } from "../../include/js/main_config";
const apiDR = `/sales/dr`;
const apiGetSODetailRef = `/sales/dr/so_detail`;
const apiDRType = `/list/dr_type`;
const SEARCH_DR = "SEARCH_DR";

const saveDR = (data) => {
  const { dr_id } = data[0];
  try {
    return !dr_id
      ? axios
          .post(`${apiDR}`, data)
          .then((resp) => {
            if (resp.status === 200) {
              console.log("resp.data", resp.data);
              return { success: true, data: resp.data, message: "Success" };
            } else {
              return { success: false, data: {}, message: resp };
            }
          })
          .catch((error) => {
            console.error(error);
            if (error?.response) {
              console.error(error.response);
            }
            return { success: false, data: [], message: error };
          })
      : axios
          .put(`${apiDR}/${dr_id}`, data, header_config)
          .then((resp) => {
            if (resp.status === 200) {
              console.log("resp.data", resp.data);
              return { success: true, data: resp.data, message: "Success" };
            } else {
              return { success: false, data: {}, message: resp };
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
    return { success: false, data: {}, message: error };
  }
};

const getDR = (id) => {
  try {
    return id
      ? axios
          .get(`${apiDR}/${id}`, header_config)
          .then((resp) => {
            if (resp.status === 200) {
              console.log("resp.data", resp.data);
              return { success: true, data: resp.data, message: "Success" };
            } else {
              return { success: false, data: {}, message: resp };
            }
          })
          .catch((error) => {
            console.error(error);
            if (error?.response) {
              console.error(error.response);
            }
            return { success: false, data: {}, message: error };
          })
      : axios
          .get(`${apiDR}/0`, header_config)
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

const getDRSODetail = () => {
  try {
    return axios
      .get(`${apiGetSODetailRef}/0`, header_config)
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

const getDRType = () => {
  try {
    return axios
      .get(`${apiDRType}`, header_config)
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

const searchDR = (data) => (dispatch) => {
  dispatch({ type: SEARCH_DR, payload: data });
};

export { saveDR, getDR, getDRSODetail, getDRType, searchDR, SEARCH_DR };
