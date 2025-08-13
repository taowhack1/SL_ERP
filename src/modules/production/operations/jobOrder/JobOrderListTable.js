/** @format */

import { EditTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Col, message, Row, Table, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { searchJobOrder } from "../../../../actions/production/jobOrderActions";
import { useFetch, useSubTableFetch } from "../../../../include/js/customHooks";
import { sortData } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";
import SearchJobOrders from "../../components/SearchJobOrders";
import useSearch from "../../../../include/js/customHooks/useSearch";

const fetchUrl = `/production/job_order/mrp`;
const JobOrderListTable = (props) => {
  const {
    modal: { openModal },
  } = props;

  const { expandedRowRender, handleExpand } = useSubTableFetch({
    columns: () => subJobOrderColumns,
    url: fetchUrl,
    rowKey: "id",
    dataKey: "job_order",
  });


  const history = useHistory();

  const viewJobOrder = (row) => {
    openModal({ ...row, isFormJobOrder: true });
  };

  const editJobOrder = (row) => {
    history.push(`/production/operations/job_order/${row?.mrp_id}`);
  };

  const searchHook = useSearch({
    endpoint: "http://localhost:3008/api/production/job/search",
    initialParams: {
      user_name: "2563003",
      filter: {
        job: undefined,
        mrp: { label: "", value: "" },
        bulk: { label: "", value: "" },
        fg: { label: "", value: "" },
        status: null,
      },
    },
    debounceMs: 1000,
    mapResult: (res) => res,
    storageKey: "JobOrderState",
  });

  searchHook?.error && message.error(searchHook?.error, 6);


  return (
    <>
      <Row style={{ marginTop: 15 }}>
        <Col span={24}>
          <SearchJobOrders
            hook={searchHook}
            initialUI={{
              job: searchHook.params.filter?.job || "",
              bulk: {
                value: "",
                label: searchHook.params.filter?.selected_bulk?.label || "",
              },
              fg: {
                value: "",
                label: searchHook.params.filter?.selected_fg?.label || "",
              },
              mrp: {
                value: "",
                label: searchHook.params.filter?.selected_mrp?.label || "",
              },
              status: searchHook.params.filter?.status || null,
            }}
          />
          <Table
            bordered
            rowKey='id'
            size='small'
            pagination={false}
            scroll={{ y: 450 }}
            rowClassName='row-table-detail'
            expandable={{ expandedRowRender }}
            onExpand={(expanded, row) =>
              handleExpand(expanded, row, `/${row?.mrp_id}`, 0)
            }
            //   expandable={{
            //     expandedRowRender: (record) => <ExpandedRowRender
            //         record={record}
            //         onOpen={onOpen}
            //         data={expandedData[record.so_no] || []}
            //     />,
            //     onExpand: handleExpand
            // }}
            loading={searchHook?.loading}
            columns={columns({ viewJobOrder, editJobOrder })}
            dataSource={searchHook?.data}
          />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(JobOrderListTable);

export const getJobStatus = (
  { trans_status_id = 1, trans_status_name = "Unkown" },
  callBack
) => {
  switch (true) {
    case trans_status_id === 1:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color='error'>
          {trans_status_name || "-"}
        </Tag>
      );
    case trans_status_id === 2:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color='processing'>
          {trans_status_name || "-"}
        </Tag>
      );
    case trans_status_id === 3:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color='#108ee9'>
          {trans_status_name || "-"}
        </Tag>
      );
    case trans_status_id === 4:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color='#87d068'>
          {trans_status_name || "-"}
        </Tag>
      );
    default:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color='default'>
          {trans_status_name || "-"}
        </Tag>
      );
  }
};
const columns = ({ viewJobOrder, editJobOrder }) => [
  // {
  //   title: (
  //     <div className='text-center'>
  //       <b>No.</b>
  //     </div>
  //   ),
  //   align: "center",
  //   className: "col-sm",
  //   width: "5%",
  //   dataIndex: "id",
  //   sorter: (a, b) => a.id - b.id,
  //   render: (val) => val,
  // },
  {
    title: (
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
        <b>Status</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "8%",
    dataIndex: "trans_status_name",
    render: (val, record) => getJobStatus(record),
  },
  {
    title: (
      <div className='text-center'>
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
  // {
  //   title: (
  //     <div className='text-center'>
  //       <b>No.</b>
  //     </div>
  //   ),
  //   align: "center",
  //   width: "5%",
  //   dataIndex: "id",
  //   render: (val) => val,
  // },
  {
    title: (
      <div className='text-center'>
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
      <div className='text-center'>
        <b>Req. No.</b>
      </div>
    ),
    align: "center",
    width: "10%",
    dataIndex: "issue_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
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
      <div className='text-center'>
        <b>Status</b>
      </div>
    ),
    align: "center",
    // className: "col-sm",
    width: "10%",
    dataIndex: "trans_status_name",
    // sorter: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
    render: (val, record) => getJobStatus(record),
  },
];
