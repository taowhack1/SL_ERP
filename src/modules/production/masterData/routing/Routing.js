import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { useFetch } from "../../../../include/js/customHooks";
import { sortData } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";

const apiGetRouting = `/production/routing`;
const Routing = (props) => {
  const history = useHistory();
  const { data, error, loading } = useFetch(apiGetRouting);
  const [state, setState] = useState([]);
  useEffect(() => {
    data?.length && setState(sortData(data[0]));
  }, [data]);
  const config = {
    projectId: 10,
    title: "PRODUCTION",
    home: "/production",
    show: true,
    breadcrumb: ["Home", "Routing"],
    search: false,
    create: "/production/routing/create",
    buttonAction: ["Create"],
    edit: {},
    discard: "/production/routing",
    onCancel: () => {
      console.log("Cancel");
    },
  };

  const viewRouting = (id) => {
    if (!id) return false;
    history.push(`/production/routing/${id}`);
  };
  console.log("RoutingList", data);
  return (
    <MainLayout {...config}>
      <Row>
        <Col span={24}>
          <Table
            bordered
            dataSource={state}
            loading={loading}
            columns={columns({ viewRouting })}
            rowKey={"routing_id"}
            size={"small"}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default withRouter(Routing);

const columns = ({ viewRouting }) => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <b>Routing No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "routing_no",
    render: (val) => val || "-",
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
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "routing_description",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Man</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "routing_worker",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Qty. / Batch Size</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "routing_qty",
    render: (val) => convertDigit(val || 0, 4),
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "uom_no",
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
    dataIndex: "routing_id",
    render: (id) => (
      <SearchOutlined className="button-icon" onClick={() => viewRouting(id)} />
    ),
  },
];
