import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, AutoComplete, DatePicker, Select, Switch, Button, Input, Spin } from "antd";
import moment from "moment";
import axios from 'axios'
import MRPViewSalesOrderList from "../operations/mrp/MRPViewSalesOrderList";

const itemAutocompleteAPI = "http://localhost:3008/api/inventory/items/autocomplete";
const autocompleteMRP = "http://localhost:3008/api/production/mrp/autocomplete";

const toYMD = (d) => (d ? moment(d).format("YYYY-MM-DD") : undefined);

export default function SearchMRP({ hook, initialUI }) {
    console.log("SearchMRP", initialUI);
    const [form] = Form.useForm();

    const [mrp, setMRP] = useState([]);
    const [mrpLoading, setMRPLoading] = useState(false);
    const [mrpDisplay, setMRPDisplay] = useState(initialUI?.mrp?.label || "");

    const [items, setItems] = useState([]);
    const [itemLoading, setItemLoading] = useState(false);
    const [itemDisplay, setItemDisplay] = useState(initialUI?.item?.label || "");

    const [due, setDue] = useState(initialUI.due_date || [null, null]);
    const [plan, setPlan] = useState(initialUI.plan_date || [null, null]);

    const typingRef = useRef(null);
    const typingRef2 = useRef(null);

    useEffect(() => {
        console.log("initialUI", initialUI)
        form.setFieldsValue({
            so: initialUI.so,
            item: itemDisplay,
            mrp: mrpDisplay,
            plan_date: initialUI.plan_date[0] && initialUI.plan_date[1]
                ? [moment(initialUI.plan_date[0]), moment(initialUI.plan_date[1])]
                : [null, null],
            due_date: initialUI.due_date[0] && initialUI.due_date[1]
                ? [moment(initialUI.due_date[0]), moment(initialUI.due_date[1])]
                : [null, null],
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

    const onDateRangeChange = (key, dates) => {
        const [start, end] = dates || [];
        const ymd = [toYMD(start), toYMD(end)];
        updateFilterDebounced({ [`${key}_start`]: ymd[0], [`${key}_end`]: ymd[1] });

        switch (key) {
            case 'due_date':
                setDue([ymd[0], ymd[1]])
                break;
            case 'plan_date':
                setPlan([ymd[0], ymd[1]])
                break;

            default:
                break;
        }
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

    const fetchItem = useCallback((text) => {
        if (typingRef2.current) clearTimeout(typingRef2.current);
        typingRef2.current = setTimeout(async () => {
            if (!text) {
                setItems([]);
                return;
            }
            try {
                setItemLoading(true);
                const res = await axios.get(itemAutocompleteAPI, {
                    params: { search: text },
                });

                if (Array.isArray(res.data)) setItems(res.data);
            } catch (_) {

            } finally {
                setItemLoading(false);
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


    const onItemSearch = (text) => {
        setItemDisplay(text);
        fetchItem(text);
        updateFilterDebounced({ item: text, selected_item: { value: null, label: text } });
    };

    const onItemSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setItemDisplay(display);
        form.setFieldsValue({ item: display });
        updateFilterDebounced({ item: value, selected_item: { value, label: display } });
    };

    const onChangeSearch = (key, val) => {
        updateFilterDebounced({ [key]: val });
    }

    return (
        <Form form={form} layout="vertical">
            <Row gutter={[12, 4]} align="bottom">
                <Col xs={24} md={4}>
                    <Form.Item label="ค้นหาด้วย SO No." name="so">
                        <AutoComplete
                            onChange={(v) => onChangeSearch('so', v)}
                            allowClear
                            placeholder="ค้นหาด้วย SO No."
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
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
                <Col xs={24} md={6}>
                    <Form.Item label="ค้นหาด้วย Item Code" name="item">
                        <AutoComplete
                            value={itemDisplay}
                            options={items}
                            onSearch={onItemSearch}
                            onSelect={onItemSelect}
                            onChange={(v) => setItemDisplay(v)}
                            allowClear
                            placeholder="ค้นหาด้วย Item Code , Name"
                            notFoundContent={itemLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                    <Form.Item label="Plan Date" name="plan_date">
                        <DatePicker.RangePicker
                            style={{ width: "100%" }}
                            value={plan}
                            format="DD/MM/YYYY"
                            onChange={v => onDateRangeChange("plan_date", v)}
                            allowEmpty={[true, true]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                    <Form.Item label="Due Date" name="due_date">
                        <DatePicker.RangePicker
                            style={{ width: "100%" }}
                            value={due}
                            format="DD/MM/YYYY"
                            onChange={v => onDateRangeChange("due_date", v)}
                            allowEmpty={[true, true]}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[12, 8]}>
                <Col md={1}>
                    <Button type="poimary" onClick={onSearchNow}>ค้นหา</Button>
                </Col>
                <Col md={1}>
                    <Button onClick={onClear}>เคลียร์</Button>
                </Col>
                <Col md={20}></Col>
                <Col md={2}>
                    <MRPViewSalesOrderList />
                </Col>
            </Row>
        </Form>
    );
}