import React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Table, Space, Radio, Button, Popconfirm, Tag, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '../../components/MainLayout';
import CustomSelect from '../../components/CustomSelect';
import CustomTable from '../../components/CustomTable';
import DRForm from './operations/dr/form/DRForm';

import useKeepLogs from '../logs/useKeepLogs';
import Authorize from '../system/Authorize';
import { useFetch } from '../../include/js/customHooks';

import { getStatusByName, sortData } from '../../include/js/function_main';

import { api_quo_list, api_so } from '../../include/js/api';
import {
  get_sale_master_data,
  updateSOFilter
} from '../../actions/sales';

import { reset_comments } from "../../actions/comment&log";

import { so_columns, so_columns_Production, expandRow } from './configs/sales-orders-config';
import SOFilter from "./SOFilter";
import SOFilterToolbar from './SOFilterToolbar';


const { Text } = Typography;

const SaleOrder = (props) => {
  const dispatch = useDispatch();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();

  const auth = useSelector((state) => state.auth.authData);
  const filter = useSelector((state) => state.sales.so.filter);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const current_project = useSelector((state) => state.auth.currentProject);

  const [rowClick, setRowClick] = useState(false);
  const [modal, setModal] = useState({ visible: false, dr_id: null, so_detail_id: null });
  const [state, setState] = useState([]);

  const refSearchInput = useRef();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState(0);

  const {
    data: listDataSo,
    fetchData,
    loading: SOloading,
  } = useFetch(`${api_so}/all/${auth.user_name}`);
  console.log("SOloading", SOloading)

  const listDataQn = useFetch(`${api_quo_list}/all/${auth.user_name}`);
  const count_list_qn = listDataQn?.data?.[0]?.length;

  const getSearchData = useCallback((keyword) => {
    let data = listDataSo || [];
    const { so_status, soProductionType, salesType } = filter;

    if (salesType !== 3) {
      data = data.filter((so) => so.so_type_id === salesType);
    }
    if (soProductionType !== 0) {
      data = data.filter((so) => so.so_production_type_id === soProductionType);
    }
    if (so_status) {
      data = data.filter((so) => (so.trans_status_name || '').trim() === so_status);
    }

    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      data = data.filter((so) =>
        [so.so_no, so.customer_no, so.customer_name, so.so_created, so.so_description]
          .some((field) => (field || '').toLowerCase().includes(lowerKeyword))
      );
    }

    return sortData(data);
  }, [listDataSo, filter]);

  useEffect(() => {
    dispatch(get_sale_master_data());
    dispatch(reset_comments());
  }, []);

  useEffect(() => {
    const searchResult = getSearchData(filter.keyword);
    setState(searchResult);
  }, [filter.keyword, listDataSo, filter.so_status, filter.soProductionType, filter.salesType]);

  const onChange = (pagination) => {
    dispatch(updateSOFilter({ page: pagination.current, pageSize: pagination.pageSize }));
  };

  const onClose = useCallback(() => {
    setModal({ visible: false, dr_id: null, so_detail_id: null });
    fetchData();
  }, [fetchData]);

  const onOpen = useCallback((so_detail_id) => {
    setModal({ visible: true, dr_id: null, so_detail_id });
  }, []);

  const modalConfig = useMemo(() => ({ ...modal, onClose }), [modal, onClose]);

  const config = useMemo(() => ({
    projectId: current_project?.project_id,
    title: current_project?.project_name,
    home: current_project?.project_url,
    show: true,
    breadcrumb: ['Home', 'Sale Orders'],
    search: true,
    searchValue: filter.keyword,
    create: '/sales/orders/create',
    buttonAction: current_menu.button_create ? ['Create'] : [],
    disabledEditBtn: !rowClick,
    discard: '/sales/orders',
    badgeCount: count_list_qn,
    onSearch: (val) => dispatch(updateSOFilter({ keyword: val })),
    onCancel: () => { },
    searchBar: (
      <Space wrap>
        {/* Filter Controls */}
      </Space>
    ),
  }), [current_project, filter, current_menu, rowClick, count_list_qn]);

  const expandedRowRender = (record, index) => {
    return expandRow(record, index, onOpen)
  }

  const [loading, setLoading] = useState(false);
  return (
    <MainLayout {...config}>
      <Row>
        <Col span={24}>
          <SOFilterToolbar
            onSearch={(filters) => {
              setLoading(true);
              // TODO: call API หรือกรองข้อมูลจาก listDataSo ด้วย filters
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
            loading={loading}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            onChange={onChange}
            loading={SOloading}
            columns={
              filter.soProductionType === 3
                ? so_columns_Production({ onOpen, refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn })
                : so_columns({ onOpen, refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn, SOFilter })
            }
            dataSource={state}
            pagination={{
              pageSize: filter.pageSize,
              current: filter.page,
              pageSizeOptions: ['15', '20', '30', '50', '100', '1000'],
            }}
            rowKey="so_id"
            size="small"
            bordered
            expandable={{ expandedRowRender }}
            onRow={(record) => ({
              onClick: (e) => {
                setRowClick(true);
                keepLog.keep_log_action(record.so_no);

                props.history.push({
                  pathname: "/sales/orders/view/" + record.so_id,
                  state: record,
                });
              },
            })}
          />
        </Col>
      </Row>
      <DRForm {...modalConfig} />
    </MainLayout>
  );
};

export default withRouter(SaleOrder);
