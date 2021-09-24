import { EditTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { message, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useHistory } from "react-router";
import { useFetch, useSubTableFetch } from "../../../../include/js/customHooks";
import { getStatusByName } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";

const fetchUrl = `/production/job_order/mrp`;
const JobOrderListTable = (props) => {
  const {
    modal: { openModal },
  } = props;

  const { data, loading, error } = useFetch(`${fetchUrl}/0`);

  const { expandedRowRender, handleExpand } = useSubTableFetch({
    columns: () => subJobOrderColumns,
    url: fetchUrl,
    rowKey: "id",
    dataKey: "job_order",
  });

  error && message.error(error, 6);

  const history = useHistory();

  const viewJobOrder = (row) => {
    openModal({ ...row, isFormJobOrder: true });
  };

  const editJobOrder = (row) => {
    history.push(`/production/operations/job_order/${row?.mrp_id}`);
  };
  console.log("Job Order Table", data);
  return (
    <>
      <Table
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        expandable={{ expandedRowRender }}
        onExpand={(expanded, row) =>
          handleExpand(expanded, row, `/${row?.mrp_id}`, 0)
        }
        loading={loading}
        columns={columns({ viewJobOrder, editJobOrder })}
        dataSource={data}
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
  {
    title: (
      <div className="text-center">
        <b>Job No.</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "8%",
    dataIndex: "mrp_so_running_no",
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
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "col-sm",
    ellipsis: true,
    dataIndex: "mrp_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Bulk Code</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "10%",
    dataIndex: "item_no_ref",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Bulk Qty.</b>
      </div>
    ),
    align: "right",
    className: "col-sm",
    width: "10%",
    dataIndex: "mrp_qty_produce_ref",
    render: (val, { uom_no_ref }) =>
      val ? <Text>{`${convertDigit(val, 6)} ${uom_no_ref || "-"}`}</Text> : "-",
  },
  {
    title: (
      <div className="text-center">
        <b>FG Code</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "10%",
    dataIndex: "item_no",
    render: (val) => val || "-",
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
    dataIndex: "mrp_qty_produce",
    render: (val, { uom_no }) =>
      val ? <Text>{`${convertDigit(val, 6)} ${uom_no || "-"}`}</Text> : "-",
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
    render: (_, record) => <EditTwoTone onClick={() => editJobOrder(record)} />,
  },
];

const subJobOrderColumns = [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    width: "5%",
    dataIndex: "id",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <b>Job No.</b>
      </div>
    ),
    align: "center",
    width: "10%",
    dataIndex: "job_order_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Item Code</b>
      </div>
    ),
    align: "center",
    width: "10%",
    dataIndex: "item_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Job Name</b>
      </div>
    ),
    align: "left",
    dataIndex: "job_order_description",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Quantity</b>
      </div>
    ),
    align: "right",
    width: "10%",
    dataIndex: "job_order_qty",
    render: (val) => (val && convertDigit(val, 6)) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    width: "5%",
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
    width: "10%",
    dataIndex: "routing_detail_type_name",
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
