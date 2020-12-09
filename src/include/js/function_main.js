import { Tag } from "antd";
import React from "react";
import $ from "jquery";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import numeral from "numeral";

export const sortData = (arrObject) => {
  let copyData = arrObject;
  let temp = [];
  copyData.map((obj, key) => {
    return temp.push({
      ...obj,
      id: key,
      commit: 1,
    });
  });
  return temp;
};

export const sortDataWithoutCommit = (arrObject) => {
  let copyData = arrObject;
  let temp = [];
  copyData.map((obj, key) => {
    return temp.push({
      ...obj,
      id: key,
    });
  });
  return temp;
};

export const getNameById = (id, masterData, masterField, field) => {
  const data = id && masterData.filter((data) => data[`${masterField}`] === id);
  const data2 = data && { ...data[0] };
  return data2 && data2[`${field}`] ? data2[`${field}`] : "";
};

export const calSubtotal = (qty, price, discount = 0) => {
  let copyQty = qty && qty ? qty : 0;
  let copyPrice = price && price ? price : 0;
  let total = copyQty * copyPrice;
  return total - discount;
};

export const sumArrObj = (arrObj = [], field, vat = 0.07) => {
  let numbers = [];
  arrObj &&
    arrObj.map((line) => {
      numbers.push(line[field]);
    });
  let total = numbers.length
    ? numbers.reduce((prev, current) => prev + current)
    : 0;
  let vat_amount = total * vat;
  let include_vat = total + vat_amount;
  let summary = {
    exclude_vat: total,
    vat: vat_amount,
    include_vat: include_vat,
  };
  return total ? summary : 0;
};

export const sumArrOdjWithField = (arrObj = [], field) => {
  let numbers = [];
  arrObj &&
    arrObj.map((line) => {
      numbers.push(line[field]);
    });
  let total = numbers.length
    ? numbers.reduce((prev, current) => prev + current)
    : 0;
  return total;
};

export const calDiscount = (discount = 0, total_qty = 0, qty = 0) => {
  return (discount / total_qty) * qty;
};

export const validateFormHead = (obj_data, require_field) => {
  if (typeof obj_data === "object" && Array.isArray(require_field)) {
    $("*").removeClass("require-field-alert");
    let validate = true;
    let objKey = [];
    require_field.map((req_field) => {
      if (
        obj_data[req_field] === null ||
        (typeof obj_data[req_field] === "string" &&
          obj_data[req_field].trim() === "") ||
        !obj_data[req_field]
      ) {
        objKey.push(`[name=${req_field}]`);
        validate = false;
      }
    });
    const require_fields = `${objKey.toString()}`;
    $(`${require_fields}`).closest(".ant-col").addClass("require-field-alert");
    $(`${require_fields}`).focus();
    return { validate: validate, objKey: objKey };
  } else {
    console.log("Wrong type of parameter.");
  }
};

export const validateFormDetail = (ArrayObj, require_field) => {
  if (Array.isArray(ArrayObj) && Array.isArray(require_field)) {
    $("*").removeClass("require-row-field-alert");
    let validate = true;
    let objKey = [];
    ArrayObj.map((obj_data, key) => {
      require_field.map((req_field) => {
        if (
          !obj_data[req_field] ||
          obj_data[req_field] === null ||
          (typeof obj_data[req_field] === "string" &&
            obj_data[req_field].trim() === "") ||
          obj_data[req_field] <= 0
        ) {
          objKey.push(`[name=row-${key}]`);
          // objKey.push(`[name=${req_field}]`);
          validate = false;
        }
      });
    });

    const require_fields = `${objKey.toString()}`;
    // $(`${require_fields}`).addClass("require-field-alert");
    $(`${require_fields}`).addClass("require-row-field-alert");
    $(`${require_fields}`).focus();

    return { validate: validate, objKey: objKey };
  } else {
    console.log("Wrong type of parameter.");
  }
};

export const getSelfStepStatus = ({
  button_confirm,
  button_approve,
  button_reject,
  process_complete,
  trans_status_name,
}) => {
  if (!process_complete) {
    if (button_approve || button_reject || button_confirm) {
      return (
        <Tag
          color="processing"
          icon={<SyncOutlined spin />}
          className="tag-status"
        >
          {"Pending"}
        </Tag>
      );
    } else if (trans_status_name !== "Cancel") {
      return (
        <Tag
          color="warning"
          icon={<ClockCircleOutlined />}
          className="tag-status"
        >
          {"Waiting"}
        </Tag>
      );
    } else {
      return (
        <Tag
          color="error"
          icon={<CloseCircleOutlined />}
          className="tag-status"
        >
          {trans_status_name}
        </Tag>
      );
    }
  } else {
    return (
      <Tag
        color="success"
        icon={<CheckCircleOutlined />}
        className="tag-status"
      >
        {trans_status_name}
      </Tag>
    );
  }
};

export const getRefStatus = ({
  trans_close_id,
  trans_close_name,
  trans_status_name,
  process_complete,
}) => {
  if (trans_status_name === "Cancel" || !process_complete) {
    return "-";
  } else {
    switch (trans_close_id) {
      case 1:
        return (
          <Tag color="purple" className="tag-status">
            {trans_close_name}
          </Tag>
        );
      case 2:
      case 3:
        return (
          <Tag
            color="success"
            icon={<CheckCircleOutlined />}
            className="tag-status"
          >
            {trans_close_name}
          </Tag>
        );

      default:
        return (
          <Tag color="default" className="tag-status">
            {trans_close_name}
          </Tag>
        );
    }
  }
};

export const get_pre_run_no = (prev, index, value) => {
  if ((index !== null || index !== undefined) && prev.length) {
    let copy_run_no = prev;
    if (index === 0) {
      copy_run_no[1] = "--";
    }
    if (index === 0 && value > 5) {
      copy_run_no[index] = value;
      copy_run_no[2] = "";
      copy_run_no[3] = "";
      copy_run_no[4] = "----";
    } else {
      copy_run_no[index] = value;
    }
    return copy_run_no;
  }
};

export const convertNumberToTime = (number = 0) => {
  const second = (number ? number : 0) * 60;
  let result = numeral(second).format("00:00:00");
  result = result.split(":");
  result = result[0].length === 1 ? "0" + result.join(":") : result.join(":");
  console.log("convertNumberToTime Before : ", number, " After :", result);
  return result;
};

export const convertTimeToNumber = (time = "00:00:00") => {
  const timeTemp = time ? time : "00:00:00";
  const timeArray = timeTemp.split(":");
  const minutes = parseInt(timeArray[0] * 60) + parseInt(timeArray[1]);
  console.log("convertTimeToNumber Before : ", time, " After : ", minutes);
  return minutes;
};
