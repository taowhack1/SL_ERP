import { message } from "antd";
import axios from "axios";
import React from "react";
import { api_upload_file } from "../../include/js/api";
import { header_config } from "../../include/js/main_config";

export const item_save_file = async (files, item_id) => {
  // const reader = new FileReader();
  const formData = new FormData();
  // console.log("item_save_file", files);

  // const handleFiles = (files) => {
  //   let photosArr = [];
  //   let filesUploadArr = [];
  //   for (let file of files) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.addEventListener("load", () => {
  //       let fileobj = {
  //         name: file.name,
  //         type: file.type,
  //         size: file.size,
  //         src: reader.result,
  //       };
  //       photosArr.push(fileobj);
  //       filesUploadArr.push(file);
  //       setFilesUpload([...filesUpload, ...filesUploadArr]);
  //     });
  //   }
  // };

  try {
    console.log(files[0]);
    // reader.readAsDataURL(files[0]);
    formData.append("file", files[0]);
    formData.append("user_name", files[0].user_name);
    formData.append("commit", 1);
    formData.append("file_type_id", files[0].file_type_id);
    formData.append("item_file_remark", "");
    // console.log("formData", formData.entries());
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const upload_res = await axios.post(
      `${api_upload_file}/${item_id}`,
      formData
    );
    console.log(upload_res);
    if (upload_res.data) {
      message.error({
        content: "Upload file sucess",
        key: "success",
        duration: 2,
      });
    } else {
      console.log("Somethings went wrong ! ", upload_res);
    }
  } catch (error) {
    error.response.status === 500
      ? message.error({
          content: "Missing some file data. \n" + error,
          key: "error",
          duration: 3,
        })
      : message.error({
          content: "Somethings went wrong. \n" + error,
          key: "error",
          duration: 3,
        });
  }
};
