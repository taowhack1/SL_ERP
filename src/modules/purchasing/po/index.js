/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Button, Space, Typography, Divider } from "antd";
import MainLayout from "../../../components/MainLayout";
import { po_list_columns } from "../config/po";
import {
  get_po_list,
  reset_po_data,
  get_po_by_id,
  get_open_po_list,
  filterPO,
} from "../../../actions/purchase/PO_Actions";
import { reset_comments } from "../../../actions/comment&log";
import $ from "jquery";

import useKeepLogs from "../../logs/useKeepLogs";
import Authorize from "../../system/Authorize";
import PRList from "../operations/po/PRList";
import { sortData } from "../../../include/js/function_main";
import { useFetch } from "../../../include/js/customHooks";
import { AppContext } from "../../../include/js/context";
import CustomSelect from "../../../components/CustomSelect";
import Text from "antd/lib/typography/Text";

const apiGetPO = `/purchase/po`;
const PO = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const keepLog = useKeepLogs();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const dispatch = useDispatch();
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [rowClick, setRowClick] = useState(false);

  const { data: poList, loading: getPOLoading } = useFetch(
    `${apiGetPO}/${user_name}&0`,
    !user_name
  );

  const { filter } = useSelector((state) => state.purchase.po);
  const { pageSize, page, keyword, po_status } = filter || {};

  const getSearchData = (data, keyword, user_name) => {
    // user_name == "2563003" &&
    //   dispatch(filterPO({ po_status: "Pending Approve" }));
    const search_data = sortData(
      keyword
        ? data?.filter(
            (po) =>
              po?.po_no?.indexOf(keyword) >= 0 ||
              po?.vendor_no_name?.indexOf(keyword) >= 0 ||
              po?.po_created_by_no_name?.indexOf(keyword) >= 0 ||
              po?.po_created?.indexOf(keyword) >= 0 ||
              po?.po_description?.indexOf(keyword) >= 0
          )
        : po_status === "Pending Approve"
        ? data?.filter((po) => po?.button_approve == 1)
        : po_status === "Pending Confirm"
        ? data?.filter((po) => po?.button_confirm == 1)
        : po_status === "Pending Receive"
        ? data?.filter((po) => po?.trans_status_name == "Pending Receive")
        : po_status === "Completed"
        ? data?.filter((po) => po?.trans_status_name == "Completed")
        : po_status === "Confirm"
        ? data?.filter((po) => po?.trans_status_name == "Confirm")
        : po_status === "Cancel"
        ? data?.filter((po) => po?.trans_status_name == "Cancel")
        : po_status === "Waiting"
        ? data?.filter((po) => po?.trans_status_name == "Draft")
        : data
    );
    console.log("search_data :>> ", search_data);
    return sortData(search_data);
  };

  // useEffect(() => {
  //   if(!getPOLoading){
  //     console.log("Filter Keyword");
  //   setLoading(true);
  //   const respSearch = getSearchData(keyword);
  //   setData(respSearch);
  //   setLoading(false);
  //   }
  // }, [keyword,getPOLoading]);
  useEffect(() => {
    if (user_name == "9999999") {
      dispatch(filterPO({ po_status: "Pending Approve" }));
    }
  }, [user_name]);
  useEffect(() => {
    if (!getPOLoading) {
      setLoading(true);
      console.log("Filter Keyword");
      const respSearch = getSearchData(poList, keyword, user_name);
      setData(respSearch);
      setLoading(false);
    }
  }, [keyword, poList, getPOLoading, po_status]);

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
    create: "/purchase/po/new",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    edit: {},
    disabledEditBtn: !rowClick,
    discard: "/purchase/po",
    // badgeCount: pr_ref.length,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      dispatch(filterPO({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <>
        <Space split={<Divider type='vertical' />} style={{ marginRight: 20 }}>
          <div>
            <Text strong>Status :</Text>
          </div>
          <CustomSelect
            //disabled={filter.salesType !== 2 ? false : true}
            name={"po_status"}
            placeholder='PO Status'
            data={[
              {
                label: "Pending Approve",
                value: "Pending Approve",
              },
              {
                label: "Pending Receive",
                value: "Pending Receive",
              },
              {
                label: "Pending Confirm",
                value: "Pending Confirm",
              },
              {
                label: "Confirm",
                value: "Confirm",
              },
              {
                label: "Completed",
                value: "Completed",
              },
              {
                label: "Waiting",
                value: "Waiting",
              },
              {
                label: "Cancel",
                value: "Cancel",
              },
            ]}
            field_id='value'
            field_name='label'
            style={{ width: 200 }}
            onChange={
              (val, option) => dispatch(filterPO({ po_status: val }))
              //setData(data.filter((data) => data.button_approve === val))
              // user_name == "2563009" &&
              // dispatch(filterPO({ po_status: "Pending Approve" }));
            }
            value={po_status}
            //defaultValue={}
          />
        </Space>
        <Button
          className='primary'
          onClick={() =>
            dispatch(
              filterPO({
                page: 1,
                pageSize: 20,
                keyword: null,
                vendor_id: null,
                po_status: null,
              })
            )
          }>
          Clear Filter
        </Button>
      </>
    ),
  };
  console.log(
    "data filter :>> ",
    data.filter((data) => data.button_approve == 1)
  );
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
              loading={getPOLoading || loading}
              onChange={onChange}
              size='small'
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
                    // dispatch(get_po_by_id(record.po_id, auth.user_name));
                    keepLog.keep_log_action(record.po_no);
                    props.history.push({
                      pathname: "/purchase/po/" + record.po_id,
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

export default withRouter(PO);
