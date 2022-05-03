/** @format */

import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Table,
  Button,
  Space,
  Typography,
  Divider,
  Tabs,
} from "antd";
import MainLayout from "../../../components/MainLayout";
import { mrp_list_detail, po_list_columns } from "../config/po";
import { filterPO } from "../../../actions/purchase/PO_Actions";
import { reset_comments } from "../../../actions/comment&log";
import $ from "jquery";

import useKeepLogs from "../../logs/useKeepLogs";
import Authorize from "../../system/Authorize";
import PRList2 from "../operations/po/PRList2";
import PRListAuto from "../operations/po/PRListAuto";
import { sortData } from "../../../include/js/function_main";
import { useFetch } from "../../../include/js/customHooks";
import { AppContext } from "../../../include/js/context";
import CustomSelect from "../../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import Axios from "axios";
import { header_config } from "../../../include/js/main_config";
const apiGetPRbyMRP = `/purchase/pr/detail_by_mrp`;
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
  const listDataPo = useFetch(`${apiGetPO}/${user_name}&0`, !user_name);
  console.log("listDataPo :>> ", listDataPo);
  const { filter } = useSelector((state) => state.purchase.po);
  const { pageSize, page, keyword, po_status } = filter || {};

  const getSearchData = (keyword) => {
    const search_data =
      listDataPo?.data &&
      sortData(
        keyword
          ? listDataPo?.data?.filter(
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
          : listDataPo?.data
      );
    console.log("search_data :>> ", search_data);
    return sortData(search_data);
  };

  useEffect(() => {
    if (user_name == "9999999") {
      dispatch(filterPO({ po_status: "Pending Approve" }));
    }
  }, [user_name]);
  useEffect(() => {
    setLoading(true);
    console.log("Filter Keyword");
    const respSearch = getSearchData(keyword);
    setData(respSearch);
    setLoading(false);
  }, [keyword, listDataPo?.data, listDataPo?.loading, po_status]);

  const [data, setData] = useState([]);
  const [mrp, setMrp] = useState({ mrp_id: null, listMRP: [] });
  const refSearchInput = useRef();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState(0);
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
            onChange={(val, option) => dispatch(filterPO({ po_status: val }))}
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
  const GetPR_Detail_by_MRP = async (mrp_id) => {
    const data_mpr = await mpr_detail_data(mrp_id);
    console.log("data_mpr", data_mpr);
    setMrp({ ...mrp, listMRP: data_mpr.data });
  };
  const mpr_detail_data = (mrp_id) => {
    try {
      return Axios.get(`${apiGetPRbyMRP}/${mrp_id}`, header_config)
        .then((resp) => {
          if (resp.status === 200) {
            console.log("GetPR_Detail_by_MRP :>> ", resp.data);
            return {
              success: true,
              data: sortData(resp.data),
              //data: resp.data,
              message: "Success",
            };
          } else {
            return { success: false, data: [], message: resp };
          }
        })
        .catch((error) => {
          console.error(error);
          if (error?.response) {
            console.error(error.response);
          }
          return { success: false, data: [], message: error };
        });
    } catch (error) {
      console.log(error);
      return { success: false, data: [], message: error };
    }
  };
  return (
    <div>
      <MainLayout {...config}>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='PR ทั่วไป' key='1'>
            <Row gutter={24}>
              <Col span={6}>
                <PRList2 />
              </Col>
              <Col span={18}>
                <Table
                  columns={po_list_columns({
                    refSearchInput,
                    searchText,
                    setSearchText,
                    searchedColumn,
                    setSearchedColumn,
                  })}
                  dataSource={data}
                  rowKey={"po_id"}
                  loading={listDataPo?.loading ? true : false}
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
          </Tabs.TabPane>
          <Tabs.TabPane tab='PR AUTO' key='2'>
            <Row gutter={24}>
              <Col span={6}>
                <PRListAuto
                  setMrp={setMrp}
                  mrp={mrp}
                  GetPR_Detail_by_MRP={GetPR_Detail_by_MRP}
                />
              </Col>
              <Col span={18}>
                <Table
                  columns={mrp_list_detail({
                    refSearchInput,
                    searchText,
                    setSearchText,
                    searchedColumn,
                    setSearchedColumn,
                  })}
                  dataSource={mrp.listMRP}
                  rowKey={"po_id"}
                  loading={listDataPo?.loading ? true : false}
                  onChange={onChange}
                  size='small'
                  pagination={{
                    pageSize,
                    current: page,
                    pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
                  }}
                  // onRow={(record, rowIndex) => {
                  //   return {
                  //     onClick: (e) => {
                  //       setRowClick(true);
                  //       $(e.target)
                  //         .closest("tbody")
                  //         .find("tr")
                  //         .removeClass("selected-row");
                  //       $(e.target).closest("tr").addClass("selected-row");
                  //       // dispatch(get_po_by_id(record.po_id, auth.user_name));
                  //       keepLog.keep_log_action(record.po_no);
                  //       props.history.push({
                  //         pathname: "/purchase/po/" + record.po_id,
                  //       });
                  //     },
                  //   };
                  // }}
                />
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </MainLayout>
    </div>
  );
};

export default withRouter(PO);
