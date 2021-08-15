import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";
import { getJobOrderData } from "../../../../actions/production/jobOrderActions";
import { getPlanByJobOrderID } from "../../../../actions/production/planningActions";
import useSubTable from "../../../../include/js/customHooks/useSubTable";
import { getStatusByName } from "../../../../include/js/function_main";
import PlanningModal from "../planning/PlanningModal";

const JobOrderListTable = (props) => {
  const {
    dataSource = [],
    loading = false,
    modal: { openModal },
  } = props;
  const { handleExpand, expandedRowRender } = useSubTable({
    columns: subColumns,
    fetchDataFunction: getPlanByJobOrderID,
    rowKey: "job_order_id",
  });
  const viewJobOrder = (row) => {
    openModal({ ...row, isFormJobOrder: true });
  };
  return (
    <>
      <Table
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        expandable={{ expandedRowRender }}
        onExpand={handleExpand}
        loading={loading}
        columns={columns({ viewJobOrder })}
        dataSource={dataSource}
      />
    </>
  );
};

export default React.memo(JobOrderListTable);

const columns = ({ viewJobOrder }) => [
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
    render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <b>Job No.</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "10%",
    dataIndex: "job_order_no",
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
    dataIndex: "job_order_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Job Type</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "10%",
    dataIndex: "job_order_type_name",
    sorter: (a, b) => a.job_order_type_id - b.job_order_type_id,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Plan Start Date</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "10%",
    dataIndex: "tg_job_order_start_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Status</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "10%",
    dataIndex: "trans_status_name",
    sorter: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
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
      <SearchOutlined
        className="button-icon"
        onClick={() => viewJobOrder(record)}
      />
    ),
  },
];

const subColumns = () => [
  {
    title: () => (
      <div className="text-center">
        <b>Plan</b>
      </div>
    ),
    children: [
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
        render: (val) => val + 1,
      },
      {
        title: (
          <div className="text-center">
            <b>Plan No.</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        width: "10%",
        dataIndex: "plan_job_no",
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
        dataIndex: "job_order_description",
        render: (val) => val || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>Cost Center</b>
          </div>
        ),
        align: "left",
        className: "tb-col-sm",
        dataIndex: "machine_cost_center_description",
        render: (val) => val || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>Worker</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        dataIndex: "plan_job_plan_worker",
        render: (val, row) =>
          (val && `${row.tg_plan_job_actual_worker || 0} / ${val || 0}`) || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>Period</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        dataIndex: "plan_job_plan_time",
        render: (val, row) =>
          (val && `${row.tg_plan_job_actual_time || 0} / ${val || 0}`) || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>Plan Date</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        width: "10%",
        dataIndex: "plan_job_date",
        render: (val) => val || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>Plan Status</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        width: "10%",
        dataIndex: "trans_status",
        render: (val) => (val && getStatusByName(val)) || "-",
      },
    ],
  },
];
