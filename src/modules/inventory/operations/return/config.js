import React from "react";
import { getSelfStepStatus } from "../../../../include/js/function_main";
import CustomColumnTitle from "../../../../components/CustomColumnTitle";
import moment from "moment";
import Text from "antd/lib/typography/Text";
import { InputNumber } from "antd";
import { convertDigit, numberFormat } from "../../../../include/js/main_config";
const dateNow = moment().format("DD/MM/YYYY");
export const returnListColumns = [
  {
    title: "Return No.",
    dataIndex: "return_no",
    key: "return_no",
    width: "10%",
    align: "center",
    sorter: {
      compare: (a, b) => a.return_id - b.return_id,
      multiple: 3,
    },
  },
  {
    title: "Issue Ref.",
    dataIndex: "issue_no",
    key: "issue_no",
    width: "10%",
    align: "center",
    sorter: {
      compare: (a, b) => a.issue_id - b.issue_id,
      multiple: 3,
    },
    render: (value, record) => value ?? "-",
  },
  {
    title: "Order Date",
    dataIndex: "receive_order_date",
    key: "receive_order_date",
    width: "7%",
    align: "center",
    render: (value, record) => value ?? "-",
  },
  {
    title: "Return Date",
    dataIndex: "return_date",
    key: "return_date",
    width: "7%",
    align: "center",
    render: (value, record) => value ?? "-",
  },
  {
    title: "Description",
    dataIndex: "return_description",
    key: "return_description",
    align: "left",
    ellipsis: true,
    render: (value, record) => value ?? "-",
  },
  {
    title: "Return By",
    dataIndex: "return_created_by_no_name",
    key: "return_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
    render: (value, record) => value ?? "-",
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

export const returnDetailColumns = (
  readOnly,
  onSaveDetail,
  onChange,
  onDelete
) => [
  {
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    ellipsis: true,
    render: (value, record) => {
      return <Text className={readOnly ? "text-value" : ""}>{value + 1}</Text>;
    },
  },
  {
    title: <CustomColumnTitle title="Item" require readOnly={readOnly} />,
    dataIndex: "item_no_name",
    key: "item_no_name",
    align: "left",
    render: (value) => (
      <div className="text-value" title={value}>
        <Text>{value ?? "-"}</Text>
      </div>
    ),
  },
  {
    title: <CustomColumnTitle title="Lot No." readOnly={readOnly} />,
    dataIndex: "stock_lot_no",
    key: "stock_lot_no",
    align: "center",
    width: "15%",
    render: (value) => <Text className="text-value">{value ?? "-"}</Text>,
  },
  {
    title: <CustomColumnTitle title="Batch No." readOnly={readOnly} />,
    dataIndex: "stock_batch",
    key: "stock_batch",
    align: "center",
    width: "15%",
    render: (value) => <Text className="text-value">{value ?? "-"}</Text>,
  },
  {
    title: <CustomColumnTitle title="Distribute Qty." readOnly={readOnly} />,
    dataIndex: "return_detail_qty_balance",
    key: "return_detail_qty_balance",
    align: "right",
    width: "10%",
    render: (value) => (
      <Text className="text-value">{convertDigit(value ?? 0)}</Text>
    ),
  },
  {
    title: (
      <CustomColumnTitle title="Return Qty." require readOnly={readOnly} />
    ),
    dataIndex: "return_detail_qty",
    key: "return_detail_qty",
    align: "right",
    width: "10%",
    render: (value, record) =>
      readOnly ? (
        <Text className="text-value">{convertDigit(value ?? 0)}</Text>
      ) : (
        <InputNumber
          {...numberFormat}
          placeholder={"Return Qty"}
          min={0}
          step={1}
          name="return_detail_qty"
          disabled={record.item_id ? false : true}
          size="small"
          className={"full-width"}
          value={record.return_detail_qty}
          onChange={(data) => {
            onChange(record.id, {
              return_detail_qty: data,
            });
          }}
          onBlur={onSaveDetail}
        />
      ),
  },
  {
    title: "UOM",
    dataIndex: "uom_no",
    key: "uom_no",
    align: "center",
    width: "8%",
    render: (value) => <Text className="text-value">{value ?? "-"}</Text>,
  },
];
export const returnDetailFields = {
  return_detail_id: null,
  return_detail_date: dateNow,
  return_detail_qty_balance: 0,
  return_detail_qty: 0,
  return_detail_remark: null,
  return_id: null,
  disburse_id: null,
  stock_id: null,
  stock_batch_no: null,
  stock_lot_no: null,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_no: null,
  shelf_id: null,
};

export const returnFields = {
  return_id: null,
  return_no: null,
  return_date: dateNow,
  return_description: null,
  return_agreement: null,
  return_remark: null,
  return_lock: null,
  return_actived: null,
  return_created: null,
  return_created_by: null,
  return_updated: dateNow,
  return_updated_by: null,
  branch_id: 1,
  issue_id: null,
  process_id: null,
  tg_trans_status_id: 1,
  return_detail: [],
  commit: 1,
};

export const returnRequireFields = ["return_description", "issue_id"];
