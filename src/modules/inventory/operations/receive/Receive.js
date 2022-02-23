/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../../../components/MainLayout";
import $ from "jquery";
import {
  filterReceive,
  get_po_receive_list,
  get_receive_by_id,
  get_receive_list,
  reset_receive,
} from "../../../../actions/inventory/receiveActions";
import { receive_columns } from "../../config/receiveConfig";
import { reset_comments } from "../../../../actions/comment&log";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import { AppContext } from "../../../../include/js/context";
import { sortData } from "../../../../include/js/function_main";
import { useFetch } from "../../../../include/js/customHooks";
import {
  api_receive,
  api_receive_get_ref_po_head,
} from "../../../../include/js/api";
const Receive = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);

  const { filter } = useSelector((state) => state.inventory.receive);
  const { pageSize, page, keyword } = filter || {};
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  //fetch data
  const listDataReceive = useFetch(`${api_receive}/all/${auth.user_name}`);
  const listDataPoRef = useFetch(`${api_receive_get_ref_po_head}`);
  const count_po_ref = listDataPoRef?.data && listDataPoRef?.data[0].length;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterReceive({ page: current, pageSize }));
  };
  useEffect(() => {
    dispatch(reset_comments());
    dispatch(get_po_receive_list());
    //dispatch(reset_receive());
    //dispatch(get_receive_list(auth.user_name));
  }, []);

  const getSearchData = (keyword) => {
    const search_data =
      listDataReceive?.data &&
      sortData(
        keyword
          ? listDataReceive?.data[0]?.filter(
              (receive) =>
                receive?.receive_no_description.indexOf(keyword) >= 0 ||
                receive?.receive_created?.indexOf(keyword) >= 0 ||
                receive?.payment_term_name?.indexOf(keyword) >= 0 ||
                receive?.vendor_no_name?.indexOf(keyword) >= 0 ||
                receive?.receive_created_by_no_name?.indexOf(keyword) >= 0
            )
          : listDataReceive?.data[0]
      );

    return sortData(search_data);
  };
  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: ["Home", "Receive"],
    search: true,
    create: "/inventory/receive/create",
    buttonAction: currentMenu.button_create !== 0 ? ["Create"] : [],
    disabledEditBtn: !rowClick,
    discard: "/inventory/receive",
    badgeCount: count_po_ref,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      dispatch(filterReceive({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterReceive({
              page: 1,
              pageSize: 20,
              keyword: null,
              receive_id: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
  };
  useEffect(() => {
    console.log("Filter Keyword", keyword);
    const respSearch = getSearchData(keyword);
    setData(respSearch);
  }, [keyword, listDataReceive?.data]);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={receive_columns}
              dataSource={data}
              onChange={onChange}
              rowKey={"receive_id"}
              size='small'
              pagination={{
                pageSize,
                current: page,
                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
              }}
              loading={listDataReceive.loading ? true : false}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.receive_no);
                    history.push({
                      pathname:
                        `${currentMenu.menu_url}/view/` + record.receive_id,
                      state: { readOnly: true },
                    });
                    // dispatch(
                    //   get_receive_by_id(record.receive_id, auth.user_name)
                    // );
                    // props.history.push({
                    //   pathname: "/inventory/receive/view/" + record.receive_id,
                    // });
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

export default withRouter(Receive);
