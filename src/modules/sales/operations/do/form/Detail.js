import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { message, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { getFormDR } from "../../../../../actions/sales/doActions";
import {
  InputField,
  InputNumberField,
  SelectField,
} from "../../../../../components/AntDesignComponent";
import CustomSelect from "../../../../../components/CustomSelect";
import CustomTable from "../../../../../components/CustomTable";
import { AppContext, DOContext } from "../../../../../include/js/context";
import { sortData } from "../../../../../include/js/function_main";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";
const columns = ({ readOnly, onChange, drList, onDelete }) => [
  {
    title: (
      <div className="text-center">
        <Text strong>ลำดับ.</Text>
      </div>
    ),
    width: "5%",
    ellipsis: false,
    align: "center",
    className: "col-sm",
    render: (_, row, index) => index + 1,
  },
  {
    title: (
      <div className="text-center">
        <Text strong>DR No.</Text>
      </div>
    ),
    width: "12%",
    ellipsis: false,
    align: "center",
    className: "col-sm",
    dataIndex: "dr_id",
    render: (val, record, index) =>
      readOnly ? (
        <Text className="pre-wrap">{record.dr_no || "-"}</Text>
      ) : (
        <CustomSelect
          size="small"
          placeholder="Select"
          field_id="dr_id"
          field_name="dr_no"
          data={drList}
          name="dr_id"
          allowClear
          showSearch
          value={val}
          onChange={(value, row) => {
            value !== undefined
              ? onChange(record.id, {
                  dr_id: value,
                  so_no: row.data.so_no,
                  item_no_name: row.data.item_no_name,
                  dr_qty: row.data.dr_qty,
                  uom_no: row.data.uom_no,
                  dr_remark: row.data.dr_remark,
                  dr_delivery_date: row.data.dr_delivery_date,
                  dr_delivery_time: row.data.dr_delivery_time,
                })
              : onChange(record.id, {
                  dr_id: null,
                  so_no: null,
                  item_no_name: null,
                  dr_qty: null,
                  uom_no: null,
                  dr_remark: null,
                  dr_delivery_date: null,
                  dr_delivery_time: null,
                });
          }}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>SO No.</Text>
      </div>
    ),
    width: "10%",
    ellipsis: false,
    align: "center",
    className: "col-sm",
    dataIndex: "so_no",
    render: (val, record, index) => (
      <Text className="pre-wrap">{val || "-"}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>สินค้า</Text>
      </div>
    ),
    width: "20%",
    ellipsis: false,
    align: "left",
    className: "col-sm",
    dataIndex: "item_no_name",
    render: (val, record, index) => (
      <Text className="pre-wrap">{val || "-"}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>จำนวน</Text>
      </div>
    ),
    width: "10%",
    ellipsis: false,
    align: "right",
    className: "col-sm",
    dataIndex: "dr_qty",
    render: (val, record, index) => (
      <Text className="pre-wrap">{convertDigit(val || 0, 3)}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>หน่วย</Text>
      </div>
    ),
    width: "8%",
    ellipsis: false,
    align: "left",
    className: "col-sm",
    dataIndex: "uom_no",
    render: (val, record, index) => (
      <Text className="pre-wrap">{val || "-"}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>หมายเหตุ.</Text>
      </div>
    ),
    width: "20%",
    ellipsis: false,
    align: "left",
    className: "col-sm",
    dataIndex: "dr_remark",
    render: (val, record, index) => (
      <Text className="pre-wrap">{val || "-"}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>วัน/เวลา ที่ต้องถึงลูกค้า</Text>
      </div>
    ),
    width: "15%",
    ellipsis: false,
    align: "center",
    className: "col-sm",
    dataIndex: "dr_remark",
    render: (val, record, index) => (
      <Text className="pre-wrap">{`${
        record.dr_delivery_date || "DD/MM/YYYY"
      } - ${record.dr_delivery_time || "HH:mm"}`}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    width: "5%",
    ellipsis: false,
    align: "center",
    className: "col-sm",
    dataIndex: "dr_id",
    render: (val, record, index) =>
      !readOnly && (
        <DeleteOutlined className="button-icon" onClick={() => onDelete(val)} />
      ),
  },
];
const initialState = {
  id: 0,
  dr_id: null,
  so_id: null,
  so_detail_id: null,
  dr_remark: null,
  dr_qty: null,
};
const Detail = () => {
  const {
    readOnly,
    stateDO,
    setStateDO,
    selectData: { drList },
  } = useContext(DOContext);
  const onAdd = () => {
    setStateDO((prev) => ({
      ...prev,
      do_detail: sortData([...prev.do_detail, initialState]),
    }));
  };
  const onDelete = (dr_id) => {
    setStateDO((prev) => ({
      ...prev,
      do_detail: sortData(prev.do_detail.filter((obj) => obj.dr_id !== dr_id)),
    }));
  };
  const onChange = (id, data) => {
    setStateDO((prev) => ({
      ...prev,
      do_detail: prev.do_detail.map((obj) =>
        obj.id === id ? { ...obj, ...data } : obj
      ),
    }));
  };

  return (
    <>
      <Tabs activeKey={"1"}>
        <Tabs.TabPane tab="DR List" key="1">
          <CustomTable
            columns={columns({
              readOnly,
              onChange,
              drList,
              onDelete,
            })}
            rowKey="id"
            rowClassName="row-table-detail"
            dataSource={stateDO.do_detail}
            onAdd={!readOnly && onAdd}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(Detail);
