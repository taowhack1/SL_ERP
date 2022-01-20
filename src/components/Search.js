/** @format */

import React from "react";
import { Input } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";

export default function Search(props) {
  const onChange = (value) => {
    props.onSearch && props.onSearch(value);
  };
  return (
    <>
      <Input
        style={props.style}
        size={props.size ?? "middle"}
        className={props.className ?? ""}
        placeholder={props.placeholder || "Search"}
        value={props.search}
        allowClear
        onChange={(e) => {
          e.target.value ? onChange(e.target.value) : onChange("");
        }}
        prefix={props.loading ? <LoadingOutlined /> : <SearchOutlined />}
      />
    </>
  );
}
