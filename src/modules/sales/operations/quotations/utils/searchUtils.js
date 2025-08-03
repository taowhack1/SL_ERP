import moment from "moment"
import { sortData } from "../../../../../include/js/function_main"

// Enhanced search function with multiple filters
export const getSearchData = (listData, filters) => {
    if (!listData || !listData[0]) return []

    let filteredData = listData[0]

    // Filter by quotation number
    if (filters.quotationNo && filters.quotationNo.trim()) {
        filteredData = filteredData.filter((qn) => qn.qn_no?.toUpperCase()?.includes(filters.quotationNo.toUpperCase()))
    }

    // Filter by create date range
    if (filters.createDateRange && filters.createDateRange[0] && filters.createDateRange[1]) {
        const startDate = moment(filters.createDateRange[0]).format("DD/MM/YYYY")
        const endDate = moment(filters.createDateRange[1]).format("DD/MM/YYYY")

        filteredData = filteredData.filter((qn) => {
            if (!qn.qn_created) return false
            const createDate = moment(qn.qn_created, "DD/MM/YYYY")
            const start = moment(startDate, "DD/MM/YYYY")
            const end = moment(endDate, "DD/MM/YYYY")
            return createDate.isBetween(start, end, "day", "[]")
        })
    }

    // Filter by customer
    if (filters.customer && filters.customer.trim()) {
        filteredData = filteredData.filter((qn) =>
            qn.customer_no_name?.toUpperCase()?.includes(filters.customer.toUpperCase()),
        )
    }

    // Filter by description
    if (filters.description && filters.description.trim()) {
        filteredData = filteredData.filter((qn) =>
            qn.qn_description?.toUpperCase()?.includes(filters.description.toUpperCase()),
        )
    }

    // Filter by salesperson
    if (filters.salesperson && filters.salesperson.trim()) {
        filteredData = filteredData.filter((qn) =>
            qn.qn_created_by_no_name?.toUpperCase()?.includes(filters.salesperson.toUpperCase()),
        )
    }

    // Filter by status
    if (filters.status && filters.status.trim()) {
        filteredData = filteredData.filter((qn) =>
            qn.trans_status_name?.toUpperCase()?.includes(filters.status.toUpperCase()),
        )
    }

    return sortData(filteredData)
}

// Check if any filter is active
export const hasActiveFilters = (filters) => {
    return (
        (filters.quotationNo && filters.quotationNo.trim()) ||
        (filters.createDateRange && filters.createDateRange[0] && filters.createDateRange[1]) ||
        (filters.customer && filters.customer.trim()) ||
        (filters.description && filters.description.trim()) ||
        (filters.salesperson && filters.salesperson.trim()) ||
        (filters.status && filters.status.trim())
    )
}

// Get search summary text
export const getSearchSummary = (filters, totalResults) => {
    const activeFilters = []

    if (filters.quotationNo && filters.quotationNo.trim()) {
        activeFilters.push(`Quotation: "${filters.quotationNo}"`)
    }
    if (filters.createDateRange && filters.createDateRange[0] && filters.createDateRange[1]) {
        const start = moment(filters.createDateRange[0]).format("DD/MM/YYYY")
        const end = moment(filters.createDateRange[1]).format("DD/MM/YYYY")
        activeFilters.push(`วันที่: ${start} - ${end}`)
    }
    if (filters.customer && filters.customer.trim()) {
        activeFilters.push(`ลูกค้า: "${filters.customer}"`)
    }
    if (filters.description && filters.description.trim()) {
        activeFilters.push(`รายละเอียด: "${filters.description}"`)
    }
    if (filters.salesperson && filters.salesperson.trim()) {
        activeFilters.push(`พนักงานขาย: "${filters.salesperson}"`)
    }
    if (filters.status && filters.status.trim()) {
        activeFilters.push(`สถานะ: "${filters.status}"`)
    }

    if (activeFilters.length === 0) {
        return `แสดงข้อมูลทั้งหมด (${totalResults} รายการ)`
    }

    return `ผลการค้นหา: ${activeFilters.join(", ")} - พบ ${totalResults} รายการ`
}
