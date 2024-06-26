import React, { useEffect, useMemo, useState } from "react";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import { Button, Col, Input, Row, Table, Tabs, DatePicker, Alert, Modal } from "antd";
import Search from "antd/lib/input/Search";
import numeral from "numeral";
import axios from "axios";
import { CSVLink } from "react-csv";
import $ from "jquery";
const { RangePicker } = DatePicker

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
    label: "Qty.",
    key: "sum_so_detail_qty",
  },
  {
    label: "ชั่วโมงการทำงาน",
    key: "sum_tg_dl_cost_time",
  },
  {
    label: "DM RM",
    key: "sum_rm_cost",
  },
  {
    label: "% ต่อยอดขาย",
    key: "sum_rm_cost_p",
  },
  {
    label: "DM PK",
    key: "sum_pk_cost",
  },
  {
    label: "% ต่อยอดขาย",
    key: "sum_pk_cost_p",
  },
  {
    label: "DL",
    key: "sum_tg_dl_cost_wage",
  },
  {
    label: "% ต่อยอดขาย",
    key: "sum_tg_dl_cost_wage_p",
  },
  {
    label: "OH",
    key: "sum_tg_oh_cost_wage",
  },
  {
    label: "% ต่อยอดขาย",
    key: "sum_tg_oh_cost_wage_p",
  },

  {
    label: "Tax",
    key: "sum_so_detail_ac_tax_amount",
  },
  {
    label: "% ต่อยอดขาย",
    key: "so_detail_ac_tax_amount_p",
  },
  {
    label: "รวมต้นทุนการผลิต",
    key: "sum_total_cost",
  },
  {
    label: "Invoice No.",
    key: "invoice_no",
  },
  {
    label: "Qty.",
    key: "invoice_qty",
  },
  {
    label: "ราคาขาย(ไม่รวม Vat)",
    key: "sum_so_detail_total_price",
  },
  {
    label: "กำไร / ขาดทุน",
    key: "sum_total_profit",
  },
  {
    label: "% ต่อยอดขาย",
    key: "total_profit_p",
  },
];

const xlsxSubHeader = [
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
    label: "Item Code",
    key: "item_no",
  },
  {
    label: "Item Name",
    key: "item_name",
  },
  {
    label: "Qty.",
    key: "so_detail_qty",
  },
  {
    label: "UoM",
    key: "uom_no",
  },
  {
    label: "ชั่วโมงการทำงาน",
    key: "tg_dl_cost_time",
  },
  {
    label: "DM RM",
    key: "rm_cost",
  },
  {
    label: "% ต่อยอดขาย",
    key: "rm_cost_p",
  },
  {
    label: "DM PK",
    key: "pk_cost",
  },
  {
    label: "% ต่อยอดขาย",
    key: "pk_cost_p",
  },
  {
    label: "DL",
    key: "tg_dl_cost_wage",
  },
  {
    label: "% ต่อยอดขาย",
    key: "tg_dl_cost_wage_p",
  },
  {
    label: "OH",
    key: "tg_oh_cost_wage",
  },
  {
    label: "% ต่อยอดขาย",
    key: "tg_oh_cost_wage_p",
  },

  {
    label: "Tax",
    key: "so_detail_ac_tax_amount",
  },
  {
    label: "% ต่อยอดขาย",
    key: "so_detail_ac_tax_amount_p",
  },
  {
    label: "รวมต้นทุนการผลิต",
    key: "total_cost",
  },
  {
    label: "Invoice No.",
    key: "invoice_no",
  },
  {
    label: "Qty.",
    key: "invoice_qty",
  },
  {
    label: "ราคาขาย(ไม่รวม Vat)",
    key: "so_detail_total_price",
  },
  {
    label: "กำไร / ขาดทุน",
    key: "total_profit",
  },
  {
    label: "% ต่อยอดขาย",
    key: "total_profit_p",
  },
];

const ReportSOCostAndProfit = () => {
  const { filter } = useSelector(
    (state) => state?.inventory?.report?.issue || {}
  );

  const [searchData, setSearchData] = useState({
    keyword: 0,
    date_start: 0,
    date_end: 0,
  });

  const [data1, setData1] = useState({
    loading: false,
    data: [],
  });

  const [modal, setModal] = useState({
    isModalOpen: false,
    data1: [],
    data2: []
  })

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
      // actionTitle: <span>Export Data</span>,
      searchBar: null,
    }),
    [filter]
  );


  const viewSource = async (record, type = 1) => {
    const { so_detail_id } = record || {}
    console.log('view', record)
    if (so_detail_id) {
      // /reports/account/so_mrp_profit/rmpk/7346
      await axios
        .get(
          `/reports/account/so_mrp_profit/rmpk/${so_detail_id}`
        )
        .then((resp) => {
          console.log("resp", resp);
          if (resp?.data?.length === 0) {
            alert('ไม่พบข้อมูล')
          }
          const data1 = resp?.data?.filter(obj => [1, 3].includes(obj.type_id))
          const data2 = resp?.data?.filter(obj => [2].includes(obj?.type_id))
          setModal(prev => ({ ...prev, isModalOpen: true, data1: (type === 1 ? data1 : data2) || [], data2: data2 || [] }))
        })
        .catch((error) => {
          console.log("error", error);
          alert('พบข้อผิดพลาด')
        });
    }

  }

  const expandedRowRender2 = (row) => {
    return (
      <div
        className="ml-4 drop-shadow"
        style={{
          padding: "4px 4px 0px 4px",
          marginBottom: "20px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Table
          bordered
          rowClassName={"row-table_detail"}
          size={"small"}
          loading={false}
          columns={columns2(viewSource)}
          dataSource={row?.so_detail || []}
          // pagination={{ pageSize: 15 }}
          rowKey="so_detail_id"
          onRow={(row) => ({
            onClick: (e) => {
              // console.log("row", row);
              $(e.target)
                .closest("tbody")
                .find("tr")
                .removeClass("selected-row");
              $(e.target).closest("tr").addClass("selected-row");
            },
          })}
          scroll={{
            x: 2000,
            y: 600,
          }}
        />
      </div>
    )
  }

  const handleExpand2 = (expanded, row) => {
    console.log(expanded, row)
  }

  const onSearch = async () => {
    setData1((prev) => ({ ...prev, loading: true }));
    await axios
      .get(
        `/reports/account/so_mrp_profit/${searchData.keyword}&${searchData.date_start}&${searchData.date_end}`
      )
      .then((resp) => {
        console.log("resp", resp);
        if (resp?.data?.length === 0) {
          alert('ไม่พบข้อมูล กรุณาระบุข้อมูลให้ถูกต้อง หรือเฉพาะเจาะจงขึ้น')
        }
        setData1((prev) => ({
          ...prev,
          loading: false,
          data: resp.data || [],
        }));
      })
      .catch((error) => {
        console.log("error", error);
        setData1((prev) => ({ ...prev, loading: false }));
      });
  };

  const onChangeSearch = (obj) => {
    setSearchData(prev => ({ ...prev, ...obj }))
  }

  const getSubTableDataExport = (data) => {
    // data1.data
    const so_detail_data = [...data?.reduce((array, obj) => array = [...array, ...obj.so_detail.map(obj => ({ ...obj, so_no: '' + obj.so_no }))], [])]
    console.log("all_so_detail", so_detail_data)
    return so_detail_data || []
  }
  console.log("data1", data1)
  console.log("searchData", searchData)
  console.log("modal", modal)
  return (
    <>
      <MainLayout {...layoutConfig}>
        <div className="search-table mt-2 pb-2">
          <Row className="search-header">
            <Text className="search-title" strong>
              <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
              Search Tool.
            </Text>
          </Row>
          <Row>
            <Col span={2}></Col>
            <Col span={20}>
              <div className="d-flex flex-row space-around w-100">
                <div className="mr-3">
                  <Text strong className="mr-1">{`SO No. :`}</Text>
                  <Input placeholder={"SO No. / Description / Customer"} style={{ width: '250px' }} onBlur={(e) => onChangeSearch({ keyword: e.target.value || 0 })} />
                </div>
                <div>
                  <Text strong className="mr-1">{`วันที่ :`}</Text>
                  <RangePicker
                    style={{ width: 350 }}
                    format={"DD/MM/YYYY"}
                    onChange={(data) => {
                      console.log("data", data)
                      data
                        ? onChangeSearch({
                          date_start: data[0].format("DD-MM-YYYY"),
                          date_end: data[1].format("DD-MM-YYYY"),
                        })
                        : onChangeSearch({
                          date_start: 0,
                          date_end: 0,
                        });
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col span={2}></Col>
          </Row>

          <Row className="mt-3">
            <Col span={24} className="text-center">
              <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>ค้นหาข้อมูล</Button>
            </Col>
          </Row>
        </div>

        <div id="form" className="w-100">
          {/* <Row>
            <Col span={24}> */}
          <Tabs className="pd-1" tabBarExtraContent={
            <div>
              <Button size="small" type="ghost" icon={<DownloadOutlined />}>
                <Text>
                  <CSVLink data={data1.data} headers={xlsxHeader}>
                    Export SO
                  </CSVLink>
                </Text>
              </Button>
              <Button size="small" type="ghost" icon={<DownloadOutlined />}>
                <Text>
                  <CSVLink data={getSubTableDataExport(data1.data)} headers={xlsxSubHeader}>
                    Export รายการทั้งหมด
                  </CSVLink>
                </Text>
              </Button>
            </div>
          }>
            <Tabs.TabPane tab={<b>Summary</b>}>
              <Table
                bordered
                rowClassName={"row-table_detail"}
                size={"small"}
                loading={data1.loading}
                columns={columns}
                dataSource={data1.data}
                // pagination={{ pageSize: 15 }}
                rowKey="so_id"
                expandable={{ expandedRowRender: expandedRowRender2 }}
                onExpand={(expanded, row) => {
                  handleExpand2(expanded, row);
                }}
                onRow={(row) => ({
                  onClick: (e) => {
                    // console.log("row", row);
                    console.log("index", row);
                    setSearchData((prev) => ({
                      ...prev,
                      so_id: row?.so_id,
                      customer_id: row?.customer_id,
                      item_id: row?.item_id,
                    }));

                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                  },
                })}
                scroll={{
                  x: 2000,
                  y: 600,
                }}
              />
            </Tabs.TabPane>
          </Tabs>
          {/* </Col>
          </Row> */}
          <Modal title="View" visible={modal.isModalOpen} onCancel={() => setModal(prev => ({ ...prev, isModalOpen: false }))} footer={null} width="80%">
            <Row glutter={18}>
              <Col span={24}>
                <Table
                  bordered
                  rowClassName={"row-table_detail"}
                  size={"small"}
                  loading={false}
                  columns={modalColumns}
                  dataSource={modal?.data1 || []}
                  // pagination={{ pageSize: 15 }}
                  rowKey="item_id"
                  onRow={(row) => ({
                    onClick: (e) => {
                      // console.log("row", row);
                      $(e.target)
                        .closest("tbody")
                        .find("tr")
                        .removeClass("selected-row");
                      $(e.target).closest("tr").addClass("selected-row");
                    },
                  })}
                />
                {/* <Table
                  bordered
                  rowClassName={"row-table_detail"}
                  size={"small"}
                  loading={false}
                  columns={modalColumns}
                  dataSource={modal?.data2 || []}
                  // pagination={{ pageSize: 15 }}
                  rowKey="id"
                  onRow={(row) => ({
                    onClick: (e) => {
                      // console.log("row", row);
                      $(e.target)
                        .closest("tbody")
                        .find("tr")
                        .removeClass("selected-row");
                      $(e.target).closest("tr").addClass("selected-row");
                    },
                  })}
                /> */}
              </Col>
              {/* <Col span={2}></Col>
              <Col span={11}> */}

              {/* </Col> */}
            </Row>
          </Modal>
        </div>

      </MainLayout>
    </>
  );
};
const columns = [
  {
    className: "tb-col-sm",
    dataIndex: "so_no",
    key: "so_no",
    ellipsis: false,
    sorter: (a, b) => a.id - b.id,
    align: "center",
    title: <b>SO No.</b>,
    width: 150,
    render: (val) => <Text className="text-center">{val}</Text>,
    fixed: true
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_description",
    key: "so_description",
    ellipsis: false,
    render: (val) => <div className="w-100 text-left">
      {val || "-"}
    </div>,
    align: "center",
    title: <b>Description</b>,
    width: 350,
  },
  {
    className: "tb-col-sm",
    dataIndex: "customer_name",
    key: "customer_name",
    ellipsis: false,
    render: (val) => <div className="w-100 text-left">
      {val || "-"}
    </div>,
    sorter: (a, b) => a.id - b.id,
    align: "center",
    title: <b>Customer</b>,
    width: 275,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_so_detail_qty",
    key: "sum_so_detail_qty",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Qty.</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_tg_dl_cost_time",
    key: "sum_tg_dl_cost_time",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-center">
      {val || "00:00:00"}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>ชั่วโมง<br />การทำงาน</b>,
    width: 150,
  },
  //* overflow
  {
    className: "tb-col-sm",
    dataIndex: "",
    key: "sum_rm_pk",
    ellipsis: false,
    align: "center",
    title: (
      <div className="text-center">
        <b>DM</b>
      </div>
    ),
    // width: "12%",
    children: [
      {
        className: "tb-col-sm",
        dataIndex: "sum_rm_cost",
        key: "sum_rm_cost",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-right">
          {numeral(val || 0).format("#,###.##")}
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>RM</b>
          </div>
        ),
        width: 150,
      },
      {
        className: "tb-col-sm",
        dataIndex: "sum_rm_cost_p",
        key: "sum_rm_cost_p",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-right">
          {numeral(val || 0).format("#,###.##")} %
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>% ต่อยอดขาย</b>
          </div>
        ),
        width: 150,
      },
      {
        className: "tb-col-sm",
        dataIndex: "sum_pk_cost",
        key: "sum_pk_cost",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-right">
          {numeral(val || 0).format("#,###.##")}
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>PK</b>
          </div>
        ),
        width: 150,
      },
      {
        className: "tb-col-sm",
        dataIndex: "sum_pk_cost_p",
        key: "sum_pk_cost_p",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-right">
          {numeral(val || 0).format("#,###.##")} %
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>% ต่อยอดขาย</b>
          </div>
        ),
        width: 150,
      },
    ],
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_tg_dl_cost_wage",
    key: "sum_tg_dl_cost_wage",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>DL</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_tg_dl_cost_wage_p",
    key: "sum_tg_dl_cost_wage_p",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")} %
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% ต่อยอดขาย</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_tg_oh_cost_wage",
    key: "sum_tg_oh_cost_wage",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>OH</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_tg_oh_cost_wage_p",
    key: "sum_tg_oh_cost_wage_p",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")} %
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% ต่อยอดขาย</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_so_detail_ac_tax_amount",
    key: "sum_so_detail_ac_tax_amount",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Tax</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_so_detail_ac_tax_amount_p",
    key: "sum_so_detail_ac_tax_amount_p",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")} %
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% ต่อยอดขาย</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_total_cost",
    key: "sum_total_cost",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>รวมต้นทุนการผลิต</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "invoice_no",
    key: "invoice_no",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-center">
      {val || "-"}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Invoice No.</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "invoice_qty",
    key: "invoice_qty",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {val ? numeral(val || 0).format("#,###.##") : "-"}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Qty.</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_so_detail_total_price",
    key: "sum_so_detail_total_price",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>ราคาขาย(Ext.Vat)</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_total_profit",
    key: "sum_total_profit",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>กำไร / ขาดทุน</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_total_profit_p",
    key: "sum_total_profit_p",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")} %
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% ต่อยอดขาย</b>,
    width: 150,
  },
];


const columns2 = (viewSource) => [
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
    width: 50,
    fixed: true
  },
  {
    className: "tb-col-sm",
    dataIndex: "item_no",
    key: "so_detail_id",
    ellipsis: false,
    render: (val) => <div className="w-100 text-center">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>Item Code</b>
      </div>
    ),
    width: 200,
    fixed: true
  },
  {
    className: "tb-col-sm",
    dataIndex: "item_name",
    key: "so_detail_id",
    ellipsis: false,
    render: (val) => <div className="w-100 text-left">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>Item</b>
      </div>
    ),
    width: 350,
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_detail_qty",
    key: "so_detail_qty",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Qty.</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "uom_no",
    key: "uom_no",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-center">
      {val || "-"}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>UoM</b>,
    width: 100,
  },
  // extends
  {
    className: "tb-col-sm",
    dataIndex: "tg_dl_cost_time",
    key: "tg_dl_cost_time",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-center">
      {val || "00:00:00"}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>ชั่วโมง<br />การทำงาน</b>,
    width: 150,
  },
  //* overflow
  {
    className: "tb-col-sm",
    dataIndex: "",
    key: "sum_rm_pk",
    ellipsis: false,
    align: "center",
    title: (
      <div className="text-center">
        <b>DM</b>
      </div>
    ),
    // width: "12%",
    children: [
      {
        className: "tb-col-sm",
        dataIndex: "rm_cost",
        key: "rm_cost",
        ellipsis: false,
        align: "center",
        render: (val, record) => <div className="w-100 text-right" onClick={() => viewSource(record, 1)}>
          {numeral(val || 0).format("#,###.##")}
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>RM</b>
          </div>
        ),
        width: 150,
      },
      {
        className: "tb-col-sm",
        dataIndex: "rm_cost_p",
        key: "rm_cost_p",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-right">
          {numeral(val || 0).format("#,###.##")} %
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>% ต่อยอดขาย</b>
          </div>
        ),
        width: 150,
      },
      {
        className: "tb-col-sm",
        dataIndex: "pk_cost",
        key: "pk_cost",
        ellipsis: false,
        align: "center",
        render: (val, record) => <div className="w-100 text-right" onClick={() => viewSource(record, 2)}>
          {numeral(val || 0).format("#,###.##")}
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>PK</b>
          </div>
        ),
        width: 150,
      },
      {
        className: "tb-col-sm",
        dataIndex: "pk_cost_p",
        key: "pk_cost_p",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-right">
          {numeral(val || 0).format("#,###.##")} %
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: (
          <div className="text-center">
            <b>% ต่อยอดขาย</b>
          </div>
        ),
        width: 150,
      },
    ],
  },
  {
    className: "tb-col-sm",
    dataIndex: "tg_dl_cost_wage",
    key: "tg_dl_cost_wage",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>DL</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "tg_dl_cost_wage_p",
    key: "tg_dl_cost_wage_p",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")} %
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% ต่อยอดขาย</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "tg_oh_cost_wage",
    key: "tg_oh_cost_wage",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>OH</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "tg_oh_cost_wage_p",
    key: "tg_oh_cost_wage_p",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")} %
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% ต่อยอดขาย</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_detail_ac_tax_amount",
    key: "so_detail_ac_tax_amount",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Tax</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_detail_ac_tax_amount_p",
    key: "so_detail_ac_tax_amount_p",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")} %
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% ต่อยอดขาย</b>,
    width: 150,
  },
  {
    className: "tb-col-sm",
    dataIndex: "total_cost",
    key: "total_cost",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>รวมต้นทุนการผลิต</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "invoice_no",
    key: "invoice_no",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-center">
      {val || "-"}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Invoice No.</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "invoice_qty",
    key: "invoice_qty",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {val ? numeral(val || 0).format("#,###.##") : "-"}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Qty.</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_detail_total_price",
    key: "so_detail_total_price",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>ราคาขาย(Ext.Vat)</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "total_profit",
    key: "total_profit",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>กำไร / ขาดทุน</b>,
    width: 200,
  },
  {
    className: "tb-col-sm",
    dataIndex: "total_profit_p",
    key: "total_profit_p",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")} %
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% ต่อยอดขาย</b>,
    width: 150,
  },
];


const modalColumns = [
  {
    className: "tb-col-sm",
    dataIndex: "id",
    key: "id",
    ellipsis: false,
    render: (val, record, index) => <div className="w-100 text-center">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    width: 50,
  },
  {
    className: "tb-col-sm",
    dataIndex: "item_no",
    key: "item_no",
    ellipsis: false,
    render: (val, record, index) => <div className="w-100 text-center">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>Code</b>
      </div>
    ),
    width: 100,
  },
  {
    className: "tb-col-sm",
    dataIndex: "item_name",
    key: "item_name",
    ellipsis: false,
    render: (val, record, index) => <div className="w-100 text-left">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>Name</b>
      </div>
    ),
    width: 100,
  },
  {
    className: "tb-col-sm",
    dataIndex: "sum_mrp_detail_qty_issue",
    key: "sum_mrp_detail_qty_issue",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.####")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Issue Qty.</b>,
    width: 100,
  },
  {
    className: "tb-col-sm",
    dataIndex: "uom_no",
    key: "uom_no",
    ellipsis: false,
    render: (val, record, index) => <div className="w-100 text-center">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>UoM</b>
      </div>
    ),
    width: 50,
  },
  {
    className: "tb-col-sm",
    dataIndex: "tg_item_cost_avg",
    key: "tg_item_cost_avg",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Price</b>,
    width: 100,
  },
  {
    className: "tb-col-sm",
    dataIndex: "item_cost_sum",
    key: "item_cost_sum",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Total Cost</b>,
    width: 100,
  },
]
export default ReportSOCostAndProfit;
