import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, useHistory, withRouter } from "react-router-dom";
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
import { getMasterDataItem } from "../../actions/inventory";
const Items = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // dispatch(getAllItems(auth.user_name));
    dispatch(getMasterDataItem(auth.user_name, setLoading));
  }, []);
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
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    // buttonAction: ["Create"],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/inventory/items",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const onChangeSearch = ({
    type_id,
    category_id,
    search_text,
    status_id,
    status_name,
  }) => {
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

  useEffect(() => {
    setItems(dataItems);
  }, [dataItems.length]);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     return () => {
  //       clearTimeout();
  //     };
  //   }, 1200);
  // }, [items]);

  const redirect_to_view = (id) => {
    history.push("/inventory/items/view/" + (id ? id : "new"));
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row className="row-tab-margin-lg">
          <Col span={24}>
            <Table
              title={() => <SearchTable onChangeSearch={onChangeSearch} />}
              loading={loading}
              columns={item_show_columns}
              dataSource={items}
              onChange={onChange}
              bordered
              size={"small"}
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
