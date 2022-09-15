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
const xlsxHeader = [
  {
    label: "No.",
    key: "id",
  },
  {
    label: "SO No.",
    key: "so_no",
  },
  {
    label: "Description",
    key: "so_description",
  },
  {
    label: "Customer",
    key: "customer_name",
  },
  {
    label: "จำนวนชั่วโมง",
    key: "sum_tg_time_sheet_time",
  },
  {
    label: "RM",
    key: "rm_cost_avg",
  },
  {
    label: "PK",
    key: "pk_cost_avg",
  },
  {
    label: "DL",
    key: "dl_cost_avg",
  },
  {
    label: "OH",
    key: "oh_cost_avg",
  },
  {
    label: "รวมต้นทุนการผลิต",
    key: "cost_avg",
  },
  {
    label: "ยอด WIP ยกมา",
    key: "wip_cost_avg",
  },
  {
    label: "Invoice No.",
    key: "invoice_no",
  },
  {
    label: "ราคาขายไม่รวม Vat",
    key: "so_detail_total_price",
  },
  {
    label: "WIP",
    key: "wip_cost_avg",
  },
  {
    label: "กำไร/ขาดทุน",
    key: "profit_avg",
  },
];
const ReportSOCostAndProfit = () => {
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
      breadcrumb: ["Accounting", "Reporting", "SO - Cost and profit"], // [1,2,3] = 1 / 2 / 3
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
        .then((resp) => {
          console.log("resp", resp);
          setData2((prev) => ({
            ...prev,
            loading: false,
            data: resp.data || [],
          }));
        })
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
                    onRow={(row) => ({
                      onClick: () => {
                        // console.log("row", row);
                        console.log("index", row);
                        setSearchData((prev) => ({
                          ...prev,
                          so_id: row?.so_id,
                          customer_id: row?.customer_id,
                          item_id: row?.item_id,
                        }));
                      },
                    })}
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
                    <CSVLink data={data2.data} headers={xlsxHeader}>
                      Export Excel
                    </CSVLink>
                  </Text>
                </Button>
              </div>
            }
          >
            <Tabs.TabPane tab={<b>Summary</b>}>
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
const columns2 = [
  {
    className: "tb-col-sm",
    dataIndex: "index",
    key: "no",
    ellipsis: false,
    align: "center",
    render: (val, _, index) => index + 1,
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    width: "3%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_no",
    key: "so_no",
    ellipsis: false,
    render: (val) => val,
    sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>SO No.</b>
      </div>
    ),
    width: "7%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_description",
    key: "so_description",
    ellipsis: false,
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "customer_name",
    key: "customer_name",
    ellipsis: false,
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>Customer</b>
      </div>
    ),
    width: "13%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_tg_time_sheet_time",
    key: "sum_tg_time_sheet_time",
    ellipsis: true,
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>จำนวนชั่วโมง</b>
      </div>
    ),
    width: "7%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "",
    key: "sum_rm_pk",
    ellipsis: false,
    align: "right",
    title: (
      <div className="text-center">
        <b>DM</b>
      </div>
    ),
    // width: "12%",
    children: [
      {
        className: "tb-col-sm",
        dataIndex: "rm_cost_avg",
        key: "rm_cost_avg",
        ellipsis: false,
        align: "right",
        render: (val) => numeral(val).format("#,###.####"),
        // sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>RM</b>
          </div>
        ),
        width: "8%",
      },
      {
        className: "tb-col-sm",
        dataIndex: "pk_cost_avg",
        key: "pk_cost_avg",
        ellipsis: false,
        align: "right",
        render: (val) => numeral(val).format("#,###.####"),
        // sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>PK</b>
          </div>
        ),
        width: "8%",
      },
    ],
  },
  {
    className: "tb-col-sm",
    dataIndex: "dl_cost_avg",
    key: "dl_cost_avg",
    ellipsis: false,
    align: "right",
    render: (val) => numeral(val).format("#,###.####"),
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>DL</b>
      </div>
    ),
    width: "8%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "oh_cost_avg",
    key: "oh_cost_avg",
    ellipsis: false,
    align: "right",
    render: (val) => numeral(val).format("#,###.####"),
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>OH</b>
      </div>
    ),
    width: "8%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "cost_avg",
    key: "cost_avg",
    ellipsis: false,
    align: "right",
    render: (val) => numeral(val).format("#,###.####"),
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>รวมต้นทุนการผลิต</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "wip_cost_avg",
    key: "wip_cost_avg",
    ellipsis: false,
    align: "right",
    render: (val) => numeral(val).format("#,###.####"),
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>ยอด WIP ยกมา</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "invoice_no",
    key: "invoice_no",
    ellipsis: false,
    align: "left",
    render: (val) => val,
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>Invoice No.</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_detail_total_price",
    key: "so_detail_total_price",
    ellipsis: false,
    align: "right",
    render: (val) => numeral(val).format("#,###.####"),
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>ราคาขายไม่รวม Vat</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "wip_cost_avg",
    key: "wip_cost_avg",
    ellipsis: false,
    align: "right",
    render: (val) => numeral(val).format("#,###.####"),
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>WIP</b>
      </div>
    ),
    width: "10%",
  },
  {
    className: "tb-col-sm",
    dataIndex: "profit_avg",
    key: "profit_avg",
    ellipsis: false,
    align: "right",
    render: (val) => numeral(val).format("#,###.####"),
    // sorter: (a, b) => a.id - b.id,
    title: (
      <div className="text-center">
        <b>กำไร/ขาดทุน</b>
      </div>
    ),
    width: "10%",
  },
];
export default ReportSOCostAndProfit;
