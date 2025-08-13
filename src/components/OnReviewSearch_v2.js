// ==============================
// src/api/axiosClient.js
// ==============================
import axios from "axios";

// Centralized axios instance (add interceptors if needed)
const axiosClient = axios.create({
    // baseURL: "http://localhost:3009", // optional
    timeout: 30000,
});

export default axiosClient;


// ==============================
// src/hooks/useSmartSearch.js
// ==============================
import { useCallback, useEffect, useRef, useState } from "react";
import axiosClient from "../api/axiosClient";

/**
 * useSmartSearch
 * - Debounced GET search
 * - Uses AbortController to cancel stale requests
 * - Passes params object directly to axios (no manual encoding)
 */
export default function useSmartSearch({
    endpoint,
    initialParams = {},
    debounceMs = 700, // 0.5–1.0s window per requirement
    mapResult = (r) => r,
}) {
    const [params, setParams] = useState({ ...initialParams });
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debounceRef = useRef(null);
    const abortRef = useRef(null);
    const lastCallId = useRef(0);

    const doFetch = useCallback(
        async (p) => {
            // cancel previous
            if (abortRef.current) abortRef.current.abort();
            const controller = new AbortController();
            abortRef.current = controller;
            const callId = ++lastCallId.current;
            setLoading(true);
            setError(null);
            try {
                const res = await axiosClient.get(endpoint, {
                    params: p,
                    signal: controller.signal,
                });
                if (callId === lastCallId.current) {
                    setData(mapResult(res.data));
                }
            } catch (err) {
                // ignore abort errors; show others
                if (callId === lastCallId.current && err.name !== "CanceledError" && err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                if (callId === lastCallId.current) setLoading(false);
            }
        },
        [endpoint, mapResult]
    );

    const setFilter = useCallback(
        (next) => {
            setParams((prev) => {
                const merged = { ...prev, ...next, filter: { ...(prev.filter || {}), ...(next.filter || {}) } };
                return merged;
            });
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                debounceRef.current = null;
                setParams((latest) => {
                    doFetch(latest);
                    return latest;
                });
            }, debounceMs);
        },
        [debounceMs, doFetch]
    );

    const searchNow = useCallback(
        (next) => {
            setParams((prev) => {
                const merged = { ...prev, ...next, filter: { ...(prev.filter || {}), ...(next && next.filter ? next.filter : {}) } };
                Promise.resolve().then(() => doFetch(merged));
                return merged;
            });
        },
        [doFetch]
    );

    const clear = useCallback(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        setParams({ ...initialParams });
        doFetch({ ...initialParams });
    }, [doFetch, initialParams]);

    useEffect(() => () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (abortRef.current) abortRef.current.abort();
    }, []);

    return { data, loading, error, params, setFilter, searchNow, clear };
}


// ==============================
// src/components/SearchPanel.jsx
// ==============================
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, AutoComplete, DatePicker, Select, Switch, Button, Input, Divider, Typography, Spin, Empty } from "antd";
import moment from "moment";
import axiosClient from "../api/axiosClient";

const toYMD = (d) => (d ? moment(d).format("YYYY-MM-DD") : undefined);

export default function SearchPanel({
    hook, // from useSmartSearch
    selectOptions = [], // [{value,label}]
    initialUI = {
        description: { label: "", value: "" },
        dateRange: [null, null],
        selectValue: undefined,
        toggle: false,
    },
}) {
    const [form] = Form.useForm();
    const [acOptions, setAcOptions] = useState([]);
    const [acLoading, setAcLoading] = useState(false);
    const [descDisplay, setDescDisplay] = useState(initialUI.description.label || "");
    const typingRef = useRef(null);

    const triggerACFetch = useCallback((text) => {
        if (typingRef.current) clearTimeout(typingRef.current);
        typingRef.current = setTimeout(async () => {
            if (!text) {
                setAcOptions([]);
                return;
            }
            try {
                setAcLoading(true);
                const res = await axiosClient.get("http://localhost:3009/api/inventory/items/autocomplete", {
                    params: { q: text },
                });
                if (Array.isArray(res.data)) setAcOptions(res.data);
            } catch (_) {
                // swallow
            } finally {
                setAcLoading(false);
            }
        }, 500);
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            description: descDisplay,
            dateRange: initialUI.dateRange[0] && initialUI.dateRange[1]
                ? [moment(initialUI.dateRange[0]), moment(initialUI.dateRange[1])]
                : [null, null],
            selectValue: initialUI.selectValue,
            toggle: initialUI.toggle,
        });
        hook.searchNow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateFilterDebounced = useCallback((partialFilter) => hook.setFilter({ filter: partialFilter }), [hook]);

    const onDescriptionSearch = (text) => {
        setDescDisplay(text);
        triggerACFetch(text);
        updateFilterDebounced({ description: text, item_search: undefined });
    };

    const onDescriptionSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setDescDisplay(display);
        form.setFieldsValue({ description: display });
        updateFilterDebounced({ description: display, selected_desc: { value, label: display } });
    };

    const onDateRangeChange = (dates) => {
        const [start, end] = dates || [];
        const ymd = [toYMD(start), toYMD(end)];
        updateFilterDebounced({ date_from: ymd[0], date_to: ymd[1] });
    };

    const onSelectChange = (value) => updateFilterDebounced({ item_type: value });
    const onToggleChange = (checked) => updateFilterDebounced({ only_active: checked });
    const onSearchNow = () => hook.searchNow();
    const onClear = () => {
        form.resetFields();
        setDescDisplay("");
        setAcOptions([]);
        hook.clear();
    };

    return (
        <Form form={form} layout="vertical">
            <Row gutter={[12, 8]} align="bottom">
                <Col xs={24} md={8}>
                    <Form.Item label="Description" name="description">
                        <AutoComplete
                            value={descDisplay}
                            options={acOptions}
                            onSearch={onDescriptionSearch}
                            onSelect={onDescriptionSelect}
                            onChange={(v) => setDescDisplay(v)}
                            allowClear
                            placeholder="Type to search..."
                            notFoundContent={acLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <Form.Item label="Date Range" name="dateRange">
                        <DatePicker.RangePicker
                            style={{ width: "100%" }}
                            format="DD/MM/YYYY"
                            onChange={onDateRangeChange}
                            allowEmpty={[true, true]}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={4}>
                    <Form.Item label="Item Type" name="selectValue">
                        <Select
                            options={selectOptions}
                            onChange={onSelectChange}
                            allowClear
                            placeholder="Select..."
                            showSearch
                            optionFilterProp="label"
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={4}>
                    <Form.Item label="Only Active" name="toggle" valuePropName="checked">
                        <Switch onChange={onToggleChange} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[12, 8]}>
                <Col>
                    <Button type="primary" onClick={onSearchNow}>ค้นหา</Button>
                </Col>
                <Col>
                    <Button onClick={onClear}>เคลียร์</Button>
                </Col>
            </Row>
        </Form>
    );
}


// ==============================
// src/components/ResultsBlock.jsx
// ==============================
import React from "react";
import { Typography, Spin, Empty } from "antd";

export default function ResultsBlock({ hook }) {
    const { data, loading, error } = hook;
    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Typography.Text type="danger">{error.message}</Typography.Text>;
    if (!data || (Array.isArray(data) && data.length === 0)) return <Empty description="No data" />;
    return (
        <pre style={{ maxHeight: 280, overflow: "auto", background: "#0f0f0f", color: "#e6e6e6", padding: 12, borderRadius: 8 }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}


// ==============================
// src/pages/InventoryItemsPage.jsx
// ==============================
import React, { useMemo } from "react";
import { Divider, Typography } from "antd";
import useSmartSearch from "../hooks/useSmartSearch";
import SearchPanel from "../components/SearchPanel";
import ResultsBlock from "../components/ResultsBlock";

export default function InventoryItemsPage() {
    const searchHook = useSmartSearch({
        endpoint: "http://localhost:3009/api/inventory/items/search",
        initialParams: {
            user_name: "2563002",
            filter: {
                item_search: undefined,
                description: undefined,
                item_type: undefined,
                item_category: undefined,
                customer: undefined,
                date_from: undefined,
                date_to: undefined,
                only_active: false,
            },
        },
        debounceMs: 600, // ~0.6s
        mapResult: (res) => res, // adjust if API wraps data
    });

    const selectOptions = useMemo(
        () => [
            { value: 1, label: "Raw Material" },
            { value: 2, label: "WIP" },
            { value: 3, label: "Finished Goods" },
            { value: 4, label: "Packaging" },
        ],
        []
    );

    return (
        <div style={{ padding: 16 }}>
            <Typography.Title level={4} style={{ marginBottom: 16 }}>Inventory Items</Typography.Title>

            <SearchPanel
                hook={searchHook}
                selectOptions={selectOptions}
                initialUI={{
                    description: { label: "", value: "" },
                    dateRange: [null, null],
                    selectValue: undefined,
                    toggle: false,
                }}
            />

            <Divider />

            <ResultsBlock hook={searchHook} />
        </div>
    );
}


// ==============================
// src/App.jsx (optional integration demo)
// ==============================
import React from "react";
import InventoryItemsPage from "./pages/InventoryItemsPage";

export default function App() {
    return <InventoryItemsPage />;
}
