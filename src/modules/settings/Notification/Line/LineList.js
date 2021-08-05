/** @format */

import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";

const LineList = ({ loading, data = [], setModal }) => {
  const columns = [
    {
      title: (
        <div className='text-center'>
          <b>ลำดับ</b>
        </div>
      ),
      dataIndex: "id",
      width: "5%",
      ellipsis: true,
      align: "center",
      className: "tb-col-sm",
      render: (val) => val + 1,
    },
    {
      title: (
        <div className='text-center'>
          <b>ชื่อห้อง</b>
        </div>
      ),
      dataIndex: "line_room",
      width: "10%",
      ellipsis: false,
      align: "center",
      className: "tb-col-sm",
      render: (val) => val,
    },
    {
      title: (
        <div className='text-center'>
          <b>Token</b>
        </div>
      ),
      dataIndex: "token",
      width: "10%",
      ellipsis: true,
      align: "center",
      className: "tb-col-sm",
      render: (val) => val,
    },
    {
      title: (
        <div className='text-center'>
          <b>ข้อความ</b>
        </div>
      ),
      dataIndex: "line_message",
      width: "10%",
      ellipsis: false,
      align: "center",
      className: "tb-col-sm",
      render: (val) => val,
    },
    {
      title: (
        <div className='text-center'>
          <b>แก้ไข</b>
        </div>
      ),
      dataIndex: "",
      width: "5%",
      ellipsis: true,
      align: "center",
      className: "tb-col-sm",
      render: (val, record, index) => (
        <EditOutlined
          className='button-icon'
          onClick={() => setModal((prev) => ({ ...prev, visible: true }))}
        />
      ),
    },
  ];
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={"id"}
        size='small'
        bordered
        pagination={{ pageSize: 25 }}
        rowClassName='row-pointer'
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              // setRowClick(true);
              // $(e.target)
              //   .closest("tbody")
              //   .find("tr")
              //   .removeClass("selected-row");
              // $(e.target).closest("tr").addClass("selected-row");
              // keepLog.keep_log_action(record.so_no);
              // dispatch(get_so_by_id(record.so_id, auth.user_name));
              // props.history.push({
              //   pathname: "/sales/orders/view/" + record.so_id,
              //   state: record,
              // });
            },
          };
        }}
      />
    </>
  );
};

export default LineList;
