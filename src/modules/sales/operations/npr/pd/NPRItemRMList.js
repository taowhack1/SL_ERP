import { CheckCircleOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomTable from "../../../../../components/CustomTable";
import { getNumberFormat } from "../../../../../include/js/main_config";
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
        <Text>Item</Text>
      </div>
    ),
    dataIndex: "item_no_name",
    align: "left",
    ellipsis: true,
    className: "tb-col-sm",
  },
  {
    title: (
      <div>
        <InputNumber
          {...getNumberFormat(4)}
          placeholder="% Waste"
          step={1}
          min={0}
          size="small"
          className="w-100"
        />
      </div>
    ),
    dataIndex: "npr_product_cost_waste_percent_qty",
    align: "right",
    width: "20%",
    className: "tb-col-sm",
    render: (val) => (
      <InputNumber
        {...getNumberFormat(4)}
        value={val}
        placeholder="% Waste"
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
    item_no_name: "[TEST1] TEST ITEM RM 1",
    npr_product_cost_waste_percent_qty: 3,
  },
  {
    id: 1,
    item_no_name: "[TEST2] TEST ITEM RM 2",
    npr_product_cost_waste_percent_qty: 3,
  },
  {
    id: 2,
    item_no_name: "[TEST3] TEST ITEM RM 3",
    npr_product_cost_waste_percent_qty: 3,
  },
];
const NPRItemRMList = () => {
  return (
    <>
      <div className="under-line mb-1">
        <Text strong>Procedure :</Text>
      </div>
      <p className="pre-wrap pd-left-2">{`test test\ntest\ntest333`}</p>

      <div className="under-line mb-1">
        <Text strong>Formula</Text>
      </div>
      <CustomTable
        columns={columns}
        dataSource={mockupData}
        bordered
        rowKey={"id"}
        pagination={false}
        rowClassName="row-table-detail"
      />
    </>
  );
};

export default NPRItemRMList;
