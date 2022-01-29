import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import MainLayout from "../../../../../components/MainLayout";
import { AppContext } from "../../../../../include/js/context";
import { useFetch } from "../../../../../include/js/customHooks";
import { convertDigit } from "../../../../../include/js/main_config";
const apiGetAllMRPv2 = `/production/mrp_v2/all`;
const MPRv2 = () => {
  const history = useHistory();
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const { data, loading = true } = useFetch(
    `${apiGetAllMRPv2}/${user_name}`,
    !user_name
  );

  const config = React.useMemo(
    () => ({
      projectId: 10, // project ID from DB
      title: "PRODUCTION", // project name
      home: "/production", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Production", "Operations", "MRP V.2"], // [1,2,3] = 1 / 2 / 3
      search: true, // bool show search
      searchValue: null, //search string
      buttonAction: ["Create"],
      onCancel: () => console.log("Cancel"),
      onSearch: (searchText) => console.log("search", searchText),
    }),
    []
  );
  console.log("main", loading);
  return (
    <MainLayout {...config}>
      <Table
        bordered
        rowKey="id"
        className="mt-2"
        rowClassName="row-table-detail"
        loading={loading}
        columns={columns()}
        // dataSource={[]}
        dataSource={data || []}
        onRow={(record) => ({
          onClick: () =>
            history.push(`/production/operations/mrp_v2/view/${record.mrp_id}`),
        })}
      />
    </MainLayout>
  );
};

export default React.memo(MPRv2);

const columns = () => [
  {
    title: (
      <div className="text-center">
        <b>MRP No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "mrp_no",
  },
  {
    title: (
      <div className="text-center">
        <b>Source</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "8%",
    dataIndex: "so_no",
  },
  {
    title: (
      <div className="text-center">
        <b>Item</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Job description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    ellipsis: true,
    dataIndex: "mrp_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Plan date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "8%",
    dataIndex: "mrp_item_plan_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Quantity</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "mrp_item_qty_produce",
    render: (val) => convertDigit(val, 4) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "6%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Status</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "8%",
    dataIndex: "trans_status_name",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "mrp_id",
    render: (val) => <SearchOutlined className="button-icon" />,
  },
];