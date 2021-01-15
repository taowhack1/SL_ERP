import {
  getRefStatus,
  warningTextValue,
} from "../../../include/js/function_main";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import React from "react";

import Text from "antd/lib/typography/Text";
import { InputNumber } from "antd";
import { FileSearchOutlined, SearchOutlined } from "@ant-design/icons";

export const work_order_columns = [
  {
    title: "WO Code",
    dataIndex: "wo_no",
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
    dataIndex: "wo_description",
    ellipsis: true,
  },

  {
    title: "Plan Start",
    dataIndex: "wo_plan_start_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Plan End",
    dataIndex: "wo_plan_end_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Due Date",
    dataIndex: "wo_due_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Qty.",
    dataIndex: "wo_qty_produce",
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
    title: "WO Status",
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
export const workOrderFields = {
  wo_id: null,
  wo_no: null,
  wo_order_date: null,
  wo_plan_start_date: null,
  wo_plan_end_date: null,
  wo_due_date: null,
  wo_description: null,
  wo_agreement: null,
  wo_qty_produce: 0,
  wo_qty_percent_spare_rm: 0,
  wo_qty_percent_spare_pk: 0,
  wo_remark: null,
  wo_lock: null,
  wo_rows: null,
  wo_actived: null,
  wo_created: null,
  wo_created_by: null,
  wo_updated: null,
  wo_updated_by: null,
  so_id: null,
  branch_id: null,
  item_id: null,
  process_id: null,
  tg_trans_status_id: null,
  tg_trans_close_id: null,
  wo_lead_time_day_pk: 0,
  wo_lead_time_day_pk_qa: 0,
  wo_lead_time_day_rm: 0,
  wo_lead_time_day_rm_qa: 0,
};

export const workOrderRequireFields = [
  "wo_description",
  "so_id",
  "item_id",
  "wo_qty_produce",
  "wo_plan_start_date",
];
export const workOrderRMColumns = (
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
    dataIndex: "wo_detail_qty_available",
    key: "wo_detail_qty_available",
    align: "right",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return (
        <>
          {warningTextValue(
            value,
            4,
            record.wo_detail_qty_pr && value < record.wo_detail_qty_issue
              ? true
              : false
          )}
          <FileSearchOutlined
            className="button-icon"
            title="View Detail"
            onClick={viewOnHandDetail}
          />
        </>
      );
    },
  },
  {
    id: 4,
    title: <div className="text-center">Qty. To Issue</div>,
    dataIndex: "wo_detail_qty_issue",
    key: "wo_detail_qty_issue",
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
    title: <div className="text-center">Qty. To PR</div>,
    dataIndex: "wo_detail_qty_pr",
    key: "wo_detail_qty_pr",
    require: true,
    align: "right",
    width: "10%",
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
            name="wo_detail_qty_pr"
            value={value}
            onChange={(data) => onChange(record.id, { wo_detail_qty_pr: data })}
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
    title: <div className="text-center">Lead-Time (days)</div>,
    align: "center",
    width: "15%",
    render: (value, record, index) => {
      return (
        record.wo_detail_lead_time_day_pr + record.wo_detail_lead_time_day_qa
      );
    },
  },
];

export const workOrderPKColumns = (readOnly, onChange, onDelete, onToggle) => [
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
    dataIndex: "wo_detail_qty_available",
    key: "wo_detail_qty_available",
    align: "right",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return warningTextValue(
        value,
        4,
        record.wo_detail_qty_pr && value < record.wo_detail_qty_issue
          ? true
          : false
      );
    },
  },
  {
    id: 4,
    title: <div className="text-center">Qty. To Issue</div>,
    dataIndex: "wo_detail_qty_issue",
    key: "wo_detail_qty_issue",
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
    title: <div className="text-center">Qty. To PR</div>,
    dataIndex: "wo_detail_qty_pr",
    key: "wo_detail_qty_pr",
    require: true,
    align: "right",
    width: "10%",
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
            name="wo_detail_qty_pr"
            value={value}
            onChange={(data) => onChange(record.id, { wo_detail_qty_pr: data })}
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
    title: <div className="text-center">Lead-Time (days)</div>,
    align: "center",
    width: "15%",
    render: (value, record, index) => {
      return (
        record.wo_detail_lead_time_day_pr + record.wo_detail_lead_time_day_qa
      );
    },
  },
];

export const workOrderRMDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
  wo_detail_lead_time_day_qa: 0,
  wo_detail_lead_time_day_pr: 0,
};

export const workOrderPKDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
  wo_detail_lead_time_day_qa: 0,
  wo_detail_lead_time_day_pr: 0,
};
