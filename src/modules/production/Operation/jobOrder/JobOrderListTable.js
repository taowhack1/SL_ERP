import {
  EditTwoTone,
  EllipsisOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Table, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useHistory } from "react-router";
import { getJobOrderData } from "../../../../actions/production/jobOrderActions";
import { getPlanByJobOrderID } from "../../../../actions/production/planningActions";
import CustomTable from "../../../../components/CustomTable";
import useSubTable from "../../../../include/js/customHooks/useSubTable";
import { getStatusByName } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";
import PlanningModal from "../planning/PlanningModal";

const JobOrderListTable = (props) => {
  const history = useHistory();
  const {
    dataSource = [],
    loading = false,
    modal: { openModal },
  } = props;
  // const { handleExpand, expandedRowRender } = useSubTable({
  //   columns: subColumns,
  //   fetchDataFunction: getPlanByJobOrderID,
  //   rowKey: "job_order_id",
  // });
  const viewJobOrder = (row) => {
    openModal({ ...row, isFormJobOrder: true });
  };
  const editJobOrder = (row) => {
    history.push(`/production/operations/job_order/${row.job_order_id}`, row);
  };
  const onExpand = (row) => {
    return (
      <div
        className="ml-4 drop-shadow"
        style={{
          padding: "4px 20px 0px 4px",
          marginBottom: "20px",
          backgroundColor: "#FFFFFF",
          paddingBottom: "20px",
        }}
      >
        <Tabs>
          {/* <Tabs.TabPane tab="Plan" key="1">
            {expandedRowRender(row)}
          </Tabs.TabPane> */}
          <Tabs.TabPane tab="Bulk - Job Order" key="1">
            <CustomTable
              columns={subJobOrderColumns({ viewJobOrder })}
              dataSource={mockDataJobBulk}
              rowKey="id"
              rowClassName="w-100 row-table-detail"
              size="small"
              pagination={false}
            />
          </Tabs.TabPane>
        </Tabs>
        <Tabs className="mt-2">
          {/* <Tabs.TabPane tab="Plan" key="1">
            {expandedRowRender(row)}
          </Tabs.TabPane> */}
          <Tabs.TabPane tab="FG - Job Order" key="2">
            <CustomTable
              columns={subJobOrderColumns({ viewJobOrder })}
              dataSource={mockDataJobFG}
              rowKey="id"
              rowClassName="w-100 row-table-detail"
              size="small"
              pagination={false}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  };
  return (
    <>
      <Table
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        expandable={{ expandedRowRender: onExpand }}
        // onExpand={(expanded, row) =>
        //   handleExpand(expanded, row, row.job_order_id)
        // }
        loading={loading}
        columns={columns({ viewJobOrder, editJobOrder })}
        dataSource={mockDataJob}
      />
    </>
  );
};

export default React.memo(JobOrderListTable);

const columns = ({ viewJobOrder, editJobOrder }) => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "5%",
    dataIndex: "id",
    sorter: (a, b) => a.id - b.id,
    render: (val) => val,
  },
  // {
  //   title: (
  //     <div className="text-center">
  //       <b>Job No.</b>
  //     </div>
  //   ),
  //   align: "center",
  //   className: "col-sm",
  //   width: "10%",
  //   dataIndex: "job_order_no",
  //   render: (val) => val || "-",
  // },
  {
    title: (
      <div className="text-center">
        <b>Job Bulk No.</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "8%",
    dataIndex: "job_order_bulk_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Job FG No.</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "8%",
    dataIndex: "job_order_fg_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>MRP No.</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "10%",
    dataIndex: "mrp_no",
    sorter: (a, b) => a.mrp_id - b.mrp_id,
    render: (val) => val || "-",
  },

  {
    title: (
      <div className="text-center">
        <b>Job Name</b>
      </div>
    ),
    align: "left",
    className: "col-sm",
    // width: "10%",
    dataIndex: "description",
    render: (val) => val || "-",
  },
  // {
  //   title: (
  //     <div className="text-center">
  //       <b>Job Type</b>
  //     </div>
  //   ),
  //   align: "center",
  //   className: "col-sm",
  //   width: "10%",
  //   dataIndex: "job_order_type_name",
  //   sorter: (a, b) => a.job_order_type_id - b.job_order_type_id,
  //   render: (val) => val || "-",
  // },

  {
    title: (
      <div className="text-center">
        <b>Batch Size</b>
      </div>
    ),
    align: "right",
    className: "col-sm",
    width: "10%",
    dataIndex: "bulk_qty",
    render: (val) => <Text>{`${convertDigit(val, 4)} Kg.`}</Text>,
  },
  {
    title: (
      <div className="text-center">
        <b>FG Qty.</b>
      </div>
    ),
    align: "right",
    className: "col-sm",
    width: "10%",
    dataIndex: "fg_qty",
    render: (val) => <Text>{`${convertDigit(val, 4)} pcs.`}</Text>,
  },
  {
    title: (
      <div className="text-center">
        <b>Status</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "8%",
    dataIndex: "trans_status_name",
    // sorter: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
    render: (val) => (val && getStatusByName(val)) || "-",
  },
  {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "5%",
    dataIndex: "job_order_id",
    render: (_, record) => (
      // <SearchOutlined
      //   className="button-icon"
      //   onClick={() => viewJobOrder(record)}
      // />
      <EditTwoTone onClick={() => editJobOrder(record)} />
    ),
  },
];

const subJobOrderColumns = () => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    // className: "col-sm",
    width: "5%",
    dataIndex: "id",
    // sorter: (a, b) => a.id - b.id,
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <b>Job No.</b>
      </div>
    ),
    align: "center",
    // className: "col-sm",
    width: "10%",
    dataIndex: "job_order_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Job Name</b>
      </div>
    ),
    align: "left",
    // className: "col-sm",
    // width: "10%",
    dataIndex: "job_order_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Quantity</b>
      </div>
    ),
    align: "right",
    // className: "col-sm",
    width: "10%",
    dataIndex: "job_order_qty",
    render: (val) => (val && convertDigit(val, 4)) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    // className: "col-sm",
    // width: "10%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Job Type</b>
      </div>
    ),
    align: "center",
    // className: "col-sm",
    // width: "10%",
    dataIndex: "job_order_type_name",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Status</b>
      </div>
    ),
    align: "center",
    // className: "col-sm",
    width: "10%",
    dataIndex: "trans_status_name",
    // sorter: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
    render: (val) => (val && getStatusByName(val)) || "-",
  },
];

const mockDataJobBulk = [
  {
    id: 1,
    job_order_no: "BP2100001-001",
    job_order_description: "C311SMTA000100-300.000000 kg",
    job_order_type_name: "Job Bulk",
    job_order_type_id: 3,
    tg_job_order_start_date: "-",
    trans_status_name: "-",
    job_order_qty: 300,
    uom_no: "kg",
  },
  {
    id: 2,
    job_order_no: "BP2100001-002",
    job_order_description: "C311SMTA000100-300.000000 kg",
    job_order_type_name: "Job Bulk",
    job_order_type_id: 3,
    tg_job_order_start_date: "-",
    trans_status_name: "-",
    job_order_qty: 300,
    uom_no: "kg",
  },
  {
    id: 3,
    job_order_no: "BP2100001-003",
    job_order_description: "C311SMTA000100-300.000000 kg",
    job_order_type_name: "Job Bulk",
    job_order_type_id: 3,
    tg_job_order_start_date: "-",
    trans_status_name: "-",
    job_order_qty: 300,
    uom_no: "kg",
  },
  // {
  //   id: 4,
  //   job_order_no: "BP2100001-004",
  //   job_order_description: "C311SMTA000100-100.000000 kg",
  //   job_order_type_name: "Job Bulk",
  //   job_order_type_id: 3,
  //   tg_job_order_start_date: "-",
  //   trans_status_name: "-",
  //   job_order_qty: 100,
  //   uom_no: "kg",
  // },
];
const mockDataJobFG = [
  {
    id: 1,
    job_order_no: "FP2100001-001",
    job_order_description: "C411SMTA000100-300.000000 pcs",
    job_order_type_name: "Job FG",
    job_order_type_id: 4,
    tg_job_order_start_date: "-",
    trans_status_name: "-",
    job_order_qty: 300,
    uom_no: "pcs",
  },
];

const mockDataJob = [
  {
    id: 1,
    job_order_fg_no: "FP2100001",
    job_order_bulk_no: "BP2100001",
    mrp_no: "MRP202108001",
    description: "AT-MRP202108002-0000121-C411SMTA000100-300.000000 pcs",
    fg_qty: 300,
    bulk_qty: 1000,
  },
];
