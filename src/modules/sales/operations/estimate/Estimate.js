/** @format */

import { Button, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  apiNPRRD,
  filterNPR_ESTIMATE,
  getNPRList,
} from "../../../../actions/sales/nprActions";
import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import { useFetch } from "../../../../include/js/customHooks";
import {
  getStatusByName,
  sortData,
} from "../../../../include/js/function_main";
import useKeepLogs from "../../../logs/useKeepLogs";
const columns = [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    className: "tb-col-sm",
    render: (val) => val + 1,
  },
  {
    title: (
      <div className='text-center'>
        <Text>NPR No.</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_no",
    width: "15%",
    className: "tb-col-sm",
  },
  {
    title: "วันที่สร้าง NPR",
    align: "center",
    dataIndex: "npr_created",
    width: "10%",
    className: "tb-col-sm",
  },
  {
    title: "วันที่ต้องการตัวอย่าง",
    align: "center",
    dataIndex: "npr_request_date",
    width: "10%",
    className: "tb-col-sm",
  },
  {
    title: (
      <div className='text-center'>
        <Text>Product</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_product_name",
    width: "20%",
    ellipsis: true,
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <Text>Customer</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_customer_name",
    width: "20%",
    ellipsis: true,
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <Text>Sales Person</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_created_by_name",
    width: "15%",
    ellipsis: true,
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: "สถานะ NPR",
    align: "center",
    dataIndex: "trans_status",
    width: "10%",
    ellipsis: true,
    className: "bg-tb-primary tb-col-sm",
    render: (val) => getStatusByName(val),
  },
  {
    title: "Status",
    children: [
      {
        title: (
          <div className='text-center'>
            <Text>R&D</Text>
          </div>
        ),
        align: "center",
        dataIndex: "rd_trans_status",
        width: "10%",
        ellipsis: true,
        className: "tb-col-sm",
        render: (val) => getStatusByName(val),
      },
      {
        title: "PU",
        align: "center",
        dataIndex: "pu_trans_status",
        width: "10%",
        className: "tb-col-sm",
        render: (val) => getStatusByName(val),
      },
      {
        title: "PD",
        align: "center",
        dataIndex: "pd_trans_status",
        width: "10%",
        className: "tb-col-sm",
        render: (val) => getStatusByName(val),
      },
    ],
  },
];

const Estimate = () => {
  const keepLog = useKeepLogs();
  const history = useHistory();
  const dispatch = useDispatch();
  const { branch_id } = useSelector((state) => state.auth.authData);
  const { operations, loading } = useSelector((state) => state.sales);
  const list = operations.npr.list;
  const { filter_estimate } = operations.npr;
  const { pageSize, page, keyword } = filter_estimate || {};
  const [state, setState] = useState(list);
  // useEffect(() => {
  //   dispatch(getNPRList(branch_id));
  // }, []);
  // useEffect(() => {
  //   setState(list);
  // }, [list]);
  const {
    data: listDataNPR,
    loading: NPRloading,
    fetchData,
  } = useFetch(`${apiNPRRD}`);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterNPR_ESTIMATE({ page: current, pageSize }));
  };
  const getSearchData = (keyword) => {
    const search_data =
      listDataNPR &&
      sortData(
        keyword
          ? listDataNPR.filter(
              (npr) =>
                npr?.npr_no?.toUpperCase()?.indexOf(keyword) >= 0 ||
                (npr?.npr_product_name &&
                  npr?.npr_product_name?.toUpperCase()?.indexOf(keyword) >=
                    0) ||
                (npr?.npr_customer_name &&
                  npr?.npr_customer_name?.toUpperCase()?.indexOf(keyword) >=
                    0) ||
                (npr?.npr_created_by_name &&
                  npr?.npr_created_by_name?.toUpperCase()?.indexOf(keyword) >=
                    0) ||
                (npr?.npr_responsed_required_by_name &&
                  npr?.npr_responsed_required_by_name
                    ?.toUpperCase()
                    ?.indexOf(keyword) >= 0) ||
                (npr?.npr_request_date &&
                  npr?.npr_request_date?.toUpperCase()?.indexOf(keyword) >=
                    0) ||
                (npr?.trans_status &&
                  npr?.trans_status?.toUpperCase()?.indexOf(keyword) >= 0) ||
                (npr?.npr_responsed_by &&
                  npr?.npr_responsed_by?.toUpperCase()?.indexOf(keyword) >= 0)
            )
          : listDataNPR
      );
    return search_data;
  };
  useEffect(() => {
    const respSearch = getSearchData(keyword);
    setState(respSearch);
  }, [keyword, listDataNPR]);
  const layoutConfig = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: ["Sales", "NPR", "Estimate"],
    search: true,
    create: "",
    buttonAction: [],
    discard: "",
    onSearch: (w) => {
      const text = w.toUpperCase();
      dispatch(filterNPR_ESTIMATE({ keyword: text }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterNPR_ESTIMATE({
              page: 1,
              pageSize: 10,
              keyword: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
  };
  const viewRecord = (record) =>
    history.push("/sales/operation/estimate/" + record.npr_id, record);
  return (
    <>
      <MainLayout {...layoutConfig}>
        {NPRloading ? (
          <DetailLoading />
        ) : (
          <Table
            size={"small"}
            rowKey={"id"}
            onChange={onChange}
            columns={columns}
            bordered
            dataSource={state}
            pagination={{
              pageSize: pageSize,
              current: page,
              pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
            }}
            onRow={(record) => ({
              onClick: (e) => {
                viewRecord(record);
                keepLog.keep_log_action("View Estimate NPR : ", record.npr_no);
              },
            })}
          />
        )}
      </MainLayout>
    </>
  );
};

export default Estimate;
