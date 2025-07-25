import React, { useCallback, useEffect, useState, useMemo, useRef } from "react"
import { withRouter } from "react-router-dom"
import { Row, Col, Space, Button, message } from "antd"
import MainLayout from "../../components/MainLayout"
import $ from "jquery"
import { useDispatch, useSelector } from "react-redux"
import { get_sale_master_data, updateSOFilter } from "../../actions/sales"
import { reset_comments } from "../../actions/comment&log"
import { getMasterDataItem } from "../../actions/inventory"
import Authorize from "../system/Authorize"
import useKeepLogs from "../logs/useKeepLogs"
import Text from "antd/lib/typography/Text"
import DRForm from "./operations/dr/form/DRForm"
import CustomSelect from "../../components/CustomSelect"
import { api_so } from "../../include/js/api"

// Import new components and hooks
import SalesOrdersSearch from "./components/SalesOrdersSearch"
import SalesOrdersTable from "./components/SalesOrdersTable"
import useSalesOrdersAPI from "../../include/js/customHooks/useSalesOrdersAPI"

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

  // Table search states (for existing SOFilter functionality)
  const refSearchInput = useRef()
  const [searchText, setSearchText] = useState("")
  const [searchedColumn, setSearchedColumn] = useState(0)

  // Use the API hook
  const { data, loading, error, debouncedSearch, initialLoad } = useSalesOrdersAPI(process.env.REACT_APP_API_SERVER_V2 + `/sales/so`, auth.user_name)

  // todo wait for api to be ready
  const customerOptions = useMemo(() => {
    if (!data || data.length === 0) return []

    const uniqueCustomers = [
      ...new Set(data.filter((item) => item.customer_no_name).map((item) => item.customer_no_name)),
    ]

    return uniqueCustomers.map((customer) => ({
      value: customer,
      label: customer,
      id: data.find((item) => item.customer_no_name === customer)?.customer_no,
    }))
  }, [data])

  // todo wait for api to be ready
  const salespersonOptions = useMemo(() => {
    if (!data || data.length === 0) return []

    const uniqueSalespersons = [
      ...new Set(data.filter((item) => item.so_sales_person_no_name).map((item) => item.so_sales_person_no_name)),
    ]

    return uniqueSalespersons.map((salesperson) => ({
      value: salesperson,
      label: salesperson,
      id: data.find((item) => item.so_sales_person_no_name === salesperson)?.so_sales_person,
    }))
  }, [data])

  const statusOptions = useMemo(
    () => [
      { value: "Draft", label: "Draft" },
      { value: "Confirm", label: "Confirm" },
      { value: "Cancel", label: "Cancel" },
      { value: "Completed", label: "Completed" },
      { value: "None DR", label: "None DR" },
    ],
    [],
  )

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

  // Initial load when component mounts or Redux filters change
  useEffect(() => {
    const existingFilters = {
      salesType,
      soProductionType,
      so_status,
      keyword,
    }
    initialLoad(existingFilters)
  }, [salesType, soProductionType, so_status, keyword, initialLoad])

  // Handle search from search component
  const handleSearch = useCallback(
    (searchFilters) => {
      console.log("Search triggered with filters:", searchFilters)
      debouncedSearch(searchFilters)
    },
    [debouncedSearch],
  )

  // Modal handlers
  const onClose = useCallback(() => {
    setModal((prev) => ({
      ...prev,
      visible: false,
      dr_id: null,
      so_detail_id: null,
    }))
    // Reload data after modal close
    const existingFilters = {
      salesType,
      soProductionType,
      so_status,
      keyword,
    }
    initialLoad(existingFilters)
  }, [setModal, initialLoad, salesType, soProductionType, so_status, keyword])

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

  // Show error message if API call fails
  useEffect(() => {
    if (error) {
      message.error(`เกิดข้อผิดพลาด: ${error}`)
    }
  }, [error])

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

  return (
    <div>
      <MainLayout {...config}>
        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            {/* Enhanced Search Component */}
            <SalesOrdersSearch
              onSearch={handleSearch}
              loading={loading}
              customerOptions={customerOptions}
              salespersonOptions={salespersonOptions}
              statusOptions={statusOptions}
              existingFilters={{ salesType, soProductionType, so_status, keyword }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>


            {/* Enhanced Table Component */}
            <SalesOrdersTable
              data={data}
              loading={loading}
              error={error}
              pagination={{
                pageSize,
                current: page,
                total: data.length,
                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
              }}
              onChange={onChange}
              onRowClick={onRowClick}
              onOpen={onOpen}
              isProduction={filter.soProductionType === 3}
              // Keep existing table search functionality
              refSearchInput={refSearchInput}
              searchText={searchText}
              setSearchText={setSearchText}
              searchedColumn={searchedColumn}
              setSearchedColumn={setSearchedColumn}
            />
          </Col>
        </Row>
        <DRForm {...modalConfig} />
      </MainLayout>
    </div>
  )
}

export default withRouter(SaleOrder)
