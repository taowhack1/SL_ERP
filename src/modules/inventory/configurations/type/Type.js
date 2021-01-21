import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../../../components/MainLayout";
import $ from "jquery";
import Authorize from "../../../system/Authorize";
import { item_show_columns } from "./TypeConfig";
import { sortData } from "../../../../include/js/function_main";
import {
  getConfigurationItemType,
  getConfigurationItemTypeById,
} from "../../../../actions/inventory/configurations/type/typeItemAction";
import { AppContext } from "../../../../include/js/context";
const Type = (props) => {
  const { mainContext, setMainContext } = useContext(AppContext);
  console.log("mainContext", mainContext);
  const authorize = Authorize();
  authorize.check_authorize();
  const [, setRowClick] = useState(false);
  const auth = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.inventory.configurations.type);
  const [data, setData] = useState(type);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getConfigurationItemType());
    setMainContext({ ...mainContext, config: { page: "Type.js" } });
  }, []);
  useEffect(() => {
    const setStateData = () => {
      setData(type);
    };
    setStateData();
  }, [type.length]);

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Type"],
    search: true,
    onSearch: (value) => {
      console.log(value);
      setLoading(true);
      setTimeout(() => {
        const search_type = type.filter(
          (type) => type.type_name.indexOf(value) >= 0
        );
        setData(search_type);
        setLoading(false);
      }, 1200);
    },
    create: "/inventory/configurations/type/create",
    buttonAction: ["Create"],
    discard: "/Type/Create",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  console.log(type);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              loading={loading}
              columns={item_show_columns}
              dataSource={sortData(data)}
              rowKey={"type_id"}
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
                    dispatch(getConfigurationItemTypeById(record.type_id));
                    props.history.push({
                      pathname:
                        "/inventory/configurations/type/view/" + record.type_id,
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
};

export default withRouter(Type);
