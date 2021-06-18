/** @format */

import { Tabs, Table, InputNumber, Popconfirm } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Text from "antd/lib/typography/Text";
import { DeliveryOrderContext } from "./DeliveryOrderForm";
import CustomTable from "../../../../components/CustomTable";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../include/js/main_config";
import CustomSelect from "../../../../components/CustomSelect";
import {
  CheckOutlined,
  DeleteTwoTone,
  EllipsisOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { sortData } from "../../../../include/js/function_main";
const DeliveryOrderFormDetail = () => {
  const initialStateDo = {
    doTable_Head: [],
    doTable_Detail: [],
  };
  const initialStateDoHead = {
    id: 0,
    so: null,
  };
  const initialStateDoDetail = {
    id: 0,
    item: null,
  };
  const {
    method,
    state: mainState,
    setState: setmainState,
    user_name,
    department_id,
    dispatch,
  } = useContext(DeliveryOrderContext);
  console.log("mainState", mainState);
  console.log("method", method);
  const [state, setState] = useState(initialStateDo);
  useEffect(() => {
    const resp = { success: 200 };
    console.log("resp", resp);
    if (resp.success) {
      setState(
        resp.data
          ? {
              ...resp.data,
              user_name,
              commit: 1,
            }
          : {
              commit: 1,
              ...initialStateDo,
            }
      );
    }
  }, []);

  const onAddDetail = (npr_detail_id) =>
    setState((prev) => ({
      ...prev,
      doTable_Detail: sortData([
        ...prev.doTable_Detail,
        { ...initialStateDoDetail, npr_detail_id },
      ]),
    }));
  const onAddHead = (npr_detail_id) =>
    setState((prev) => ({
      ...prev,
      doTable_Head: sortData([
        ...prev.doTable_Head,
        { ...initialStateDoHead, npr_detail_id },
      ]),
    }));
  const onDeleteHead = (key) =>
    setState((prev) => ({
      ...prev,
      doTable_Head: prev.doTable_Head.filter((obj) => obj.id !== key),
    }));
  console.log("state", state);
  const expandedRowRender = (record, index) => {
    const { npr_detail_id } = record;
    console.log("record", record, "index", index);
    const columns = [
      {
        title: "No.",
        dataIndex: "id",
        width: "5%",
        align: "center",
        className: "tb-col-sm",
        render: (val, _, index) => index + 1,
      },
      {
        title: (
          <div className='text-center'>
            <Text>Item</Text>
          </div>
        ),
        dataIndex: "",
        align: "left",
        width: "15%",
        ellipsis: true,
        className: "tb-col-sm",
      },
      {
        title: (
          <div className='text-center'>
            <Text>Quantity</Text>
          </div>
        ),
        dataIndex: "",
        align: "right",
        width: "15%",
        className: "tb-col-sm",
      },
      {
        title: (
          <div className='text-center'>
            <Text>Unit</Text>
          </div>
        ),
        dataIndex: "",
        align: "right",
        width: "10%",
        className: "tb-col-sm",
      },
      {
        title: (
          <div className='text-center'>
            <Text>Unit Price</Text>
          </div>
        ),
        dataIndex: "",
        align: "left",
        width: "10%",
        className: "tb-col-sm",
      },
      {
        title: (
          <div className='text-center'>
            <Text>Total Price</Text>
          </div>
        ),
        dataIndex: "",
        align: "left",
        width: "10%",
        className: "tb-col-sm",
      },
    ];
    return (
      <>
        <CustomTable
          columns={columns}
          // dataSource={state.npr_price_detail.filter(
          //   (obj) => obj.npr_detail_id === npr_detail_id
          // )}
          dataSource={state.doTable_Detail}
          bordered
          rowKey={"id"}
          pagination={false}
          rowClassName='row-table-detail'
          onAdd={method !== "view" && (() => onAddDetail())}
        />
      </>
    );
  };
  const columnsDo = [
    {
      title: "No.",
      align: "center",
      dataIndex: "id",
      width: "5%",
      render: (val) => val + 1,
    },
    {
      title: "SO number.",
      align: "left",
      dataIndex: "so",
      width: "20%",
      render: (val, row) =>
        method === "view" ? (
          row.so
        ) : (
          <>
            <CustomSelect
              placeholder={"So Number"}
              showSearch
              size={"small"}
              className='full-width'
              field_name='so_no'
              field_id='so_id'
              value={val}
            />
          </>
        ),
    },
    {
      title: "Customer",
      align: "left",
      dataIndex: "",
      width: "20%",
    },
    {
      title: "Description",
      align: "left",
      dataIndex: "",
      width: "20%",
    },
    {
      title: "Order Date",
      align: "center",
      dataIndex: "",
      width: "20%",
    },
    {
      title: "Delivery Date",
      align: "center",
      dataIndex: "",
      width: "20%",
    },
    {
      title: <EllipsisOutlined />,
      dataIndex: "id",
      align: "center",
      width: "5%",
      className: "tb-col-sm",
      render: (val) =>
        method !== "view" && (
          <Popconfirm
            title='Are you sure ?.'
            onConfirm={() => onDeleteHead(val)}>
            <DeleteTwoTone className='button-icon' />
          </Popconfirm>
        ),
    },
  ];
  const dataSo = [
    {
      id: 0,
      so: "SO21030001",
      date: "17/06/2564",
    },
  ];

  return (
    <>
      <div className='full-width text-center mb-2 mt-3'></div>
      <CustomTable
        columns={columnsDo}
        dataSource={state.doTable_Head}
        bordered
        rowKey={"id"}
        size={"default"}
        pagination={false}
        className='table'
        expandable={{ expandedRowRender }}
        onAdd={method !== "view" && (() => onAddHead())}
      />
    </>
  );
};

export default DeliveryOrderFormDetail;
