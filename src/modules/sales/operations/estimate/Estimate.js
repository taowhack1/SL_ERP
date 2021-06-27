/** @format */

import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getNPRList } from "../../../../actions/sales/nprActions";
import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import { getStatusByName } from "../../../../include/js/function_main";
import useKeepLogs from "../../../logs/useKeepLogs";
const columns = [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    render: (val) => val + 1,
  },
  {
    title: "NPR No.",
    align: "left",
    dataIndex: "npr_no",
    width: "15%",
  },
  {
    title: "NPR date",
    align: "center",
    dataIndex: "npr_request_date",
    width: "10%",
  },
  {
    title: (
      <div className="text-center">
        <Text>Product</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_product_name",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>Customer</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_customer_name",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>Sales Person</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_created_by_name",
    width: "15%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: "NPR Status",
    align: "center",
    dataIndex: "trans_status",
    width: "10%",
    ellipsis: true,
    className: "bg-tb-primary",
    render: (val) => getStatusByName(val),
  },
  {
    title: "Status",
    children: [
      {
        title: (
          <div className="text-center">
            <Text>RD</Text>
          </div>
        ),
        align: "center",
        dataIndex: "rd_trans_status",
        width: "10%",
        ellipsis: true,
        render: (val) => getStatusByName(val),
      },
      {
        title: "PU",
        align: "center",
        dataIndex: "pu_trans_status",
        width: "10%",
        render: (val) => getStatusByName(val),
      },
      {
        title: "PD",
        align: "center",
        dataIndex: "pd_trans_status",
        width: "10%",
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
  const [state, setState] = useState(list);
  useEffect(() => {
    dispatch(getNPRList(branch_id));
  }, []);
  useEffect(() => {
    setState(list);
  }, [list]);
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
      setState(
        list.filter(
          (obj) =>
            obj.npr_no?.toUpperCase()?.indexOf(text) >= 0 ||
            (obj.npr_product_name &&
              obj.npr_product_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.npr_customer_name &&
              obj.npr_customer_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.npr_created_by_name &&
              obj.npr_created_by_name?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.npr_responsed_required_by_name &&
              obj.npr_responsed_required_by_name
                ?.toUpperCase()
                ?.indexOf(text) >= 0) ||
            (obj.npr_request_date &&
              obj.npr_request_date?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.trans_status &&
              obj.trans_status?.toUpperCase()?.indexOf(text) >= 0) ||
            (obj.npr_responsed_by &&
              obj.npr_responsed_by?.toUpperCase()?.indexOf(text) >= 0)
        )
      );
    },
  };
  const viewRecord = (record) =>
    history.push("/sales/operation/estimate/" + record.npr_id, record);
  return (
    <>
      <MainLayout {...layoutConfig}>
        {loading ? (
          <DetailLoading />
        ) : (
          <Table
            size={"small"}
            rowKey={"id"}
            columns={columns}
            bordered
            dataSource={state}
            pagination={{
              pageSize: 15,
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
