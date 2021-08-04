import { SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useDispatch } from "react-redux";
import { getStatusByName } from "../../../../include/js/function_main";
import useKeepLogs from "../../../logs/useKeepLogs";
const columns = [
  {
    title: (
      <div className="text-center">
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
      <div className="text-center">
        <b>DR No.</b>
      </div>
    ),
    dataIndex: "dr_no",
    width: "10%",
    ellipsis: false,
    align: "center",
    className: "tb-col-sm",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <b>SO No.</b>
      </div>
    ),
    dataIndex: "so_no",
    width: "8%",
    ellipsis: true,
    align: "center",
    className: "tb-col-sm",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <b>วันที่ต้องถึงลูกค้า</b>
      </div>
    ),
    dataIndex: "dr_delivery_date",
    width: "15%",
    ellipsis: false,
    align: "center",
    className: "tb-col-sm",
    render: (val, record) => (
      <Text>{`${record.dr_delivery_date} - ${record.dr_delivery_time}`}</Text>
    ),
  },
  {
    title: (
      <div className="text-center">
        <b>ชื่อลูกค้า</b>
      </div>
    ),
    dataIndex: "customer_no_name",
    width: "15%",
    ellipsis: true,
    align: "left",
    className: "tb-col-sm",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <b>สถานที่ส่ง</b>
      </div>
    ),
    dataIndex: "dr_location_delivery",
    ellipsis: true,
    align: "left",
    className: "tb-col-sm",
    render: (val) => val,
  },
  {
    title: (
      <div className="text-center">
        <b>สถานะ</b>
      </div>
    ),
    dataIndex: "trans_status_name",
    width: "10%",
    ellipsis: true,
    align: "center",
    className: "tb-col-sm",
    render: (val) => getStatusByName(val),
  },
  {
    title: (
      <div className="text-center">
        <b>เพิ่มเติม</b>
      </div>
    ),
    dataIndex: "dr_id",
    width: "5%",
    ellipsis: true,
    align: "center",
    className: "tb-col-sm",
    render: (val) => <SearchOutlined className="button-icon" />,
  },
];

const DRList = ({ loading, data = [], viewData }) => {
  const keepLog = useKeepLogs();
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={"id"}
        size="small"
        bordered
        pagination={{ pageSize: 25 }}
        rowClassName="row-pointer"
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              if (["path", "svg", "P"].includes(e.target.tagName)) {
                viewData(record.dr_id);
                keepLog.keep_log_action(`Click ${record.dr_no}`);
              }
            },
          };
        }}
      />
    </>
  );
};

export default React.memo(DRList);
