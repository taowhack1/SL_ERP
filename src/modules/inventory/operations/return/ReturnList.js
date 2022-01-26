/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import { AppContext } from "../../../../include/js/context";
import { returnListColumns } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { filterReturn } from "../../../../actions/inventory/operation/return/returnActions";
import DetailLoading from "../../../../components/DetailLoading";
import { sortData } from "../../../../include/js/function_main";
import { reset_comments } from "../../../../actions/comment&log";
import { useFetch } from "../../../../include/js/customHooks";
import { api_return } from "../../../../include/js/api";
const ReturnList = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  const dispatch = useDispatch();
  authorize.check_authorize();
  const { user_name } = useSelector((state) => state.auth.authData);
  const { filter } = useSelector((state) => state.inventory.operations);
  const { pageSize, page, keyword } = filter || {};
  const onChange = (pagination, filters, sorter, extra) => {
    const { current, pageSize } = pagination;
    dispatch(filterReturn({ page: current, pageSize }));
  };
  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //fetch data
  const listDataReturn = useFetch(`${api_return}/all/${user_name}`);

  const getSearchData = (keyword) => {
    const search_data =
      listDataReturn.data &&
      sortData(
        keyword
          ? listDataReturn.data[0]?.filter(
              (list) =>
                list?.return_no?.indexOf(keyword) >= 0 ||
                list?.issue_no?.indexOf(keyword) >= 0 ||
                list?.return_created_by_no_name?.indexOf(keyword) >= 0 ||
                list?.return_created?.indexOf(keyword) >= 0 ||
                list?.return_description?.indexOf(keyword) >= 0
            )
          : listDataReturn.data[0]
      );

    return sortData(search_data);
  };
  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: ["Home", "Return"],
    search: true,
    create: `${currentMenu.menu_url}/create`,
    // buttonAction: currentMenu.button_create !== 0 ? ["Create"] : [],
    buttonAction: ["Create"],
    discard: "/inventory",
    badgeCount: 0,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      dispatch(filterReturn({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterReturn({
              page: 1,
              pageSize: 20,
              keyword: null,
              issue_id: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
  };
  useEffect(() => {
    return () => {
      dispatch(reset_comments());
      setData([]);
    };
  }, [dispatch]);
  useEffect(() => {
    console.log("Filter Keyword", keyword);
    const respSearch = getSearchData(keyword);
    setData(respSearch);
  }, [keyword, listDataReturn.data]);
  return (
    <>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            {loading ? (
              <DetailLoading></DetailLoading>
            ) : (
              <Table
                columns={returnListColumns}
                dataSource={data}
                rowKey={"return_id"}
                onChange={onChange}
                size={"small"}
                pagination={{
                  pageSize,
                  current: page,
                  pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
                }}
                loading={listDataReturn.loading ? true : false}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (e) => {
                      keepLog.keep_log_action(record.receive_no);
                      history.push({
                        pathname:
                          `${currentMenu.menu_url}/view/` + record.return_id,
                        state: { readOnly: true },
                      });
                    },
                  };
                }}
              />
            )}
          </Col>
        </Row>
      </MainLayout>
    </>
  );
};

export default withRouter(ReturnList);
