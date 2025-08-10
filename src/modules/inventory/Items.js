/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../components/MainLayout";
import { get_item_by_id } from "../../actions/inventory/itemActions";
import $ from "jquery";
import { item_show_columns } from "./config/item";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
import SearchTable from "../../components/SearchTable";
import {
  clearStateItems,
  filterItem,
  getMasterDataItem,
} from "../../actions/inventory";
import { api_get_all_item_list } from "../../include/js/api";
import { useFetch } from "../../include/js/customHooks";
import useSearch from "../../include/js/customHooks/useSearch";
import SearchItems from "./components/SearchItems"

const Items = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);


  useEffect(() => {
    dispatch(getMasterDataItem(auth.user_name));
    return () => {
      dispatch(clearStateItems());
    };
  }, [dispatch]);

  const onChange = (pagination) => {
    const { current, pageSize } = pagination;
    dispatch(filterItem({ page: current, pageSize }));
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Items"],
    search: false,
    create: "/inventory/items/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    // buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/inventory/items",
    onCancel: () => {
      console.log("Cancel");
    },
  };

  const redirect_to_view = (id) => {
    history.push("/inventory/items/view/" + (id ? id : "new"));
  };

  const searchHook = useSearch({
    endpoint: "http://localhost:3008/api/inventory/items/search",
    initialParams: {
      user_name: "2563003",
      filter: {
        item: undefined,
        customer: undefined,
        item_type: undefined,
        item_category: undefined,
      },
    },
    debounceMs: 1000,
    mapResult: (res) => res,
    storageKey: "InventoryItemsSearchState",
  });

  return (
    <div>
      <MainLayout {...config}>
        <Row className="" style={{ marginTop: 20 }}>
          <Col span={24}>
            <SearchItems
              hook={searchHook}
              initialUI={{
                item: { label: searchHook.params.filter.item || "", value: "" },
                customer: { label: searchHook.params.filter.customer || "", value: "" },
                item_type: searchHook.params.filter.item_type || null,
                item_category: searchHook.params.filter.item_category || null,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              loading={searchHook?.loading ? true : false}
              columns={item_show_columns}
              dataSource={searchHook?.data}
              onChange={onChange}
              bordered
              size={"small"}
              pagination={false}
              scroll={{ y: 550 }}
              rowKey='item_id'
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

                    dispatch(
                      get_item_by_id(
                        record.item_id,
                        auth.user_name,
                        redirect_to_view
                      )
                    );
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
