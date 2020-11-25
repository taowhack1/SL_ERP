import { message } from "antd";
import axios from "axios";
import React from "react";
import { api_upload_file } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";

export const item_save_file = (item_id, files) => {
  try {
    const file_temp = files.item_image;
    const file_temp2 = Object.values(files.certificate);
    file_temp2.unshift(file_temp);
    console.log("file_temp", file_temp2);
    file_temp2
      .filter((file) => file && file !== null && file !== undefined)
      .forEach(async (file) => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("user_name", file.user_name);
        formData.append("commit", 1);
        formData.append("file_type_id", file.file_type_id);
        formData.append("item_file_remark", "");
        if (
          !file.commit ||
          !file.commit === undefined ||
          file.commit === null
        ) {
          return false;
        } else {
          return axios
            .post(`${api_upload_file}/${item_id}`, formData)
            .then((res) => {
              console.log("Uploaded.", file.file_type_id, res);
            });
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
