import React from "react";
import { AutoComplete } from "antd";

const CustomAutoComplete = (props) => {
  //   console.log(props);
  const config = {
    defaultValue: props.val,
    options: props.options,
    placeholder: props.placeholder,
    onBlur: () => {
      props.onBlur ? props.onBlur() : console.log("onBlur");
    },
    onSearch: () => {
      props.onSearch ? props.onSearch() : console.log("onSearch");
    },
    onSelect: () => {
      props.onSelect ? props.onSelect() : console.log("onSelect");
    },

    disabled: props.disabled ? 1 : 0,
  };
  return (
    <AutoComplete
      {...config}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    ></AutoComplete>
  );
};

export default CustomAutoComplete;
