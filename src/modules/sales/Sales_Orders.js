import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Table, Space, Radio } from "antd";
import MainLayout from "../../components/MainLayout";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import {
  get_quotation_list,
  get_sale_master_data,
  get_so_by_id,
  get_so_list,
  reset_so,
  updateSOFilter,
} from "../../actions/sales";
import { so_columns } from "./configs";
import { reset_comments } from "../../actions/comment&log";
import { getMasterDataItem } from "../../actions/inventory";
import Authorize from "../system/Authorize";
import useKeepLogs from "../logs/useKeepLogs";
import Text from "antd/lib/typography/Text";
const SaleOrder = (props) => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const auth = useSelector((state) => state.auth.authData);
  const { filter } = useSelector((state) => state.sales.so);
  const dispatch = useDispatch();
  const [rowClick, setRowClick] = useState(false);
  useEffect(() => {
    dispatch(get_sale_master_data());
    // dispatch(reset_so());
    dispatch(reset_comments());
    dispatch(get_quotation_list(auth.user_name));
    dispatch(get_so_list(auth.user_name));
    dispatch(getMasterDataItem());
  }, []);

  const { so_list, qn_ref } = useSelector((state) => state.sales.so);
  const [state, setState] = useState(so_list);
  const [loading, setLoading] = useState(true);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Sale Orders"],
    search: true,
    searchValue: filter.keyword,
    create: "/sales/orders/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    disabledEditBtn: !rowClick,
    discard: "/sales/orders",
    badgeCount: qn_ref.length,
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      console.log(value);
      dispatch(updateSOFilter({ keyword: value }));
    },
    searchBar: (
      <Space size={18}>
        <div>
          <Text strong>Sales Type :</Text>
        </div>
        <Radio.Group
          options={[
            {
              label: "Production",
              value: 1,
            },
            {
              label: "Others",
              value: 2,
            },
            {
              label: "All",
              value: 3,
            },
          ]}
          onChange={(e) =>
            dispatch(updateSOFilter({ salesType: e.target.value }))
          }
          optionType="button"
          buttonStyle="solid"
          value={filter.salesType}
          defaultValue={filter.salesType}
        />
      </Space>
    ),
  };

  useEffect(() => {
    setLoading(true);
    console.log("before filter", so_list);

    let filterData =
      filter.salesType === 3
        ? so_list
        : so_list.filter((obj) => obj.so_type_id === filter.salesType);
    filterData = !filter.keyword
      ? filterData
      : filterData.filter(
          (obj) =>
            obj?.so_no?.indexOf(filter.keyword) >= 0 ||
            obj?.qn_no?.indexOf(filter.keyword) >= 0 ||
            obj?.customer_no_name?.indexOf(filter.keyword) >= 0 ||
            obj?.so_created_by_no_name?.indexOf(filter.keyword) >= 0 ||
            obj?.so_created?.indexOf(filter.keyword) >= 0 ||
            obj?.so_description?.indexOf(filter.keyword) >= 0
        );
    console.log("after filter", filterData);
    setState(filterData);

    setLoading(false);
  }, [filter, so_list]);
  console.log("state", filter, state);
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              loading={loading}
              columns={so_columns}
              dataSource={state}
              onChange={onChange}
              rowKey={"so_id"}
              size="small"
              bordered
              rowClassName="row-pointer"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    setRowClick(true);
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    keepLog.keep_log_action(record.so_no);
                    dispatch(get_so_by_id(record.so_id, auth.user_name));
                    props.history.push({
                      pathname: "/sales/orders/view/" + record.so_id,
                      state: record,
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

export default withRouter(SaleOrder);
