import { ClearOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Space, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useMemo } from "react";
import CustomSelect from "../../../../components/CustomSelect";
import MainLayout from "../../../../components/MainLayout";
import { convertDigit } from "../../../../include/js/main_config";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { filterReportGR } from "../../../../actions/inventory/receiveActions";
import { useFetch } from "../../../../include/js/customHooks";
const { RangePicker } = DatePicker;

const GRReport = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state?.inventory?.report?.gr || {});
  const { itemType, startDate, endDate } = filter;
  const { data, loading } = useFetch(
    `/reports/receive/0&${itemType}&${startDate}&${endDate}`
  );
  const onFilter = (keyValue) => dispatch(filterReportGR(keyValue));

  useEffect(() => {
    dispatch(
      filterReportGR({
        startDate: moment().startOf("month").format("DD-MM-YYYY"),
        endDate: moment().endOf("month").format("DD-MM-YYYY"),
      })
    );
  }, []);

  const resetFilter = () => {
    dispatch(
      filterReportGR({
        itemType: 0,
        startDate: moment().startOf("month").format("DD-MM-YYYY"),
        endDate: moment().endOf("month").format("DD-MM-YYYY"),
      })
    );
  };

  const layoutConfig = useMemo(
    () => ({
      projectId: 3, // project ID from DB
      title: "INVENTORY", // project name
      home: "/inventory", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Inventory", "Reporting", "Good Receive"], // [1,2,3] = 1 / 2 / 3
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
      action: [
        {
          name: (
            <Text>
              <DownloadOutlined className="mr-1" />
              Export to PDF
            </Text>
          ),
          link: "#",
          callBack: () =>
            window.open(
              `${process.env.REACT_APP_REPORT_SERVER}/report_good_receive.aspx?startDate=${startDate}&endDate=${endDate}&itemType=${itemType}`,
              "_blank"
            ),
        },
        {
          name: (
            <Text>
              <DownloadOutlined className="mr-1" />
              Export to Excel
            </Text>
          ),
          link: "#",
          callBack: () =>
            window.open(
              `${process.env.REACT_APP_REPORT_SERVER}/report_good_receive.aspx?startDate=${startDate}&endDate=${endDate}&itemType=${itemType}&excel=true`,
              "_blank"
            ),
        },
      ],
      searchBar: (
        <div className="d-flex flex-end">
          <Space size={18}>
            <div>
              <Text strong className="mr-1">
                ชนิดไอเทม :
              </Text>
              <CustomSelect
                placeholder="RM/PK/BULK/FG"
                style={{ width: 150 }}
                data={[
                  {
                    type_name: "ALL",
                    type_id: 0,
                  },
                  {
                    type_name: "Raw Material",
                    type_id: 1,
                  },
                  {
                    type_name: "Packaging",
                    type_id: 2,
                  },
                  {
                    type_name: "Bulk",
                    type_id: 3,
                  },
                  {
                    type_name: "Finish Good",
                    type_id: 4,
                  },
                ]}
                field_id="type_id"
                field_name="type_name"
                value={filter?.itemType}
                onChange={(val) => onFilter({ itemType: val })}
              />
            </div>
            <div>
              <Text strong className="mr-1">
                ช่วงวันที่ :
              </Text>
              <RangePicker
                format="DD/MM/YYYY"
                ranges={{
                  วันนี้: [moment(), moment()],
                  เดือนนี้: [
                    moment().startOf("month"),
                    moment().endOf("month"),
                  ],
                }}
                placeholder={["DD/MM/YYYY", "DD/MM/YYYY"]}
                value={[
                  filter?.startDate
                    ? moment(filter?.startDate, "DD-MM-YYYY")
                    : null,
                  filter?.endDate
                    ? moment(filter?.endDate, "DD-MM-YYYY")
                    : null,
                ]}
                onChange={(date) => {
                  date
                    ? onFilter({
                        startDate: moment(date[0]).format("DD-MM-YYYY"),
                        endDate: moment(date[1]).format("DD-MM-YYYY"),
                      })
                    : onFilter({ startDate: null, endDate: null });
                }}
              />
            </div>
          </Space>
        </div>
      ),
    }),
    [filter]
  );

  return (
    <MainLayout {...layoutConfig}>
      <div className="d-flex flex-end w-100 mt-1 mb-1">
        <Space size={16}>
          <Button
            type="dashed"
            size="small"
            icon={<ClearOutlined />}
            className="button-icon"
            onClick={() => resetFilter()}
          >
            Clear Search
          </Button>
          <div>
            <Text strong className="pd-right-1">{`Search Result : `}</Text>
            <Text strong className="pd-right-1" style={{ color: "blue" }}>
              {data?.length || "0"}
            </Text>
            <Text strong>Items</Text>
          </div>
        </Space>
      </div>
      <Table
        bordered
        size={"small"}
        loading={loading}
        columns={columns()}
        dataSource={data}
        pagination={{ pageSize: 30 }}
        rowKey="id"
      />
    </MainLayout>
  );
};

export default GRReport;

const columns = () => [
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
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <b>Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "8%",
    dataIndex: "receive_order_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>GR No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "8%",
    dataIndex: "receive_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Ref. Document</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "8%",
    dataIndex: "po_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Item</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "item_no_name",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Lot / Batch No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "12%",
    dataIndex: "stock_lot_no",
    render: (val, row) => `${val || "-"} / ${row.stock_batch || "-"}`,
  },
  {
    title: (
      <div className="text-center">
        <b>Shelf Life(วัน)</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "8%",
    dataIndex: "item_shelf_life",
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
    width: "8%",
    dataIndex: "receive_detail_sub_mfg_date",
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
    width: "8%",
    dataIndex: "receive_detail_sub_exp_date",
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
    width: "8%",
    dataIndex: "receive_detail_sub_qty",
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
    width: "6%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
];
