import { Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSOReference } from "../../../../actions/production/mrpActions";
import { sortData } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";
const columns = [
  {
    title: "No.",
    width: "5%",
    align: "center",
    dataIndex: "id",
    render: (val) => val + 1,
    ellipsis: false,
  },
  {
    title: "SO No.",
    dataIndex: "so_no",
    key: "so_no",
    width: "15%",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Customer",
    dataIndex: "customer_name",
    key: "customer_name",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Salesperson",
    dataIndex: "so_created_by_name",
    key: "so_created_by_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Order Date",
    dataIndex: "so_order_date",
    key: "so_order_date",
    width: "15%",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Delivery Date",
    dataIndex: "tg_so_delivery_date",
    key: "tg_so_delivery_date",
    width: "15%",
    align: "center",
    ellipsis: false,
  },
];
const subColumns = [
  {
    title: (
      <div className="text-center">
        <Text>Item</Text>
      </div>
    ),
    align: "left",
    dataIndex: "item_no_name",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text>Qty.</Text>
      </div>
    ),
    width: "15%",
    align: "right",
    dataIndex: "tg_so_detail_qty_balance",
    ellipsis: true,
    render: (val) => convertDigit(val, 4),
  },
  {
    title: (
      <div className="text-center">
        <Text>UOM</Text>
      </div>
    ),
    width: "10%",
    align: "center",
    dataIndex: "uom_no",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text>Delivery Date</Text>
      </div>
    ),
    width: "15%",
    align: "center",
    dataIndex: "so_detail_delivery_date",
    ellipsis: true,
  },
];
const SalesOrderList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSOReference());
  }, []);
  const { data_so_ref: soList } = useSelector(
    (state) => state.production.operations.mrp.mrp
  );
  const expandedRowRender = (record) => {
    return (
      <Table
        bordered
        columns={subColumns}
        rowKey={"so_detail_id"}
        dataSource={record.so_detail}
        pagination={false}
      />
    );
  };
  return (
    <>
      <div className="form-section">
        <Table
          columns={columns}
          dataSource={sortData(soList)}
          expandable={{ expandedRowRender }}
          loading={false}
          rowKey={"id"}
          size="small"
          rowClassName="row-pointer"
          pagination={{ pageSize: 15 }}
          onRow={(record, rowIndex) => ({
            onClick: () => console.log(record),
          })}
        />
      </div>
    </>
  );
};

export default React.memo(SalesOrderList);
