import { EditTwoTone, EllipsisOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomTable from "../../../../../components/CustomTable";
import { convertDigit } from "../../../../../include/js/main_config";
import ModalRequestSample from "./ModalRequestSample";
const columns = () => [
  {
    title: (
      <div className="text-center">
        <Text>No.</Text>
      </div>
    ),
    dataIndex: "id",
    align: "center",
    width: "5%",
    render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <Text>Request Date.</Text>
      </div>
    ),
    dataIndex: "request_date",
    align: "center",
    width: "12.5%",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <Text>Qty.</Text>
      </div>
    ),
    align: "center",
    width: "20%",
    children: [
      {
        title: (
          <div className="text-center">
            <Text>Request</Text>
          </div>
        ),
        dataIndex: "request_qty",
        align: "right",
        render: (val) => convertDigit(val, 4),
      },
      {
        title: (
          <div className="text-center">
            <Text>Actual</Text>
          </div>
        ),
        dataIndex: "response_qty",
        align: "right",
        render: (val) => convertDigit(val, 4),
      },
    ],
  },
  {
    title: (
      <div className="text-center">
        <Text>PIC</Text>
      </div>
    ),
    dataIndex: "response_by_name",
    align: "left",
    width: "30%",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <Text>Due Date</Text>
      </div>
    ),
    dataIndex: "response_due_date",
    align: "center",
    width: "12.5%",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <Text>Status</Text>
      </div>
    ),
    dataIndex: "status",
    align: "center",
    width: "12.5%",
    render: (val) => <Text strong>{val}</Text>,
  },
  {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    dataIndex: "id",
    align: "center",
    width: "5%",
    render: (val) => <EditTwoTone className="button-icon" />,
  },
];
const RDRequestSample = () => {
  const mockupData = [
    {
      id: 0,
      request_date: "20/06/2021",
      request_qty: 10,
      response_qty: 10,
      response_by_name: "Test Employee 1",
      response_date: "22/06/2021",
      response_due_date: "23/06/2021",
      response_actual_date: "23/06/2021",
      status: "Pending R&D",
    },
    {
      id: 1,
      request_date: "20/06/2021",
      request_qty: 15,
      response_qty: 15,
      response_by_name: "Test Employee 2",
      response_date: "22/06/2021",
      response_due_date: "23/06/2021",
      response_actual_date: "23/06/2021",
      status: "Complete",
    },
  ];

  return (
    <div className="form-section">
      <CustomTable
        rowClassName="row-table-detail"
        dataSource={mockupData}
        columns={columns()}
        rowKey={"id"}
      />
      <ModalRequestSample />
    </div>
  );
};

export default RDRequestSample;
