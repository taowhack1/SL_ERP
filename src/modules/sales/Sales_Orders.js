import React, { useCallback, useEffect, useState, useMemo, useRef } from "react"
import { withRouter } from "react-router-dom"
import { Row, Col, Space, Button, message } from "antd"
import MainLayout from "../../components/MainLayout"
import $ from "jquery"
import { useDispatch, useSelector } from "react-redux"
import { get_sale_master_data, updateSOFilter } from "../../actions/sales"
import { reset_comments } from "../../actions/comment&log"
import { getMasterDataItem } from "../../actions/inventory"
import axios from 'axios'
import Authorize from "../system/Authorize"
import useKeepLogs from "../logs/useKeepLogs"
import DRForm from "./operations/dr/form/DRForm"
// Import new components and hooks
import SalesOrdersSearch from "./components/SalesOrdersSearch"
import SalesOrdersTable from "./components/SalesOrdersTable"
import useSalesOrdersAPI from "../../include/js/customHooks/useSalesOrdersAPI"
import SearchSalesOrder from "./components/SearchSalesOrder"
import useSearch from "../../include/js/customHooks/useSearch"

const SaleOrder = (props) => {
  const keepLog = useKeepLogs()
  const authorize = Authorize()
  authorize.check_authorize()

  const current_menu = useSelector((state) => state.auth.currentMenu)
  const auth = useSelector((state) => state.auth.authData)
  const { filter } = useSelector((state) => state.sales.so)
  const { pageSize, page, keyword, so_status, soProductionType, salesType } = filter || {}

  const dispatch = useDispatch()
  const [rowClick, setRowClick] = useState(false)

  const [modal, setModal] = useState({
    visible: false,
    dr_id: null,
    so_detail_id: null,
  })

  useEffect(() => {
    dispatch(get_sale_master_data())
    dispatch(reset_comments())
    dispatch(getMasterDataItem())
  }, [])

  // Modal handlers
  const onClose = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      visible: false,
      dr_id: null,
      so_detail_id: null,
    }))

    // todo search
  }, [setModal])

  const onOpen = useCallback(
    (so_detail_id) =>
      setModal((prev) => ({
        ...prev,
        visible: true,
        dr_id: null,
        so_detail_id,
      })),
    [setModal],
  )

  const modalConfig = useMemo(
    () => ({
      ...modal,
      onClose,
    }),
    [modal, onClose],
  )

  // Table handlers
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("Table params", pagination, filters, sorter, extra)
    const { current, pageSize } = pagination
    dispatch(updateSOFilter({ page: current, pageSize }))
  }

  const onRowClick = useCallback(
    (e, record) => {
      setRowClick(true)
      $(e.target).closest("tbody").find("tr").removeClass("selected-row")
      $(e.target).closest("tr").addClass("selected-row")
      keepLog.keep_log_action(record.so_no)

      props.history.push({
        pathname: "/sales/orders/view/" + record.so_id,
        state: record,
      })
    },
    [keepLog, props.history],
  )

  const current_project = useSelector((state) => state.auth.currentProject)

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Sale Orders"],
    search: false,
    searchValue: filter.keyword,
    create: "/sales/orders/create",
    buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
    disabledEditBtn: !rowClick,
    discard: "/sales/orders",
    onCancel: () => {
      console.log("Cancel")
    },
    onSearch: (value) => {
      console.log(value)
      dispatch(updateSOFilter({ keyword: value }))
    },
    searchBar: false,
  }

  const searchHook = useSearch({
    endpoint: `${process.env.REACT_APP_API_SERVER_V2}/sales/so`,
    initialParams: {
      user_name: auth.user_name,
      filter: {
        so: undefined,
        description: undefined,
        sale: undefined,
        customer: undefined,
        create_date: undefined,
        status: undefined,
      },
    },
    debounceMs: 1000,
    mapResult: (res) => res,
    storageKey: "SOState",
  });


  if (searchHook?.params?.user_name != auth.user_name) {
    searchHook.clear()
  }
  return (
    <div>
      <MainLayout {...config}>
        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            <SearchSalesOrder
              hook={searchHook}
              initialUI={{
                so: searchHook.params.filter?.so || "",
                description: searchHook.params.filter?.description || "",
                sale: { label: searchHook.params?.filter?.selected_sale?.label || searchHook.params?.filter?.sales || "", value: "" },
                customer: { label: searchHook.params?.filter?.selected_customer?.label || searchHook.params?.filter?.customer || "", value: "" },
                create_date: [searchHook.params.filter?.create_date_start || null, searchHook.params.filter?.create_date_end],
                status: searchHook.params.filter.status || "",
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>


            {/* Enhanced Table Component */}
            <SalesOrdersTable
              data={searchHook?.data}
              loading={searchHook?.loading}
              pagination={false}
              scroll={{ y: 500 }}
              onChange={onChange}
              onRowClick={onRowClick}
              onOpen={onOpen}
              isProduction={filter.soProductionType === 3}
            // Keep existing table search functionality
            // refSearchInput={refSearchInput}
            // searchText={searchText}
            // setSearchText={setSearchText}
            // searchedColumn={searchedColumn}
            // setSearchedColumn={setSearchedColumn}
            />
          </Col>
        </Row>
        <DRForm {...modalConfig} />
      </MainLayout>
    </div>
  )
}

export default withRouter(SaleOrder)
