import React from "react"
import { useState, useCallback, useMemo } from "react"

const useSalesOrdersSearch = (originalData = []) => {
    const [searchFilters, setSearchFilters] = useState({
        soNo: "",
        orderDateFrom: "",
        orderDateTo: "",
        customer: "",
        customer_id: "",
        salesperson: "",
        sale_id: "",
        status: "",
    })

    const [loading, setLoading] = useState(false)

    // Memoized filter function for better performance
    const filteredData = useMemo(() => {
        if (!originalData || originalData.length === 0) return []

        let filtered = [...originalData]

        // Filter by SO No.
        if (searchFilters.soNo) {
            filtered = filtered.filter(
                (item) => item.so_no && item.so_no.toLowerCase().includes(searchFilters.soNo.toLowerCase()),
            )
        }

        // Filter by Order Date Range
        if (searchFilters.orderDateFrom && searchFilters.orderDateTo) {
            filtered = filtered.filter((item) => {
                if (!item.so_order_date) return false

                const itemDate = new Date(item.so_order_date.split("/").reverse().join("-"))
                const fromDate = new Date(searchFilters.orderDateFrom)
                const toDate = new Date(searchFilters.orderDateTo)

                return itemDate >= fromDate && itemDate <= toDate
            })
        }

        // Filter by Customer
        if (searchFilters.customer) {
            filtered = filtered.filter(
                (item) =>
                    item.customer_no_name && item.customer_no_name.toLowerCase().includes(searchFilters.customer.toLowerCase()),
            )
        }

        // Filter by Salesperson
        if (searchFilters.salesperson) {
            filtered = filtered.filter(
                (item) =>
                    item.so_sales_person_no_name &&
                    item.so_sales_person_no_name.toLowerCase().includes(searchFilters.salesperson.toLowerCase()),
            )
        }

        // Filter by Status
        if (searchFilters.status) {
            filtered = filtered.filter((item) => item.trans_status_name === searchFilters.status)
        }

        return filtered

    }, [originalData, searchFilters])

    const handleSearch = useCallback(async (filters) => {
        setLoading(true)
        setSearchFilters(filters)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setLoading(false)
    }, [])

    // Extract unique options from data for dropdowns
    const customerOptions = useMemo(() => {
        if (!originalData) return []

        const uniqueCustomers = [
            ...new Set(originalData.filter((item) => item.customer_no_name).map((item) => item.customer_no_name)),
        ]

        return uniqueCustomers.map((customer) => ({
            value: customer,
            label: customer,
        }))
    }, [originalData])

    const salespersonOptions = useMemo(() => {
        if (!originalData) return []

        const uniqueSalespersons = [
            ...new Set(
                originalData.filter((item) => item.so_sales_person_no_name).map((item) => item.so_sales_person_no_name),
            ),
        ]

        return uniqueSalespersons.map((salesperson) => ({
            value: salesperson,
            label: salesperson,
        }))
    }, [originalData])

    const statusOptions = useMemo(
        () => [
            { value: "Available", label: "Available" },
            { value: "Completed", label: "Completed" },
            { value: "Cancel", label: "Cancel" },
            { value: "Open DR 1", label: "Open DR 1" },
            { value: "Open DR 2", label: "Open DR 2" },
            { value: "None DR", label: "None DR" },
            { value: "Transports 1", label: "Transports 1" },
            { value: "Transports 2", label: "Transports 2" },
            { value: "Transports 3", label: "Transports 3" },
            { value: "Transports 4", label: "Transports 4" },
            { value: "Pending Approve", label: "Pending Approve" },
            { value: "Pending Confirm", label: "Pending Confirm" },
            { value: "Draft", label: "Waiting" },
        ],
        [],
    )

    return {
        filteredData,
        loading,
        searchFilters,
        handleSearch,
        customerOptions,
        salespersonOptions,
        statusOptions,
    }
}

export default useSalesOrdersSearch
