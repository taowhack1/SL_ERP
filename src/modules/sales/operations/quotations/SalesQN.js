/** @format */

import React, { useEffect, useState, useMemo, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, withRouter } from "react-router-dom"
import { Row, Col, Table, Alert } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import MainLayout from "../../../../components/MainLayout"
import { filterQn } from "../../../../actions/sales"
import { reset_comments } from "../../../../actions/comment&log"
import { getMasterDataItem } from "../../../../actions/inventory"
import Authorize from "../../../system/Authorize"
import useKeepLogs from "../../../logs/useKeepLogs"
import { convertDigit } from "../../../../include/js/main_config"
import { getRefStatus, getSelfStepStatus } from "../../../../include/js/function_main"
import ModalConfirmOpenSO from "./ModalConfirmOpenSO"
import { useFetch } from "../../../../include/js/customHooks"
import { api_quo_list } from "../../../../include/js/api"
import LoadingOverlay from "./components/LoadingOverlay.js"
import { useSearchPersistence, test } from "./hooks/useSearchPersistence"
import { getSearchData, hasActiveFilters, getSearchSummary } from "./utils/searchUtils"

import SearchForm from './components/SearchForm'
import useQuotationSearchAPI from "../../../../include/js/customHooks/useQuotationSearchAPI"
import axios from 'axios'

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
            return getSelfStepStatus(record)
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
            return getRefStatus(record, () => onOpenSO(record))
        },
    },
]

const SalesQN = (props) => {
    const history = useHistory()
    const keepLog = useKeepLogs()
    const authorize = Authorize()
    authorize.check_authorize()
    const current_menu = useSelector((state) => state.auth.currentMenu)
    const auth = useSelector((state) => state.auth.authData)

    const [modal, setModal] = useState({
        visible: false,
        qn_id: null,
        qn_no: null,
    })

    const dispatch = useDispatch()
    const { filter } = useSelector((state) => state.sales.qn)
    const { pageSize, page } = filter || {}
    const [customers, setCustomer] = useState([])
    const [salesPerson, setSalesPerson] = useState([])

    // Use search persistence hook
    // Use the API hook
    const { data, loading, error, debouncedSearch, initialLoad } = useQuotationSearchAPI(`${process.env.REACT_APP_API_SERVER_V2}/sales/quotation`, auth.user_name)


    // Handle search with loading state
    const handleSearch = useCallback(
        (searchFilters) => {
            console.log("Search triggered with filters:", searchFilters)
            debouncedSearch(searchFilters)
        },
        [debouncedSearch],
    )

    // todo wait for api to be ready

    const statusOptions = useMemo(
        () => [
            { value: "", label: "All" },
            { value: "Draft", label: "Draft" },
            { value: "Confirm", label: "Confirm" },
            { value: "Cancel", label: "Cancel" },
            { value: "Completed", label: "Completed" },
        ],
        [],
    )

    useEffect(() => {
        dispatch(reset_comments())
        dispatch(getMasterDataItem())

        async function loadData() {
            const { data: dataCustomer } = await axios.get(`${process.env.REACT_APP_API_SERVER_V2}/sales/customer?search=${''}`)
            const customerOptions = dataCustomer.map(obj => ({
                value: obj?.customer_no,
                label: obj?.customer_name,
                id: obj?.customer_no
            }))

            console.log("customers", customerOptions)

            const { data: dataSalesPerson } = await axios.get(`${process.env.REACT_APP_API_SERVER_V2}/sales/salesperson?search=${''}`)
            const salespersonOptions = dataSalesPerson.map(obj => ({
                value: obj?.emp_id,
                label: obj?.emp_full_name,
                id: obj?.emp_id
            }))

            console.log("salesPerson", salespersonOptions)

            setCustomer(customerOptions)
            setSalesPerson(salespersonOptions)
        }

        loadData()

        initialLoad(filter)
    }, [dispatch, initialLoad])

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra)
        const { current, pageSize } = pagination
        dispatch(filterQn({ page: current, pageSize }))
    }

    const onOpenSO = ({ qn_id, qn_no }) => {
        setModal((prev) => ({ ...prev, visible: true, qn_id, qn_no }))
        console.log("qn_id", qn_id)
    }

    const onConfirm = () => {
        console.log("Confirm Open SO")
        setModal((prev) => ({ ...prev, visible: false }))
        history.push({
            pathname: "/sales/orders/create",
            state: { data_head: { qn_id: modal.qn_id } },
        })
    }

    const onCancel = () => {
        console.log("Cancel ")
        setModal((prev) => ({ ...prev, visible: false }))
    }

    const config = {
        projectId: 7,
        title: "SALES",
        home: "/sales",
        show: true,
        breadcrumb: ["Home", "Quotations"],
        search: false,
        create: "/sales/quotations/create",
        buttonAction: current_menu.button_create !== 0 ? ["Create"] : [],
        discard: "/sales/quotations",
        onCancel: () => {
            console.log("Cancel")
        },
        searchBar: false,
    }

    const modalConfig = useMemo(
        () => ({
            ...modal,
            onConfirm,
            onCancel,
        }),
        [modal],
    )

    // Calculate search summary
    // const searchSummary = useMemo(() => {
    //     return getSearchSummary(searchFilters, state.length)
    // }, [searchFilters, state.length])

    // const showSearchAlert = hasActiveFilters(searchFilters)
    console.log("Search QN Error", error)
    return (
        <>
            <MainLayout {...config}>
                <Row style={{ marginTop: 10 }}>
                    <Col span={24}>
                        <SearchForm
                            onSearch={handleSearch}
                            loading={loading}
                            customerOptions={customers}
                            salespersonOptions={salesPerson}
                            statusOptions={statusOptions}
                        // existingFilters={{ salesType, soProductionType, so_status, keyword }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table
                            columns={quotationColumns({ onOpenSO })}
                            dataSource={data}
                            loading={loading}
                            onChange={onChange}
                            rowKey="qn_id"
                            size="small"
                            pagination={{
                                pageSize,
                                current: page,
                                pageSizeOptions: ["15", "20", "30", "50", "100", "1000"],
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => `${range[0]}-${range[1]} จาก ${total} รายการ`,
                            }}
                            bordered
                            rowClassName="row-pointer"
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (e) => {
                                        if (!e.target.className.split(" ").includes("function")) {
                                            keepLog.keep_log_action(record.qn_no)
                                            props.history.push({
                                                pathname: "/sales/quotations/view/" + record.qn_id,
                                            })
                                        }
                                    },
                                }
                            }}
                        // locale={{
                        //     emptyText: showSearchAlert ? "ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา" : "ไม่มีข้อมูล",
                        // }}
                        />
                    </Col>
                </Row>
            </MainLayout>

            {/* Loading Overlay */}
            <LoadingOverlay loading={loading} tip="กำลังค้นหาข้อมูล Quotations..." />

            <ModalConfirmOpenSO {...modalConfig} />
        </>
    )
}

export default withRouter(SalesQN)
