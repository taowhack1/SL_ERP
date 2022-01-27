/** @format */

import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  apiNPRRD,
  filterNPR_PU,
  getNPRList,
} from "../../../../../actions/sales/nprActions";
import DetailLoading from "../../../../../components/DetailLoading";
import MainLayout from "../../../../../components/MainLayout";
import { useFetch } from "../../../../../include/js/customHooks";
import {
  getStatusByName,
  sortData,
} from "../../../../../include/js/function_main";
import useKeepLogs from "../../../../logs/useKeepLogs";
import Authorize from "../../../../system/Authorize";
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
    className: "bg-tb-primary tb-col-sm",
    ellipsis: true,
    render: (val, record) => getStatusByName(val),
  },
  {
    title: "Purchasing",
    children: [
      {
        title: (
          <div className='text-center'>
            <Text>ผู้รับผิดชอบ</Text>
          </div>
        ),
        align: "left",
        dataIndex: "npr_price_request_by_name",
        width: "15%",
        ellipsis: true,
        className: "tb-col-sm",
        render: (val) => <Text style={{ color: "blue" }}>{val || "-"}</Text>,
      },
      {
        title: "วันที่รับงาน",
        align: "left",
        dataIndex: "npr_price_response_date",
        width: "10%",
        className: "tb-col-sm",
        render: (val) => val || "-",
      },
      {
        title: "วันที่ส่งงาน",
        align: "center",
        dataIndex: "npr_price_request_date",
        width: "10%",
        className: "tb-col-sm",
        render: (val) => <Text style={{ color: "blue" }}>{val || "-"}</Text>,
      },
      {
        title: "สถานะ",
        align: "center",
        dataIndex: "pu_trans_status",
        width: "10%",
        className: "tb-col-sm",
        render: (val, record) => getStatusByName(val),
      },
    ],
  },
];

const NPRListForPU = () => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const history = useHistory();
  const dispatch = useDispatch();

  const { branch_id } = useSelector((state) => state.auth.authData);
  const { operations, loading } = useSelector((state) => state.sales);
  const {
    data: listDataNPR,
    loading: NPRloading,
    fetchData,
  } = useFetch(`${apiNPRRD}`);
  const list = operations.npr.list;
  const { filter_pu } = operations.npr;
  const { pageSize, page, keyword } = filter_pu || {};
  const [state, setState] = useState(list);
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
  // useEffect(() => {
  //   dispatch(getNPRList(branch_id));
  // }, []);
  // useEffect(() => {
  //   setState(sortData(list?.filter((obj) => obj.tg_trans_status_id !== 1)));
  // }, [list]);
  useEffect(() => {
    console.log("list", list);
    const respSearch = getSearchData(keyword);
    setState(
      sortData(respSearch?.filter((obj) => obj.tg_trans_status_id !== 1))
    );
    //setState(respSearch);
  }, [keyword, listDataNPR]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterNPR_PU({ page: current, pageSize }));
  };
  const layoutConfig = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: ["Sales", "NPR"],
    search: true,
    create: "",
    buttonAction: [],
    discard: "",
    onSearch: (w) => {
      const text = w.toUpperCase();
      dispatch(filterNPR_PU({ keyword: text }));
    },
    searchValue: keyword || null,
  };

  const viewRecord = (record) =>
    history.push("/sales/npr/pu/" + record.npr_id, record);
  return (
    <>
      <MainLayout {...layoutConfig}>
        {NPRloading ? (
          <DetailLoading />
        ) : (
          <Table
            size={"small"}
            rowKey={"id"}
            columns={columns}
            bordered
            dataSource={state}
            onChange={onChange}
            pagination={{
              pageSize: pageSize,
              current: page,
              pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
            }}
            onRow={(record) => ({
              onClick: (e) => {
                viewRecord(record);
                keepLog.keep_log_action("View NPR : ", record.npr_no);
              },
            })}
          />
        )}
      </MainLayout>
    </>
  );
};

export default NPRListForPU;
