import React from "react";
import { Checkbox, Input, Table } from "antd";
import Search from "../../../components/Search";

const TableItem = (props) => {
  const { dataSource = mockData, loading = false } = props;
  return (
    <>
      <Table
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        loading={loading}
        columns={mockItemColumns()}
        dataSource={dataSource}
      />
    </>
  );
};

export default React.memo(TableItem);

const mockData = [
  {
    id: 1,
    item_no_name: "[C202SRLA00500] TEST-ITEM-PK",
    pr_detail_qty: 20,
    uom_no: "Pcs.",
    vendor_no_name: "[ 52123 ] Vendor 1",
    pr_no: "PR21100001",
    req_by: "Kittikarn S.",
    pr_detail_delivery_date: "27/10/2021",
    description: "Description... ",
  },
  {
    id: 2,
    item_no_name: "[C202SRLA00500] TEST-ITEM-PK",
    pr_detail_qty: 120,
    uom_no: "Pcs.",
    vendor_no_name: "[ 52123 ] Vendor 2",
    pr_no: "PR21100002",
    req_by: "Tulagarn S.",
    pr_detail_delivery_date: "15/10/2021",
    description: "Description... ",
  },
  {
    id: 3,
    item_no_name: "[C102SRLA00500] TEST-ITEM-RM",
    pr_detail_qty: 50,
    uom_no: "Kg.",
    vendor_no_name: "[ 52123 ] Vendor 3",
    pr_no: "PR21100003",
    req_by: "Kitty S.",
    pr_detail_delivery_date: "21/10/2021",
    description: "Description... ",
  },
];

const mockItemColumns = () => [
  {
    title: (
      <div className="text-center">
        <b></b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (val) => <Checkbox />,
  },

  {
    title: <Search placeholder="Item" />,
    align: "left",
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Quantity</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "pr_detail_qty",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
  {
    title: <Search placeholder="Vendor" />,
    align: "left",
    className: "tb-col-sm",
    // width: "15%",
    dataIndex: "vendor_no_name",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "pr_detail_delivery_date",
    render: (val) => val || "-",
  },
  {
    title: <Search placeholder="PR No." />,
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "pr_no",
    render: (val) => val || "-",
  },
  {
    title: <Search placeholder="Description" />,
    align: "left",
    className: "tb-col-sm",
    dataIndex: "description",
    ellipsis: true,
    render: (val) => val || "-",
  },
];
