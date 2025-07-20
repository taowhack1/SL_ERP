import React from "react"
// Utility functions for search persistence
export const SearchPersistence = {
    STORAGE_KEY: "salesOrdersSearchFilters",

    saveFilters(filters) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filters))
        } catch (error) {
            console.error("Error saving search filters:", error)
        }
    },

    loadFilters() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY)
            return saved ? JSON.parse(saved) : null
        } catch (error) {
            console.error("Error loading search filters:", error)
            return null
        }
    },

    clearFilters() {
        try {
            localStorage.removeItem(this.STORAGE_KEY)
        } catch (error) {
            console.error("Error clearing search filters:", error)
        }
    },

    // Clear filters when navigating to different menu
    clearOnMenuChange() {
        this.clearFilters()
    },
}

// Performance optimization utilities
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export const memoizeOne = (fn) => {
    let lastArgs
    let lastResult

    return (...args) => {
        if (!lastArgs || !args.every((arg, index) => arg === lastArgs[index])) {
            lastArgs = args
            lastResult = fn(...args)
        }
        return lastResult
    }
}
