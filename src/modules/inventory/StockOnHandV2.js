import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Space, Button, Tabs, Tooltip, Modal } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import {
  clearFilterStockOnHand,
  filterStockOnHand,
  getItemPriceHistory,
  getReportStockOnHand,
  getSubReportStockOnHand,
} from "../../actions/inventory";
import { stock_on_hand_columns } from "./config/report";
import Authorize from "../system/Authorize";
import CustomSelect from "../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import useSubTable from "../../include/js/customHooks/useSubTable";
import { ClearOutlined } from "@ant-design/icons";
import { sortData } from "../../include/js/function_main";
import { convertDigit } from "../../include/js/main_config";
import { AppContext } from "../../include/js/context";
import moment from 'moment'

let stockDataSource = [];
let pass = 0;
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
    expandedRowRender: pr_historyrender,
    handleExpand: pr_historyhandle,
  } = useSubTable({
    columns: columns_purchaseReq,
    fetchDataFunction: getSubReportStockOnHand,
    rowKey: "item_id",
    dataKey: "pr_history",
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
              field_id="type_id"
              field_name="title"
              value={itemType}
              defaultValue={itemType}
              className="text-center"
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
        className="ml-4 drop-shadow"
        style={{
          padding: "4px 4px 0px 4px",
          marginBottom: "20px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Tabs size="small" type="card">
          <Tabs.TabPane tab={"Stock"} key="1">
            {expandedRowRender(row)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"Reserved"} key="2">
            {reserved_historyrender(row)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"Purchase Requisition"} key="3">
            {/* <h1>
              รายละเอียด No. , เลขที่ PO , วันที่เปิดซื้อ , ดีล , จำนวน , UOM
            </h1> */}
            {pr_historyrender(row)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"Purchase Order"} key="4">
            {/* <h1>
              รายละเอียด No. , เลขที่ PO , วันที่เปิดซื้อ , ดีล , จำนวน , UOM
            </h1> */}
            {po_historyrender(row)}
          </Tabs.TabPane>
          <Tabs.TabPane tab={"History"} key="5">
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
      endDate: "31-12-2050",
    });
    movement_historyhandle(expanded, row, {
      user_name,
      item_id: row.item_id,
      startDate: "01-01-2021",
      endDate: "31-12-2050",
    });
    reserved_historyhandle(expanded, row, {
      user_name,
      item_id: row.item_id,
      startDate: "01-01-2021",
      endDate: "31-12-2050",
    });
    po_historyhandle(expanded, row, {
      user_name,
      item_id: row.item_id,
      startDate: "01-01-2021",
      endDate: "31-12-2050",
    });
    pr_historyhandle(expanded, row, {
      user_name,
      item_id: row.item_id,
      startDate: "01-01-2021",
      endDate: "31-12-2050",
    });
  };

  const [modal, setModal] = useState({
    visible: false,
    item_no: '',
    data: []
  })
  const openViewPriceHistory = async (item_id = null, rec = '') => {
    if (!item_id) return false

    console.log("view item_id", item_id)
    const data = await getItemPriceHistory(item_id);

    setModal({
      visible: true,
      item: rec,
      data: data?.data[0]
    })

    console.log("history price", data)
  }

  return (
    <div>
      <MainLayout {...config} pageLoad={loading}>
        <Row>
          <Col span={24}>
            <div className="d-flex flex-end w-100 mt-1 mb-1">
              <Space size={16}>
                <Button
                  type="dashed"
                  size="small"
                  icon={<ClearOutlined />}
                  className="button-icon"
                  onClick={() => dispatch(clearFilterStockOnHand())}
                >
                  Clear Search
                </Button>
                <div>
                  <Text
                    strong
                    className="pd-right-1"
                  >{`Search Result : `}</Text>
                  <Text strong className="pd-right-1" style={{ color: "blue" }}>
                    {state?.length || "-"}
                  </Text>
                  <Text strong>Items</Text>
                </div>
              </Space>
            </div>
            <Table
              bordered
              loading={loading}
              columns={stock_on_hand_columns({ openViewPriceHistory })}
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
              size="small"
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

            <Modal
              visible={modal?.visible}
              title={modal?.item?.item_no_name || "Item Code Here..."}
              destroyOnClose
              onCancel={() => setModal({ visible: false, item_no: '', data: [] })}
              onOk={() => setModal({ visible: false, item_no: '', data: [] })}
              width={800}
            >
              <h3>{"ประวัติการสั่งซื้อไอเทม"}</h3>
              <Table
                bordered
                rowKey='id'
                size='small'
                rowClassName='row-table-detail'
                dataSource={modal?.data || []}
                columns={column_item_price_history()}
              />
            </Modal>

          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(Stock);

const column_item_price_history = () => [
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
    render: (val, rec, index) => index + 1,
  },
  {
    title: (
      <div className="text-center">
        <b>วันที่รับเข้า</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "receive_detail_sub_receive_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>PO No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "po_no",
    render: (val) => {
      return <a
        rel='noopener noreferrer'
        target='_blank'
        href={`${process.env.REACT_APP_REPORT_SERVER}/report_po.aspx?po_no=${val}`}
      >
        {val}
      </a>
    },
  },
  {
    title: (
      <div className="text-center">
        <b>Vendor</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "15%",
    dataIndex: "vendor_no_name",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>ราคาต่อหน่วย</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "po_detail_price",
    render: (val) => convertDigit(val, 4) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>จำนวน</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "receive_detail_sub_qty",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>หน่วย</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
];

const columns_stock = () => [
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
      <div className="text-center">
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
      <div className="text-center">
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
      <div className="text-center">
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
      <div className="text-center">
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
      <div className="text-center">
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
      <div className="text-center">
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
      <div className="text-center">
        <b>Status</b>
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
        <b>Trans No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "trans_no",
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
    dataIndex: "document_date",
    render: (val) => val || "-",
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
    dataIndex: "document_no",
    render: (val, record) => {
      let btn = ''
      switch (record?.trans_no) {
        case 'DSB':
          btn = `report_disburse.aspx?disburse_no=${val}`
          break;
        case 'RTI':
          btn = `report_return.aspx?return_no=${val}`
          break;
        case 'RCV':
        case 'QCV':
          btn = `report_receive2.aspx?receive_no=${val}`
          break;
        default:
          break;
      }

      return <a
        rel='noopener noreferrer'
        target='_blank'
        href={`${process.env.REACT_APP_REPORT_SERVER}/${btn}`}
      >
        {val}
      </a>
    },
  },
  {
    title: (
      <div className="text-center">
        <b>Lot/Batch</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "15%",
    dataIndex: "stock_lot_no",
    render: (val, record) => val + "/" + record.stock_batch || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Location</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "shelf_name",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Qty.</b>
      </div>
    ),
    children: [
      {
        title: (
          <div className="text-center">
            <b>+</b>
          </div>
        ),
        dataIndex: "stock_in_qty",
        key: "stock_in_qty",
        width: "10%",
        align: "right",
        render: (val) => convertDigit(val, 6) || "-",
      },
      {
        title: (
          <div className="text-center">
            <b>-</b>
          </div>
        ),
        dataIndex: "stock_out_qty",
        key: "stock_out_qty,",
        width: "10%",
        align: "right",
        render: (val) => convertDigit(val, 6) || "-",
      },
    ],
  },
  {
    title: (
      <div className="text-center">
        <b>On Hand Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "available",
    key: "available",
    render: (val, record) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
];

const columns_reserved = () => [
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
    dataIndex: "document_no",
    sorter: (a, b) => a.document_id - b.document_id,
    sortDirections: ['ascend', 'descend', null],
    render: (val, rec) => {
      return <a
        rel='noopener noreferrer'
        target='_blank'
        href={`${process.env.REACT_APP_REPORT_SERVER}/report_ream1.aspx?issue_no=${val}`}
      >
        {val}
      </a>
    },
  },
  {
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "document_description",
    ellipsis: true,
    render: (val, rec) => {
      // const so_no = rec?.document_description_ref?.split('/')[0]?.trim() || ''
      // const mrp_no = rec?.document_description_ref?.split('/')[1]?.trim() || ''
      // console.log("so_no", so_no)
      // console.log("mrp_no", mrp_no)

      // let ref_link = ''

      // if (so_no != '') {
      //   ref_link = <a
      //     rel='noopener noreferrer'
      //     target='_blank'
      //     href={`${process.env.REACT_APP_REPORT_SERVER}/report_so.aspx?so_no=${so_no}`}
      //   >
      //     {so_no}
      //   </a>
      // }

      return <Tooltip placement="top" title={rec?.document_description_ref || ''} arrow={true}>
        <span >{val || "-"}</span>
      </Tooltip>

    },
  },
  {
    title: (
      <div className="text-center">
        <b>Reserved Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_date",
    sorter: (a, b) => moment(a.document_date, 'DD/MM/YYYY').format('X') - moment(b.document_date, 'DD/MM/YYYY').format('X'),
    sortDirections: ['ascend', 'descend', null],
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_due_date",
    sorter: (a, b) => moment(a.document_due_date, 'DD/MM/YYYY').format('X') - moment(b.document_due_date, 'DD/MM/YYYY').format('X'),
    sortDirections: ['ascend', 'descend', null],
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Qty</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_qty",
    sorter: (a, b) => a.document_qty - b.document_qty,
    sortDirections: ['ascend', 'descend', null],
    render: (val) => convertDigit(val, 4) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Disburse Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "tg_issue_detail_qty_balance",
    sorter: (a, b) => a.tg_issue_detail_qty_balance - b.tg_issue_detail_qty_balance,
    sortDirections: ['ascend', 'descend', null],
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className="text-center">
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
const columns_purchaseReq = () => [
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
        <b>PR No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_no",
    sorter: (a, b) => a.document_id - b.document_id,
    sortDirections: ['ascend', 'descend', null],
    render: (val) => {
      return <a
        rel='noopener noreferrer'
        target='_blank'
        href={`${process.env.REACT_APP_REPORT_SERVER}/report_pr.aspx?pr_no=${val}`}
      >
        {val}
      </a>
    },
  },
  {
    title: (
      <div className="text-center">
        <b>PR Create</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_date",
    sorter: (a, b) => moment(a.document_date, 'DD/MM/YYYY').format('X') - moment(b.document_date, 'DD/MM/YYYY').format('X'),
    sortDirections: ['ascend', 'descend', null],
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_due_date",
    sorter: (a, b) => moment(a.document_due_date, 'DD/MM/YYYY').format('X') - moment(b.document_due_date, 'DD/MM/YYYY').format('X'),
    sortDirections: ['ascend', 'descend', null],
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_qty",
    sorter: (a, b) => a.document_qty - b.document_qty,
    sortDirections: ['ascend', 'descend', null],
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className="text-center">
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
        <b>PO No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_no",
    sorter: (a, b) => a.document_id - b.document_id,
    sortDirections: ['ascend', 'descend', null],
    render: (val) => {
      return <a
        rel='noopener noreferrer'
        target='_blank'
        href={`${process.env.REACT_APP_REPORT_SERVER}/report_po.aspx?po_no=${val}`}
      >
        {val}
      </a>
    },
  },
  {
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "document_description",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>PO Create</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_date",
    sorter: (a, b) => moment(a.document_date, 'DD/MM/YYYY').format('X') - moment(b.document_date, 'DD/MM/YYYY').format('X'),
    sortDirections: ['ascend', 'descend', null],
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_due_date",
    sorter: (a, b) => moment(a.document_due_date, 'DD/MM/YYYY').format('X') - moment(b.document_due_date, 'DD/MM/YYYY').format('X'),
    sortDirections: ['ascend', 'descend', null],
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "document_qty",
    sorter: (a, b) => a.document_qty - b.document_qty,
    sortDirections: ['ascend', 'descend', null],
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className="text-center">
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
