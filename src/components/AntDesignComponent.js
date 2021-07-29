import React from "react";
import {
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  TimePicker,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;
const InputField = ({ fieldProps }) => {
  return <Input {...fieldProps} />;
};
const InputNumberField = ({ fieldProps }) => {
  return <InputNumber {...fieldProps} />;
};
const TextAreaField = ({ fieldProps }) => {
  return <TextArea {...fieldProps}></TextArea>;
};
const SelectField = ({ fieldProps, dataSource, fieldName, fieldId }) => {
  return (
    <Select {...fieldProps}>
      {dataSource.map((obj, id) => {
        return (
          <Option value={fieldId ? obj[fieldId] : obj["id"]} key={id} obj={obj}>
            {obj[fieldName]}
          </Option>
        );
      })}
    </Select>
  );
};

const DatePickerField = ({ fieldProps }) => {
  return <DatePicker {...fieldProps} />;
};

const radioField = (options, { onChange, value }) => {
  return (
    <Radio.Group value={value} onChange={(e) => onChange(e.target.value)}>
      {options.length > 0 &&
        options.map((obj, index) => (
          <Radio
            style={{ display: "block", height: 30, lineHeight: "30px" }}
            value={obj.id}
            key={index}
          >
            {obj.title}
          </Radio>
        ))}
    </Radio.Group>
  );
};

const TimePickerField = ({ fieldProps }) => <TimePicker {...fieldProps} />;
export {
  InputField,
  SelectField,
  DatePickerField,
  TextAreaField,
  radioField,
  InputNumberField,
  TimePickerField,
};
