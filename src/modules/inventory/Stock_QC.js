import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Dropdown, Space, Badge, Menu } from "antd";
import MainLayout from "../../components/MainLayout";
import { receiveColumns, receiveData } from "../../data/inventoryData";
import $ from "jquery";
import { get_receive_list } from "../../actions/inventory/receiveActions";
import { receive_columns } from "./config";
import { DownOutlined } from "@ant-design/icons";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
const StockQC = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Stock QC"],
    search: true,
    create: "/inventory/receive/create",
    buttonAction: ["Create"],
    disabledEditBtn: !rowClick,
    discard: "/inventory/receive",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const menu = (
    <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
    </Menu>
  );
  const expandedRowRender = () => {
    const columns = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data1 = [];
    for (let i = 0; i < 3; ++i) {
      data1.push({
        key: i,
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={data1} pagination={false} />;
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt" },
    { title: "Action", key: "operation", render: () => <a>Publish</a> },
  ];

  const data2 = [];
  for (let i = 0; i < 3; ++i) {
    data2.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            {/* <Table
              columns={receive_columns}
              dataSource={data}
              onChange={onChange}
              rowKey={"receive_id"}
              size="small"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    props.history.push({
                      pathname: "/inventory/receive/view/" + record.receive_id,
                      state: record,
                    });
                  },
                };
              }}
            /> */}
            <Table
              className="components-table-demo-nested"
              columns={columns}
              expandable={{ expandedRowRender }}
              dataSource={data2}
            />
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(StockQC);
