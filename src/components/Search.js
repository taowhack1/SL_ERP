import React from "react";
import { Input } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";

export default function Search(props) {
  return (
    <>
      <Input
        placeholder="search"
        value={props.search}
        onChange={(e) => {
          props && props.onSearch(e.target.value);
        }}
        prefix={props.loading ? <LoadingOutlined /> : <SearchOutlined />}
      />
    </>
  );
}
