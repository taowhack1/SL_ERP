import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import { columnsItem } from "../../data/inventoryData";
import $ from "jquery";
import axios from "axios";
const Items = (props) => {
  const [rowClick, setRowClick] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  useEffect(() => {
    axios.get("http://localhost:3001/items").then((res) => {
      setDataTable(res.data);
    });
  }, []);
  const config = {
    projectId: 3,
    title: "SALES",
    show: true,
    breadcrumb: ["Home", "Items"],
    search: true,
    create: "/sales/items/create",
    buttonAction: [],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/sales/items",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={columnsItem}
              dataSource={dataTable}
              onChange={onChange}
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
                      pathname: "/sales/items/view/" + record.id,
                      state: record,
                    });
                  },
                };
              }}
            />
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
};

export default withRouter(Items);
