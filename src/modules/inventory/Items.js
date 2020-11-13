import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table } from "antd";
import MainLayout from "../../components/MainLayout";
import {
  getAllItems,
  get_item_by_id,
} from "../../actions/inventory/itemActions";
import $ from "jquery";
import { item_show_columns } from "./config/item";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
import SearchTable from "../../components/SearchTable";
const Items = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dataItems = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const [items, setItems] = useState(dataItems);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Items"],
    search: false,
    create: "/inventory/items/create",
    // buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/inventory/items",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const onChangeSeach = ({ type_id, category_id, search_text }) => {
    console.log("search_text", search_text);
    let search_data = dataItems;

    if (type_id) {
      category_id
        ? (search_data = search_data.filter(
            (item) => item.category_id === category_id
          ))
        : (search_data = search_data.filter(
            (item) => item.type_id === type_id
          ));
    }
    setItems(
      search_data.filter(
        (item) =>
          item.item_name.indexOf(search_text) >= 0 ||
          item.item_no.indexOf(search_text) >= 0
      )
    );
  };

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, [items]);
  return (
    <div>
      <MainLayout {...config}>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <Table
              title={() => <SearchTable onChangeSeach={onChangeSeach} />}
              loading={loading}
              columns={item_show_columns}
              dataSource={items}
              onChange={onChange}
              bordered
              size="small"
              rowKey="item_id"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.item_no);
                    dispatch(get_item_by_id(record.item_id));
                    props.history.push({
                      pathname: "/inventory/items/view/" + record.item_id,
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
