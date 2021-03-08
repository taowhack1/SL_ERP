import { message } from "antd";
import axios from "axios";

import {
  api_upload_file,
  api_upload_vendor_document,
} from "../../include/js/api";

export const item_save_file = (item_id, files, user_name) => {
  try {
    const file_temp = files.item_image;
    const file_temp2 = Object.values(files.certificate);
    file_temp2.unshift(file_temp);
    console.log("file_temp", file_temp2);
    file_temp2
      // .filter((file) => file && file !== null && file !== undefined)
      .forEach(async (file, key) => {
        console.log(file, key);
        const formData = new FormData();

        formData.append("file", file);
        formData.append("user_name", user_name);
        formData.append("commit", 1);
        formData.append("file_type_id", key + 1);
        formData.append("item_file_remark", "");
        if (
          file === null ||
          (file.commit !== undefined && file.commit !== null && file.commit)
        ) {
          return axios
            .post(`${api_upload_file}/${item_id}`, formData)
            .then((res) => {
              console.log("Uploaded.", key + 1, res);
            });
        } else {
          console.log("File else file_type_id : ", key + 1);
          return false;
        }

        // const upload_res = await axios.post(
        //   `${api_upload_file}/${item_id}`,
        //   formData
        // );
        // if (upload_res.data) {
        //   console.log("Uploaded.", file.file_type_id);
        // } else {
        //   console.log(
        //     "Somethings went wrong ! ",
        //     upload_res,
        //     file.file_type_id
        //   );
        // }
      });
  } catch (error) {
    console.log(error);
    error &&
      message.error({
        content: "Missing some file data. \n" + error,
        key: "error",
        duration: 3,
      });
  }
};

export const itemSaveFileVendor = (
  item_id,
  item_vendor_id,
  files,
  user_name
) => {
  try {
    // const file_temp = files.item_image;
    const file_temp2 = Object.values(files.certificate);
    const objFileType = Object.keys(files.certificate);

    console.log("itemSaveFileVendor", file_temp2);
    let promiseFunction = [];
    file_temp2
      // .filter((file) => file && file !== null && file !== undefined)
      .forEach(async (file, key) => {
        const formData = new FormData();
        console.log("file_type_id", objFileType[key]);
        formData.append("file", file);
        formData.append("user_name", user_name);
        formData.append("commit", 1);
        formData.append("file_type_id", objFileType[key]);
        formData.append("item_file_remark", "");
        if (
          file === null ||
          (file.commit !== undefined && file.commit !== null && file.commit)
        ) {
          console.log("Before Upload");
          for (let arr of Object.entries(formData)) {
            console.log(arr[0], arr[1]);
          }
          promiseFunction.push(
            axios
              .post(
                `${api_upload_vendor_document}/${item_id}&${item_vendor_id}`,
                formData
              )
              .then((res) => {
                console.log("Uploaded.", key + 1, res);
              })
          );
        } else {
          console.log("File else file_type_id : ", file.file_type_id);
          return false;
        }
      });
    return promiseFunction;
    // promiseFunction.length &&
    // Promise.allSettled(promiseFunction).then((res) =>
    //   console.log("Update all file ", res)
    // )
  } catch (error) {
    console.log(error);
    error &&
      message.error({
        content: "Missing some file data. \n" + error,
        key: "error",
        duration: 3,
      });
  }
};
