/** @format */

import { Button, Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { useFetch } from "../../../../include/js/customHooks";
import { sortData } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";
import { useDispatch, useSelector } from "react-redux";
import { filterRouting } from "../../../../actions/production/routingAction";

const apiGetRouting = `/production/routing`;
const Routing = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data, error, loading } = useFetch(apiGetRouting);
  const [state, setState] = useState([]);
  const [loadingrouting, setLoading] = useState(false);
  const { filter } = useSelector((state) => state.production.routing);
  const { pageSize, page, keyword } = filter || {};
  const getSearchData = (data, keyword) => {
    const search_data = sortData(
      keyword
        ? data?.filter(
            (routing) =>
              routing?.item_no?.indexOf(keyword) >= 0 ||
              routing?.item_no_name?.indexOf(keyword) >= 0 ||
              routing?.routing_created_by?.indexOf(keyword) >= 0 ||
              routing?.routing_description?.indexOf(keyword) >= 0 ||
              routing?.routing_no?.indexOf(keyword) >= 0
          )
        : data
    );

    return sortData(search_data);
  };
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      console.log("Filter Keyword ");
      const respSearch = getSearchData(data && data[0], keyword);
      setState(respSearch);
      setLoading(false);
    }
  }, [keyword, data && data[0], loading]);
  const config = {
    projectId: 10,
    title: "PRODUCTION",
    home: "/production",
    show: true,
    breadcrumb: ["Home", "Routing"],
    create: "/production/routing/create",
    buttonAction: ["Create"],
    edit: {},
    search: true,
    onSearch: (value) => {
      dispatch(filterRouting({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterRouting({
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
    discard: "/production/routing",
    onCancel: () => {
      console.log("Cancel");
    },
  };

  const viewRouting = (id) => {
    if (!id) return false;
    history.push(`/production/routing/${id}`);
  };
  console.log("state RoutingList:>> ", state);
  return (
    <MainLayout {...config}>
      <Row>
        <Col span={24}>
          <Table
            bordered
            dataSource={state}
            loading={loadingrouting}
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
