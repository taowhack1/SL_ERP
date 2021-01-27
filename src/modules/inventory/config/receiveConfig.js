import {
  DeleteTwoTone,
  EllipsisOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomSelect from "../../../components/CustomSelect";
import { getSelfStepStatus } from "../../../include/js/function_main";
import { convertDigit } from "../../../include/js/main_config";

export const receive_columns = [
  {
    title: "Receive No.",
    dataIndex: "receive_no",
    key: "receive_no",
    width: "10%",
    align: "left",
    sorter: {
      compare: (a, b) => a.receive_id - b.receive_id,
      multiple: 3,
    },
  },
  {
    title: "PO Ref.",
    dataIndex: "po_no",
    key: "po_no",
    width: "10%",
    align: "left",
    sorter: {
      compare: (a, b) => a.po_id - b.po_id,
      multiple: 3,
    },
  },
  {
    title: "Order Date",
    dataIndex: "receive_order_date",
    key: "receive_order_date",
    width: "7%",
    align: "center",
  },
  {
    title: "Receive Date",
    dataIndex: "tg_receive_date",
    key: "tg_receive_date",
    width: "7%",
    align: "center",
  },
  {
    title: "Vendor",
    dataIndex: "vendor_no_name",
    key: "vendor_no_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "receive_description",
    key: "receive_description",
    width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Receive By",
    dataIndex: "receive_created_by_no_name",
    key: "receive_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Total Value",
    dataIndex: "tg_receive_total_amount",
    key: "tg_receive_total_amount",
    width: "10%",
    align: "right",
    ellipsis: true,
    sorter: {
      compare: (a, b) => a.tg_receive_total_amount - b.tg_receive_total_amount,
      multiple: 3,
    },
    render: (value) => convertDigit(value),
  },

  {
    title: "Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "8%",
    align: "center",
    ellipsis: true,
    sorter: {
      compare: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
      multiple: 3,
    },
    ellipsis: true,
    render: (value, record, index) => {
      return getSelfStepStatus(record);
    },
  },
];
export const recieve_detail_columns = [
  { id: 0, name: "Item", size: 6, require: true },
  { id: 1, name: "Qty.( PO )", size: 3, require: true },
  { id: 2, name: "Qty. Balance", size: 3 },
  { id: 3, name: "Qty. Done", size: 3, require: true },
  { id: 4, name: "Unit", size: 2, require: true },
  { id: 5, name: "Unit Price", size: 3, require: true },
  { id: 6, name: "Due Date", size: 3 },
];

export const receiveDetailColumns = ({
  readOnly,
  onChange,
  itemList,
  onDelete,
}) => [
  {
    title: "No.",
    render: (_, record) => <Text className="text-value">{record.id}</Text>,
    width: "5%",
    align: "center",
  },
  {
    title: <Text strong>{"Item"}</Text>,
    align: "center",
    dataIndex: "item_no_name",
    render: (value, record) =>
      readOnly ? (
        <CustomSelect
          allowClear
          showSearch
          size="small"
          placeholder={"Item"}
          data={itemList}
          field_id="item_id"
          field_name="item_no_name"
          value={value}
          onChange={(data, option) =>
            data && data
              ? onChange(record.id, {
                  item_id: data,
                  uom_id: option.data.uom_id,
                  item_no_name: option.title,
                  uom_no: option.data.uom_no,
                })
              : onChange(record.id, {
                  item_id: null,
                  uom_id: null,
                  item_no_name: null,
                  uom_no: null,
                })
          }
        />
      ) : (
        <Text className="text-value">{value}</Text>
      ),
  },
  {
    title: "Qty.( PO )",
    align: "right",
    dataIndex: "tg_receive_detail_qty",
    width: "10%",
    render: (value) => (
      <Text className="text-value">{convertDigit(value)}</Text>
    ),
  },
  {
    title: "Qty.Balance",
    align: "right",
    dataIndex: "tg_receive_detail_qty",
    width: "10%",
    render: (value) => (
      <Text className="text-value">{convertDigit(value)}</Text>
    ),
  },
  {
    title: "Qty.Done",
    align: "right",
    dataIndex: "receive_detail_price",
    width: "10%",
    render: (value) => (
      <Text className="text-value">{convertDigit(value)}</Text>
    ),
  },
  {
    title: "Unit Price",
    align: "right",
    dataIndex: "receive_detail_price",
    width: "10%",
    render: (value) => (
      <Text className="text-value">{convertDigit(value)}</Text>
    ),
  },
  {
    title: "Due Date",
    align: "center",
    dataIndex: "receive_detail_due_date",
    width: "10%",
    render: (value) => <Text className="text-value">{value}</Text>,
  },
  {
    title: "UoM",
    align: "left",
    dataIndex: "uom_no",
    width: "10%",
    render: (value) => <Text className="text-value">{value}</Text>,
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (_, record) => {
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

export const receive_sub_detail_columns = [
  { id: 1, name: "Destination Location", size: 5, require: true },
  { id: 2, name: "Lot No.", size: 4, require: false },
  { id: 3, name: "Receive Date", size: 3, require: true },
  { id: 4, name: "MFG Date", size: 3, require: false },
  { id: 5, name: "EXP Date", size: 3, require: false },
  { id: 6, name: "Quantity Done", size: 3, require: true },
  { id: 7, name: "Unit", size: 2, require: true },
];

export const receive_fields = {
  receive_id: null,
  receive_no: null,
  receive_no_description: null,
  receive_order_date: null,
  receive_description: "",
  receive_agreement: null,
  receive_invoice_no: null,
  receive_invoice_date: null,
  receive_remark: null,
  receive_lock: 0,
  receive_actived: 1,
  receive_created: null,
  receive_created_by: null,
  receive_updated: null,
  receive_updated_by: null,
  po_id: null,
  po_no_description: null,
  branch_id: 1,
  branch_name: null,
  cost_center_id: null,
  payment_term_id: null,
  vendor_id: null,
  vat_id: 1,
  vat_rate: 0.07,
  currency_id: 1,
  currency_no: null,
  process_id: null,
  tg_receive_date: null,
  tg_receive_amount: 0,
  tg_receive_discount: 0,
  tg_receive_sum_amount: 0,
  tg_receive_vat_amount: 0,
  tg_receive_total_amount: 0,
  tg_trans_status_id: 1,
  tg_trans_close_id: null,
  commit: 1,
  receive_detail: [],
};

export const receive_detail_fields = {
  receive_id: null,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_no: null,
  tg_receive_detail_id: null,
  tg_receive_detail_qty_balance: 0,
  tg_receive_detail_qty: 0,
  receive_detail_price: 0,
  receive_detail_discount: 0,
  receive_detail_total_price: 0,
  receive_detail_remark: null,
  receive_detail_due_date: null,
  receive_sub_detail: [],
  commit: 1,
};

export const receive_sub_detail_fields = {
  receive_detail_sub_id: null,
  receive_detail_sub_lot_no: null,
  receive_detail_sub_receive_date: null,
  receive_detail_sub_mfg_date: null,
  receive_detail_sub_exp_date: null,
  receive_detail_sub_qty: null,
  receive_detail_sub_remark: null,
  shelf_id: null,
  shelf_no: null,
  shelf_name: null,
  shelf_no_name: null,
  receive_detail_id: null,
  receive_id: null,
  receive_no: null,
  receive_description: null,
  receive_no_description: null,
  item_no: null,
  item_name: null,
  item_no_name: null,
  uom_no: null,
  uom_name: null,
  uom_no_name: null,
  commit: 1,
};

export const receive_require_fields = ["receive_description", "po_id"];
// export const receive_detail_require_fields = ["item_id"];
export const receive_sub_detail_require_fields = [
  "location_id",
  "receive_detail_sub_receive_date",
  // "receive_detail_sub_mfg_date",
  // "receive_detail_sub_exp_date",
  "receive_detail_sub_qty",
];
