import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, DatePicker, InputNumber, message, Table } from "antd";
import moment from "moment";
import { convertDigit, getNumberFormat } from "../../../include/js/main_config";
import CustomSelect from "../../../components/CustomSelect";
import {
  DeleteOutlined,
  EllipsisOutlined,
  FormOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useFetch } from "../../../include/js/customHooks";
const apiGetItemList = `/list/item/select`;
const TablePOExtendedDetail = (props) => {
  const {
    po_detail,
    onUseMOQ,
    onUseDefault,
    onChangeRemark,
    onChangeValue,
    uomList,
    getUOMLoading,
    readOnly,
    onAddItem,
    onRemoveRow,
  } = props || {};

  const { data: items, loading: getItemsLoading } = useFetch(apiGetItemList);
  //   const [state, setState] = useState([]);
  //   useEffect(() => {
  //     setState(po_detail?.filter((obj) => !obj?.pr_detail_id));
  //   }, [po_detail]);
  console.log("TableExtend", readOnly, po_detail);
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
          items,
          getItemsLoading,
          onRemoveRow,
        })}
        dataSource={po_detail}
        footer={
          !readOnly
            ? () => (
                <>
                  <Button
                    type="dashed"
                    onClick={() => {
                      onAddItem();
                    }}
                    block
                  >
                    <PlusOutlined /> Add a line
                  </Button>
                </>
              )
            : null
        }
      />
    </>
  );
};

export default React.memo(TablePOExtendedDetail);

const poDetailColumns = ({
  readOnly,
  onUseMOQ,
  uomList,
  getUOMLoading,
  onUseDefault,
  onChangeRemark,
  onChangeValue,
  items,
  getItemsLoading,
  onRemoveRow,
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
    render: (val, { id, item_id }) =>
      readOnly ? (
        val || "-"
      ) : (
        <>
          <CustomSelect
            {...{
              placeholder: "Item Code / Description",
              size: "small",
              className: "w-100",
              field_id: "item_id",
              field_name: "item_no_name",
              allowClear: true,
              showSearch: true,
              disabled: getItemsLoading,
              data: (items && items) || [],
              value: item_id,
              onChange: (val, obj) =>
                val
                  ? onChangeValue(id, {
                      item_id: val,
                      item_no_name: obj?.data?.item_no_name,
                      uom_id: obj?.data?.uom_id,
                      uom_no: obj?.data?.uom_no,
                    })
                  : onChangeValue(id, {
                      item_id: null,
                      item_no_name: null,
                      uom_id: null,
                      uom_no: null,
                    }),
            }}
          />
        </>
      ),
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
              onChange: (val) =>
                onChangeValue(id, {
                  po_detail_qty: val,
                  po_detail_total_price: val * po_detail_price,
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
              onChange: (val, obj) =>
                val
                  ? onChangeValue(id, {
                      uom_id: val,
                      uom_no: obj?.data?.uom_no,
                    })
                  : onChangeValue(id, {
                      uom_id: null,
                      uom_no: null,
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
              onChange: (val) =>
                onChangeValue(id, {
                  po_detail_price: val,
                  po_detail_total_price: val * po_detail_qty,
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
              onChange: (val) =>
                onChangeValue(id, {
                  po_detail_discount: val,
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
              onChange: (val) =>
                onChangeValue(id, {
                  po_detail_due_date: val
                    ? moment(val).format("DD/MM/YYYY")
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
  !readOnly && {
    title: (
      <div className="text-center">
        <b>
          <EllipsisOutlined />
        </b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (val) => (
      <DeleteOutlined
        className="button-icon"
        onClick={() => onRemoveRow(val)}
      />
    ),
  },
];
