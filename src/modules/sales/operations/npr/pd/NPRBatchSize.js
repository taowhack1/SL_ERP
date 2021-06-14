import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, InputNumber, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useFormContext } from "react-hook-form";
import CustomTable from "../../../../../components/CustomTable";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
const columns = [
  {
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    className: "tb-col-sm",
    render: (val, _, index) => index + 1,
  },
  {
    title: (
      <div className="text-center">
        <Text>Batch Size</Text>
      </div>
    ),
    dataIndex: "batch_size",
    align: "right",
    className: "tb-col-sm",
    render: (val) => (
      <InputNumber
        value={val}
        placeholder="Batch Size"
        step={50}
        min={0}
        size="small"
        className="full-width"
      />
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text>FG Qty</Text>
      </div>
    ),
    dataIndex: "fg_qty",
    align: "right",
    className: "tb-col-sm",
    render: (val) => (
      <InputNumber
        value={val}
        placeholder="FG Qty."
        step={50}
        min={0}
        size="small"
        className="full-width"
      />
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text>Cost</Text>
      </div>
    ),
    dataIndex: "batch_cost",
    align: "right",
    className: "tb-col-sm",
    render: (val) => (
      <InputNumber
        {...getNumberFormat(2)}
        value={val}
        placeholder="Cost"
        step={1}
        min={0}
        size="small"
        className="full-width"
      />
    ),
  },
];
const mockupData = [
  {
    id: 0,
    batch_size: 300,
    fg_qty: 630,
    batch_cost: 1500,
  },
  {
    id: 1,
    batch_size: 600,
    fg_qty: 1260,
    batch_cost: 2300,
  },
  {
    id: 2,
    batch_size: 900,
    fg_qty: 1590,
    batch_cost: 4000,
  },
];
const initialState = {
  npr_product_cost_detail_batch_size: null,
  npr_product_cost_detail_fg_qty: null,
  npr_product_cost_detail_cost: null,
  npr_product_cost_detail_remark: null,
  uom_id: null,
};
const NPRBatchSize = () => {
  const {
    formMethod: { control, register, formState: error, watch },
    fieldArray: { field, append, remove },
    readOnly,
    PDEmp,
  } = useFormContext();
  console.log(field);
  return (
    <>
      <div className="under-line mb-1 d-flex flex-start flex-row">
        <Text strong>Batch Size</Text>
        <Button
          className="ml-2 primary"
          size="small"
          onClick={() => append(initialState)}
        >
          <PlusOutlined />
          Add Batch Size
        </Button>
      </div>

      <CustomTable
        columns={columns}
        dataSource={field}
        bordered
        rowKey={"id"}
        className="w-50"
        pagination={false}
        rowClassName="row-table-detail"
        // onAdd={append}
        // footer={
        //   <Button className="full-width" type="ghost">
        //     Add Batch Size
        //   </Button>
        // }
      />
    </>
  );
};

export default NPRBatchSize;
