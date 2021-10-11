/** @format */

import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { useFetch } from "../../../../include/js/customHooks";
import { sortData } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";
import {
  reset_Routing,
  RoutingFilter,
  set_filter,
} from "../../../../actions/production/routingAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd/lib/radio";
import { reset_comments } from "../../../../actions/comment&log";
import { GET_ROUTING } from "../../../../actions/types";

const apiGetRouting = `/production/routing`;
const Routing = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    data: RoutingList,
    error,
    loading: RoutingLoading,
  } = useFetch(apiGetRouting);
  const [state, setState] = useState([]);
  const { routingList, filter } = useSelector(
    (state) => state.production.routing
  );
  const { pageSize, page, keyword, vendor_id } = filter || {};
  const [loading, setLoading] = useState(false);
  console.log("RoutingList", RoutingList);
  console.log("RoutingLoading :>> ", RoutingLoading);
  // useEffect(() => {
  //   RoutingList?.length && setState(sortData(RoutingList[0]));
  // }, [RoutingList]);

  const getSearchData = (keyword) => {
    const search_data = sortData(
      keyword
        ? routingList?.filter(
            (list) =>
              list?.routing_no?.indexOf(keyword) >= 0 ||
              list?.item_no?.indexOf(keyword) >= 0 ||
              list?.routing_description?.indexOf(keyword) >= 0 ||
              list?.item_name?.indexOf(keyword) >= 0
          )
        : routingList
    );

    return sortData(search_data);
  };
  useEffect(() => {
    dispatch(set_filter());
    dispatch(reset_Routing());
    return () => {
      dispatch(reset_comments());
      setState([]);
    };
  }, [dispatch]);
  useEffect(() => {
    console.log("Filter Keyword");
    setLoading(true);
    const respSearch = getSearchData(keyword);
    setState(respSearch);
    setLoading(false);
  }, [keyword]);
  useEffect(() => {
    setLoading(true);
    console.log("useEffect set return_list");
    const respSearch = getSearchData(keyword);
    setState(respSearch);
    setLoading(false);
    return () => setState([]);
  }, [routingList]);
  const onChange = (pagination, filters, sorter, extra) => {
    const { current, pageSize } = pagination;
    dispatch(RoutingFilter({ page: current, pageSize }));
  };
  const config = {
    projectId: 10,
    title: "PRODUCTION",
    home: "/production",
    show: true,
    breadcrumb: ["Home", "Routing"],
    search: true,
    create: "/production/routing/create",
    buttonAction: ["Create"],
    edit: {},
    discard: "/production/routing",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      dispatch(RoutingFilter({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            RoutingFilter({
              page: 1,
              pageSize: 20,
              keyword: null,
              routing_id: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
  };

  const viewRouting = (id) => {
    if (!id) return false;
    history.push(`/production/routing/${id}`);
  };

  console.log("state :>> ", state);
  console.log("routingList :>> ", routingList);
  return (
    <MainLayout {...config}>
      <Row>
        <Col span={24}>
          <Table
            bordered
            dataSource={state}
            loading={loading}
            onChange={onChange}
            columns={columns({ viewRouting })}
            rowKey={"routing_id"}
            size={"small"}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default withRouter(Routing);

const columns = ({ viewRouting }) => [
  {
    title: (
      <div className='text-center'>
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (val) => val + 1,
  },
  {
    title: (
      <div className='text-center'>
        <b>Routing No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "routing_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Item</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "routing_description",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Man</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "routing_worker",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <b>Qty. / Batch Size</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "routing_qty",
    render: (val) => convertDigit(val || 0, 4),
  },
  {
    title: (
      <div className='text-center'>
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className='text-center'>
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "routing_id",
    render: (id) => (
      <SearchOutlined className='button-icon' onClick={() => viewRouting(id)} />
    ),
  },
];
