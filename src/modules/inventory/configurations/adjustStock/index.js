/** @format */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Space, Button, Tabs } from "antd";
import MainLayout from "../../../../components/MainLayout";
import $ from "jquery";
import {
  clearFilterStockOnHand,
  filterStockOnHand,
  getReportStockOnHand,
  getSubReportStockOnHand,
} from "../../../../actions/inventory";
import { Adjust_stock_columns } from "../../config/report";
import Authorize from "../../../system/Authorize";
import CustomSelect from "../../../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import useSubTableEdit from "../../../../include/js/customHooks/useSubTableEdit";
import {
  ClearOutlined,
  DownloadOutlined,
  EditTwoTone,
  EllipsisOutlined,
  ExportOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { sortData } from "../../../../include/js/function_main";
import CustomTable from "../../../../components/CustomTable";
import { convertDigit } from "../../../../include/js/main_config";
import { AppContext } from "../../../../include/js/context";
import useKeepLogs from "../../../logs/useKeepLogs";
import AdjustStockForm from "./form/AdjustStockForm";
let stockDataSource = [];
let item_no_name = "";
const AdjustStock = () => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const keepLog = useKeepLogs();
  const { expandedRowRender, handleExpand } = useSubTableEdit({
    columns,
    fetchDataFunction: getSubReportStockOnHand,
    rowKey: "id",
    dataKey: "stock_history",
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
  const [modal, setModal] = useState({
    visible: false,
    rowData: null,
    item_no_name: null,
  });

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
        setModal((prev) => ({ ...prev, update: false }));
      }
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    !modal.visible && getDataSoruce(user_name);
  }, [user_name, modal.visible]);

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
  const onClose = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      visible: false,
      rowData: null,
      item_no_name: null,
    }));
    keepLog.keep_log_action("Close Modal AdjustStock");
  }, [setModal, modal]);
  const config = useMemo(
    () => ({
      projectId: 3,
      title: "INVENTORY",
      home: "/inventory",
      show: true,
      breadcrumb: ["Home", "Adjust Stock"],
      search: true,
      create: "",
      buttonAction: [],
      edit: {
        data: {},
        path: "",
      },
      disabledEditBtn: !rowClick,
      discard: "/inventory",
      openModal: () => setModal((prev) => ({ ...prev, visible: true })),
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
    [keyword, setModal, filter]
  );

  const expandedRowRender2 = (row) => {
    item_no_name = row?.item_no_name;
    return (
      <div
        className='ml-4 drop-shadow'
        style={{
          padding: "4px 4px 0px 4px",
          marginBottom: "20px",
          backgroundColor: "#FFFFFF",
        }}>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          onClick={() => viewData(row)}>
          Add
        </Button>
        {expandedRowRender(row, viewData)}
      </div>
    );
  };
  const viewData = (data) => {
    setModal((prev) => ({
      ...prev,
      visible: true,
      rowData: data,
      item_no_name: item_no_name,
    }));
  };

  const listConfig = React.useMemo(
    () => ({
      loading,
      data: state,
      viewData,
    }),
    [loading, state, viewData]
  );
  const modalConfig = React.useMemo(
    () => ({
      ...modal,
      onClose,
    }),
    [modal.visible, onClose]
  );
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
              columns={Adjust_stock_columns}
              dataSource={state}
              onChange={onChange}
              rowKey={"item_id"}
              expandable={{ expandedRowRender: expandedRowRender2 }}
              // expandable={{ expandedRowRender }}
              onExpand={(expanded, row) => {
                // console.log("onExpand", a, b, c);
                handleExpand(expanded, row, {
                  user_name,
                  item_id: row.item_id,
                  startDate: "01-01-2021",
                  endDate: "31-12-2022",
                });
              }}
              // onExpand={handleExpand}
              pagination={{
                pageSize,
                pageSizeOptions: [15, 30, 50, 100],
                showSizeChanger: true,
              }}
              size='small'
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    console.log(e);
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
      <AdjustStockForm {...modalConfig} />
    </div>
  );
};

export default withRouter(AdjustStock);

const columns = (viewData) => [
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
        <b>Adjust</b>
      </div>
    ),
    dataIndex: "",
    key: "",
    width: "8%",
    align: "center",
    ellipsis: false,
    render: (val, record) => {
      return <EditTwoTone onClick={(e) => viewData(record)} />;
    },
  },
];
