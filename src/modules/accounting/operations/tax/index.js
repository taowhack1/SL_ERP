import React, { useEffect, useMemo, useState } from "react";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import { Button, Col, Input, Row, Table, Tabs, DatePicker, Alert, InputNumber } from "antd";
import Search from "antd/lib/input/Search";
import numeral from "numeral";
import axios from "axios";
import { CSVLink } from "react-csv";
import $ from "jquery";
import { getNumberFormat } from "../../../../include/js/main_config";
import Swal from "sweetalert2";
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
const InputTax = () => {
  const { filter } = useSelector(
    (state) => state?.inventory?.report?.issue || {}
  );

  const { user_name } = useSelector(state => state?.auth?.authData) || {}

  const [searchData, setSearchData] = useState({
    keyword: 0,
    date_start: 0,
    date_end: 0,
  });

  const [data1, setData1] = useState({
    loading: false,
    data: [],
  });

  const [updateData, setUpdateData] = useState([])

  const layoutConfig = useMemo(
    () => ({
      projectId: 12, // project ID from DB
      title: "ACCOUNTING", // project name
      home: "/accounting", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Accounting", "Operations", "Tax Input"], // [1,2,3] = 1 / 2 / 3
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

  const onSearch = async () => {
    setData1((prev) => ({ ...prev, loading: true }));
    await axios
      .get(
        // `/reports/account/so_mrp_profit/${searchData.keyword}&${searchData.date_start}&${searchData.date_end}`
        `/accounting/ac_tax/list/${searchData.keyword}&${searchData.date_start}&${searchData.date_end}`
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
    setUpdateData([])
  };

  const onChangeSearch = (obj) => {
    setSearchData(prev => ({ ...prev, ...obj }))
  }

  const onUpdateData = (obj) => {
    console.log("updatedata", obj)
    setUpdateData(prev => [...prev.filter(obj2 => obj2.index != obj.index), obj])
    console.log("updateData", updateData)
  }
  const onSave = async () => {
    console.log("onSave", updateData)
    const saveData = updateData.map(obj => ({ ...obj, user_name }))
    if (saveData.length) {
      setData1((prev) => ({ ...prev, loading: true }))
      await axios
        .put(
          `/accounting/ac_tax`, saveData
        )
        .then((resp) => {
          console.log("resp save", resp);
          if (resp?.data[0]?.success) {
            Swal.fire({
              title: "บันทึกข้อมูลเรียบร้อยแล้ว.",
              icon: "success",
              confirmButtonText: `ตกลง`,
            }).then((result) => {
              onSearch()
            });
          } else {
            Swal.fire({
              title: "ไม่สามารถบันทึกข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ.",
              icon: "warning",
              confirmButtonText: `ตกลง`,
            }).then((result) => {
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
          Swal.fire({
            title: "ไม่สามารถบันทึกข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ.",
            icon: "warning",
            confirmButtonText: `ตกลง`,
          }).then((result) => {
          });
        });

      setData1((prev) => ({ ...prev, loading: false }));
    } else {
      alert('ไม่พบการเปลี่ยนแปลงข้อมูล')
    }
  }

  console.log("data1", data1)
  console.log("searchData", searchData)
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
              <Button type="primary" onClick={onSave}>บันทึกข้อมูล</Button>
              {/* <Button size="small" type="ghost" icon={<DownloadOutlined />}>
                <Text>
                  <CSVLink data={data1.data} headers={xlsxHeader}>
                    Export Excel
                  </CSVLink>
                </Text>
              </Button> */}
            </div>
          }>
            <Tabs.TabPane tab={<b>รายการขาย</b>}>
              <Table
                bordered
                rowClassName={"row-table_detail"}
                size={"small"}
                loading={data1.loading}
                columns={columns2(onUpdateData)}
                dataSource={data1.data}
                // pagination={{ pageSize: 15 }}
                rowKey="id"
                // expandable={{ expandedRowRender: expandedRowRender2 }}
                // onExpand={(expanded, row) => {
                //   handleExpand2(expanded, row);
                // }}
                onRow={(row) => ({
                  onClick: (e) => {
                    // console.log("row", row);
                    // console.log("index", row);
                    // setSearchData((prev) => ({
                    //   ...prev,
                    //   so_id: row?.so_id,
                    //   customer_id: row?.customer_id,
                    //   item_id: row?.item_id,
                    // }));

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
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "sum_tg_dl_cost_time",
  //   key: "sum_tg_dl_cost_time",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-center">
  //     {val || "00:00:00"}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>ชั่วโมง<br />การทำงาน</b>,
  //   width: 150,
  // },
  //* overflow
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "",
  //   key: "sum_rm_pk",
  //   ellipsis: false,
  //   align: "center",
  //   title: (
  //     <div className="text-center">
  //       <b>DM</b>
  //     </div>
  //   ),
  //   // width: "12%",
  //   children: [
  //     {
  //       className: "tb-col-sm",
  //       dataIndex: "sum_rm_cost",
  //       key: "sum_rm_cost",
  //       ellipsis: false,
  //       align: "center",
  //       render: (val) => <div className="w-100 text-right">
  //         {numeral(val || 0).format("#,###.##")}
  //       </div>,
  //       sorter: (a, b) => a.id - b.id,
  //       title: (
  //         <div className="text-center">
  //           <b>RM</b>
  //         </div>
  //       ),
  //       width: 150,
  //     },
  //     {
  //       className: "tb-col-sm",
  //       dataIndex: "sum_rm_cost_p",
  //       key: "sum_rm_cost_p",
  //       ellipsis: false,
  //       align: "center",
  //       render: (val) => <div className="w-100 text-right">
  //         {numeral(val || 0).format("#,###.##")} %
  //       </div>,
  //       sorter: (a, b) => a.id - b.id,
  //       title: (
  //         <div className="text-center">
  //           <b>% ต่อยอดขาย</b>
  //         </div>
  //       ),
  //       width: 150,
  //     },
  //     {
  //       className: "tb-col-sm",
  //       dataIndex: "sum_pk_cost",
  //       key: "sum_pk_cost",
  //       ellipsis: false,
  //       align: "center",
  //       render: (val) => <div className="w-100 text-right">
  //         {numeral(val || 0).format("#,###.##")}
  //       </div>,
  //       sorter: (a, b) => a.id - b.id,
  //       title: (
  //         <div className="text-center">
  //           <b>PK</b>
  //         </div>
  //       ),
  //       width: 150,
  //     },
  //     {
  //       className: "tb-col-sm",
  //       dataIndex: "sum_pk_cost_p",
  //       key: "sum_pk_cost_p",
  //       ellipsis: false,
  //       align: "center",
  //       render: (val) => <div className="w-100 text-right">
  //         {numeral(val || 0).format("#,###.##")} %
  //       </div>,
  //       sorter: (a, b) => a.id - b.id,
  //       title: (
  //         <div className="text-center">
  //           <b>% ต่อยอดขาย</b>
  //         </div>
  //       ),
  //       width: 150,
  //     },
  //   ],
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "sum_tg_dl_cost_wage",
  //   key: "sum_tg_dl_cost_wage",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>DL</b>,
  //   width: 150,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "sum_tg_dl_cost_wage_p",
  //   key: "sum_tg_dl_cost_wage_p",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")} %
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>% ต่อยอดขาย</b>,
  //   width: 150,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "sum_tg_oh_cost_wage",
  //   key: "sum_tg_oh_cost_wage",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>OH</b>,
  //   width: 150,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "sum_tg_oh_cost_wage_p",
  //   key: "sum_tg_oh_cost_wage_p",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")} %
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>% ต่อยอดขาย</b>,
  //   width: 150,
  // },
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
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "sum_total_cost",
  //   key: "sum_total_cost",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>รวมต้นทุนการผลิต</b>,
  //   width: 200,
  // },
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
    title: <b>Invoice Qty.</b>,
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
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "sum_total_profit",
  //   key: "sum_total_profit",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>กำไร / ขาดทุน</b>,
  //   width: 200,
  // },
];


const columns2 = (onUpdateData) => [
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
    width: '50px',
    fixed: true
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_no",
    key: "so_no",
    ellipsis: false,
    render: (val) => <div className="w-100 text-center">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>SO No.</b>
      </div>
    ),
    width: '80px',
    fixed: true
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_description",
    key: "so_description",
    ellipsis: false,
    render: (val) => <div className="w-100 text-left">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    width: '250px',
  },
  {
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    key: "item_no_name",
    ellipsis: false,
    render: (val) => <div className="w-100 text-left">
      {val}
    </div>,
    title: (
      <div className="text-center">
        <b>Item</b>
      </div>
    ),
    width: '300px',
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
    width: '90px',
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
    width: '75px',
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_detail_price",
    key: "so_detail_price",
    ellipsis: false,
    align: "center",
    render: (val) => <div className="w-100 text-right">
      {numeral(val || 0).format("#,###.##")}
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>Price</b>,
    width: '100px',
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
    title: <b>Total Price</b>,
    width: '100px',
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
    title: <b>Tax Amount</b>,
    width: '80px',
    fixed: 'right'
  },
  {
    className: "tb-col-sm",
    dataIndex: "so_detail_ac_tax_percent",
    key: "so_detail_ac_tax_percent",
    ellipsis: false,
    align: "center",
    render: (val, { so_detail_id }, index) => <div className="w-100 text-right">
      <InputNumber {...getNumberFormat(2)} min={0} defaultValue={val || 0} className="w-100 input-number" placeholder="ระบุ Tax %" style={{ backgroundColor: "#d1eaff" }}
        onChange={(value) => onUpdateData({ index, so_detail_id, so_detail_ac_tax_percent: value || 0, commit: 1, so_detail_ac_tax: 1 })}
      />
    </div>,
    sorter: (a, b) => a.id - b.id,
    title: <b>% Tax</b>,
    width: '100px',
    fixed: 'right'
  },
  // extends
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "tg_dl_cost_time",
  //   key: "tg_dl_cost_time",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-center">
  //     {val || "00:00:00"}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>ชั่วโมง<br />การทำงาน</b>,
  //   width: 150,
  // },
  // //* overflow
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "",
  //   key: "sum_rm_pk",
  //   ellipsis: false,
  //   align: "center",
  //   title: (
  //     <div className="text-center">
  //       <b>DM</b>
  //     </div>
  //   ),
  //   // width: "12%",
  //   children: [
  //     {
  //       className: "tb-col-sm",
  //       dataIndex: "rm_cost",
  //       key: "rm_cost",
  //       ellipsis: false,
  //       align: "center",
  //       render: (val) => <div className="w-100 text-right">
  //         {numeral(val || 0).format("#,###.##")}
  //       </div>,
  //       sorter: (a, b) => a.id - b.id,
  //       title: (
  //         <div className="text-center">
  //           <b>RM</b>
  //         </div>
  //       ),
  //       width: 150,
  //     },
  //     {
  //       className: "tb-col-sm",
  //       dataIndex: "rm_cost_p",
  //       key: "rm_cost_p",
  //       ellipsis: false,
  //       align: "center",
  //       render: (val) => <div className="w-100 text-right">
  //         {numeral(val || 0).format("#,###.##")} %
  //       </div>,
  //       sorter: (a, b) => a.id - b.id,
  //       title: (
  //         <div className="text-center">
  //           <b>% ต่อยอดขาย</b>
  //         </div>
  //       ),
  //       width: 150,
  //     },
  //     {
  //       className: "tb-col-sm",
  //       dataIndex: "pk_cost",
  //       key: "pk_cost",
  //       ellipsis: false,
  //       align: "center",
  //       render: (val) => <div className="w-100 text-right">
  //         {numeral(val || 0).format("#,###.##")}
  //       </div>,
  //       sorter: (a, b) => a.id - b.id,
  //       title: (
  //         <div className="text-center">
  //           <b>PK</b>
  //         </div>
  //       ),
  //       width: 150,
  //     },
  //     {
  //       className: "tb-col-sm",
  //       dataIndex: "pk_cost_p",
  //       key: "pk_cost_p",
  //       ellipsis: false,
  //       align: "center",
  //       render: (val) => <div className="w-100 text-right">
  //         {numeral(val || 0).format("#,###.##")} %
  //       </div>,
  //       sorter: (a, b) => a.id - b.id,
  //       title: (
  //         <div className="text-center">
  //           <b>% ต่อยอดขาย</b>
  //         </div>
  //       ),
  //       width: 150,
  //     },
  //   ],
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "tg_dl_cost_wage",
  //   key: "tg_dl_cost_wage",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>DL</b>,
  //   width: 150,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "tg_dl_cost_wage_p",
  //   key: "tg_dl_cost_wage_p",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")} %
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>% ต่อยอดขาย</b>,
  //   width: 150,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "tg_oh_cost_wage",
  //   key: "tg_oh_cost_wage",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>OH</b>,
  //   width: 150,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "tg_oh_cost_wage_p",
  //   key: "tg_oh_cost_wage_p",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")} %
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>% ต่อยอดขาย</b>,
  //   width: 150,
  // },

  // {
  //   className: "tb-col-sm",
  //   dataIndex: "total_cost",
  //   key: "total_cost",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>รวมต้นทุนการผลิต</b>,
  //   width: 200,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "invoice_no",
  //   key: "invoice_no",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-center">
  //     {val || "-"}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>Invoice No.</b>,
  //   width: 200,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "invoice_qty",
  //   key: "invoice_qty",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {val ? numeral(val || 0).format("#,###.##") : "-"}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>Invoice Qty.</b>,
  //   width: 200,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "so_detail_total_price",
  //   key: "so_detail_total_price",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>ราคาขาย(Ext.Vat)</b>,
  //   width: 200,
  // },
  // {
  //   className: "tb-col-sm",
  //   dataIndex: "total_profit",
  //   key: "total_profit",
  //   ellipsis: false,
  //   align: "center",
  //   render: (val) => <div className="w-100 text-right">
  //     {numeral(val || 0).format("#,###.##")}
  //   </div>,
  //   sorter: (a, b) => a.id - b.id,
  //   title: <b>กำไร / ขาดทุน</b>,
  //   width: 200,
  // },
];
export default InputTax;
