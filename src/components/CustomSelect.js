import React from "react";
import { Select } from "antd";
const { Option } = Select;
const CustomSelect = (props) => {
  return (
    <Select
      {...props}
      filterOption={(inputValue, option) =>
        option?.title?.toUpperCase()?.indexOf(inputValue?.toUpperCase()) !== -1
      }
      className={"full-width " + props?.className}
    >
      {props?.data &&
        props?.data.map((option, key) => {
          return (
            <Option
              key={key}
              value={option[props.field_id]}
              title={option[props.field_name]}
              data={option}
            >
              {option[props.field_name]}
            </Option>
          );
        })}
    </Select>
  );
};

export default React.memo(CustomSelect);
