/** @format */

import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import useKeepLogs from "../../../logs/useKeepLogs";
import { Table, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Search from "../../../../components/Search";
const columnsSo = [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    render: (val) => val + 1,
  },
  {
    title: "SO No.",
    align: "left",
    dataIndex: "so",
    width: "15%",
  },
  {
    title: "Customer Name",
    align: "left",
    dataIndex: "",
    width: "15%",
  },
  {
    title: "Description",
    align: "left",
    dataIndex: "",
    width: "15%",
  },
  {
    title: "Due Date",
    align: "center",
    dataIndex: "date",
    width: "10%",
  },
];
const columnsDo = [
  {
    title: "No.",
    align: "center",
    dataIndex: "id",
    width: "5%",
    render: (val) => val + 1,
  },
  {
    title: "DO No.",
    align: "left",
    dataIndex: "do",
    width: "5%",
  },
  {
    title: "Customer Name.",
    align: "left",
    dataIndex: "",
    width: "15%",
  },
  {
    title: "Delivery Remark",
    align: "left",
    dataIndex: "",
    width: "15%",
  },
  {
    title: "Create Date.",
    align: "left",
    dataIndex: "",
    width: "15%",
  },
  {
    title: "วันที่ต้องส่ง",
    align: "center",
    dataIndex: "date",
    width: "10%",
  },
  {
    title: "วันที่กำหนดส่ง ",
    align: "center",
    dataIndex: "date",
    width: "10%",
  },
  {
    title: "Status",
    align: "center",
    dataIndex: "",
    width: "10%",
  },
];
const dataSo = [
  {
    id: 0,
    so: "SO21030001",
    date: "17/06/2564",
  },
  {
    id: 1,
    so: "SO21030002",
    date: "17/06/2564",
  },
  {
    id: 2,
    so: "SO21030003",
    date: "17/06/2564",
  },
];
const dataDo = [
  {
    id: 0,
    do: "DO21030001",
    date: "17/06/2564",
  },
  {
    id: 1,
    do: "DO21030002",
    date: "17/06/2564",
  },
  {
    id: 2,
    do: "DO21030003",
    date: "17/06/2564",
  },
];
const DeliveryOrder = () => {
  const keepLog = useKeepLogs();
  const history = useHistory();
  const dispatch = useDispatch();
  const { branch_id } = useSelector((state) => state.auth.authData);
  const { operations, loading } = useSelector((state) => state.sales);
  const list = operations.npr.list;
  const [state, setState] = useState(list);
  useEffect(() => {
    setState(list);
  }, [list]);
  const layoutConfig = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: ["Sales", "NPR", "Delivery Order"],
    search: false,
    create: "/sales/operation/do/new",
    buttonAction: ["Create"],
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
  return (
    <>
      <MainLayout {...layoutConfig}>
        {loading ? (
          <DetailLoading />
        ) : (
          <>
            <Row gutter={[16, 8]} className={"mt-1"}>
              <Col flex={1} style={{ background: "#f9fbf1" }}>
                <div className='ml-2'>
                  <Text strong>Sales Order List</Text>
                </div>
                <div align='right'>
                  <Search
                    className='top-search mb-1 '
                    style={{ width: "50%" }}
                  />
                </div>

                <Table
                  size={"small"}
                  rowKey={"id"}
                  columns={columnsSo}
                  bordered
                  dataSource={dataSo}
                  rowClassName={"row-clickable"}
                  onRow={(data, index) => {
                    return {
                      onClick: (e) => {
                        console.log("e", e.target.tagName);
                        history.push("/sales/operation/do/new");
                      },
                    };
                  }}
                  pagination={{
                    pageSize: 15,
                  }}
                />
              </Col>
              <Col flex={4} style={{ background: "#edfae9" }}>
                <div className='ml-2'>
                  <Text strong>Delivery Order List</Text>
                </div>
                <div align='right'>
                  <Search
                    className='top-search mb-1 '
                    style={{ width: "50%" }}
                  />
                </div>
                <Table
                  size={"small"}
                  rowKey={"id"}
                  columns={columnsDo}
                  bordered
                  dataSource={dataDo}
                  pagination={{
                    pageSize: 15,
                  }}
                />
              </Col>
            </Row>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default DeliveryOrder;
