/** @format */

import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { useFetch } from ".";
import CustomTable from "../../../components/CustomTable";
import { getStatusByName, sortData } from "../function_main";
const initialState = {
  loading: {},
  dataSource: {},
};
// Ref. doc. https://codesandbox.io/s/naughty-wescoff-w1jhd?file=/index.js
// How To Use.
// expandable={{ expandedRowRender }}
// onExpand={handleExpand}

const useSubTable = (props) => {
  const {
    columns = mockColumns,
    fetchDataFunction = getMockData,
    rowKey = "id",
    dataKey,
    // setExpandId = () => console.log("setExpandId"),
  } = props || {};

  const [state, setState] = useState(initialState);

  const setLoading = (bool = false, id) =>
    setState((prev) => ({ ...prev, loading: { ...prev.loading, [id]: bool } }));

  const getData = async (id, params = null) => {
    const isInList = state?.dataSource[id];
    if (!isInList) {
      setLoading(true, id);
      const resp = await fetchDataFunction(params);
      console.log("useSubTable", resp);
      resp.success &&
        setState((prev) => ({
          ...prev,
          dataSource: {
            ...prev.dataSource,
            [id]: sortData(dataKey ? resp.data[dataKey] : resp.data),
          },
          loading: false,
        }));
      setLoading(false, id);
    }
  };
  const movement_history = (data) => {
    let total = 0;
    return data?.map((obj, index) => {
      total = total + (obj.stock_in_qty - obj.stock_out_qty);
      return {
        ...obj,
        available: total,
      };
    });
  };
  const expandedRowRender = (row) => {
    const data = state.dataSource[row[rowKey]];
    const loading = state.loading[row[rowKey]];
    return (
      <CustomTable
        bordered
        rowKey='id'
        className='table-detail sub-table-detail w-100'
        rowClassName='row-table-detail'
        columns={columns()}
        pagination={10}
        loading={loading}
        dataSource={
          dataKey === "movement_history" ? movement_history(data) : data
        }
      />
    );
  };

  const handleExpand = (expanded = false, record, params) => {
    expanded && getData(record[rowKey], params);
  };

  return {
    expandedRowRender,
    handleExpand,
  };
};

export default useSubTable;

const mockColumns = () => [
  {
    title: (
      <div className='text-center'>
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
      <div className='text-center'>
        <b>Document No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "doc_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Reference No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "ref_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Name</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Status</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "status",
    render: (val) => (val && getStatusByName(val)) || "-",
  },
  {
    title: (
      <div className='text-center'>
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "doc_id",
    render: (val) => <SearchOutlined className='button-icon' />,
  },
];

const getMockData = () =>
  new Promise((res, rej) => {
    const mockData = [
      {
        id: 2,
        doc_id: 3,
        doc_no: "DOC21010003",
        ref_no: "REF21010003",
        description: "MOCK-DATA-0003",
        date: "31/12/2021",
        status: "Complete",
      },
      {
        id: 1,
        doc_id: 2,
        doc_no: "DOC21010002",
        ref_no: "REF21010002",
        description: "MOCK-DATA-0002",
        date: "28/12/2021",
        status: "Pending",
      },
      {
        id: 0,
        doc_id: 1,
        doc_no: "DOC21010001",
        ref_no: "REF21010001",
        description: "MOCK-DATA-0001",
        date: "31/12/2021",
        status: "Cancel",
      },
    ];
    setTimeout(() => {
      res({ success: true, data: mockData });
    }, 1000);
  });
