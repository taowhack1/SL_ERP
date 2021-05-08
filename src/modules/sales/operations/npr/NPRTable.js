import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
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
    title: (
      <div className="text-center">
        <Text>Product</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_product_name",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>Customer</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_customer_name",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>Sales Person</Text>
      </div>
    ),
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
        title: (
          <div className="text-center">
            <Text>PIC</Text>
          </div>
        ),
        align: "left",
        dataIndex: "npr_responsed_required_by_name",
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
      },
    ],
  },
];

const NPRTable = ({ dataSource }) => {
  const history = useHistory();
  const viewRecord = (record) =>
    history.push("/sales/npr/" + record.npr_id, record);
  console.log("NPRTable ", dataSource);
  return (
    <>
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
        onRow={(record) => ({
          onClick: () => viewRecord(record),
        })}
      />
    </>
  );
};

export default React.memo(NPRTable);
