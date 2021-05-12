import {
  DeleteTwoTone,
  EllipsisOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getSampleItems } from "../../../../actions/inventory";
import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
const columns = ({ viewRecord }) => [
  {
    title: (
      <div className="text-center">
        <Text>No.</Text>
      </div>
    ),
    dataIndex: "id",
    width: "5%",
    align: "center",
    render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <Text>Code</Text>
      </div>
    ),
    dataIndex: "item_sample_no",
    width: "10%",
    align: "center",
  },
  {
    title: (
      <div className="text-center">
        <Text>Trade Name</Text>
      </div>
    ),
    dataIndex: "item_sample_name_trade",
    width: "30%",
    align: "left",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text>INCI Name</Text>
      </div>
    ),
    dataIndex: "item_sample_name_inci",
    width: "30%",
    align: "left",
    ellipsis: true,
  },
  {
    title: (
      <div className="text-center">
        <Text>Type</Text>
      </div>
    ),
    dataIndex: "type_name",
    width: "15%",
    align: "left",
    ellipsis: true,
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (value, record, index) => (
      <SearchOutlined
        className="icon-button"
        onClick={() => viewRecord(record.item_sample_id, record)}
      />
    ),
  },
];
const TemporaryItems = () => {
  const history = useHistory();

  const layoutConfig = useMemo(
    () => ({
      projectId: 3,
      title: "INVENTORY",
      home: "/inventory",
      show: true,
      breadcrumb: ["Inventory", "Master Data", "Temporary Items"],
      search: true,
      buttonAction: ["Create"],
      create: "/inventory/master_data/temp_item/create",
      edit: {},
      discard: "/inventory",
    }),
    []
  );
  const dispatch = useDispatch();
  const { master_data, loading } = useSelector((state) => state.inventory);
  const { sampleItems } = master_data;
  useEffect(() => {
    dispatch(getSampleItems());
  }, []);
  const viewRecord = (id, data) => {
    history.push({
      pathname: "/inventory/master_data/temp_item/view/" + id,
      state: data,
    });
  };

  return (
    <>
      <MainLayout {...layoutConfig}>
        <div className="mt-2">
          {loading ? (
            <DetailLoading />
          ) : (
            <Table
              loading={loading}
              // rowClassName="row-table-detail"
              dataSource={sampleItems}
              columns={columns({ viewRecord })}
              size={"small"}
              rowKey="id"
              bordered
              pagination={{ pageSize: 20 }}
              // onRow={(record) => ({
              //   onClick: () => {
              //     console.log(record);
              //     if (record.id === selectRow) return setSelectRow(null);
              //     setSelectRow({
              //       id: record.item_sample_id,
              //       state: record,
              //     });
              //   },
              // })}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default TemporaryItems;