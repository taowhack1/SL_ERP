/** @format */

import { SettingOutlined, SettingTwoTone } from "@ant-design/icons";
import { Checkbox, Modal, Popconfirm, Table } from "antd";
import Text from "antd/lib/typography/Text";

import React, { useState } from "react";
const tempColumnName2 = [
  {
    id: 1,
    name: "Column 1",
  },
  {
    id: 2,
    name: "Column 2",
  },
  {
    id: 3,
    name: "Column 3",
  },
];
const ConfigColumn = (props) => {
  const { onClose, visible, configView, list } = props;
  console.log("props :>> ", props);
  //console.log("list fileter:>> ", Object.keys(list[0]));
  const tempColumnName = [
    {
      id: 1,
      name: "Column 1",
    },
    {
      id: 2,
      name: "Column 2",
    },
    {
      id: 3,
      name: "Column 3",
    },
  ];
  const [column, setColumn] = useState(tempColumnName);
  const openMadal = () => {
    console.log("click SettingOutlined :>> ");
    configView();
  };
  const onCloseModal = () => {
    onClose();
  };
  const selectData = ({ column_id, checked }) => {
    setColumn((prev) =>
      prev.map((obj) => (obj.id === column_id ? { ...obj, checked } : obj))
    );
  };
  console.log("tempColumnName :>> ", tempColumnName);
  return (
    <>
      <div style={{ marginLeft: 20 }}>
        <SettingOutlined
          onClick={() => openMadal()}
          style={{ fontSize: "20px" }}
        />
      </div>
      <Modal
        visible={visible}
        title='Config Column'
        destroyOnClose
        onCancel={onCloseModal}>
        <Table
          bordered
          rowKey='id'
          size='small'
          rowClassName='row-table-detail'
          dataSource={column}
          columns={columns({
            selectData,
            title: "Select Column NPR",
          })}
        />
      </Modal>
    </>
  );
};

export default ConfigColumn;
const columns = ({ selectData, title = "Select Column" }) => [
  {
    title: (
      <div>
        <Text strong>{title}</Text>
      </div>
    ),
    className: "tb-col-sm bg-tb-secondary",
    children: [
      {
        title: (
          <div className='text-center'>
            <b>No.</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        width: "5%",
        dataIndex: "id",
        key: "id",
        render: (val) => val,
      },
      {
        title: (
          <div className='text-center'>
            <b>Check</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        width: "7%",
        dataIndex: "id",
        key: "id",
        render: (val, row) => (
          <Checkbox
            checked={row?.checked}
            onChange={(e) =>
              selectData({ column_id: val, checked: e.target.checked })
            }
          />
        ),
      },
      {
        title: (
          <div className='text-center'>
            <b>Colnum Name</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        // width: "10%",
        dataIndex: "name",
        key: "name",
        render: (val) => <Text strong>{val || "-"}</Text>,
      },
    ],
  },
];
