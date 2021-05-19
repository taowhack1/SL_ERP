/** @format */

import { useForm } from "antd/lib/form/Form";
import React from "react";
import { Controller } from "react-hook-form";
import { InputField } from "./hookContorler";

export const NprComponentsColumns = ({
  readOnly,
  onDelete,
  onChangeValue,
  control,
}) => [
  {
    title: "No.",
    width: "1%",
    dataIndex: "id",
    render: (val) => val + 1,
    align: "center",
  },
  {
    title: "Item / Item Code.",
    width: "5%",
    dataIndex: "item_id",
    render: (val) => val + 1,
    align: "center",
  },
  {
    title: "Description.",
    width: "5%",
    dataIndex: "description",
    render: (val) => val + 1,
    align: "center",
    render: (val, record) => {
      return (
        <Controller
          as={InputField({
            fieldProps: {
              className: "form-control",
              placeholder: "Volume/Order",
            },
          })}
          name='a'
          control={control}
          rules={{ required: false }}
        />
      );
    },
  },
  {
    title: "Supply by.",
    width: "5%",
    dataIndex: "supply_by",
    render: (val) => val + 1,
    align: "center",
  },
  {
    title: "Supplier.",
    width: "5%",
    dataIndex: "supplier",
    render: (val) => val + 1,
    align: "center",
  },
  {
    title: "Picture.",
    width: "5%",
    dataIndex: "picture",
    render: (val) => val + 1,
    align: "center",
  },
  {
    title: "Agreed % Waste with customer.",
    width: "5%",
    dataIndex: "agreed",
    render: (val) => val + 1,
    align: "center",
  },
];
export const NprComponentsDetail = {
  item_id: null,
  description: null,
  supply_by: null,
  picture: null,
  agreed: null,
};
