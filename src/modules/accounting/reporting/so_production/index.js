import React, { useEffect, useMemo, useState } from "react";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import { Button, Col, Row, Table, Tabs } from "antd";
import Search from "antd/lib/input/Search";
import numeral from "numeral";
import axios from "axios";
import { CSVLink } from "react-csv";

const ReportSOProduction = () => {
  const { filter } = useSelector(
    (state) => state?.inventory?.report?.issue || {}
  );
  const [searchData, setSearchData] = useState({
    so_id: 0,
    customer_id: 0,
    item_id: 0,
  });
  const [data1, setData1] = useState({
    loading: false,
    data: [],
  });
  const [data2, setData2] = useState({
    loading: false,
    data: [],
  });
  const layoutConfig = useMemo(
    () => ({
      projectId: 12, // project ID from DB
      title: "ACCOUNTING", // project name
      home: "/accounting", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Accounting", "Reporting", "SO Production"], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: [], // button
      badgeCont: 0, //number
      step: null, // object {current:0,step:[],process_complete:bool}
      create: "", // path or "modal" and use openModal() instead
      edit: "", // object {data: any , path : "string"} or function
      discard: "", //path
      back: "", //path
      save: "", //path if not path use "function" and use onSave instead.
      onConfirm: () => console.log("Confirm"),
      onApprove: () => console.log("Approve"),
      onReject: () => console.log("Reject"),
      onCancel: () => console.log("Cancel"),
      onSearch: (keyword) => console.log("Search Key", keyword),
      openModal: () => console.log("openModal"),
      actionTitle: <span>Export Data</span>,
      searchBar: null,
    }),
    [filter]
  );

  const getData = async (text) => {
    if (text) {
      setData1((prev) => ({ ...prev, loading: true }));
      console.log("text", text);
      await axios
        .get(`/search/so/${text}`)
        .then((resp) => {
          console.log("resp", resp);
          setData1((prev) => ({
            ...prev,
            loading: false,
            data: resp?.data || [],
          }));
        })
        .catch((error) => {
          console.log("error", error);
          setData1((prev) => ({ ...prev, loading: false }));
        });
    }
  };

  useEffect(() => {
    const getData = async () => {
      setData2((prev) => ({ ...prev, loading: true }));
      return await axios
        .get(
          `/reports/account/somrp/${searchData.so_id}&${searchData.customer_id}&${searchData.item_id}`
        )
        .then((resp) =>
          setData2((prev) => ({ ...prev, loading: false, data: resp || [] }))
        )
        .catch((error) => {
          console.log("error", error);
          setData2((prev) => ({ ...prev, loading: false }));
        });
    };
    if (searchData.so_id && searchData.customer_id && searchData.item_id) {
      getData();
    }
  }, [searchData]);

  return (
    <>
      <MainLayout {...layoutConfig}>
        <div className="search-table mt-2">
          <Row className="search-header">
            <Text className="search-title" strong>
              <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
              Search Tool.
            </Text>
          </Row>
          <Row>
            <Col span={2}></Col>
            <Col span={2}>
              <Text strong>{`SO No. :`}</Text>
            </Col>
            <Col span={8}>
              <Search
                placeholder="SO No. / Description"
                enterButton="Search"
                allowClear
                loading={false}
                onSearch={(text) => getData(text)}
              />
            </Col>
            <Col span={1}></Col>
            <Col span={4}></Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs className="pd-1">
                <Tabs.TabPane tab={<b>Sale Order</b>}>
                  <Table
                    bordered
                    rowClassName={"row-table_detail"}
                    size={"small"}
                    loading={data1.loading}
                    columns={columns}
                    dataSource={data1.data}
                    pagination={{ pageSize: 15 }}
                    rowKey="id"
                  />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
        <div className="mt-3">
          <Tabs
            tabBarExtraContent={
              <div>
                <Button size="small" type="ghost" icon={<DownloadOutlined />}>
                  <Text>
                    <CSVLink
                      data={mockupDataSOList}
                      headers={[
                        {
                          label: "SO No.",
                          key: "so_no",
                        },
                        {
                          label: "Customer",
                          key: "customer_name",
                        },
                        {
                          label: "Item",
                          key: "item_no_name",
                        },
                        {
                          label: "Price",
                          key: "total_price",
                        },
                      ]}
                    >
                      Export Excel
                    </CSVLink>
                  </Text>
                </Button>
              </div>
            }
          >
            <Tabs.TabPane tab={<b>Routing</b>}>
              <Table
                bordered
                rowClassName={"row-table_detail"}
                size={"small"}
                loading={data2.loading}
                columns={columns2}
                dataSource={data2.data}
                pagination={{ pageSize: 15 }}
                rowKey="id"
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </MainLayout>
    </>
  );
};
const columns = [
  {
    className: "tb-col-sm",
    dataIndex: "index",
    key: "no",
    ellipsis: false,
    align: "center",
    render: (val, _, index) => index + 1,
    sorter: (a, b) => a.id - b.id,
    title: <b>No.</b>,
    width: "5%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_no",
    key: "so_no",
    ellipsis: false,
    render: (val) => val,
    sorter: (a, b) => a.id - b.id,
    title: <b>SO No.</b>,
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    key: "item_no_name",
    ellipsis: false,
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: <b>Item</b>,
    width: "35%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "customer_name",
    key: "customer_name",
    ellipsis: false,
    render: (val) => val,
    sorter: (a, b) => a.id - b.id,
    title: <b>Customer</b>,
    width: "20%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_order_date",
    key: "so_order_date",
    ellipsis: false,
    align: "center",
    render: (val) => val,
    sorter: (a, b) => a.id - b.id,
    title: <b>Order date</b>,
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_detail_delivery_date",
    key: "so_detail_delivery_date",
    ellipsis: false,
    align: "center",
    render: (val) => val,
    sorter: (a, b) => a.id - b.id,
    title: <b>Delivery</b>,
    width: "10%",
  },
];
const mockupDataSOList = [
  {
    so_no: "SO-EX2206001",
    item_no_name: "[C401SRLA00100] ตัวอย่างไอเทม 1 - 15,000 pcs.",
    customer_name: "ลูกค้า 1 จำกัด",
    so_order_date: "25/04/2022",
    so_detail_delivery_date: "23/04/2022",
    total_price: 15000,
  },
  {
    so_no: "SO-EX2206002",
    item_no_name: "[C401SRLA01100] ตัวอย่างไอเทม 2 - 150,000 pcs.",
    customer_name: "ลูกค้า 1 จำกัด",
    so_order_date: "28/05/2022",
    so_detail_delivery_date: "28/05/2022",
    total_price: 35000,
  },
  {
    so_no: "SO-EX2206003",
    item_no_name: "[C403SRLA00100] ตัวอย่างไอเทม 3 - 300 pcs.",
    customer_name: "ลูกค้า 1 จำกัด",
    so_order_date: "30/05/2022",
    so_detail_delivery_date: "30/05/2022",
    total_price: 55000,
  },
];
const columns2 = [
  {
    className: "tb-col-sm",
    dataIndex: "index",
    key: "no",
    ellipsis: false,
    align: "center",
    render: (val, _, index) => index + 1,
    sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    width: "5%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    key: "item_no_name",
    ellipsis: false,
    render: (val) => val,
    sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>Item Name</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "routing_no_name",
    key: "routing_no_name",
    ellipsis: false,
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>Routing</b>
      </div>
    ),
    // width: "20%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "size",
    key: "size",
    ellipsis: false,
    align: "right",
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>Size</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "worker",
    key: "worker",
    ellipsis: false,
    align: "right",
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>Worker</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    align: "right",
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>จำนวนชั่วโมง</b>
      </div>
    ),
    width: "10%",
  },
];
export default ReportSOProduction;
