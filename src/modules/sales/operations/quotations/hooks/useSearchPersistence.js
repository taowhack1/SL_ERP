import { useState, useEffect } from "react"

const STORAGE_KEY = "quotation_search_filters"

export const useSearchPersistence = () => {
    const [searchFilters, setSearchFilters] = useState({
        quotationNo: "",
        createDateRange: null,
        customer: "",
        description: "",
        salesperson: "",
        status: "",
    })

    // Load saved filters on component mount
    useEffect(() => {
        try {
            const savedFilters = localStorage.getItem(STORAGE_KEY)
            if (savedFilters) {
                const parsed = JSON.parse(savedFilters)
                setSearchFilters(parsed)
            }
        } catch (error) {
            console.error("Error loading saved search filters:", error)
        }
    }, [])

    // Save filters to localStorage
    const saveSearchFilters = (filters) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filters))
            setSearchFilters(filters)
        } catch (error) {
            console.error("Error saving search filters:", error)
        }
    }

    // Clear saved filters
    const clearSearchFilters = () => {
        try {
            localStorage.removeItem(STORAGE_KEY)
            const clearedFilters = {
                quotationNo: "",
                createDateRange: null,
                customer: "",
                description: "",
                salesperson: "",
                status: "",
            }
            setSearchFilters(clearedFilters)
        } catch (error) {
            console.error("Error clearing search filters:", error)
        }
    }

    return {
        searchFilters,
        saveSearchFilters,
        clearSearchFilters,
    }
}

export const test = '1234'