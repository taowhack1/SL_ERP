/** @format */
import React, { useState } from "react";
import { EditTwoTone } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { getSelfStepStatus } from "../../../include/js/function_main";
import { DatePicker } from "antd";
import moment from "moment";
export const po_require_fields = [
  "pr_id",
  "vendor_id",
  "po_description",
  "branch_id",
  "currency_id",
  "payment_term_id",
];

export const po_require_fields_detail = [
  "item_id",
  "uom_id",
  "po_detail_qty",
  "po_detail_due_date",
  // "po_detail_price",
];

export const po_list_columns = ({
  onOpen,
  refSearchInput,
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
}) => [
  {
    title: "Purchase Order",
    className: "tb-col-sm bg-tb-primary",
    children: [
      {
        title: "No.",
        dataIndex: "id",
        key: 0,
        width: "5%",
        align: "center",
        render: (val) => val + 1,
      },
      {
        title: "PO No",
        dataIndex: "po_no",
        key: 1,
        width: "10%",
        align: "left",
      },
      {
        title: "PO Date",
        dataIndex: "po_created",
        key: 3,
        width: "10%",
        align: "center",
      },
      // {
      //   title: "Due Date",
      //   dataIndex: "tg_po_due_date",
      //   key: 4,
      //   width: "10%",
      //   align: "center",
      // },
      {
        title: "Vendor",
        dataIndex: "vendor_no_name",
        key: 5,
        width: "20%",
        align: "left",
        ellipsis: true,
      },
      {
        title: "Purchase",
        dataIndex: "po_created_by_no_name",
        key: 6,
        width: "15%",
        align: "left",
        ellipsis: true,
      },
      {
        title: "Description",
        dataIndex: "po_description",
        key: 7,
        width: "18%",
        align: "left",
        ellipsis: true,
      },
      {
        title: "Status",
        dataIndex: "trans_status_name",
        key: 8,
        width: "10%",
        align: "center",
        ellipsis: true,
        render: (value, record, index) => {
          return record && getSelfStepStatus(record ? record : []);
          // console.log("PO record", record);
          // return getSelfStepStatus(record);
        },
      },
    ],
  },
];
export const columnsEditDueDate = (onChangeValue) => [
  {
    title: "PR no.",
    dataIndex: "pr_no",
    width: "3%",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Item Name",
    dataIndex: "item_no_name",
    width: "5%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "PR Due Date",
    dataIndex: "pr_detail_due_date",
    width: "3%",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Edit Due Date To",
    dataIndex: "edit_pr_detail_due_date",
    width: "5%",
    align: "center",
    ellipsis: false,
    render: (val, record) => (
      <DatePicker
        format={"DD/MM/YYYY"}
        size='small'
        className={"full-width check-field"}
        name={"edit_pr_detail_due_date"}
        placeholder='Edit Due Date'
        value={val ? moment(val, "DD/MM/YYYY") : null}
        onChange={(data) => {
          data
            ? onChangeValue(record.id, {
                edit_pr_detail_due_date: data.format("DD/MM/YYYY"),
              })
            : onChangeValue(record.id, {
                edit_pr_detail_due_date: null,
              });
        }}
      />
    ),
  },
];
export const mrp_list_detail = ({
  onOpen,
  refSearchInput,
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
  editDueDate,
}) => [
  {
    title: "Detail",
    className: "tb-col-sm bg-tb-primary",
    children: [
      {
        title: "No.",
        dataIndex: "id",
        key: 0,
        width: "2%",
        align: "center",
        render: (val) => val + 1,
      },
      {
        title: "MRP No.",
        dataIndex: "mrp_no",
        key: 4,
        width: "5%",
        align: "center",
      },
      {
        title: "Pr No",
        dataIndex: "pr_no",
        key: 1,
        width: "5%",
        align: "left",
      },
      {
        title: "Pr Due Date",
        dataIndex: "pr_detail_due_date",
        key: 3,
        width: "5%",
        align: "center",
        render: (val, record) => {
          return (
            <>
              <Text style={{ color: "blue", marginRight: 10 }}>{val}</Text>
              <EditTwoTone onClick={(e) => editDueDate(val, record)} />
            </>
          );
        },
      },
      {
        title: "Item",
        dataIndex: "item_no_name",
        key: 5,
        width: "10%",
        align: "left",
        ellipsis: true,
      },
      {
        title: "Pr Qty.",
        dataIndex: "pr_detail_qty",
        key: 6,
        width: "5%",
        align: "right",
        ellipsis: true,
      },
      {
        title: "Unit",
        dataIndex: "uom_no",
        key: 7,
        width: "5%",
        align: "left",
        ellipsis: false,
      },
      {
        title: "Vendor",
        dataIndex: "vendor_name",
        key: 7,
        width: "10%",
        align: "left",
        ellipsis: true,
      },
      // {
      //   title: "Price",
      //   dataIndex: "pr_detail_price",
      //   key: 7,
      //   width: "10%",
      //   align: "left",
      //   ellipsis: true,
      // },
      // {
      //   title: "Discount",
      //   dataIndex: "pr_detail_price",
      //   key: 7,
      //   width: "10%",
      //   align: "left",
      //   ellipsis: true,
      // },
      // {
      //   title: "total",
      //   dataIndex: "pr_detail_price",
      //   key: 7,
      //   width: "10%",
      //   align: "left",
      //   ellipsis: true,
      // },
      // {
      //   title: "Status",
      //   dataIndex: "trans_status_name",
      //   key: 8,
      //   width: "10%",
      //   align: "center",
      //   ellipsis: true,
      //   render: (value, record, index) => {
      //     return record && getSelfStepStatus(record ? record : []);
      //     // console.log("PO record", record);
      //     // return getSelfStepStatus(record);
      //   },
      // },
    ],
  },
];
export const po_fields = {
  po_id: null,
  po_no: null,
  cost_center_id: null,
  po_description: null,
  po_due_date: null,
  po_contact_description: "",
  po_remark: null,
  po_discount: 0,
  po_lock: 0,
  po_actived: 1,
  po_created: null,
  po_created_by: null,
  po_updated: null,
  po_updated_by: null,
  payment_term_id: null,
  branch_id: 1,
  vendor_id: null,
  vat_id: 1,
  currency_id: 1,
  process_id: null,

  tg_trans_status_id: 1,
  tg_po_amount: 0,
  tg_po_discount: 0,
  tg_po_sum_amount: 0,
  tg_po_vat_amount: 0,
  tg_po_total_amount: 0,

  cost_center_no: null,
  cost_center_name: null,
  branch_no_name: null,
  branch_no: null,
  branch_name: null,
  vendor_no: null,
  vendor_name: null,
  vendor_no_name: null,
  vat_no: null,
  vat_name: null,
  vat_no_name: null,
  po_created_by_no_name: null,
  pr_id: null,
  pr_no: null,
  pr_no_description: null,
  commit: 1,
};
export const po_detail_fields = {
  id: 0,
  po_id: null,
  item_id: null,
  uom_id: null,
  po_detail_id: null,
  po_detail_qty: 0,
  po_detail_price: 0,
  po_detail_discount: 0,
  po_detail_discount_pct: 0,
  po_detail_total_price: 0,
  po_detail_remark: null,
  po_detail_actived: 1,
  po_detail_created: null,
  po_detail_created_by: null,
  po_detail_updated: null,
  po_detail_updated_by: null,
  //diff. from pr
  po_detail_qty_remain_tg: 0,
  po_detail_qty_over_tg: 0,
  //show Only
  uom_no: null,
  item_no_name: null,
  commit: 1,
};

export const poItemColumns = [
  {
    id: 0,
    name: "Item",
    size: 6,
    require: true,
  },
  {
    id: 1,
    name: "Quantity",
    size: 3,
    require: true,
  },
  {
    id: 2,
    name: "Unit",
    size: 2,
    require: true,
  },
  {
    id: 3,
    name: "Unit Price",
    size: 3,
    require: true,
  },
  {
    id: 4,
    name: "Discount",
    size: 3,
  },
  {
    id: 5,
    name: "Total Price",
    size: 3,
  },
  {
    id: 6,
    name: "Due Date",
    size: 3,
    require: true,
  },
];
