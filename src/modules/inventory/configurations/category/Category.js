import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
import { categoryShowColumns, itemShowColumns } from "./CategoryConfig";
import $ from "jquery";
import { Row, Col, Table, Space, Badge } from "antd";
import { sortData } from "../../../../include/js/function_main";
import { getItemCategoryList } from "../../../../actions/inventory";
import { get_category_in_row } from "../../../../actions/inventory/configurations/category/categoryAction";

const Category = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const [, setRowClick] = useState(false);
  const auth = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();
  const category = useSelector(
    (state) => state.inventory.configurations.category
  );
  const current_project = useSelector((state) => state.auth.currentProject);
  const type = useSelector((state) => state.inventory.configurations.type);
  const [dataType, setDataType] = useState(type);
  const [data, setData] = useState(category);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getItemCategoryList(auth.user_name));
  }, []);
  useEffect(() => {
    const setStateData = () => {
      setData(category);
    };
    setStateData();
  }, [category.length]);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Category"],
    search: true,
    onSearch: (value) => {
      console.log(value);
      setLoading(true);
      setTimeout(() => {
        const search_category = category.filter(
          (category) => category.category_name.indexOf(value) >= 0
        );
        setData(search_category);
        setLoading(false);
      }, 1200);
    },
    create: "/inventory/configurations/category/create",
    buttonAction: ["Create"],
    discard: "/category/create",
    onCancel: () => {
      console.log("Cancel");
    },
  };

  const expandedRowRender = (record) => {
    const result = data.filter(
      (dataResult) => dataResult.type_id === record.type_id
    );

    return (
      <Table
        columns={categoryShowColumns}
        dataSource={sortData(result)}
        rowKey={"category_id"}
        pagination={{ pageSize: 10 }}
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
              dispatch(get_category_in_row(record));
              props.history.push({
                pathname:
                  "/inventory/configurations/category/view/" +
                  record.category_id,
                data: record,
              });
            },
          };
        }}
      />
    );
  };

  return (
    <div>
      <MainLayout {...config}>
        <Table
          loading={loading}
          columns={itemShowColumns}
          dataSource={sortData(dataType)}
          bordered
          pagination={{ pageSize: 20 }}
          rowKey={"type_id"}
          expandable={{ expandedRowRender }}
        />
      </MainLayout>
    </div>
  );
};

export default withRouter(Category);
