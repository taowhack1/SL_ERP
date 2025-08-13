import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Form, Row, Col, AutoComplete, DatePicker, Select, Switch, Button, Input, Divider, Typography, Spin, Empty, message } from "antd";
import moment from "moment";

/**
 * ------------------------------------------------------------------
 * Utilities
 * ------------------------------------------------------------------
 */
const toYMD = (d) => (d ? moment(d).format("YYYY-MM-DD") : undefined);

// Flatten nested params like { filter: { a:1, b:2 }, user:"x" } -> URLSearchParams
function toQuery(params, prefix) {
    const searchParams = new URLSearchParams();
    (function build(obj, pfx) {
        Object.keys(obj || {}).forEach((key) => {
            const val = obj[key];
            const k = pfx ? `${pfx}[${key}]` : key;
            if (val === undefined || val === null) return;
            if (Array.isArray(val)) {
                val.forEach((v, i) => build({ [i]: v }, k));
            } else if (typeof val === "object") {
                build(val, k);
            } else {
                searchParams.append(k, String(val));
            }
        });
    })(params, prefix);
    return searchParams;
}

async function httpGetJSON(url, params, { signal } = {}) {
    const qs = params ? `?${toQuery(params).toString()}` : "";
    const res = await fetch(`${url}${qs}`, { method: "GET", signal });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }
    return res.json();
}

/**
 * ------------------------------------------------------------------
 * Custom Hook: useSmartSearch
 * - Debounced searching with AbortController cancelation
 * - Keeps initialParams, allows incremental filter updates
 * - Exposes: data, loading, error, params, setFilter, searchNow, clear
 * ------------------------------------------------------------------
 */
export function useSmartSearch({
    endpoint,
    initialParams = {}, // e.g., { user_name: "2563002", filter: { ... } }
    debounceMs = 700, // default 0.7s (within 0.5-1.0 sec requirement)
    mapResult = (r) => r, // optional transform
}) {
    const [params, setParams] = useState(() => ({ ...initialParams }));
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // stable refs for debounce + abort
    const debounceRef = useRef(null);
    const abortRef = useRef(null);
    const lastCallId = useRef(0);

    const doFetch = useCallback(
        async (p) => {
            // cancel previous inflight
            if (abortRef.current) abortRef.current.abort();
            const controller = new AbortController();
            abortRef.current = controller;
            const callId = ++lastCallId.current;
            setLoading(true);
            setError(null);
            try {
                const res = await httpGetJSON(endpoint, p, { signal: controller.signal });
                if (callId === lastCallId.current) {
                    setData(mapResult(res));
                }
            } catch (err) {
                if (callId === lastCallId.current) {
                    if (err.name !== "AbortError") setError(err);
                }
            } finally {
                if (callId === lastCallId.current) setLoading(false);
            }
        },
        [endpoint, mapResult]
    );

    // Debounced search when params change (imperative opt-in via setFilter)
    const queueSearch = useCallback(
        (next) => {
            setParams((prev) => {
                const merged = { ...prev, ...next, filter: { ...(prev.filter || {}), ...(next.filter || {}) } };
                return merged;
            });
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                debounceRef.current = null;
                // use latest params from state after setParams settles
                setParams((latest) => {
                    doFetch(latest);
                    return latest; // no change
                });
            }, debounceMs);
        },
        [debounceMs, doFetch]
    );

    // Immediate search (no debounce)
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

    // Cleanup on unmount
    useEffect(() => () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (abortRef.current) abortRef.current.abort();
    }, []);

    return { data, loading, error, params, setFilter: queueSearch, searchNow, clear };
}

/**
 * ------------------------------------------------------------------
 * Search UI Component (self-contained)
 * - Inputs: description (with remote AutoComplete), date range, select, toggle
 * - Actions: Search Now, Clear
 * - Behavior: typing triggers debounced search via hook.setFilter (0.7s here)
 * ------------------------------------------------------------------
 */
export function SearchPanel({
    hook, // instance returned by useSmartSearch
    autoCompleteEndpoint, // URL to GET options: returns [{ value, label }]
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
    const [descDisplay, setDescDisplay] = useState(initialUI.description.label || "");
    const typingRef = useRef(null);

    const triggerACFetch = useCallback(
        (text) => {
            if (!autoCompleteEndpoint) return;
            if (typingRef.current) clearTimeout(typingRef.current);
            typingRef.current = setTimeout(async () => {
                try {
                    const res = await httpGetJSON(autoCompleteEndpoint, { q: text });
                    if (Array.isArray(res)) setAcOptions(res);
                } catch (e) {
                    // silent fail is fine for AC
                }
            }, 500);
        },
        [autoCompleteEndpoint]
    );

    // On mount: set defaults into form
    useEffect(() => {
        form.setFieldsValue({
            description: descDisplay,
            dateRange: initialUI.dateRange[0] && initialUI.dateRange[1]
                ? [moment(initialUI.dateRange[0]), moment(initialUI.dateRange[1])]
                : [null, null],
            selectValue: initialUI.selectValue,
            toggle: initialUI.toggle,
        });
        // Perform initial load immediately
        hook.searchNow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Helpers to update hook filter with debouncing
    const updateFilterDebounced = useCallback(
        (partialFilter) => hook.setFilter({ filter: partialFilter }),
        [hook]
    );

    // Event handlers
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

    const onSelectChange = (value) => {
        updateFilterDebounced({ item_type: value });
    };

    const onToggleChange = (checked) => {
        updateFilterDebounced({ only_active: checked });
    };

    const onSearchNow = () => hook.searchNow();
    const onClear = () => {
        form.resetFields();
        setDescDisplay("");
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

            <Divider />

            <ResultsBlock hook={hook} />
        </Form>
    );
}

function ResultsBlock({ hook }) {
    const { data, loading, error } = hook;
    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Typography.Text type="danger">{error.message}</Typography.Text>;
    if (!data || (Array.isArray(data) && data.length === 0)) return <Empty description="No data" />;
    // Minimal renderer – adapt to your list/table component
    return (
        <pre style={{ maxHeight: 280, overflow: "auto", background: "#0f0f0f", color: "#e6e6e6", padding: 12, borderRadius: 8 }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}

/**
 * ------------------------------------------------------------------
 * Full Usage Example (Inventory Items)
 * ------------------------------------------------------------------
 */
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
        debounceMs: 700,
        mapResult: (res) => res, // adjust if your API nests data
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
                autoCompleteEndpoint="http://localhost:3009/api/inventory/items/autocomplete"
                selectOptions={selectOptions}
                initialUI={{
                    description: { label: "", value: "" },
                    dateRange: [null, null],
                    selectValue: undefined,
                    toggle: false,
                }}
            />
        </div>
    );
}

/**
 * ------------------------------------------------------------------
 * Notes / Best Practices
 * ------------------------------------------------------------------
 * 1) The hook cancels stale requests via AbortController to avoid race conditions.
 * 2) Debounce is implemented in the hook, so any input that calls setFilter() is auto-debounced.
 * 3) The SearchPanel is self-contained: parent only passes the hook instance.
 * 4) DatePicker displays DD/MM/YYYY; we convert to YYYY-MM-DD for the API.
 * 5) GET params are encoded with nested keys like filter[description]=... so your backend can parse them.
 * 6) For long lists, replace ResultsBlock with an AntD Table + server-side pagination using the same hook.searchNow.
 */
