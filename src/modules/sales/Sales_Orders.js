/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Space, Radio, Button, Popconfirm, Tag } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesOrder,
  get_quotation_list,
  get_sale_master_data,
  get_so_by_id,
  get_so_list,
  updateSOFilter,
} from "../../actions/sales";
import { reset_comments } from "../../actions/comment&log";
import { getMasterDataItem } from "../../actions/inventory";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
import Text from "antd/lib/typography/Text";
import DRForm from "./operations/dr/form/DRForm";
import { convertDigit } from "../../include/js/main_config";
import {
  getSelfStepStatus,
  getStatusByName,
  sortData,
} from "../../include/js/function_main";
import CustomTable from "../../components/CustomTable";
import { EllipsisOutlined } from "@ant-design/icons";
import CustomSelect from "../../components/CustomSelect";
import SO_SearchTable from "../sales/SO_search_tools";

const so_columns = ({ onOpen }) => [
  {
    title: "SO No.",
    dataIndex: "so_no",
    key: "so_no",
    width: "8%",
    align: "center",
    sorter: {
      compare: (a, b) => a.so_id - b.so_id,
      multiple: 3,
    },
    render: (value) => value || "-",
  },
  {
    title: "Quotation Ref.",
    dataIndex: "qn_no",
    key: "qn_no",
    width: "10%",
    align: "center",
    sorter: {
      compare: (a, b) => a.qn_id - b.qn_id,
      multiple: 3,
    },
    render: (value) => value || "-",
  },
  {
    title: "PO No.",
    dataIndex: "so_customer_po_no",
    key: "so_customer_po_no",
    width: "10%",
    align: "center",
    render: (value) => value || "-",
  },
  {
    title: "Order Date",
    dataIndex: "so_order_date",
    key: "so_order_date",
    width: "8%",
    align: "center",
    render: (value) => value || "-",
  },
  {
    title: "Delivery Date",
    dataIndex: "tg_so_delivery_date",
    key: "tg_so_delivery_date",
    width: "8%",
    align: "center",
    render: (value) => value || "-",
  },
  {
    title: "Customer",
    dataIndex: "customer_no_name",
    key: "customer_no_name",
    // width: "18%",
    align: "left",
    ellipsis: true,
    render: (value) => value || "-",
  },
  // {
  //   title: "Description",
  //   dataIndex: "so_description",
  //   key: "so_description",
  //   width: "15%",
  //   align: "left",
  //   ellipsis: true,
  //   render: (value) => value || "-",
  // },
  {
    title: "Salesperson",
    dataIndex: "so_created_by_no_name",
    key: "so_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
    render: (value) => value || "-",
  },
  {
    title: "Total Value",
    dataIndex: "tg_so_total_amount",
    key: "tg_so_total_amount",
    width: "10%",
    align: "right",
    sorter: {
      compare: (a, b) => a.tg_so_total_amount - b.tg_so_total_amount,
      multiple: 3,
    },
    render: (value) => convertDigit(value, 2),
  },
  {
    title: "Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "8%",
    align: "center",
    sorter: {
      compare: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
      multiple: 3,
    },
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <div
          id={`open-dr-${index}`}
          className='cursor'
          onClick={() => onOpen()}>
          {getStatusByName(record.trans_status_name)}
        </div>
      );
    },
  },
];
const so_columns_Production = ({ onOpen }) => [
  {
    title: "SO No.",
    dataIndex: "so_no",
    key: "so_no",
    width: "8%",
    align: "center",
    sorter: {
      compare: (a, b) => a.so_id - b.so_id,
      multiple: 3,
    },
    render: (value) => value || "-",
  },
  {
    title: "Quotation Ref.",
    dataIndex: "qn_no",
    key: "qn_no",
    width: "10%",
    align: "center",
    sorter: {
      compare: (a, b) => a.qn_id - b.qn_id,
      multiple: 3,
    },
    render: (value) => value || "-",
  },
  {
    title: "PO No.",
    dataIndex: "so_customer_po_no",
    key: "so_customer_po_no",
    width: "10%",
    align: "center",
    render: (value) => value || "-",
  },
  {
    title: "Order Date",
    dataIndex: "so_order_date",
    key: "so_order_date",
    width: "8%",
    align: "center",
    render: (value) => value || "-",
  },
  {
    title: "Delivery Date",
    dataIndex: "tg_so_delivery_date",
    key: "tg_so_delivery_date",
    width: "8%",
    align: "center",
    render: (value) => value || "-",
  },
  {
    title: "Customer",
    dataIndex: "customer_no_name",
    key: "customer_no_name",
    // width: "18%",
    align: "left",
    ellipsis: true,
    render: (value) => value || "-",
  },
  // {
  //   title: "Description",
  //   dataIndex: "so_description",
  //   key: "so_description",
  //   width: "15%",
  //   align: "left",
  //   ellipsis: true,
  //   render: (value) => value || "-",
  // },
  {
    title: "Salesperson",
    dataIndex: "so_created_by_no_name",
    key: "so_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
    render: (value) => value || "-",
  },
  {
    title: "Total Value",
    dataIndex: "tg_so_total_amount",
    key: "tg_so_total_amount",
    width: "10%",
    align: "right",
    sorter: {
      compare: (a, b) => a.tg_so_total_amount - b.tg_so_total_amount,
      multiple: 3,
    },
    render: (value) => convertDigit(value, 2),
  },
  {
    title: "Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "8%",
    align: "center",
    sorter: {
      compare: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
      multiple: 3,
    },
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <div
          id={`open-dr-${index}`}
          className='cursor'
          onClick={() => onOpen()}>
          {getStatusByName(record.trans_status_name)}
        </div>
      );
    },
  },
  {
    title: "Production Status",
    dataIndex: "so_production_status_name",
    key: "so_production_status_name",
    width: "8%",
    align: "center",
    sorter: {
      compare: (a, b) =>
        a.so_production_status_name - b.so_production_status_name,
      multiple: 3,
    },
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <Tag color='default' className='w-100'>
          {record.so_production_status_name}
        </Tag>
      ); //<div>{record.so_production_status_name}</div>;
    },
  },
];

const keepData = {
  so: [],
};
const SaleOrder = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const auth = useSelector((state) => state.auth.authData);
  const { filter } = useSelector((state) => state.sales.so);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);

  const getSOList = async () => {
    setLoading(true);
    const resp = await getSalesOrder(auth.user_name);
    if (resp.success) {
      keepData.so = sortData(resp.data);
      setState(sortData(resp.data));
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(get_sale_master_data());
    dispatch(reset_comments());
    dispatch(get_quotation_list(auth.user_name));
    dispatch(getMasterDataItem());
    getSOList();
    return () => {
      keepData.so = [];
    };
  }, []);

  const { qn_ref } = useSelector((state) => state.sales.so);

  const [state, setState] = useState(keepData.so);
  const [loading, setLoading] = useState(false);

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Sale Orders"],
    search: true,
    searchValue: filter.keyword,
    create: "/sales/orders/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    disabledEditBtn: !rowClick,
    discard: "/sales/orders",
    badgeCount: qn_ref.length,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      console.log(value);

      dispatch(updateSOFilter({ keyword: value }));
    },
    searchBar: (
      <>
        <Space size={18} style={{ marginRight: 15 }} wrap>
          <div>
            <Text strong>Status :</Text>
          </div>
          <CustomSelect
            //disabled={filter.salesType !== 2 ? false : true}
            name={"so_status"}
            allowClear
            placeholder='SO Status'
            data={[
              {
                label: "Pending Approve",
                value: "Pending Approve",
              },
              {
                label: "Pending Confirm",
                value: "Pending Confirm",
              },
              {
                label: "Available",
                value: "Available",
              },
              {
                label: "Completed",
                value: "Completed",
              },
              {
                label: "Open DR 1",
                value: "Open DR 1",
              },

              {
                label: "None DR",
                value: "None DR",
              },
              {
                label: "Transports 1",
                value: "Transports 1",
              },
              {
                label: "Transports 2",
                value: "Transports 2",
              },
              {
                label: "Transports 3",
                value: "Transports 3",
              },
              {
                label: "Transports 4",
                value: "Transports 4",
              },
              {
                label: "Cancel",
                value: "Cancel",
              },
            ]}
            field_id='value'
            field_name='label'
            style={{ width: 150 }}
            onChange={(val, option) =>
              dispatch(updateSOFilter({ so_status: val }))
            }
            value={filter.so_status}
          />
        </Space>

        <Space size={18} style={{ marginRight: 15 }} wrap>
          <div>
            <Text strong>Sales Type :</Text>
          </div>
          <CustomSelect
            name={"so_id"}
            placeholder='SO Ref'
            data={[
              {
                label: "ทั้งหมด",
                value: 3,
              },
              {
                label: "ผลิต",
                value: 1,
              },
              {
                label: "อื่นๆ",
                value: 2,
              },
            ]}
            field_id='value'
            field_name='label'
            style={{ width: 100 }}
            onChange={(val, option) =>
              val === 2
                ? dispatch(
                    updateSOFilter({ salesType: val, soProductionType: 0 })
                  )
                : dispatch(updateSOFilter({ salesType: val }))
            }
            value={filter.salesType}
            defaultValue={filter.salesType}
          />
        </Space>
        <Space size={18}>
          <div>
            <Text strong>Production Type :</Text>
          </div>
          <CustomSelect
            disabled={filter.salesType !== 2 ? false : true}
            name={"so_id"}
            placeholder='SO Ref'
            data={[
              {
                label: "ทั้งหมด",
                value: 0,
              },
              {
                label: "ผลิตเพื่อขาย",
                value: 1,
              },
              // {
              //   label: "ผลิตเพื่อเก็บ",
              //   value: 2,
              // },
              {
                label: "ผลิตเพื่อรอ FG",
                value: 3,
              },
            ]}
            field_id='value'
            field_name='label'
            style={{ width: 150 }}
            onChange={(val, option) =>
              dispatch(updateSOFilter({ soProductionType: val }))
            }
            value={filter.soProductionType}
            defaultValue={filter.soProductionType}
          />
        </Space>
      </>
    ),
  };

  useEffect(() => {
    const filterData = () => {
      console.log("filter FN", filter.so_status);
      setLoading(true);
      let filterData =
        filter.salesType === 3
          ? filter.soProductionType == 0
            ? keepData.so?.filter((obj) => obj)
            : keepData.so?.filter(
                (obj) => obj.so_production_type_id === filter.soProductionType
              )
          : filter.soProductionType == 0
          ? keepData.so?.filter((obj) => obj.so_type_id === filter.salesType)
          : filter.so_status == "Pending Approve"
          ? keepData.so?.filter((so) => so?.button_approve == 1)
          : keepData.so?.filter(
              (obj) =>
                obj.so_type_id === filter.salesType &&
                obj.so_production_type_id === filter.soProductionType
            );
      console.log("!filter.keyword :>> ", !filter.keyword);
      filterData = filter.keyword
        ? filterData?.filter(
            (po) =>
              po?.po_no?.indexOf(filter.keyword) >= 0 ||
              po?.vendor_no_name?.indexOf(filter.keyword) >= 0 ||
              po?.po_created_by_no_name?.indexOf(filter.keyword) >= 0 ||
              po?.po_created?.indexOf(filter.keyword) >= 0 ||
              po?.po_description?.indexOf(filter.keyword) >= 0
          )
        : filter.so_status === "Pending Approve"
        ? filterData?.filter((po) => po?.button_approve == 1)
        : filter.so_status === "Pending Confirm"
        ? filterData?.filter((po) => po?.button_confirm == 1)
        : filter.so_status === "Completed"
        ? filterData?.filter((po) => po?.trans_status_name == "Completed ")
        : filter.so_status === "Available"
        ? filterData?.filter((po) => po?.trans_status_name == "Available")
        : filter.so_status === "None DR"
        ? filterData?.filter((po) => po?.trans_status_name == "None DR")
        : filter.so_status === "Transports 1"
        ? filterData?.filter((po) => po?.trans_status_name == "Transports 1")
        : filter.so_status === "Transports 2"
        ? filterData?.filter((po) => po?.trans_status_name == "Transports 2")
        : filter.so_status === "Transports 3"
        ? filterData?.filter((po) => po?.trans_status_name == "Transports 3")
        : filter.so_status === "Transports 4"
        ? filterData?.filter((po) => po?.trans_status_name == "Transports 4")
        : filter.so_status === "Open DR 1"
        ? filterData?.filter((po) => po?.trans_status_name == "Open DR 1")
        : filter.so_status === "Cancel"
        ? filterData?.filter((po) => po?.trans_status_name == "Cancel")
        : filter.so_status === "Waiting"
        ? filterData?.filter((po) => po?.trans_status_name == "Draft")
        : filterData;
      setState(filterData);
      setLoading(false);
    };
    keepData.so.length && filterData();
  }, [filter, keepData.so, filter.so_status]);

  const [modal, setModal] = useState({
    visible: false,
    dr_id: null,
    so_detail_id: null,
  });

  // Modal Delivery Request
  const onClose = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      visible: false,
      dr_id: null,
      so_detail_id: null,
    }));
    getSOList();
  }, [setModal, getSOList]);

  const onOpen = useCallback(
    (so_detail_id) =>
      setModal((prev) => ({
        ...prev,
        visible: true,
        dr_id: null,
        so_detail_id,
      })),
    [setModal]
  );

  const modalConfig = React.useMemo(
    () => ({
      ...modal,
      onClose,
    }),
    [modal.visible, onClose]
  );

  // Sales Order Detail Table
  const expandedRowRender = (record, index) => {
    const columns = ({ openDR }) => [
      {
        title: "No.",
        dataIndex: "id",
        width: "5%",
        align: "center",
        className: "tb-col-sm",
        render: (val, _, index) => index + 1,
      },
      {
        title: (
          <div className='text-center'>
            <Text>Item</Text>
          </div>
        ),
        dataIndex: "item_no_name",
        align: "left",
        ellipsis: true,
        className: "tb-col-sm",
      },
      {
        title: (
          <div className='text-center'>
            <Text>Qty.</Text>
          </div>
        ),
        dataIndex: "so_detail_qty",
        align: "right",
        width: "8%",
        className: "tb-col-sm",
        render: (val, row) => convertDigit(val || 0, 2),
      },
      {
        title: (
          <div className='text-center'>
            <Text>UOM</Text>
          </div>
        ),
        dataIndex: "uom_no",
        align: "left",
        width: "6%",
        className: "tb-col-sm",
        render: (val, row) => val,
      },
      {
        title: (
          <div className='text-center'>
            <Text>Unit Price</Text>
          </div>
        ),
        dataIndex: "so_detail_price",
        align: "right",
        width: "8%",
        className: "tb-col-sm",
        render: (val, row) => convertDigit(val || 0, 2),
      },
      {
        title: (
          <div className='text-center'>
            <Text>Total Price</Text>
          </div>
        ),
        dataIndex: "so_detail_total_price",
        align: "right",
        width: "8%",
        className: "tb-col-sm",
        render: (val, row) => convertDigit(val || 0, 2),
      },
      {
        title: (
          <div className='text-center'>
            <Text>ยอดค้างส่ง</Text>
          </div>
        ),
        dataIndex: "tg_so_detail_qty_delivery",
        align: "right",
        width: "8%",
        className: "tb-col-sm",
        render: (val, row) => convertDigit(val || 0, 2),
      },
      {
        title: (
          <div className='text-center'>
            <Text>Delivery Date</Text>
          </div>
        ),
        dataIndex: "so_detail_delivery_date",
        align: "center",
        width: "10%",
        className: "tb-col-sm",
        render: (val, row) => {
          return record?.so_production_type_id == 3 ? (
            <>
              <Text>-</Text>
            </>
          ) : row?.button_create_dr ? (
            <Text>{val}</Text>
          ) : (
            ""
          );
        },
      },
      {
        title: (
          <div className='text-center'>
            <Text>Delivery Status</Text>
          </div>
        ),
        dataIndex: "delivery_trans_status_name",
        align: "center",
        width: "15%",
        className: "tb-col-sm",
        render: (val, row) => {
          return record?.so_production_type_id == 3 ? (
            <>
              <Text>-</Text>
            </>
          ) : row?.button_create_dr ? (
            <Text>{val}</Text>
          ) : (
            ""
          );
        },
      },
      {
        title: (
          <div className='text-center'>
            <EllipsisOutlined />
          </div>
        ),
        dataIndex: "so_detail_id",
        align: "center",
        width: "8%",
        className: "tb-col-sm",
        render: (val, row) => {
          return record?.so_production_type_id == 3 ? (
            <>
              <Text>-</Text>
            </>
          ) : row?.button_create_dr ? (
            <Popconfirm
              title='Do you want do create Delivery Request ?.'
              onConfirm={() => openDR(val)}
              className='cursor'>
              <Button size='small' className='primary'>
                Open DR
              </Button>
            </Popconfirm>
          ) : (
            ""
          );
        },
      },
    ];
    return (
      <>
        <CustomTable
          columns={columns({ openDR: onOpen })}
          dataSource={record.so_detail}
          bordered
          rowKey={"so_detail_id"}
          pagination={false}
          rowClassName='row-table-detail'
        />
      </>
    );
  };
  console.log("state :>> ", state);
  console.log(
    "state fillter :>> ",
    state.filter((data) => data.button_confirm == 1)
  );
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              //title={() => <SO_SearchTable />} //onChangeSearch={onChangeSearch} />}
              loading={loading}
              columns={
                filter.soProductionType === 3
                  ? so_columns_Production({ onOpen })
                  : so_columns({ onOpen })
              }
              dataSource={
                state //.filter((data) => data.button_approve == 1
              }
              rowKey={"so_id"}
              size='small'
              bordered
              rowClassName='row-pointer'
              expandable={{ expandedRowRender }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.so_no);

                    props.history.push({
                      pathname: "/sales/orders/view/" + record.so_id,
                      state: record,
                    });
                  },
                };
              }}
            />
          </Col>
        </Row>
        <DRForm {...modalConfig} />
      </MainLayout>
    </div>
  );
};

export default withRouter(SaleOrder);
