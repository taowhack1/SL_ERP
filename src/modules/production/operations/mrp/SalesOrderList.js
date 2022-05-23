/** @format */

import { CheckCircleTwoTone, ExportOutlined } from "@ant-design/icons";
import { Button, message, Table, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { convertDigit } from "../../../../include/js/main_config";
import { useFetch } from "../../../../include/js/customHooks";
import CustomSelect from "../../../../components/CustomSelect";

const fetchUrl = `/reports/mrp/so_list`;
const SalesOrderList = () => {
  const [state, setState] = useState({
    data: [],
    filter: {
      trans_status_id: 0,
    },
  });

  const { data, loading, errors } = useFetch(
    `${fetchUrl}/${state.filter.trans_status_id}`
  );

  useEffect(() => {
    console.log("useEffect");
    errors && message.error("Can't get any data from the server.");
  }, [errors]);

  const onChangeFilter = (data) => {
    setState((prev) => ({ ...prev, filter: { ...prev.filter, ...data } }));
  };

  return (
    <>
      <div className="form-section">
        <div className="d-flex flex-end mb-1 w-100">
          <Text strong>Filter Status : </Text>
          <div style={{ width: "150px", marginLeft: 10 }}>
            <CustomSelect
              placeholder={"Status"}
              data={filterStatus}
              field_id={"trans_status_id"}
              field_name={"trans_status_name"}
              onChange={(val) => onChangeFilter({ trans_status_id: val || 0 })}
              value={state.filter.trans_status_id}
            />
          </div>
          <Button
            className="ml-4"
            key="export-pdf"
            icon={<ExportOutlined />}
            onClick={() =>
              window.open(
                `${process.env.REACT_APP_REPORT_SERVER}/report_so_production_list.aspx?trans_status_id=${state.filter.trans_status_id}`,
                "_blank"
              )
            }
          >
            Export PDF
          </Button>
          <Button
            key="export-excel"
            icon={<ExportOutlined />}
            className="ml-2 primary"
            onClick={() =>
              window.open(
                `${process.env.REACT_APP_REPORT_SERVER}/report_so_production_list.aspx?excel=true&trans_status_id=${state.filter.trans_status_id}`,
                "_blank"
              )
            }
          >
            Export Excel
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          loading={loading}
          rowKey={"so_detail_id"}
          size="small"
          rowClassName="row-pointer"
          onRow={(record, rowIndex) => ({
            onClick: () => console.log(record),
          })}
        />
      </div>
    </>
  );
};

export default React.memo(SalesOrderList);

const columns = [
  {
    title: (
      <div className="text-center">
        <Text strong>{"No."}</Text>
      </div>
    ),
    width: "5%",
    align: "center",
    dataIndex: "id",
    ellipsis: false,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"SO No."}</Text>
      </div>
    ),
    dataIndex: "so_no",
    key: "so_no",
    width: "7%",
    align: "center",
    ellipsis: false,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Issued Date"}</Text>
      </div>
    ),
    dataIndex: "so_created",
    key: "so_created",
    width: "10%",
    align: "center",
    ellipsis: false,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Item"}</Text>
      </div>
    ),
    dataIndex: "item_no_name",
    key: "item_no_name",
    // width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Qty"}</Text>
      </div>
    ),
    dataIndex: "so_detail_qty",
    key: "so_detail_qty",
    width: "10%",
    align: "right",
    ellipsis: true,
    render: (val) => convertDigit(val, 2),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"MRP Qty."}</Text>
      </div>
    ),
    dataIndex: "mrp_track",
    key: "mrp_track",
    width: "13%",
    align: "left",
    ellipsis: true,
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"UOM"}</Text>
      </div>
    ),
    dataIndex: "uom_no",
    key: "uom_no",
    width: "5%",
    align: "left",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Customer"}</Text>
      </div>
    ),
    dataIndex: "customer_name",
    key: "customer_name",
    align: "left",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Delivery"}</Text>
      </div>
    ),
    dataIndex: "so_detail_delivery_date",
    key: "so_detail_delivery_date",
    width: "10%",
    align: "center",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Status"}</Text>
      </div>
    ),
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "10%",
    align: "center",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Status NEW"}</Text>
      </div>
    ),
    children: [
      {
        title: "Bulk",
        dataIndex: "bom_bulk",
        key: "bom_bulk",
        align: "center",
        width: "5%",
        render: (val, record) => {
          if (record.tg_trans_status_id == 3) {
            return (
              <div
                style={{
                  "margin-bottom": "1px",
                  "background-color": "#848484",
                  position: "relative",
                  width: "100%",
                  "padding-bottom": "25%",
                }}
              ></div>
            );
          }
          if (val > 0) {
            return (
              <div
                style={{
                  "margin-bottom": "1px",
                  "background-color": "#4fd074",
                  position: "relative",
                  width: "100%",
                  "padding-bottom": "25%",
                }}
              ></div>
            );
          }
        },
      },
      {
        title: "FG",
        dataIndex: "fg_ref_bulk",
        key: "fg_ref_bulk",
        align: "center",
        width: "5%",
        render: (val, record) => {
          if (record.tg_trans_status_id == 3) {
            return (
              <div
                style={{
                  "margin-bottom": "1px",
                  "background-color": "#848484",
                  position: "relative",
                  width: "100%",
                  "padding-bottom": "25%",
                }}
              ></div>
            );
          }
          if (record.type_id == 3) {
            return (
              <div
                style={{
                  "margin-bottom": "1px",
                  "background-color": "#d1d1d1",
                  position: "relative",
                  width: "100%",
                  "padding-bottom": "25%",
                }}
              ></div>
            );
          }
        },
      },
      {
        title: "MRP",
        dataIndex: "trans_status_id",
        key: "",
        align: "center",
        width: "5%",
        render: (val, record) => {
          if (record.tg_trans_status_id == 3) {
            return (
              <div
                style={{
                  "margin-bottom": "1px",
                  "background-color": "#848484",
                  position: "relative",
                  width: "100%",
                  "padding-bottom": "25%",
                }}
              ></div>
            );
          }
          if (record.trans_status_id >= 5) {
            return (
              <div
                style={{
                  "margin-bottom": "1px",
                  "background-color": "#4fd074",
                  position: "relative",
                  width: "100%",
                  "padding-bottom": "25%",
                }}
              ></div>
            );
          }
        },
      },
      {
        title: "Receive",
        dataIndex: "trans_status_id",
        key: "",
        align: "center",
        width: "5%",
        render: (val, record) => {
          if (record.tg_trans_status_id == 3) {
            return (
              <div
                style={{
                  "margin-bottom": "1px",
                  "background-color": "#848484",
                  position: "relative",
                  width: "100%",
                  "padding-bottom": "25%",
                }}
              ></div>
            );
          }
          if (record.trans_status_id >= 5) {
            return (
              <div
                style={{
                  "margin-bottom": "1px",
                  "background-color": "#4fd074",
                  position: "relative",
                  width: "100%",
                  "padding-bottom": "25%",
                }}
              ></div>
            );
          }
        },
      },
    ],
  },
];

const filterStatus = [
  {
    trans_status_id: 0,
    trans_status_name: "All",
  },
  {
    trans_status_id: 1,
    trans_status_name: "Draft",
  },
  {
    trans_status_id: 2,
    trans_status_name: "Pending Approve S/O",
  },
  {
    trans_status_id: 3,
    trans_status_name: "Cancel",
  },
  {
    trans_status_id: 4,
    trans_status_name: "Pending MRP",
  },
  {
    trans_status_id: 5,
    trans_status_name: "MRP",
  },
  {
    trans_status_id: 6,
    trans_status_name: "Completed",
  },
];
