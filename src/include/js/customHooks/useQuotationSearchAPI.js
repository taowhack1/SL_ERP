"use client"

import { useState, useCallback, useRef } from "react"
import axios from "axios"

const useQuotationSearchAPI = (apiEndpoint, username) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const searchTimeoutRef = useRef(null)

    // Function to call search API
    const searchAPI = useCallback(
        async (searchFilters) => {
            setLoading(true)
            setError(null)

            try {
                // Prepare search object for API
                const searchObject = {
                    username: username,
                    filters: {
                        qn_no: searchFilters.soNo || null,
                        start_date: searchFilters.orderDateFrom || null,
                        end_date: searchFilters.orderDateTo || null,
                        customer: searchFilters.customer || null,
                        customer_id: searchFilters.customer_id || null,
                        salesperson: searchFilters.salesperson || null,
                        sale_id: searchFilters.sale_id || null,
                        status: searchFilters.status || null,
                        description: searchFilters.description || null
                    },
                }

                console.log("Search API Object:", searchObject)

                // Call your API endpoint
                const response = await axios.post(`${apiEndpoint}/search`, searchObject)
                console.log("Search API Response:", response)
                if (response.data && response.data.success) {
                    setData(response.data.data || [])
                } else {
                    setError("Failed to fetch data")
                    setData([])
                }
            } catch (err) {
                console.error("Search API Error:", err)
                setError(err.message || "An error occurred while searching")
                setData([])
            } finally {
                setLoading(false)
            }
        },
        [apiEndpoint, username],
    )

    // Debounced search function
    const debouncedSearch = useCallback(
        (searchFilters) => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current)
            }

            searchTimeoutRef.current = setTimeout(() => {
                searchAPI(searchFilters)
            }, 2000) // 2 seconds delay
        },
        [searchAPI],
    )

    // Initial load function
    const initialLoad = useCallback(
        async (existingFilters = {}) => {
            setLoading(true)
            setError(null)

            try {
                const initialObject = {
                    username: username,
                    filters: {
                        qn_no: null,
                        start_date: null,
                        end_date: null,
                        customer: null,
                        customer_id: null,
                        salesperson: null,
                        sale_id: null,
                        status: null,
                    },
                    existing_filters: existingFilters,
                }

                const response = await axios.post(`${apiEndpoint}/search`, initialObject)

                if (response.data && response.data.success) {
                    setData(response.data.data || [])
                } else {
                    setError("Failed to load initial data")
                    setData([])
                }
            } catch (err) {
                console.error("Initial Load Error:", err)
                setError(err.message || "An error occurred while loading data")
                setData([])
            } finally {
                setLoading(false)
            }
        },
        [apiEndpoint, username],
    )

    return {
        data,
        loading,
        error,
        searchAPI,
        debouncedSearch,
        initialLoad,
    }
}

export default useQuotationSearchAPI
