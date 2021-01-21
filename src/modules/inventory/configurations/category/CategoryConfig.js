import React from "react";
import { Input } from "antd";

export const categoryFields = {
  type_id: null,
  category_name: null,
  user_name: null,
  category_remark: "",
  category_name_th: "",
  commit: 0,
};
export const categoryFieldsRequire = ["category_name", "type_id"];
export const categoryShowColumns = (onSearch) => [
  {
    width: "6%",
  },
  {
    title: "No",
    dataIndex: "category_id",
    width: "10%",
    ellipsis: true,
    render: (value, record, index) => {
      return record.id + 1;
    },
  },
  {
    title: "Category Name",
    dataIndex: "category_name",
    ellipsis: true,
  },
  {
    title: (
      <>
        <Input onChange={onSearch} />
      </>
    ),
    dataIndex: "category_name",
    ellipsis: true,
  },
];
export const itemShowColumns = [
  {
    title: "No",
    width: "5%",
    dataIndex: "type_id",
    ellipsis: true,
    render: (value, record, index) => {
      return record.id + 1;
    },
  },
  {
    title: "Type Name",
    dataIndex: "type_name",
    ellipsis: true,
  },
];
