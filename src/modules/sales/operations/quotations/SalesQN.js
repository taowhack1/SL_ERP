/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import MainLayout from "../../../../components/MainLayout";
import { filterQn } from "../../../../actions/sales";
import { reset_comments } from "../../../../actions/comment&log";
import { getMasterDataItem } from "../../../../actions/inventory";
import Authorize from "../../../system/Authorize";
import useKeepLogs from "../../../logs/useKeepLogs";
import { convertDigit } from "../../../../include/js/main_config";
import {
  getRefStatus,
  getSelfStepStatus,
  sortData,
} from "../../../../include/js/function_main";
import ModalConfirmOpenSO from "./ModalConfirmOpenSO";
import { useFetch } from "../../../../include/js/customHooks";
import { api_quo_list } from "../../../../include/js/api";
export const quotationColumns = ({ onOpenSO }) => [
  {
    title: "Reference",
    dataIndex: "qn_no",
    key: "qn_no",
    width: "7%",
    align: "left",
    sorter: {
      compare: (a, b) => a.qn_id - b.qn_id,
      multiple: 3,
    },
    render: (value) => value || "-",
  },
  {
    title: "Create Date",
    dataIndex: "qn_created",
    key: "qn_created",
    width: "7%",
    align: "center",
    render: (value) => value || "-",
  },
  {
    title: "Expire Date",
    dataIndex: "qn_exp_date",
    key: "qn_exp_date",
    width: "7%",
    align: "center",
    render: (value) => value || "-",
  },
  {
    title: "Customer",
    dataIndex: "customer_no_name",
    key: "customer_no_name",
    width: "20%",
    align: "left",
    ellipsis: true,
    render: (value) => value || "-",
  },
  {
    title: "Description",
    dataIndex: "qn_description",
    key: "qn_description",
    width: "18%",
    align: "left",
    ellipsis: true,
    render: (value) => value || "-",
  },
  {
    title: "Salespersons",
    dataIndex: "qn_created_by_no_name",
    key: "qn_created_by_no_name",
    width: "15%",
    align: "left",
    ellipsis: true,
    render: (value) => value || "-",
  },
  {
    title: "Total Value",
    dataIndex: "tg_qn_total_amount",
    key: "tg_qn_total_amount",
    width: "10%",
    align: "right",
    sorter: {
      compare: (a, b) => a.tg_qn_total_amount - b.tg_qn_total_amount,
      multiple: 3,
    },
    render: (value) => convertDigit(value),
    ellipsis: true,
  },

  {
    title: "Quotations Status",
    dataIndex: "trans_status_name",
    key: "trans_status_name",
    width: "8%",
    align: "center",
    sorter: {
      compare: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
      multiple: 3,
    },
    ellipsis: true,
    render: (value, record, index) => {
      return getSelfStepStatus(record);
    },
  },
  {
    title: "S/O Status",
    dataIndex: "trans_close_name",
    key: "trans_close_name",
    width: "8%",
    align: "center",
    ellipsis: true,
    render: (value, record, index) => {
      return getRefStatus(record, () => onOpenSO(record));
    },
  },
];

const SalesQN = (props) => {
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const current_menu = useSelector((state) => state.auth.currentMenu);
  const auth = useSelector((state) => state.auth.authData);
  const [modal, setModal] = useState({
    visible: false,
    qn_id: null,
    qn_no: null,
  });
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.sales.qn);
  const { pageSize, page, keyword } = filter || {};
  const dataTable = useSelector((state) => state.sales.qn.qn_list);
  const [state, setState] = useState(dataTable || []);
  const listDataQn = useFetch(`${api_quo_list}/all/${auth.user_name}`);
  const getSearchData = (keyword) => {
    const search_data =
      listDataQn?.data &&
      sortData(
        keyword
          ? listDataQn?.data[0]?.filter(
              (qn) =>
                qn.qn_no?.toUpperCase()?.indexOf(keyword?.toUpperCase()) > -1 ||
                qn.qn_created?.toUpperCase()?.indexOf(keyword?.toUpperCase()) >
                  -1 ||
                qn.customer_no_name
                  ?.toUpperCase()
                  ?.indexOf(keyword?.toUpperCase()) > -1 ||
                qn.qn_description
                  ?.toUpperCase()
                  ?.indexOf(keyword?.toUpperCase()) > -1 ||
                qn.qn_created_by_no_name
                  ?.toUpperCase()
                  ?.indexOf(keyword?.toUpperCase()) > -1
            )
          : listDataQn?.data[0]
      );

    return sortData(search_data);
  };
  useEffect(() => {
    console.log("Filter Keyword", keyword);
    const respSearch = getSearchData(keyword);
    setState(respSearch);
  }, [keyword, listDataQn?.data]);
  useEffect(() => {
    dispatch(reset_comments());
    dispatch(getMasterDataItem());
  }, []);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    const { current, pageSize } = pagination;
    dispatch(filterQn({ page: current, pageSize }));
  };

  const onOpenSO = ({ qn_id, qn_no }) => {
    setModal((prev) => ({ ...prev, visible: true, qn_id, qn_no }));
    console.log("qn_id", qn_id);
  };
  const onConfirm = () => {
    console.log("Confirm Open SO");
    setModal((prev) => ({ ...prev, visible: false }));
    history.push({
      pathname: "/sales/orders/create",
      state: { data_head: { qn_id: modal.qn_id } },
    });
  };
  const onCancel = () => {
    console.log("Cancel ");
    setModal((prev) => ({ ...prev, visible: false }));
  };
  const config = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: ["Home", "Quotations"],
    search: true,
    create: "/sales/quotations/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    discard: "/sales/quotations",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (value) => {
      dispatch(filterQn({ keyword: value }));
    },
    searchValue: keyword || null,
    searchBar: (
      <Button
        className='primary'
        onClick={() =>
          dispatch(
            filterQn({
              page: 1,
              pageSize: 20,
              keyword: null,
              qn_id: null,
            })
          )
        }>
        Clear Filter
      </Button>
    ),
  };

  const modalConfig = React.useMemo(
    () => ({
      ...modal,
      onConfirm,
      onCancel,
    }),
    [modal, onConfirm, onCancel]
  );
  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={quotationColumns({ onOpenSO })}
              dataSource={state}
              loading={listDataQn.loading ? true : false}
              onChange={onChange}
              rowKey='qn_id'
              size='small'
              pagination={{
                pageSize,
                current: page,
                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
              }}
              bordered
              rowClassName='row-pointer'
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    // console.log("e", e.target.className.split(" "));
                    if (!e.target.className.split(" ").includes("function")) {
                      keepLog.keep_log_action(record.qn_no);
                      props.history.push({
                        pathname: "/sales/quotations/view/" + record.qn_id,
                      });
                    }
                  },
                };
              }}
            />
          </Col>
        </Row>
      </MainLayout>
      <ModalConfirmOpenSO {...modalConfig} />
    </div>
  );
};

export default withRouter(SalesQN);
