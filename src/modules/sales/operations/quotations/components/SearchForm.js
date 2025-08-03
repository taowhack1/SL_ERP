
import React, { useState, useEffect, useCallback, useRef } from "react"
import { Input, DatePicker, Select, Row, Col, Button, Space, Spin } from "antd"
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons"
import Text from "antd/lib/typography/Text"
import moment from 'moment'

const { RangePicker } = DatePicker
const { Option } = Select

const SearchForm = ({
    onSearch,
    loading = false,
    customerOptions = [],
    salespersonOptions = [],
    statusOptions = [],
    existingFilters = {}, // Redux filters
}) => {
    const [filters, setFilters] = useState({
        soNo: "",
        orderDateFrom: "",
        orderDateTo: "",
        customer: "",
        customer_id: "",
        salesperson: "",
        sale_id: "",
        status: "",
    })

    const searchTimeoutRef = useRef(null)

    // Load saved filters from localStorage on mount
    useEffect(() => {
        const savedFilters = localStorage.getItem("searchFormFilters")
        if (savedFilters) {
            try {
                const parsedFilters = JSON.parse(savedFilters)
                setFilters(parsedFilters)
                // Trigger search with saved filters and existing Redux filters
                handleSearchWithFilters(parsedFilters)
            } catch (error) {
                console.error("Error parsing saved filters:", error)
            }
        } else {
            // If no saved filters, trigger search with existing Redux filters only
            handleSearchWithFilters(filters)
        }
    }, [])

    // Save filters to localStorage whenever filters change
    useEffect(() => {
        localStorage.setItem("searchFormFilters", JSON.stringify(filters))
    }, [filters])

    // Function to combine search filters with existing Redux filters
    const handleSearchWithFilters = useCallback(
        (searchFilters) => {
            const combinedFilters = {
                ...searchFilters,
                // Include existing Redux filters
                salesType: existingFilters?.salesType || '',
                soProductionType: existingFilters?.soProductionType || '',
                so_status: existingFilters?.so_status || '',
                keyword: existingFilters?.keyword || '',
            }

            onSearch(combinedFilters)
        },
        [onSearch, existingFilters],
    )

    // Debounced search function
    const debouncedSearch = useCallback(
        (newFilters) => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current)
            }

            searchTimeoutRef.current = setTimeout(() => {
                handleSearchWithFilters(newFilters)
            }, 2000)
        },
        [handleSearchWithFilters],
    )

    const handleInputChange = (field, value, record) => {
        console.log("handleInputChange", record)
        const newFilters = { ...filters, [field]: value }
        switch (field) {
            case 'customer':
                newFilters.customer_id = record?.id || null
                break;
            case 'salesperson':
                newFilters.sale_id = record?.id || null
                break;
            default:
                break;
        }
        setFilters(newFilters)
        debouncedSearch(newFilters)
    }

    const handleDateRangeChange = (dates, dateStrings) => {
        const newFilters = {
            ...filters,
            orderDateFrom: dateStrings[0] || "",
            orderDateTo: dateStrings[1] || "",
        }
        setFilters(newFilters)
        debouncedSearch(newFilters)
    }

    const clearFilters = () => {
        const emptyFilters = {
            soNo: "",
            orderDateFrom: "",
            orderDateTo: "",
            customer: "",
            customer_id: "",
            salesperson: "",
            sale_id: "",
            status: "",
        }
        setFilters(emptyFilters)
        localStorage.removeItem("searchFormFilters")
        handleSearchWithFilters(emptyFilters)
    }

    // Manual search button (immediate search)
    const handleManualSearch = () => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current)
        }
        handleSearchWithFilters(filters)
    }

    return (
        <>
            <div
                style={{
                    padding: "16px",
                    backgroundColor: "#fafafa",
                    borderRadius: "6px",
                    marginBottom: "16px",
                    border: "1px solid #d9d9d9",
                }}
            >
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={6} lg={4}>
                        <div>
                            <Text strong style={{ display: "block", marginBottom: "4px" }}>
                                QN No.
                            </Text>
                            <Input
                                placeholder="ค้นหา Quotations"
                                value={filters.soNo}
                                onChange={(e) => handleInputChange("soNo", e.target.value)}
                                prefix={<SearchOutlined />}
                                allowClear
                            />
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6} lg={4}>
                        <div>
                            <Text strong style={{ display: "block", marginBottom: "4px" }}>
                                Description
                            </Text>
                            <Input
                                placeholder="ค้นหา Description"
                                value={filters.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                prefix={<SearchOutlined />}
                                allowClear
                            />
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={4}>
                        <div>
                            <Text strong style={{ display: "block", marginBottom: "4px" }}>
                                Create Date
                            </Text>
                            <RangePicker
                                style={{ width: "100%" }}
                                onChange={handleDateRangeChange}
                                format="YYYY-MM-DD"
                                placeholder={["วันที่เริ่มต้น", "วันที่สิ้นสุด"]}
                                value={[filters.orderDateFrom ? moment(filters.orderDateFrom) : null, filters.orderDateTo ? moment(filters.orderDateTo) : null]}
                            />
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6} lg={4}>
                        <div>
                            <Text strong style={{ display: "block", marginBottom: "4px" }}>
                                Customer
                            </Text>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="เลือกลูกค้า"
                                value={filters.customer || undefined}
                                onChange={(value, prop) => handleInputChange("customer", value || "", prop)}
                                allowClear
                                showSearch
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {customerOptions.map((option) => (
                                    <Option key={option.value} value={option.value} id={option.id}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6} lg={4}>
                        <div>
                            <Text strong style={{ display: "block", marginBottom: "4px" }}>
                                Salesperson
                            </Text>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="เลือกพนักงานขาย"
                                value={filters.salesperson || undefined}
                                onChange={(value, prop) => handleInputChange("salesperson", value || "", prop)}
                                allowClear
                                showSearch
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                {salespersonOptions.map((option) => (
                                    <Option key={option.value} value={option.value} id={option.id}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>

                    {/* <Col xs={24} sm={12} md={6} lg={3}>
                        <div>
                            <Text strong style={{ display: "block", marginBottom: "4px" }}>
                                Status
                            </Text>
                            <Select
                                style={{ width: "100%" }}
                                placeholder="เลือกสถานะ"
                                value={filters.status || undefined}
                                onChange={(value) => handleInputChange("status", value || "")}
                                allowClear
                            >
                                {statusOptions.map((option) => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col> */}

                    <Col xs={24} sm={12} md={6} lg={3}>
                        <div style={{ display: "flex", alignItems: "flex-end", height: "100%", paddingTop: "24px" }}>
                            <Space>
                                {loading && (
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />
                                        <Text style={{ marginLeft: "8px", fontSize: "12px", color: "#666" }}>กำลังค้นหา...</Text>
                                    </div>
                                )}
                                <Button onClick={handleManualSearch} size="small" type="primary" disabled={loading}>
                                    ค้นหา
                                </Button>
                                <Button onClick={clearFilters} size="small">
                                    ล้างตัวกรอง
                                </Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default SearchForm
