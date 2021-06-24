import {
  EditTwoTone,
  EllipsisOutlined,
  PrinterTwoTone,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getNPRRequestSample } from "../../../../../actions/sales/nprActions";
import CustomTable from "../../../../../components/CustomTable";
import { sortData } from "../../../../../include/js/function_main";
import { convertDigit } from "../../../../../include/js/main_config";
import ModalRequestSample from "./ModalRequestSample";
const columns = ({ onOpen }) => [
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
    dataIndex: "npr_additional_request_date",
    align: "center",
    width: "12.5%",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <Text>Sample Qty.</Text>
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
        dataIndex: "npr_additional_request_qty",
        align: "right",
        render: (val) => (val ? convertDigit(val, 4) : "-"),
      },
      {
        title: (
          <div className="text-center">
            <Text>Actual</Text>
          </div>
        ),
        dataIndex: "npr_additional_actual_qty",
        align: "right",
        render: (val) => (val ? convertDigit(val, 4) : "-"),
      },
    ],
  },
  {
    title: (
      <div className="text-center">
        <Text>Batch Size(g)</Text>
      </div>
    ),
    dataIndex: "npr_additional_batch_size",
    width: "10%",
    align: "right",
    render: (val) => (val ? convertDigit(val, 4) : "-"),
  },
  {
    title: (
      <div className="text-center">
        <Text>PIC</Text>
      </div>
    ),
    dataIndex: "npr_additional_response_by_no_name",
    align: "left",
    width: "20%",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>Due Date</Text>
      </div>
    ),
    dataIndex: "npr_additional_response_due_date",
    align: "center",
    width: "12%",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>Status</Text>
      </div>
    ),
    dataIndex: "trans_status",
    align: "center",
    width: "12%",
    render: (val) => <Text strong>{val || "N/A"}</Text>,
  },
  {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    dataIndex: "id",
    align: "center",
    width: "7%",
    render: (val, record) => (
      <div className="text-center">
        <PrinterTwoTone
          className="button-icon"
          onClick={() => onOpen({ data: null })}
        />
        <EditTwoTone
          className="button-icon pd-left-1"
          onClick={() => onOpen({ data: record })}
        />
      </div>
    ),
  },
];
const RDRequestSample = () => {
  const { id } = useParams();
  const [state, setState] = useState([]);
  const [modal, setModal] = useState({
    visible: false,
    loading: false,
    data: null,
  });
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
      batch_size: 150,
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
      batch_size: 80,
      status: "Complete",
    },
  ];
  const onOpen = (data) =>
    setModal((prev) => ({ ...prev, visible: true, ...data }));
  const onClose = () => setModal((prev) => ({ ...prev, visible: false }));

  const modalConfig = {
    ...modal,
    onClose,
  };

  useEffect(() => {
    const getData = async (id) => {
      const resp = await getNPRRequestSample(id);
      console.log("RDRequestSample", resp);
      if (resp.success) {
        setState(sortData(resp.data));
      }
    };
    getData(id);
  }, [id]);

  console.log("modal", modal);
  return (
    <div className="form-section">
      <CustomTable
        rowClassName="row-table-detail"
        dataSource={state}
        columns={columns({ onOpen })}
        rowKey={"id"}
      />
      <ModalRequestSample {...modalConfig} />
    </div>
  );
};

export default RDRequestSample;
