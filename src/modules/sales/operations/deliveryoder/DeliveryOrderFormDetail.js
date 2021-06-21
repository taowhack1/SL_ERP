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
  const so_data = [
    { id: 1, label: "SO21030001(mockup)", value: "	SO21030001" },
    { id: 1, label: "SO21030002(mockup)", value: "	SO21030002" },
  ];
  const so_detail_data = [
    {
      id: 1,
      label: "[ 401SRLA000100 ] SIRILAB ADVANCE REPAIR FACIAL SERUM 18 g",
      value: "401SRLA000100",
      quantity: 1,
      unit: "pcs",
      unitprice: "10",
      totalprice: "10",
    },
  ];
  const initialStateDo = {
    doTable_Head: [],
  };
  const initialStateDoHead = {
    id: 0,
    so: null,
    doTable_Detail: [],
  };
  const initialStateDoDetail = {
    id: 0,
    item: 1,
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

  const onAddDetail = (index) =>
    setState((prev) => ({
      doTable_Head: sortData([...prev.doTable_Head]),
      // doTable_Detail: sortData([
      //   ...prev.doTable_Head[index].doTable_Detail,
      //   { ...initialStateDoDetail },
      // ]),
    }));
  // const onAddDetail = () => {
  //   console.log("data_detail", state.doTable_Head[0].doTable_Detail);
  // doTable_Detail: sortData([
  //   ...prev.doTable_Head[index].doTable_Detail,
  //   { ...initialStateDoDetail },
  // ]),
  // };
  const onAddHead = () =>
    setState((prev) => ({
      ...prev,
      doTable_Head: sortData([...prev.doTable_Head, { ...initialStateDoHead }]),
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
        dataIndex: "label",
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
        dataIndex: "quantity",
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
        dataIndex: "unit",
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
        dataIndex: "unitprice",
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
        dataIndex: "totalprice",
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
          dataSource={so_detail_data}
          bordered
          rowKey={"id"}
          pagination={false}
          rowClassName='row-table-detail'
          // onAdd={method !== "view" && (() => onAddDetail(index))}
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
              data={so_data}
              className='full-width'
              field_name='label'
              field_id='value'
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
