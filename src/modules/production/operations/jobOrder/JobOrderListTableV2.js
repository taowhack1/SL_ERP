/** @format */

import { EditTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { message, Table, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { searchJobOrder } from "../../../../actions/production/jobOrderActions";
import CustomTable from "../../../../components/CustomTable";
import { useFetch, useSubTableFetch } from "../../../../include/js/customHooks";
import { sortData } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";

const apiGetAllJobOrder = `/production/job_order/mrp_v2/all`;
const JobOrderListTableV2 = (props) => {
  const {
    modal: { openModal },
    filter,
  } = props;
  const dispatch = useDispatch();
  const [loading2, setLoading] = useState(false);
  const { pageSize, page, keyword } = filter || {};
  const getSearchData = (data, keyword) => {
    console.log("keyword :>> ", keyword);
    console.log("keyword data:>> ", data);
    const search_data = sortData(
      keyword
        ? data?.filter(
            (job) =>
              job?.mrp_no?.indexOf(keyword) >= 0 ||
              job?.mrp_so_running_no?.indexOf(keyword) >= 0 ||
              job?.item_no?.indexOf(keyword) >= 0 ||
              job?.item_no_ref?.indexOf(keyword) >= 0 ||
              job?.mrp_description?.indexOf(keyword) >= 0
          )
        : data
    );

    return sortData(search_data, "id", 1);
  };

  const { data, loading, error } = useFetch(`${apiGetAllJobOrder}`);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      console.log("Filter Keyword");
      const respSearch = getSearchData(data?.data || [], keyword);
      setSearch(respSearch);
      setLoading(false);
    }
  }, [keyword, data, loading]);
  const [search, setSearch] = useState([]);
  const onChange = (pagination) => {
    const { current, pageSize } = pagination;
    dispatch(searchJobOrder({ page: current, pageSize }));
  };

  error && message.error(error, 6);

  const history = useHistory();

  const viewJobOrder = (row) => {
    openModal({ ...row, isFormJobOrder: true });
  };

  const editJobOrder = (row) => {
    history.push(`/production/operations/job_order/${row?.mrp_id}`);
  };
  const expandedRowRender = ({ job_order_detail }) => (
    <CustomTable
      bordered
      rowKey="job_order_id"
      className="table-detail sub-table-detail w-100"
      rowClassName="row-table-detail"
      columns={subJobOrderColumns}
      pagination={false}
      // loading={loading}
      dataSource={job_order_detail}
    />
  );
  console.log("Job Order Table", data);
  console.log("search Job Order Table>> ", search);
  return (
    <>
      <Table
        bordered
        rowKey="id"
        size="small"
        onChange={onChange}
        rowClassName="row-table-detail"
        expandable={{ expandedRowRender }}
        loading={loading2}
        columns={columns({ viewJobOrder, editJobOrder })}
        dataSource={search}
      />
    </>
  );
};

export default React.memo(JobOrderListTableV2);
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
          color="error"
        >
          {trans_status_name || "-"}
        </Tag>
      );
    case trans_status_id === 2:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color="processing"
        >
          {trans_status_name || "-"}
        </Tag>
      );
    case trans_status_id === 3:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color="#108ee9"
        >
          {trans_status_name || "-"}
        </Tag>
      );
    case trans_status_id === 4:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color="#87d068"
        >
          {trans_status_name || "-"}
        </Tag>
      );
    default:
      return (
        <Tag
          className={callBack ? "pointer w-100" : "w-100"}
          onClick={callBack}
          color="default"
        >
          {trans_status_name || "-"}
        </Tag>
      );
  }
};
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
        <b>Item Code</b>
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
        <b>Item Qty.</b>
      </div>
    ),
    align: "right",
    className: "col-sm",
    width: "10%",
    dataIndex: "mrp_item_qty_produce",
    render: (val, { uom_no }) =>
      val ? <Text>{`${convertDigit(val, 6)} ${uom_no || "-"}`}</Text> : "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Ref. Code</b>
      </div>
    ),
    align: "center",
    className: "col-sm",
    width: "10%",
    dataIndex: "item_ref_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Ref. Qty.</b>
      </div>
    ),
    align: "right",
    className: "col-sm",
    width: "10%",
    dataIndex: "mrp_ref_qty_produce",
    render: (val, { uom_ref_no }) =>
      val ? (
        <Text>{`${convertDigit(val, 6)} ${uom_ref_no || "-"}.`}</Text>
      ) : (
        "-"
      ),
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
    render: (val, record) => getJobStatus(record),
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
    render: (val, row, index) => index + 1,
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
    render: (val, record) => getJobStatus(record),
  },
];
