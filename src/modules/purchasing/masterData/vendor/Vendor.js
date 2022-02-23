/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../../../components/MainLayout";
import $ from "jquery";
import {
  filterVendor,
  get_all_vendor,
  get_vendor_by_id,
} from "../../../../actions/purchase/vendorActions";
import { vendor_columns } from "../../config/vendor";
import { get_vendor_payment_term_list } from "../../../../actions/accounting";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import { useFetch } from "../../../../include/js/customHooks";
import { api_vendor } from "../../../../include/js/api";
import { sortData } from "../../../../include/js/function_main";
const Vendor = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();

  const [, setRowClick] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterVendor({ page: current, pageSize }));
  };

  const dispatch = useDispatch();
  let { filter } = useSelector((state) => state.purchase.vendor);
  const { pageSize, page, keyword } = filter || {};
  const [data, setData] = useState([]);
  const getSearchData = (keyword) => {
    const search_data =
      listDataVendor?.data &&
      sortData(
        keyword
          ? listDataVendor?.data[0]?.filter(
              (vendor) =>
                vendor?.vendor_no_name?.indexOf(keyword) >= 0 ||
                vendor?.cost_center_no_name?.indexOf(keyword) >= 0 ||
                vendor?.issue_created_by_no_name?.indexOf(keyword) >= 0 ||
                vendor?.issue_created?.indexOf(keyword) >= 0 ||
                vendor?.issue_description?.indexOf(keyword) >= 0
            )
          : listDataVendor?.data[0]
      );

    return sortData(search_data);
  };

  const listDataVendor = useFetch(api_vendor);
  useEffect(() => {
    const getMasterData = () => {
      dispatch(get_vendor_payment_term_list());
    };
    getMasterData();
  }, []);
  useEffect(() => {
    console.log("Filter :>> ", keyword);
    const respSearch = getSearchData(keyword);
    setData(respSearch);
  }, [keyword, listDataVendor.data]);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Vendors"],
    search: true,
    onSearch: (value) => {
      console.log(value);
      dispatch(filterVendor({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterVendor({
              page: 1,
              pageSize: 20,
              keyword: null,
              vendor_id: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
    create: "/purchase/vendor/create",
    buttonAction: ["Create"],
    discard: "/purchase/vendor",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  const redirect_to_view = (id) => {
    history.push("/purchase/vendor/view/" + (id ? id : "new"));
  };
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={vendor_columns}
              dataSource={data}
              onChange={onChange}
              rowKey={"vendor_id"}
              pagination={{
                pageSize,
                current: page,
                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
              }}
              loading={listDataVendor?.loading ? true : false}
              size='small'
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.vendor_no);
                    dispatch(
                      get_vendor_by_id(record.vendor_id, redirect_to_view)
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

export default withRouter(Vendor);
