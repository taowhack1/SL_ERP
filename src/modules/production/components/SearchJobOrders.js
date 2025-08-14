import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, AutoComplete, DatePicker, Select, Switch, Button, Input, Spin } from "antd";
import moment from "moment";
import axios from 'axios'

const itemAutocompleteAPI = "http://localhost:3008/api/inventory/items/autocomplete";
const autocompleteMRP = "http://localhost:3008/api/production/mrp/autocomplete";

export default function SearchJobOrders({ hook, initialUI }) {
    console.log("SearchJobOrders", initialUI);
    const [form] = Form.useForm();

    const [mrp, setMRP] = useState([]);
    const [mrpLoading, setMRPLoading] = useState(false);
    const [mrpDisplay, setMRPDisplay] = useState(initialUI?.mrp?.label || "");

    const [bulks, setBulks] = useState([]);
    const [bulkLoading, setBulkLoading] = useState(false);
    const [bulkDisplay, setBulkDisplay] = useState(initialUI?.bulk?.label || "");

    const [fg, setFG] = useState([]);
    const [fgLoading, setFGLoading] = useState(false);
    const [fgDisplay, setFGDisplay] = useState(initialUI?.fg?.label || "");

    const typingRef = useRef(null);
    const typingRef2 = useRef(null);
    const typingRef3 = useRef(null);

    useEffect(() => {
        console.log("initialUI", initialUI)
        form.setFieldsValue({
            job: initialUI.job,
            bulk: bulkDisplay,
            fg: fgDisplay,
            mrp: mrpDisplay,
            status: initialUI?.status || null,
        });
        hook.searchNow();
    }, []);

    // * For Search
    const onSearchNow = () => hook.searchNow();
    const onClear = () => {
        form.resetFields();
        hook.clear();
    };

    const updateFilterDebounced = useCallback((partialFilter) => hook.setFilter({ filter: partialFilter }), [hook]);

    const onChangeSearch = (key, value) => {
        updateFilterDebounced({ [key]: value });
    };

    // * For Autocomplete

    const fetchMRP = useCallback((text) => {
        if (typingRef.current) clearTimeout(typingRef.current);
        typingRef.current = setTimeout(async () => {
            if (!text) {
                setMRP([]);
                return;
            }
            try {
                setMRPLoading(true);
                const res = await axios.get(autocompleteMRP, {
                    params: { search: text },
                });

                if (Array.isArray(res.data)) setMRP(res.data);
            } catch (_) {

            } finally {
                setMRPLoading(false);
            }
        }, 500);
    }, []);

    const fetchBulk = useCallback((text) => {
        if (typingRef2.current) clearTimeout(typingRef2.current);
        typingRef2.current = setTimeout(async () => {
            if (!text) {
                setBulks([]);
                return;
            }
            try {
                setBulkLoading(true);
                const res = await axios.get(itemAutocompleteAPI, {
                    params: { search: text, item_type_id: 3 },
                });

                if (Array.isArray(res.data)) setBulks(res.data);
            } catch (_) {

            } finally {
                setBulkLoading(false);
            }
        }, 500);
    }, []);

    const fetchFG = useCallback((text) => {
        if (typingRef3.current) clearTimeout(typingRef3.current);
        typingRef3.current = setTimeout(async () => {
            if (!text) {
                setFG([]);
                return;
            }
            try {
                setFGLoading(true);
                const res = await axios.get(itemAutocompleteAPI, {
                    params: { search: text, item_type_id: 4 },
                });

                if (Array.isArray(res.data)) setFG(res.data);
            } catch (_) {

            } finally {
                setFGLoading(false);
            }
        }, 500);
    }, []);

    const onMRPSearch = (text) => {
        setMRPDisplay(text);
        fetchMRP(text);
        updateFilterDebounced({ mrp: text, selected_mrp: { value: null, label: text } });
    };

    const onMRPSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setMRPDisplay(display);
        form.setFieldsValue({ mrp: display });
        updateFilterDebounced({ mrp: value, selected_mrp: { value, label: display } });
    };


    const onBulkSearch = (text) => {
        console.log("search", text)
        setBulkDisplay(text);
        fetchBulk(text);
        updateFilterDebounced({ bulk: text, selected_bulk: { value: null, label: text } });
    };

    const onBulkSelect = (value, option) => {
        console.log("select", value, option)
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setBulkDisplay(display);
        form.setFieldsValue({ bulk: display });
        updateFilterDebounced({ bulk: value, selected_bulk: { value, label: display } });
    };

    const onFGSearch = (text) => {
        setFGDisplay(text);
        fetchFG(text);
        updateFilterDebounced({ fg: text, selected_fg: { value: null, label: text } });
    };

    const onFGSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setFGDisplay(display);
        form.setFieldsValue({ fg: display });
        updateFilterDebounced({ fg: value, selected_fg: { value, label: display } });
    };

    return (
        <Form form={form} layout="vertical">
            <Row gutter={[12, 4]} align="bottom">
                <Col xs={24} md={8}>
                    <Form.Item label="Job No." name="job">
                        <AutoComplete
                            onChange={(v) => onChangeSearch('job', v)}
                            allowClear
                            placeholder="ค้นหาด้วย Job No."
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="MRP" name="mrp">
                        <AutoComplete
                            value={mrpDisplay}
                            options={mrp}
                            onSearch={onMRPSearch}
                            onSelect={onMRPSelect}
                            onChange={(v) => setMRPDisplay(v)}
                            allowClear
                            placeholder="ค้นหาด้วย MRP No. , Description"
                            notFoundContent={mrpLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                    <Form.Item label="Status" name="status">
                        <Select
                            options={[
                                { value: null, label: "All" },
                                { value: 2, label: "รอดำเนินการ" },
                                { value: 3, label: "กำลังดำเนินการ" },
                                { value: 4, label: "เสร็จสิ้น" },
                                { value: 1, label: "ยกเลิก" },
                            ]}
                            onChange={(v) => onChangeSearch('status', v)}
                            allowClear
                            placeholder="Select..."
                            showSearch
                            optionFilterProp="label"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[12, 4]}>
                <Col xs={24} md={8}>
                    <Form.Item label="ค้นหาด้วย Bulk Code" name="bulk">
                        <AutoComplete
                            value={bulkDisplay}
                            options={bulks}
                            onSearch={onBulkSearch}
                            onSelect={onBulkSelect}
                            onChange={(v) => setBulkDisplay(v)}
                            allowClear
                            placeholder="ค้นหาด้วย Bulk Item Code , Name"
                            notFoundContent={bulkLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="ค้นหาด้วย FG Code" name="fg">
                        <AutoComplete
                            value={fgDisplay}
                            options={fg}
                            onSearch={onFGSearch}
                            onSelect={onFGSelect}
                            onChange={(v) => setFGDisplay(v)}
                            allowClear
                            placeholder="ค้นหาด้วย FG Item Code , Name"
                            notFoundContent={fgLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[12, 8]}>
                <Col>
                    <Button type="poimary" onClick={onSearchNow}>ค้นหา</Button>
                </Col>
                <Col>
                    <Button onClick={onClear}>เคลียร์</Button>
                </Col>
            </Row>
        </Form>
    );
}