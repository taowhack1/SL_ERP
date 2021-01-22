import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import { sortData } from "../../../../include/js/function_main";
import Authorize from "../../../system/Authorize";
import { uomShowColumns } from "./UomConfig";
import $ from "jquery";
import {
  getConfigurationUom,
  getUomInRow,
} from "../../../../actions/inventory/configurations/uom/uomAction";

function Uom(props) {
  const dispatch = useDispatch();
  const uom = useSelector((state) => state.inventory.configurations.uom);
  const current_project = useSelector((state) => state.auth.currentProject);
  const [, setRowClick] = useState(false);
  const [data, setData] = useState(uom);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getConfigurationUom());
  }, []);
  useEffect(() => {
    const setStateData = () => {
      setData(uom);
    };
    setStateData();
  }, [uom.length]);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "UoM"],
    search: true,
    onSearch: (value) => {
      console.log(value);
      setLoading(true);
      setTimeout(() => {
        const search_uom = uom.filter(
          (uom) =>
            uom.uom_name &&
            uom.uom_name.toUpperCase().indexOf(value.toUpperCase()) >= 0
        );
        setData(search_uom);
        setLoading(false);
      }, 1200);
    },
    create: "/inventory/configurations/uom/create",
    buttonAction: ["Create"],
    discard: "/uom/Create",
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
              loading={loading}
              columns={uomShowColumns}
              dataSource={sortData(data)}
              rowKey={"uom_id"}
              size={"small"}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    dispatch(getUomInRow(record));
                    props.history.push({
                      pathname:
                        "/inventory/configurations/uom/view/" + record.uom_id,
                      data: record,
                    });
                  },
                };
              }}
            ></Table>
          </Col>
        </Row>
      </MainLayout>
    </div>
  );
}

export default withRouter(Uom);
