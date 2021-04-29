import { Table } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const columns = [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    render: (val) => val + 1,
  },
  {
    title: "NPR No.",
    align: "center",
    dataIndex: "npr_no",
    width: "15%",
  },
  {
    title: "NPR date",
    align: "center",
    dataIndex: "npr_request_date",
    width: "10%",
  },
  {
    title: "Product",
    align: "left",
    dataIndex: "npr_product_name",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: "Customer",
    align: "left",
    dataIndex: "npr_customer_name",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: "Sales Person",
    align: "left",
    dataIndex: "npr_created_by_name",
    width: "15%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: "R&D",
    children: [
      {
        title: "PIC",
        align: "left",
        dataIndex: "npr_responsed_by",
        width: "15%",
        ellipsis: true,
        render: (val) => val || "-",
      },
      {
        title: "Accept Date",
        align: "left",
        dataIndex: "npr_responsed_date",
        width: "10%",
        render: (val) => val || "-",
      },
      {
        title: "Deliver Date",
        align: "center",
        dataIndex: "npr_responsed_delivery_date",
        width: "10%",
        render: (val) => val || "-",
      },
      {
        title: "Status",
        align: "center",
        dataIndex: "tg_trans_status_id",
        width: "10%",
        ellipsis: true,
        render: (val) => val || "-",
      },
    ],
  },
];
// useEffect(() => {

// }, []);
const NPRTable = ({ dataSource }) => {
  //   const { loading } = useSelector((state) => state.auth.sales);
  return (
    <>
      <h1>NPR List</h1>
      <Table
        size={"small"}
        rowKey={"id"}
        columns={columns}
        bordered
        dataSource={dataSource}
        pagination={{
          pageSize: 15,
          pageSizeOptions: ["10", "15", "20", "25", "30", "50"],
        }}
      />
    </>
  );
};

export default React.memo(NPRTable);
