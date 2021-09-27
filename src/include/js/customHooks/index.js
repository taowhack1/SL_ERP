import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import CustomTable from "../../../components/CustomTable";
import { getStatusByName, sortData } from "../function_main";
import { message } from "antd";
import { header_config } from "../main_config";

const useFetch = (url, missingParams = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const fetchData = () => setTrigger((prev) => !prev);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!missingParams) {
      setLoading("Loading...");
      setData(null);
      setError(null);
      console.log("url", url);
      url &&
        axios
          .get(url, { cancelToken: source.token })
          .then((res) => {
            console.log(`useFetch ${url} then`, res);
            setLoading(false);
            res.data && setData(res.data);
          })
          .catch((err) => {
            setLoading(false);
            setError("Error. Can't fetch any data from the server.");
            console.error("error", err);
          });
    } else {
      console.log("useFetch Missing Params");
    }

    return () => {
      source.cancel();
    };
  }, [url, trigger, missingParams]);

  return { data, loading, error, fetchData };
};

// ExpandedRowRender With Fetch Data
// Ref. doc. https://codesandbox.io/s/naughty-wescoff-w1jhd?file=/index.js
// How To Use.
// expandable={{ expandedRowRender }}
// onExpand={handleExpand}
const useSubTableFetch = (props) => {
  const {
    columns = mockColumns,
    url = "",
    rowKey = "id",
    dataKey,
    // setExpandId = () => console.log("setExpandId"),
  } = props || {};
  const initialState = {
    loading: {},
    dataSource: {},
  };

  !url && message.error("Error! useSubTableFetch Missing fetch url.");
  const [state, setState] = useState(initialState);

  const setLoading = (bool = false, id) =>
    setState((prev) => ({ ...prev, loading: { ...prev.loading, [id]: bool } }));

  const getData = async (id, params = null, arrayDimension) => {
    const isInList = state?.dataSource[id];
    if (!isInList) {
      setLoading(true, id);
      const resp = await axios
        .get(`${url}${params}`, header_config)
        .then((res) => {
          return {
            success: true,
            data: ![undefined, null].includes(arrayDimension)
              ? res.data[arrayDimension]
              : res.data,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            success: false,
            data: [],
            message: error,
          };
        });

      console.log("get data", resp);
      resp.success &&
        setState((prev) => ({
          ...prev,
          dataSource: {
            ...prev.dataSource,
            [id]: sortData(dataKey ? resp.data[dataKey] : resp.data, "id", 1),
          },
          loading: false,
        }));
      setLoading(false, id);
    }
  };

  const expandedRowRender = (row) => {
    const data = state.dataSource[row[rowKey]];
    const loading = state.loading[row[rowKey]];
    return (
      <CustomTable
        bordered
        rowKey="id"
        className="table-detail sub-table-detail w-100"
        rowClassName="row-table-detail"
        columns={columns()}
        pagination={false}
        loading={loading}
        dataSource={data}
      />
    );
  };

  const handleExpand = (
    expanded = false,
    record,
    params,
    arrayDimension = null
  ) => {
    expanded && getData(record[rowKey], params, arrayDimension);
  };

  return {
    expandedRowRender,
    handleExpand,
  };
};

export { useFetch, useSubTableFetch };

const mockColumns = () => [
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
      <div className="text-center">
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
      <div className="text-center">
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
      <div className="text-center">
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
      <div className="text-center">
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
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "doc_id",
    render: (val) => <SearchOutlined className="button-icon" />,
  },
];
