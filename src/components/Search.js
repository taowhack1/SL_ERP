import React from "react";
import { Input } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";

export default function Search(props) {
  const onChange = (value) => {
    props && props.onSearch(value);
  };
  return (
    <>
      <Input
        placeholder="Search"
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
