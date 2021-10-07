import React from "react";
import { DatePicker, Table } from "antd";
import CustomTable from "../../../components/CustomTable";
import moment from "moment";
import { convertDigit } from "../../../include/js/main_config";
const TableResultPO = () => {
  const expandedRowRender = (row) => {
    return (
      <CustomTable
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        loading={false}
        columns={subItemColumns()}
        dataSource={row.detail}
      />
    );
  };
  return (
    <>
      <Table
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        loading={false}
        columns={mockItemColumns()}
        dataSource={mockDataPR}
        expandable={{ expandedRowRender }}
      />
    </>
  );
};

export default React.memo(TableResultPO);

const mockDataPR = [
  {
    id: 1,
    item_no_name: "[MOCK-1] Mock item 1",
    qty: 80,
    moq: 100,
    uom_no: "Kg.",
    due_date: "05/10/2021",
    detail: [
      {
        id: 1,
        pr_no: "PR01231123",
        qty: 30,
        uom_no: "Kg.",
        due_date: "05/10/2021",
        description: "เปิดซื้อจ้อบ 1",
      },
      {
        id: 2,
        pr_no: "PR01231125",
        qty: 40,
        uom_no: "Kg.",
        due_date: "08/10/2021",
        description: "เปิดซื้อจ้อบ 2",
      },
      {
        id: 3,
        pr_no: "PR01231128",
        qty: 10,
        uom_no: "Kg.",
        due_date: "07/10/2021",
        description: "เปิดซื้อจ้อบ 3",
      },
    ],
  },
  {
    id: 2,
    item_no_name: "[MOCK-2] Mock item 2",
    qty: 20,
    moq: 20,
    uom_no: "Kg.",
    due_date: "07/10/2021",
    detail: [
      {
        id: 1,
        pr_no: "PR01231130",
        qty: 30,
        uom_no: "Kg.",
        due_date: "07/10/2021",
        description: "เปิดซื้อจ้อบ 4",
      },
      {
        id: 2,
        pr_no: "PR01231135",
        qty: 40,
        uom_no: "Kg.",
        due_date: "08/10/2021",
        description: "เปิดซื้อจ้อบ 5",
      },
      {
        id: 3,
        pr_no: "PR01231138",
        qty: 10,
        uom_no: "Kg.",
        due_date: "07/10/2021",
        description: "เปิดซื้อจ้อบ 6",
      },
    ],
  },
];

const mockItemColumns = () => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (val, _, index) => index + 1,
  },

  {
    title: (
      <div className="text-center">
        <b>Item</b>
      </div>
    ),
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
    dataIndex: "qty",
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>MOQ</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "moq",
    render: (val) => convertDigit(val, 6) || "-",
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
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "due_date",
    render: (val) => (
      <DatePicker format="DD/MM/YYYY" value={moment(val, "DD/MM/YYYY")} />
    ),
  },
];
const subItemColumns = () => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (val, _, index) => index + 1,
  },

  {
    title: (
      <div className="text-center">
        <b>PR No.</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "pr_no",
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
    dataIndex: "qty",
    render: (val) => convertDigit(val, 6) || "-",
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
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "due_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "description",
    render: (val) => val || "-",
  },
];
