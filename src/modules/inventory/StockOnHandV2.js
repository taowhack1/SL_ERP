/** @format */

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Space, Button, Tabs } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import {
  clearFilterStockOnHand,
  filterStockOnHand,
  getReportStockOnHand,
  getSubReportStockOnHand,
} from "../../actions/inventory";
import { stock_on_hand_columns } from "./config/report";
import Authorize from "../system/Authorize";
import CustomSelect from "../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import useSubTable from "../../include/js/customHooks/useSubTable";
import {
  ClearOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { sortData } from "../../include/js/function_main";
import CustomTable from "../../components/CustomTable";
import { convertDigit } from "../../include/js/main_config";
import { AppContext } from "../../include/js/context";
let stockDataSource = [];
const Stock = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const { expandedRowRender, handleExpand } = useSubTable({
    columns: columns_stock,
    fetchDataFunction: getSubReportStockOnHand,
    rowKey: "id",
    dataKey: "stock_history",
  });
  const {
    expandedRowRender: reserved_historyrender,
    handleExpand: reserved_historyhandle,
  } = useSubTable({
    columns: columns_reserved,
    fetchDataFunction: getSubReportStockOnHand,
    rowKey: "item_id",
    dataKey: "issue_history",
  });

  const {
    expandedRowRender: po_historyrender,
    handleExpand: po_historyhandle,
  } = useSubTable({
    columns: columns_purchaseorder,
    fetchDataFunction: getSubReportStockOnHand,
    rowKey: "item_id",
    dataKey: "po_history",
  });

  const {
    expandedRowRender: movement_historyrender,
    handleExpand: movement_historyhandle,
  } = useSubTable({
    columns: columns_movement,
    fetchDataFunction: getSubReportStockOnHand,
    rowKey: "item_id",
    dataKey: "movement_history",
  });

  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = ({ pageSize }, filters, sorter, extra) => {
    console.log("onChange pageSize", pageSize);
    dispatch(filterStockOnHand({ pageSize }));
  };

  const { filter } = useSelector(
    (state) => state.inventory.report.stock_on_hand
  );
  const { keyword, page, pageSize, itemType, codeType, expandedId } =
    filter || {};

  const [state, setState] = useState([]);

  const config = useMemo(
    () => ({
      projectId: 3,
      title: "INVENTORY",
      home: "/inventory",
      show: true,
      breadcrumb: ["Home", "Stock on hand"],
      search: true,
      create: "",
      buttonAction: [],
      edit: {
        data: {},
        path: "",
      },
      disabledEditBtn: !rowClick,
      discard: "/inventory",
      onCancel: () => {
        console.log("Cancel");
      },
      onSearch: (keyword) => {
        dispatch(filterStockOnHand({ keyword: keyword?.toUpperCase() }));
      },
      searchValue: keyword,
      searchBar: (
        <Space size={18}>
          <Space size={18}>
            <div>
              <Text strong>Item Type :</Text>
            </div>
            <CustomSelect
              data={[
                {
                  title: "All",
                  type_id: 0,
                },
                {
                  title: "Raw Material",
                  type_id: 1,
                },
                {
                  title: "Packaging",
                  type_id: 2,
                },
                {
                  title: "Bulk",
                  type_id: 3,
                },
                {
                  title: "Finish Good",
                  type_id: 4,
                },
              ]}
              placeholder={"Select Item Type"}
              field_id='type_id'
              field_name='title'
              value={itemType}
              defaultValue={itemType}
              className='text-center'
              onChange={(id, row) =>
                dispatch(filterStockOnHand({ itemType: id }))
              }
              style={{ width: 125 }}
            />
          </Space>
        </Space>
      ),
    }),
    [filter]
  );

  const getDataSoruce = async (user_name) => {
    setLoading(true);
    const resp = await getReportStockOnHand(user_name);
    setTimeout(() => {
      if (resp.success) {
        stockDataSource = resp.data;
        let filterData = keyword
          ? resp?.data?.filter(
              (item) => item?.item_no_name.indexOf(keyword) >= 0
            )
          : resp.data;
        setState(filterData);
      }
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    getDataSoruce(user_name);
  }, [user_name]);

  useEffect(() => {
    // SEARCH
    if (stockDataSource?.length) {
      setLoading(true);
      console.log(
        `filter [ keyword:${keyword} , itemType:${itemType} , expandedId:${expandedId} ]`
      );
      let filterData = stockDataSource;
      const filterKeyword = (keyword = null) => {
        filterData = keyword
          ? stockDataSource?.filter(
              (item) => item?.item_no_name.indexOf(keyword) >= 0
            )
          : stockDataSource;
      };
      const filterType = (type_id = 0) => {
        switch (type_id) {
          case 0:
            filterData = filterData;
            break;
          default:
            filterData = filterData?.filter((obj) => obj.type_id === type_id);
            break;
        }
      };
      const expandedRow = (expandedId = []) => {
        filterData = filterData?.map((obj) =>
          expandedId.includes(obj.item_id)
            ? { ...obj, expanded: true }
            : { ...obj, expanded: false }
        );
      };
      filterKeyword(keyword);
      filterType(itemType);
      expandedRow(expandedId);
      setState(sortData(filterData));
      setLoading(false);
    }
  }, [filter, stockDataSource]);
  console.log("stock on hand");
  const expandedRowRender2 = (row) => {
    return (
      <div
        className='ml-4 drop-shadow'
        style={{
          padding: "4px 4px 0px 4px",
          marginBottom: "20px",
          backgroundColor: "#FFFFFF",
        }}>
        <Tabs
          size='small'
          type='card'
          // tabBarExtraContent={
          //   <div className="d-flex flex-end">
          //     <Button icon={<DownloadOutlined />}>Export Excel</Button>
          //   </div>
          // }
        >
          <Tabs.TabPane tab={"Stock"} key='1'>
            {/* <h1>
              รายละเอียดสต็อก No. , Lot , Batch , MFG , EXP , Qty , UOM ,Status
              ,ราคาซื้อ (ใช้งานได้/QC/ของเสีย) V2
            </h1> */}
            {expandedRowRender(row)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"Reserved"} key='2'>
            {/* <h1>
              รายละเเอียดแสดงใบเบิก No. , เลขที่ใบเบิก ,Job,วันที่จอง
              ,วันที่ต้องการของ, จำนวน , จ่ายแล้วเท่าไหร่ , UOM ,
            </h1> */}
            {reserved_historyrender(row)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"Purchase Order"} key='3'>
            {/* <h1>
              รายละเอียด No. , เลขที่ PO , วันที่เปิดซื้อ , ดีล , จำนวน , UOM
            </h1> */}
            {po_historyrender(row)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"History"} key='4'>
            {/* <h1>
              รายละเอียดประวัติการเคลื่อนไหวของไอเทม No. ,วันที่ , Doc No. ,
              Lot/Batch , Form , To , +/- Qty , Available Qty ,
            </h1> */}
            {movement_historyrender(row)}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  };
  const handleExpand2 = (expanded, row) => {
    handleExpand(expanded, row, {
      user_name,
      item_id: row.item_id,
      startDate: "01-01-2021",
      endDate: "31-12-2022",
    });
    movement_historyhandle(expanded, row, {
      user_name,
      item_id: row.item_id,
      startDate: "01-01-2021",
      endDate: "31-12-2022",
    });
    reserved_historyhandle(expanded, row, {
      user_name,
      item_id: row.item_id,
      startDate: "01-01-2021",
      endDate: "31-12-2022",
    });
    po_historyhandle(expanded, row, {
      user_name,
      item_id: row.item_id,
      startDate: "01-01-2021",
      endDate: "31-12-2022",
    });
  };
  return (
    <div>
      <MainLayout {...config} pageLoad={loading}>
        <Row>
          <Col span={24}>
            <div className='d-flex flex-end w-100 mt-1 mb-1'>
              <Space size={16}>
                <Button
                  type='dashed'
                  size='small'
                  icon={<ClearOutlined />}
                  className='button-icon'
                  onClick={() => dispatch(clearFilterStockOnHand())}>
                  Clear Search
                </Button>
                <div>
                  <Text
                    strong
                    className='pd-right-1'>{`Search Result : `}</Text>
                  <Text strong className='pd-right-1' style={{ color: "blue" }}>
                    {state?.length || "-"}
                  </Text>
                  <Text strong>Items</Text>
                </div>
              </Space>
            </div>
            <Table
              bordered
              loading={loading}
              columns={stock_on_hand_columns}
              dataSource={state}
              onChange={onChange}
              rowKey={"item_id"}
              expandable={{ expandedRowRender: expandedRowRender2 }}
              onExpand={(expanded, row) => {
                handleExpand2(expanded, row);
              }}
              pagination={{
                pageSize,
                pageSizeOptions: [15, 30, 50, 100],
                showSizeChanger: true,
              }}
              size='small'
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                  },
                };
              }}
            />
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(Stock);

const columns_stock = () => [
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
        <b>Lot No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "stock_lot_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Batch No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "stock_batch",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>MFG</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "stock_mfg_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>EXP</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "stock_exp_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Price</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "stock_unit_price",
    render: (val) => convertDigit(val, 4) || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "tg_stock_qty_balance",
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "uom_no",
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
    dataIndex: "",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Price</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "",
    render: (val) => val || "-",
  },
];

const columns_movement = () => [
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
        <b>Trans No.</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "trans_no",
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
    dataIndex: "document_date",
    render: (val) => val || "-",
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
    dataIndex: "document_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Lot/Batch</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "stock_batch",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Location</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    width: "ๅจ%",
    dataIndex: "shelf_name",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Receive</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "stock_receive_qty",
    render: (val) => convertDigit(val, 4) || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Reject</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "stock_reject_qty",
    render: (val) => convertDigit(val, 4) || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>On Hand</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "stock_pass_qty",
    render: (val) => convertDigit(val, 4) || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Disburse</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "stock_disburse_qty",
    render: (val) => {
      return (
        <div style={{ marginRight: 5 }}>{convertDigit(val, 4) || "-"}</div>
      );
    },
  },
];

const columns_reserved = () => [
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
    dataIndex: "document_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "document_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Reserved Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_due_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Qty</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_qty",
    render: (val) => convertDigit(val, 4) || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Disburse Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "tg_issue_detail_qty_balance",
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
];
const columns_purchaseorder = () => [
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
        <b>PO No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>PO Create</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_due_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_qty",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
];
//No. , Lot , Batch , MFG , EXP , Qty , UOM ,Status ,ราคาซื้อ (ใช้งานได้/QC/ของเสีย)
const mockData = [
  {
    id: 0,
    doc_id: 1,
    lot_no: "LOT001",
    batch_no: "202108010001",
    mfg: "01/01/2021",
    exp: "31/12/2021",
    qty: 123,
    uom: "kg",
    status: "On QC",
    price: 1050,
  },
  {
    id: 1,
    doc_id: 2,
    lot_no: "LOT002",
    batch_no: "202108010022",
    mfg: "15/02/2021",
    exp: "15/02/2022",
    qty: 800,
    uom: "kg",
    status: "Usable",
    price: 980,
  },
  {
    id: 2,
    doc_id: 2,
    lot_no: "LOT054",
    batch_no: "202108010035",
    mfg: "31/08/2021",
    exp: "31/08/2022",
    qty: 125,
    uom: "kg",
    status: "Reject",
    price: 1050,
  },
];
