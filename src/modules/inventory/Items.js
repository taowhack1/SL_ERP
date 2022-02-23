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
import { sortData } from "../../include/js/function_main";
import { useFetch } from "../../include/js/customHooks";
const Items = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);

  const { filter_item_list } = useSelector((state) => state.inventory);
  const { pageSize, page } = filter_item_list || {};
  //useFetch GET data item & loading state
  const listData = useFetch(
    `${api_get_all_item_list}/${auth?.user_name}`,
    !auth?.user_name
  );

  useEffect(() => {
    dispatch(getMasterDataItem(auth.user_name));
    return () => {
      dispatch(clearStateItems());
      setItems([]);
    };
  }, [dispatch]);

  const onChange = (pagination) => {
    const { current, pageSize } = pagination;
    dispatch(filterItem({ page: current, pageSize }));
  };
  const [items, setItems] = useState([]);
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
  const onChangeSearch = async ({
    type_id,
    category_id,
    search_text,
    status_id,
    status_name,
  }) => {
    let search_data = listData?.data;

    if (type_id) {
      category_id
        ? (search_data = search_data.filter(
            (item) => item.category_id === category_id
          ))
        : (search_data = search_data.filter(
            (item) => item.type_id === type_id
          ));
    }
    if (status_id !== 99) {
      if (status_id !== 4) {
        if (status_id === 1) {
          //pending
          search_data = search_data.filter(
            (item) =>
              item.button_confirm || item.button_approve || item.button_reject
          );
        } else if (status_name !== "Cancel") {
          search_data = search_data.filter(
            (item) =>
              !item.button_confirm &&
              !item.button_approve &&
              !item.button_reject &&
              item.process_complete === false
          );
        } else {
          search_data = search_data.filter(
            (item) => item.trans_status_id === 3
          );
        }
      } else {
        //complete
        search_data = search_data.filter(
          (item) => item.process_complete === true
        );
      }
    }
    setItems(
      search_data.filter((item) => item.item_no_name.indexOf(search_text) >= 0)
    );
  };

  const redirect_to_view = (id) => {
    history.push("/inventory/items/view/" + (id ? id : "new"));
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row className='row-tab-margin-lg'>
          <Col span={24}>
            <Table
              title={() =>
                listData.data && (
                  <SearchTable
                    onChangeSearch={onChangeSearch}
                    filter_item_list={filter_item_list}
                  />
                )
              }
              loading={listData?.loading ? true : false}
              columns={item_show_columns}
              dataSource={items}
              onChange={onChange}
              bordered
              size={"small"}
              pagination={{
                pageSize,
                current: page,
                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
              }}
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
