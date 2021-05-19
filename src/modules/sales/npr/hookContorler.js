/** @format */

import { Checkbox, DatePicker, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import CustomTable from "../../../components/CustomTable";
const { Option } = Select;
const InputField = ({ fieldProps }) => {
  return <Input {...fieldProps} />;
};
const TextAreaField = ({ fieldProps }) => {
  return <TextArea {...fieldProps}></TextArea>;
};
const SelectField = ({ fieldProps, dataSource, fieldName }) => {
  console.log("dataSource", dataSource);
  return (
    <Select {...fieldProps}>
      {dataSource.map((obj, id) => {
        return (
          <Option value={obj["id"]} key={id}>
            {obj[fieldName]}
          </Option>
        );
      })}
    </Select>
  );
};
const CheckboxField = ({ fieldProps }) => {
  return <Checkbox></Checkbox>;
};
const DatePickerField = ({ fieldProps }) => {
  return <DatePicker {...fieldProps} />;
};
const CustomerTableField = ({ fieldProps }) => {
  return <CustomTable {...fieldProps}></CustomTable>;
};
export {
  InputField,
  SelectField,
  DatePickerField,
  TextAreaField,
  CheckboxField,
  CustomerTableField,
};
