import React from "react";
import { Button, DatePicker, InputNumber, message, Table } from "antd";
import CustomTable from "../../../components/CustomTable";
import moment from "moment";
import { convertDigit, getNumberFormat } from "../../../include/js/main_config";
import CustomSelect from "../../../components/CustomSelect";
import { FormOutlined, RollbackOutlined } from "@ant-design/icons";
const TablePODetail = (props) => {
  const {
    po_detail,
    onUseMOQ,
    onUseDefault,
    onChangeRemark,
    onChangeValue,
    uomList,
    getUOMLoading,
    readOnly,
  } = props || {};

  const expandedRowRender = (row) => {
    return (
      <CustomTable
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        loading={false}
        columns={poSubDetailColumns()}
        dataSource={row?.po_detail_sub}
      />
    );
  };
  console.log("TableDetail", po_detail);
  return (
    <>
      <Table
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        loading={false}
        columns={poDetailColumns({
          readOnly,
          onUseMOQ,
          uomList,
          getUOMLoading,
          onUseDefault,
          onChangeRemark,
          onChangeValue,
        })}
        dataSource={po_detail}
        expandable={{ expandedRowRender }}
      />
    </>
  );
};

export default React.memo(TablePODetail);

const poDetailColumns = ({
  readOnly,
  onUseMOQ,
  uomList,
  getUOMLoading,
  onUseDefault,
  onChangeRemark,
  onChangeValue,
}) => [
  {
    title: (
      <div className="text-center">
        <b>Item Code / Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    ellipsis: true,
    render: (val, { id, pr_detail_id }) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Total Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "13%",
    dataIndex: "po_detail_qty",
    render: (val, { id, po_detail_price }) =>
      readOnly ? (
        convertDigit(val, 6) || "-"
      ) : (
        <>
          <InputNumber
            {...{
              ...getNumberFormat(6),
              placeholder: "Total Qty.",
              size: "small",
              className: "w-100",
              min: 0,
              disabled: false,
              value: val || 0,
              onChange: (value) =>
                onChangeValue(id, {
                  po_detail_qty: value,
                  po_detail_total_price: value * po_detail_price,
                }),
            }}
          />
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>MOQ</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "11%",
    dataIndex: "po_detail_vendor_moq",
    render: (val, { id, po_detail_qty }) =>
      // readOnly ? (
      convertDigit(val, 6) || "-",
    // ) : (
    //   <Button
    //     type="link"
    //     className="w-100 text-right"
    //     size="small"
    //     onClick={() =>
    //       val !== po_detail_qty
    //         ? onUseMOQ(id, val)
    //         : message.info("จำนวนถูกแก้ไขตาม MOQ แล้ว")
    //     }
    //   >
    //     {val == po_detail_qty && (
    //       <RollbackOutlined
    //         className="button-icon"
    //         onClick={() => onUseDefault(id)}
    //       />
    //     )}
    //     {convertDigit(val, 6)}
    //   </Button>
    // ),
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "8%",
    dataIndex: "uom_no",
    render: (val, { id, uom_id }) =>
      readOnly ? (
        val || "-"
      ) : (
        <>
          <CustomSelect
            {...{
              placeholder: "UOM",
              size: "small",
              className: "w-100",
              field_id: "uom_id",
              field_name: "uom_no",
              allowClear: true,
              showSearch: true,
              // disabled: getUOMLoading,
              disabled: true,
              data: uomList?.length ? uomList[0] : [],
              value: uom_id,
              onChange: (value, obj) =>
                onChangeValue(id, {
                  uom_id: value,
                  uom_no: obj?.data?.uom_no,
                }),
            }}
          />
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>Unit Price</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "po_detail_price",
    render: (val, { id, po_detail_qty }) =>
      readOnly ? (
        convertDigit(val, 2) || "-"
      ) : (
        <>
          <InputNumber
            {...{
              ...getNumberFormat(2),
              placeholder: "Unit Price",
              size: "small",
              className: "w-100",
              min: 0,
              disabled: false,
              value: val || 0,
              onChange: (value) =>
                onChangeValue(id, {
                  po_detail_price: value,
                  po_detail_total_price: po_detail_qty * value,
                }),
            }}
          />
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>Total Price</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "po_detail_total_price",
    render: (val) => convertDigit(val, 2) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Discount</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "po_detail_discount",
    render: (val, { id }) =>
      readOnly ? (
        convertDigit(val, 2) || "-"
      ) : (
        <>
          <InputNumber
            {...{
              ...getNumberFormat(2),
              placeholder: "Discount",
              size: "small",
              className: "w-100",
              min: 0,
              disabled: false,
              value: val || 0,
              onChange: (value) =>
                onChangeValue(id, {
                  po_detail_discount: value,
                }),
            }}
          />
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "12%",
    dataIndex: "po_detail_due_date",
    render: (val, { id }) =>
      readOnly ? (
        val
      ) : (
        <>
          <DatePicker
            {...{
              placeholoder: "Due Date",
              size: "small",
              className: "w-100",
              format: "DD/MM/YYYY",
              value: val ? moment(val, "DD/MM/YYYY") : null,
              onChange: (value) =>
                onChangeValue(id, {
                  po_detail_due_date: value
                    ? moment(value).format("DD/MM/YYYY")
                    : null,
                }),
            }}
          />
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>Remark</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "6%",
    dataIndex: "po_detail_remark",
    render: (val, { id }) =>
      readOnly ? (
        val
      ) : (
        <>
          <FormOutlined
            className="button-icon"
            onClick={() => onChangeRemark(id, val)}
          />
        </>
      ),
  },
];
const poSubDetailColumns = () => [
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
    render: (val, row, index) => index + 1,
  },

  {
    title: (
      <div className="text-center">
        <b>PR No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "13%",
    dataIndex: "pr_no",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Qty.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "13%",
    dataIndex: "po_detail_qty",
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
    width: "8%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Unit Price</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "12%",
    dataIndex: "po_detail_price",
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Total Price</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "12%",
    dataIndex: "po_detail_total_price",
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "12%",
    dataIndex: "po_detail_due_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "pr_description",
    render: (val) => val || "-",
  },
];
