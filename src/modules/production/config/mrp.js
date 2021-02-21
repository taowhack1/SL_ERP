import {
  getRefStatus,
  warningTextValue,
} from "../../../include/js/function_main";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import React from "react";

import Text from "antd/lib/typography/Text";
import { InputNumber } from "antd";
import { FileSearchOutlined, SearchOutlined } from "@ant-design/icons";

export const mrp_columns = [
  {
    title: "MRP Code",
    dataIndex: "mrp_no",
    width: "8%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Source",
    dataIndex: "so_no",
    width: "8%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Item",
    dataIndex: "item_no_name",
    // width: "20%",
    ellipsis: true,
  },
  {
    title: "Job Name",
    dataIndex: "mrp_description",
    ellipsis: true,
  },

  {
    title: "Plan Start",
    dataIndex: "mrp_plan_start_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Plan End",
    dataIndex: "mrp_plan_end_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Due Date",
    dataIndex: "mrp_due_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Qty.",
    dataIndex: "mrp_qty_produce",
    width: "8%",
    align: "right",
    ellipsis: true,
    render: (value, record, index) => {
      return convertDigit(value);
    },
  },
  {
    title: "UOM",
    dataIndex: "uom_name",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "MRP Status",
    dataIndex: "trans_close_name",
    key: "trans_close_name",
    width: "8%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return getRefStatus(record);
    },
  },
];
export const mrpFields = {
  mrp_id: null,
  mrp_no: null,
  mrp_order_date: null,
  mrp_plan_start_date: null,
  mrp_plan_end_date: null,
  mrp_due_date: null,
  mrp_description: null,
  mrp_agreement: null,
  mrp_qty_produce: 0,
  mrp_qty_percent_spare_rm: 0,
  mrp_qty_percent_spare_pk: 0,
  mrp_remark: null,
  mrp_lock: null,
  mrp_rows: null,
  mrp_actived: null,
  mrp_created: null,
  mrp_created_by: null,
  mrp_updated: null,
  mrp_updated_by: null,
  so_id: null,
  branch_id: null,
  item_id: null,
  process_id: null,
  tg_trans_status_id: null,
  tg_trans_close_id: null,
  mrp_lead_time_day_pk: 0,
  mrp_lead_time_day_pk_qa: 0,
  mrp_lead_time_day_rm: 0,
  mrp_lead_time_day_rm_qa: 0,
};

export const mrpRequireFields = [
  "mrp_description",
  "so_id",
  "item_id",
  "mrp_qty_produce",
  "mrp_plan_start_date",
];
export const mrpRMColumns = (
  readOnly,
  onChange,
  onDelete,
  onToggle,
  viewOnHandDetail,
  { itemList }
) => [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: (
      <div className="text-center">
        {!readOnly && <span className="require">* </span>} RM Items
      </div>
    ),
    dataIndex: "item_no_name",
    key: "item_no_name",
    align: "left",
    ellipsis: true,
    render: (value, record, index) => {
      return <Text className="text-value text-left">{value ?? "-"}</Text>;
    },
  },
  {
    id: 3,
    title: <div className="text-center">On Hand Qty.</div>,
    dataIndex: "mrp_detail_qty_available",
    key: "mrp_detail_qty_available",
    align: "right",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return (
        <>
          {warningTextValue(
            value,
            4,
            record.mrp_detail_qty_pr && value < record.mrp_detail_qty_issue
              ? true
              : false
          )}
          {/* {record.item_id && (
            <FileSearchOutlined
              className="button-icon"
              title="View Detail"
              onClick={() => viewOnHandDetail(record)}
            />
          )} */}
        </>
      );
    },
  },
  {
    id: 4,
    title: <div className="text-center">Qty. To Issue</div>,
    dataIndex: "mrp_detail_qty_issue",
    key: "mrp_detail_qty_issue",
    align: "right",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return (
        <Text className="text-value text-right">
          {convertDigit(value, 4) ?? "-"}
        </Text>
      );
    },
  },

  {
    id: 5,
    title: <div className="text-center">UoM (Stock)</div>,
    dataIndex: "uom_name",
    key: "uom_name",
    align: "center",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  {
    id: 6,
    title: <div className="text-center">MOQ</div>,
    dataIndex: "mrp_detail_qty_pr",
    key: "mrp_detail_qty_pr",
    require: true,
    align: "right",
    width: "15%",
    render: (value, record, index) => {
      if (readOnly) {
        return (
          <Text className="text-value text-right">
            {convertDigit(value, 4) ?? "-"}
          </Text>
        );
      } else {
        return (
          <InputNumber
            disabled={record.item_id !== null ? 0 : 1}
            {...numberFormat}
            placeholder={"Qty. to PR"}
            min={0}
            step={record.item_vendor_min_qty}
            className="full-width"
            name="mrp_detail_qty_pr"
            value={value}
            onChange={(data) =>
              onChange(record.id, { mrp_detail_qty_pr: data })
            }
            size="small"
          />
        );
      }
    },
  },
  {
    id: 7,
    title: <div className="text-center">UoM (Vendor)</div>,
    dataIndex: "item_vendor_uom_name",
    key: "item_vendor_uom_name",
    align: "center",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  {
    title: <div className="text-center">Lead-Time(days)</div>,
    align: "center",
    width: "12%",
    render: (value, record, index) => {
      return (
        record.mrp_detail_lead_time_day_pr + record.mrp_detail_lead_time_day_qa
      );
    },
  },
];

export const mrpPKColumns = (readOnly, onChange, onDelete, onToggle) => [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: (
      <div className="text-center">
        {!readOnly && <span className="require">* </span>} PK Items
      </div>
    ),
    dataIndex: "item_no_name",
    key: "item_no_name",
    align: "left",
    ellipsis: true,
    render: (value, record, index) => {
      return <Text className="text-value text-left">{value ?? "-"}</Text>;
    },
  },
  {
    id: 3,
    title: <div className="text-center">On Hand Qty.</div>,
    dataIndex: "mrp_detail_qty_available",
    key: "mrp_detail_qty_available",
    align: "right",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return warningTextValue(
        value,
        4,
        record.mrp_detail_qty_pr && value < record.mrp_detail_qty_issue
          ? true
          : false
      );
    },
  },
  {
    id: 4,
    title: <div className="text-center">Qty. To Issue</div>,
    dataIndex: "mrp_detail_qty_issue",
    key: "mrp_detail_qty_issue",
    align: "right",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return (
        <Text className="text-value text-right">
          {convertDigit(value, 4) ?? "-"}
        </Text>
      );
    },
  },

  {
    id: 5,
    title: <div className="text-center">UoM (Stock)</div>,
    dataIndex: "uom_name",
    key: "uom_name",
    align: "center",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  {
    id: 6,
    title: <div className="text-center">MOQ</div>,
    dataIndex: "mrp_detail_qty_pr",
    key: "mrp_detail_qty_pr",
    require: true,
    align: "right",
    width: "15%",
    render: (value, record, index) => {
      if (readOnly) {
        return (
          <Text className="text-value text-right">
            {convertDigit(value, 4) ?? "-"}
          </Text>
        );
      } else {
        return (
          <InputNumber
            disabled={record.item_id !== null ? 0 : 1}
            {...numberFormat}
            placeholder={"Qty. to PR"}
            min={0}
            step={record.item_vendor_min_qty}
            className="full-width"
            name="mrp_detail_qty_pr"
            value={value}
            onChange={(data) =>
              onChange(record.id, { mrp_detail_qty_pr: data })
            }
            size="small"
          />
        );
      }
    },
  },
  {
    id: 7,
    title: <div className="text-center">UoM (Vendor)</div>,
    dataIndex: "item_vendor_uom_name",
    key: "item_vendor_uom_name",
    align: "center",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  {
    title: <div className="text-center">Lead-Time(days)</div>,
    align: "center",
    width: "12%",
    render: (value, record, index) => {
      return (
        record.mrp_detail_lead_time_day_pr + record.mrp_detail_lead_time_day_qa
      );
    },
  },
];

export const mrpRMDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
  mrp_detail_lead_time_day_qa: 0,
  mrp_detail_lead_time_day_pr: 0,
};

export const mrpPKDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
  mrp_detail_lead_time_day_qa: 0,
  mrp_detail_lead_time_day_pr: 0,
};
