import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../components/MainLayout";
import { po_list_columns } from "./config/po";
import {
  get_po_list,
  reset_po_data,
  get_po_by_id,
  get_open_po_list,
  filterPO,
} from "../../actions/purchase/PO_Actions";
import { reset_comments } from "../../actions/comment&log";
import $ from "jquery";

import useKeepLogs from "../logs/useKeepLogs";
import Authorize from "../system/Authorize";
import PRList from "./operations/po/PRList";
import { sortData } from "../../include/js/function_main";
const PurchaseOrders = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const keepLog = useKeepLogs();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [rowClick, setRowClick] = useState(false);

  useEffect(() => {
    dispatch(get_po_list(auth.user_name));
    // dispatch(get_open_po_list());
    dispatch(reset_po_data());
    return () => {
      dispatch(reset_comments());
      setData([]);
    };
  }, [dispatch]);

  const { po_list, filter } = useSelector((state) => state.purchase.po);
  const { pageSize, page, keyword, vendor_id } = filter || {};

  const getSearchData = (keyword) => {
    const search_data = sortData(
      keyword
        ? po_list?.filter(
            (po) =>
              po?.po_no?.indexOf(keyword) >= 0 ||
              po?.vendor_no_name?.indexOf(keyword) >= 0 ||
              po?.po_created_by_no_name?.indexOf(keyword) >= 0 ||
              po?.po_created?.indexOf(keyword) >= 0 ||
              po?.po_description?.indexOf(keyword) >= 0
          )
        : po_list
    );

    return sortData(search_data);
  };
  useEffect(() => {
    console.log("Filter Keyword");
    setLoading(true);
    const respSearch = getSearchData(keyword);
    setData(respSearch);
    setLoading(false);
  }, [keyword]);

  useEffect(() => {
    console.log("useEffect set po_list");
    const respSearch = getSearchData(keyword);
    setData(respSearch);
    return () => setData([]);
  }, [po_list]);

  const [data, setData] = useState([]);

  const onChange = (pagination) => {
    const { current, pageSize } = pagination;
    dispatch(filterPO({ page: current, pageSize }));
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Purchase Orders"],
    search: true,
    create: "/purchase/po/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/purchase/po",
    // badgeCount: pr_ref.length,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      dispatch(filterPO({ keyword: value.toUpperCase() }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className="primary"
        onClick={() =>
          dispatch(
            filterPO({ page: 1, pageSize: 20, keyword: null, vendor_id: null })
          )
        }
      >
        Clear Filter
      </Button>
    ),
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row gutter={24}>
          <Col span={6}>
            <PRList />
          </Col>
          <Col span={18}>
            <Table
              style={{ marginTop: 60 }}
              columns={po_list_columns}
              dataSource={data}
              rowKey={"po_id"}
              loading={loading}
              onChange={onChange}
              size="small"
              pagination={{
                pageSize,
                current: page,
                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    dispatch(get_po_by_id(record.po_id, auth.user_name));
                    keepLog.keep_log_action(record.po_no);
                    props.history.push({
                      pathname: "/purchase/po/view/" + record.po_id,
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

export default withRouter(PurchaseOrders);
