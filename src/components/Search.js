import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Search(props) {
  return (
    <>
      <Input
        placeholder="search"
        onChange={(e) => {
          props && props.onSearch(e.target.value);
        }}
        prefix={<SearchOutlined />}
      />
    </>
  );
}
