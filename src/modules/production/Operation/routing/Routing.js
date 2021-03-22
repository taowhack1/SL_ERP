/** @format */

import { Col, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import { mainColumns, mockupData } from "./routingConfig";
import $ from "jquery";
import {
  getRoutingAll,
  getRoutingByID,
} from "../../../../actions/production/routingAction";
const { Title, Text } = Typography;
const Routing = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const RoutingList = useSelector(
    (state) => state.production.routing.routingList
  );
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Routing"],
    search: false,
    create: "/production/routing/create",
    // buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Create"],
    edit: {},
    //disabledEditBtn: !rowClick,
    discard: "/production/routing",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  useEffect(() => {
    dispatch(getRoutingAll());
  }, []);
  const redirect_to_view = (id) => {
    history.push("/production/routing/view/" + (id ? id : "new"));
  };
  console.log("RoutingList", RoutingList);
  return (
    <MainLayout {...config}>
      <Row>
        <Col span={24}>
          <Table
            dataSource={RoutingList}
            columns={mainColumns}
            rowKey={"routing_id"}
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  setRowClick(true);
                  $(e.target)
                    .closest("tbody")
                    .find("tr")
                    .removeClass("selected-row");
                  $(e.target).closest("tr").addClass("selected-row");
                  dispatch(getRoutingByID(record.routing_id, redirect_to_view));
                },
              };
            }}></Table>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default withRouter(Routing);
