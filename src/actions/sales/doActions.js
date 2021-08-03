import axios from "axios";
import { get_so_by_id } from ".";
import { api_approve } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";
const apiDRList = `/sales/do/dr`;
const apiDO = `/sales/do`;
const apiDRCustomer = `/sales/do/dr/customer`;
const getDRRefList = () => {
  try {
    return axios
      .get(`${apiDRList}/0&0&0`, header_config)
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

const getDO = (user_name, id) => {
  try {
    return id
      ? axios
          .get(`${apiDO}/${user_name}&${id}`, header_config)
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
          .get(`${apiDO}/${user_name}&0`, header_config)
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

const getFormDR = ({ customer_id = 0, dr_id = 0, do_id = 0 }) => {
  try {
    return axios
      .get(
        `${apiDRList}/${customer_id || 0}&${dr_id || 0}&${do_id || 0}`,
        header_config
      )
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
const getDRCustomers = () => {
  try {
    return axios
      .get(`${apiDRCustomer}`, header_config)
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

const saveDO = (data) => {
  const { do_id } = data;
  try {
    return !do_id
      ? axios
          .post(`${apiDO}`, [data])
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
          .put(`${apiDO}/${do_id}`, [data], header_config)
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

export { getDRRefList, getDO, getFormDR, getDRCustomers, saveDO };
