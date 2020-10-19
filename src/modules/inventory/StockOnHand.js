import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { Badge } from "antd";

const StockOnHand = () => {
  const [selectedRow, setSelectedRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // useEffect(() => {
  //   axios.get("http://localhost:3001/items").then((res) => {
  //     setDataTable(res.data);
  //   });
  // }, []);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project.project_id,
    title: current_project.project_name,
    home: current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Stock on hand"],
    search: true,
    create: "/inventory/items/create",
    buttonAction: [],
    edit: {
      data: selectedRow,
      path: selectedRow && "/inventory/items/edit/" + selectedRow.key,
    },
    disabledEditBtn: !rowClick,
    discard: "/inventory/items",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const expandedRowRender = () => {
    const subColumns = [
      { title: "Location", dataIndex: "locationName", key: "loName" },
      { title: "Lot/Batch No.", dataIndex: "locationLot", key: "loLot" },
      { title: "Qty on hand", dataIndex: "locationOnHand", key: "loOnHand" },
      { title: "Unit", dataIndex: "locationUnit", key: "loUnit" },
      {
        title: "Item Status",
        key: "state",
        render: () =>
          Math.round(Math.random() * 100) % 2 ? (
            <span>
              <Badge status="success" />
              PASS
            </span>
          ) : (
            <span>
              <Badge status="warning" />
              HOLD
            </span>
          ),
      },
    ];

    const subData = [];
    for (let i = 0; i < 3; ++i) {
      subData.push({
        key: i,
        locationName: "Location " + i,
        locationLot: "L20090000" + i * 3,
        locationOnHand: Math.round(Math.random() * 100),
        locationUnit: "pc",
        locationItemStatus: "OK",
      });
    }
    return (
      <Table columns={subColumns} dataSource={subData} pagination={false} />
    );
  };

  const mainColumns = [
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
      align: "left",
    },
    { title: "Name", dataIndex: "itemName", key: "itemName", align: "left" },
    {
      title: "Quantity on hand",
      dataIndex: "itemQty",
      key: "itemOnHand",
      align: "right",
    },
    {
      title: "Quantity on QC",
      dataIndex: "itemQty_qc",
      key: "itemQty_qc",
      align: "right",
    },
  ];

  const mainData = [];
  for (let i = 0; i < 3; ++i) {
    mainData.push({
      key: i,
      itemCode: "[102SLA030001]",
      itemName: "Item " + i + 1,
      itemQty: Math.round(Math.random() * 100),
      itemQty_qc: Math.round(Math.random() * 100),
    });
  }

  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={mainColumns}
              dataSource={mainData}
              expandable={{ expandedRowRender }}
              onChange={onChange}
              size="small"
            />
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(StockOnHand);
