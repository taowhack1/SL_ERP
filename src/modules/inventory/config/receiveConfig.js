/** @format */

import {
  DeleteOutlined,
  DeleteTwoTone,
  EllipsisOutlined,
  FormOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  DatePicker,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomSelect from "../../../components/CustomSelect";
import { getSelfStepStatus } from "../../../include/js/function_main";
import {
  convertDigit,
  getNumberFormat,
  numberFormat,
} from "../../../include/js/main_config";
import $ from "jquery";
import moment from "moment";
export const receive_columns = [
  {
    title: "Receive No.",
    dataIndex: "receive_no",
    key: "receive_no",
    width: "10%",
    align: "center",
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
    align: "center",
    sorter: {
      compare: (a, b) => a.po_id - b.po_id,
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
    title: "Receive Date",
    dataIndex: "tg_receive_date",
    key: "tg_receive_date",
    width: "7%",
    align: "center",
    render: (value, record) => value ?? "-",
  },
  {
    title: "Vendor",
    dataIndex: "vendor_no_name",
    key: "vendor_no_name",
    width: "20%",
    align: "left",
    ellipsis: true,
    render: (value, record) => value ?? "-",
  },
  {
    title: "Description",
    dataIndex: "receive_description",
    key: "receive_description",
    // width: "15%",
    align: "left",
    ellipsis: true,
    render: (value, record) => value ?? "-",
  },
  {
    title: "Receive By",
    dataIndex: "receive_created_by_no_name",
    key: "receive_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
    render: (value, record) => value ?? "-",
  },
  // {
  //   title: "Total Value",
  //   dataIndex: "tg_receive_total_amount",
  //   key: "tg_receive_total_amount",
  //   width: "10%",
  //   align: "right",
  //   ellipsis: true,
  //   sorter: {
  //     compare: (a, b) => a.tg_receive_total_amount - b.tg_receive_total_amount,
  //     multiple: 3,
  //   },
  //   render: (value) => convertDigit(value),
  // },
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

export const receiveDetailColumns = (
  readOnly,
  onChange,
  itemList,
  onDelete,
  onOpenDetail
) => [
  {
    title: "No.",
    render: (_, record) => <Text className="text-value">{record.id + 1}</Text>,
    width: "5%",
    align: "center",
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Item"}</Text>
      </div>
    ),
    align: "left",
    ellipsis: true,
    dataIndex: "item_no_name",
    render: (value, record) => (
      <div className="text-value" title={value}>
        <Text>{value ?? "-"}</Text>
      </div>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Qty.( PO )"}</Text>
      </div>
    ),
    align: "right",
    dataIndex: "po_detail_qty",
    width: "10%",
    ellipsis: true,
    render: (value) => (
      <Text className="text-value">{value ? convertDigit(value, 4) : "-"}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Qty.Balance"}</Text>
      </div>
    ),
    align: "right",
    dataIndex: "tg_receive_detail_qty_balance",
    width: "10%",
    ellipsis: true,
    render: (value) => (
      <Text className="text-value">{value ? convertDigit(value, 4) : "-"}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        {!readOnly && <span className="require">{"* "}</span>}
        <Text strong>{"Qty.Done"}</Text>
      </div>
    ),
    align: "right",
    dataIndex: "tg_receive_detail_qty",
    width: "10%",
    ellipsis: true,
    render: (value, record) => (
      <div
        className={
          record.tg_receive_detail_qty_balance > 0
            ? "total-number-modal text-value"
            : "total-number text-value"
        }
      >
        <Text className="text-value">
          {value ? convertDigit(value, 4) : "-"}
        </Text>
      </div>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Unit Price"}</Text>
      </div>
    ),
    align: "right",
    dataIndex: "receive_detail_price",
    width: "10%",
    ellipsis: true,
    render: (value) => (
      <Text className="text-value">{convertDigit(value, 4) ?? 0}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Due Date"}</Text>
      </div>
    ),
    align: "center",
    dataIndex: "receive_detail_due_date",
    width: "10%",
    ellipsis: true,
    render: (value) => <Text className="text-value">{value ?? "-"}</Text>,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"UOM"}</Text>
      </div>
    ),
    align: "center",
    dataIndex: "uom_no",
    ellipsis: true,
    width: "7%",
    render: (value) => <Text className="text-value">{value ?? "-"}</Text>,
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
        return (
          <InfoCircleOutlined
            onClick={() => {
              onOpenDetail(record);
            }}
            className="button-icon"
          />
        );
      } else {
        return (
          record.tg_receive_detail_qty_balance_temp > 0 && (
            <FormOutlined
              onClick={() => {
                onOpenDetail(record);
              }}
              className="button-icon"
            />
          )
        );
      }
    },
  },
];
export const receiveDetailWithNoPOColumns = (
  readOnly,
  onChange,
  itemList,
  onDelete,
  onOpenDetail
) => [
  {
    title: "No.",
    render: (_, record) => <Text className="text-value">{record.id + 1}</Text>,
    width: "5%",
    align: "center",
  },
  {
    title: (
      <div className="text-center">
        <Text strong>
          {!readOnly && <span className="require">{"* "}</span>}
          {"Item"}
        </Text>
      </div>
    ),
    align: "left",
    ellipsis: true,
    dataIndex: "item_no_name",
    render: (value, record) =>
      !readOnly ? (
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
            data !== undefined
              ? onChange(record.id, {
                  item_id: data,
                  uom_id: option.data.uom_id,
                  item_no_name: option.title,
                  uom_no: option.data.uom_no,
                  shelf_id: option.data.shelf_id,
                  location_id: option.data.location_id,
                  location_no_name: option.data.location_no_name,
                  item_shelf_life: option.data.item_shelf_life,
                  type_id: option.data.type_id,
                })
              : onChange(record.id, {
                  item_id: null,
                  uom_id: null,
                  item_no_name: null,
                  uom_no: null,
                  shelf_id: null,
                  location_id: null,
                  location_no_name: null,
                  item_shelf_life: null,
                  type_id: null,
                  so_id: null,
                })
          }
        />
      ) : (
        <div className="text-value" title={value}>
          <Text>{value || "-"}</Text>
        </div>
      ),
  },
  {
    title: (
      <div className="text-center">
        {!readOnly && <span className="require">{"* "}</span>}
        <Text strong>{"Qty.Done"}</Text>
      </div>
    ),
    align: "right",
    dataIndex: "tg_receive_detail_qty",
    width: "12%",
    ellipsis: true,
    render: (value, record) =>
      readOnly ? (
        <Text className="text-value">{convertDigit(value || 0, 4)}</Text>
      ) : (
        <div
          className={
            record.item_id
              ? "total-number-modal text-value"
              : "total-number text-value"
          }
          title="Click edit icon to fullfill"
          onClick={() => message.warning("Click edit icon to fullfill", 3)}
        >
          <Text className="text-value">{convertDigit(value, 4)}</Text>
        </div>
      ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>
          {!readOnly && <span className="require">{"* "}</span>}
          {"Unit Price"}
        </Text>
      </div>
    ),
    align: "right",
    dataIndex: "receive_detail_price",
    width: "12%",
    ellipsis: true,
    render: (value, record, key) =>
      readOnly ? (
        <Text className="text-value">{convertDigit(value, 4)}</Text>
      ) : record.item_id ? (
        <InputNumber
          {...getNumberFormat(4)}
          placeholder={"Item Price"}
          min={0}
          step={1}
          disabled={record.item_id ? 0 : 1}
          size="small"
          className={"full-width check-field"}
          name={`receive_detail_price-${key}`}
          value={value}
          onChange={(data) => {
            onChange(record.id, {
              receive_detail_price: data,
            });
          }}
        />
      ) : (
        <div
          className={"total-number text-value"}
          title="Please select item"
          onClick={() => message.warning("Please select item", 3)}
        >
          <Text className="text-value">{convertDigit(value, 4)}</Text>
        </div>
      ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"UOM"}</Text>
      </div>
    ),
    align: "center",
    dataIndex: "uom_no",
    ellipsis: true,
    width: "10%",
    render: (value) => <Text className="text-value">{value ?? "-"}</Text>,
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "10%",

    render: (_, record) => {
      if (readOnly) {
        return (
          <InfoCircleOutlined
            onClick={() => {
              onOpenDetail(record);
            }}
            className="button-icon"
          />
        );
      } else {
        return (
          <>
            <Space size={24}>
              {record.item_id && (
                <FormOutlined
                  onClick={() => {
                    onOpenDetail(record);
                  }}
                  className="button-icon"
                />
              )}

              <Popconfirm
                onConfirm={() => {
                  onDelete(record.id);
                }}
                title="Are you sure you want to delete this row？"
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined style={{ color: "red" }} />
              </Popconfirm>
            </Space>
          </>
        );
      }
    },
  },
];

export const receiveSubDetailColumns = (
  readOnly,
  onChange,
  locationList,
  onDelete,
  AlertShelfLift
) => [
  {
    title: "No.",
    render: (_, record) => <Text className="text-value">{record.id + 1}</Text>,
    width: "5%",
    align: "center",
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Receive To"}</Text>
      </div>
    ),
    align: "left",
    dataIndex: "location_no_name",
    // width: "10%",
    ellipsis: true,
    render: (value) => <Text className="text-value">{value ?? "-"}</Text>,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"Lot No."}</Text>
      </div>
    ),
    align: "left",
    dataIndex: "receive_detail_sub_lot_no",
    // width: "10%",
    ellipsis: true,
    render: (value, record) =>
      readOnly ? (
        <Text className="text-value">{value ?? "-"}</Text>
      ) : (
        <Input
          placeholder="Lot No."
          size="small"
          value={value}
          onChange={(e) => {
            onChange(record.id, {
              receive_detail_sub_lot_no: e.target.value,
            });
          }}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        {!readOnly && <span className="require">{"* "}</span>}
        <Text strong>{"Receive Date"}</Text>
      </div>
    ),
    align: "center",
    dataIndex: "receive_detail_sub_receive_date",
    width: "12%",
    ellipsis: true,
    render: (value, record, key) =>
      readOnly ? (
        <Text className="text-value">{value ?? "-"}</Text>
      ) : (
        <DatePicker
          format={"DD/MM/YYYY"}
          size="small"
          className={"full-width check-field"}
          name={`receive_detail_sub_receive_date-${key}`}
          placeholder="Receive Date"
          value={value ? moment(value, "DD/MM/YYYY") : null}
          onChange={(data) => {
            data
              ? onChange(record.id, {
                  receive_detail_sub_receive_date: data.format("DD/MM/YYYY"),
                })
              : onChange(record.id, {
                  receive_detail_sub_receive_date: null,
                });
          }}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"MFG Date"}</Text>
      </div>
    ),
    align: "center",
    dataIndex: "receive_detail_sub_mfg_date",
    width: "12%",
    ellipsis: true,
    render: (value, record) =>
      readOnly ? (
        <Text className="text-value">{value ?? "-"}</Text>
      ) : (
        <DatePicker
          name={"receive_detail_sub_mfg_date"}
          format={"DD/MM/YYYY"}
          size="small"
          className={"full-width"}
          placeholder="MFG Date"
          value={value ? moment(value, "DD/MM/YYYY") : null}
          onChange={(data, mfg_date) => {
            if (
              record.item_shelf_life == 0 ||
              record.item_shelf_life == "null"
            ) {
              message.warning({
                content: "Shelf life undefined please check and try again",
                key: "warning",
                duration: 5,
              });
              data
                ? onChange(record.id, {
                    receive_detail_sub_mfg_date: data.format("DD/MM/YYYY"),
                  })
                : onChange(record.id, {
                    receive_detail_sub_mfg_date: null,
                  });
            } else {
              data
                ? onChange(
                    record.id,
                    {
                      receive_detail_sub_mfg_date: data.format("DD/MM/YYYY"),
                      receive_detail_sub_exp_date: data
                        .add(record.item_shelf_life, "days")
                        .format("DD/MM/YYYY"),
                    },
                    AlertShelfLift(record, mfg_date)
                  )
                : onChange(record.id, {
                    receive_detail_sub_mfg_date: null,
                    receive_detail_sub_exp_date: null,
                  });
            }
          }}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"EXP Date"}</Text>
      </div>
    ),
    align: "center",
    dataIndex: "receive_detail_sub_exp_date",
    width: "12%",
    ellipsis: true,
    render: (value, record, key) => {
      console.log("new record", record);
      if (readOnly) {
        return <Text className="text-value">{value ?? "-"}</Text>;
      } else {
        if (record.receive_detail_sub_mfg_date != null) {
          // const dateMFGinFN = moment(
          //   record.receive_detail_sub_mfg_date,
          //   "DD/MM/YYYY"
          // );
          // const dateRecevie = moment(
          //   record.receive_detail_sub_receive_date,
          //   "DD/MM/YYYY"
          // );
          // const dateDif = dateRecevie.diff(dateMFGinFN, "days");
          // const HalfLife = record.item_shelf_life / 2;
          // const calcula = record.item_shelf_life - dateDif;
          // if (calcula >= HalfLife) {
          //   return <Text className='text-value'>{value ?? "-"}</Text>;
          // } else {
          //   return (
          //     <Text className='text-value' style={{ color: "red" }}>
          //       {value}
          //     </Text>
          //   );
          // }
          return (
            <DatePicker
              format={"DD/MM/YYYY"}
              size="small"
              className={"full-width check-field"}
              name={`receive_detail_sub_exp_date-${key}`}
              placeholder="EXP Date"
              value={value ? moment(value, "DD/MM/YYYY") : null}
              onChange={(data) => {
                data
                  ? onChange(record.id, {
                      receive_detail_sub_exp_date: data.format("DD/MM/YYYY"),
                    })
                  : onChange(record.id, {
                      receive_detail_sub_exp_date: null,
                    });
              }}
            />
          );
        }
      }
    },
  },
  {
    title: (
      <div className="text-center">
        {!readOnly && <span className="require">{"* "}</span>}
        <Text strong>{"Qty. Done"}</Text>
      </div>
    ),
    align: "right",
    dataIndex: "receive_detail_sub_qty",
    width: "12%",
    ellipsis: true,
    render: (value, record, key) =>
      readOnly ? (
        <Text className="text-value">{convertDigit(value, 4)}</Text>
      ) : (
        <InputNumber
          {...getNumberFormat(4)}
          placeholder={"Qty Done"}
          min={0.0}
          step={0.001}
          size="small"
          className={"full-width check-field"}
          name={`receive_detail_sub_qty-${key}`}
          // className={value ? "full-width" : "full-width input-require"}
          disabled={0}
          value={value}
          onChange={(data) => {
            onChange(record.id, {
              receive_detail_sub_qty: data,
            });
          }}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>{"UOM"}</Text>
      </div>
    ),
    align: "center",
    dataIndex: "uom_no",
    ellipsis: true,
    width: "7%",
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
  vendor_id: null,
  vendor_no_name: null,
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
  so_id: null,
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
  receive_detail_sub_qty: 0,
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

export const receive_require_fields = ["receive_description"];
// export const receive_detail_require_fields = ["item_id"];
export const receive_sub_detail_require_fields = [
  "location_id",
  "receive_detail_sub_receive_date",
  // "receive_detail_sub_mfg_date",
  // "receive_detail_sub_exp_date",
  "receive_detail_sub_qty",
];
