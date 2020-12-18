import { getRefStatus } from "../../../include/js/function_main";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import React from "react";
import CustomSelect from "../../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import { InputNumber, Popconfirm, Switch } from "antd";
import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
export const work_order_columns = [
  {
    title: "WO Code",
    dataIndex: "work_order_no",
    width: "8%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Source",
    dataIndex: "work_order_source",
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
    dataIndex: "work_order_job_name",
    ellipsis: true,
  },

  {
    title: "Plan Start",
    dataIndex: "work_order_plan_date_start",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Plan End",
    dataIndex: "work_order_plan_date_end",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Deadline",
    dataIndex: "work_order_deadline_date",
    width: "8%",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Qty.",
    dataIndex: "work_order_qty",
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
  wo_delivery_date: null,
  wo_description: null,
  wo_agreement: null,
  wo_qty: 0,
  wo_spare_qty: 0,
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
};
export const workOrderRMColumns = (
  readOnly,
  onChange,
  onDelete,
  onToggle,
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
    width: "40%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <CustomSelect
            allowClear
            showSearch
            size={"small"}
            placeholder={"Raw Material Code"}
            name="item_id"
            field_id="item_id"
            field_name="item_no_name"
            value={record.item_no_name}
            data={itemList}
            onChange={(data, option) => {
              data && data
                ? onChange(record.id, {
                    item_id: option.data.item_id,
                    item_no_name: option.data.item_no_name,
                    uom_id: option.data.uom_id,
                    uom_name: option.data.uom_name,
                  })
                : onChange(record.id, {
                    item_id: null,
                    item_no_name: null,
                    uom_id: null,
                    uom_name: null,
                  });
            }}
          />
        );
      }
    },
  },
  {
    id: 3,
    title: <div className="text-center">System Cal. Qty.</div>,
    dataIndex: "item_cal_qty",
    key: "item_cal_qty",
    align: "right",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <Text className="text-value text-right">
            {convertDigit(value) ?? "-"}
          </Text>
        );
      }
    },
  },
  {
    id: 4,
    title: <div className="text-center">Stock Qty.</div>,
    dataIndex: "item_on_stock_qty",
    key: "item_on_stock_qty",
    align: "right",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <Text className="text-value text-right">
            {convertDigit(value) ?? "-"}
          </Text>
        );
      }
    },
  },
  {
    id: 5,
    title: <div className="text-center">Qty. To PR</div>,
    dataIndex: "item_qty",
    key: "item_qty",
    require: true,
    align: "right",
    width: "10%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <InputNumber
            {...numberFormat}
            placeholder={"Qty. to PR"}
            min={0.0}
            step={0.001}
            style={{ width: "100%" }}
            disabled={0}
            name="item_qty"
            value={value}
            onChange={(data) => onChange(record.id, { item_qty: data })}
            size="small"
          />
        );
      }
    },
  },
  {
    id: 6,
    title: <div className="text-center">Unit</div>,
    dataIndex: "uom_name",
    key: "uom_name",
    align: "center",
    require: true,
    width: "10%",
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  !readOnly && {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return (
          <Popconfirm
            onConfirm={() => {
              onDelete(record.id);
            }}
            title="Are you sure you want to delete this row？"
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      }
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
};

export const workOrderPKColumns = [
  {
    id: 1,
    name: "No.",
    size: 1,
    require: false,
  },
  {
    id: 2,
    name: "PK Item",
    size: 11,
    require: true,
  },
  {
    id: 3,
    name: "System Cal. Qty.",
    size: 3,
    require: true,
  },
  {
    id: 4,
    name: "Stock Qty.",
    size: 3,
    require: true,
  },
  {
    id: 5,
    name: "Qty. To PR",
    size: 3,
    require: true,
  },

  {
    id: 6,
    name: "Unit",
    size: 2,
    require: true,
  },
];

export const workOrderPKDetailFields = {
  id: 0,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_name: null,
  item_qty: 0,
  item_cal_qty: 0,
  item_on_stock_qty: 0,
};
