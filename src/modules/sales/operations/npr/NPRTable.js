import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useHistory } from "react-router";
import useKeepLogs from "../../../logs/useKeepLogs";
import Authorize from "../../../system/Authorize";
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
    align: "left",
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
        render: (val) => <Text style={{ color: "blue" }}>{val || "-"}</Text>,
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
        render: (val) => <Text style={{ color: "blue" }}>{val || "-"}</Text>,
      },
    ],
  },
  {
    title: "Status",
    align: "center",
    dataIndex: "trans_status",
    width: "15%",
    render: (val, record) => <Text>{val || "N/A"}</Text>,
  },
];

const NPRTable = ({ dataSource }) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const history = useHistory();
  const viewRecord = (record) =>
    history.push("/sales/npr/rd/" + record.npr_id, record);
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
        }}
        onRow={(record) => ({
          onClick: (e) => {
            viewRecord(record);
            keepLog.keep_log_action("View NPR : ", record.npr_no);
          },
        })}
      />
    </>
  );
};

export default React.memo(NPRTable);
