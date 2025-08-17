import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, AutoComplete, DatePicker, Select, Switch, Button, Input, Spin } from "antd";
import moment from "moment";
import axios from 'axios'

const toYMD = (d) => (d ? moment(d).format("YYYY-MM-DD") : undefined);
const apiAutocompleteCustomer = `${process.env.REACT_APP_API_SERVER_V2}/sales/customer/autocomplete`
const apiAutocompleteSale = `${process.env.REACT_APP_API_SERVER_V2}/sales/salesperson/autocomplete`

export default function SearchSalesOrder({ hook, initialUI }) {
    console.log("SearchSalesOrder", initialUI);
    const [form] = Form.useForm();

    const [customers, setCustomers] = useState([]);
    const [customerLoading, setCustomerLoading] = useState(false);
    const [customerDisplay, setCustomerDisplay] = useState(initialUI.customer.label || "");

    const [sales, setSales] = useState([]);
    const [saleLoading, setSaleLoading] = useState(false);
    const [saleDisplay, setSaleDisplay] = useState(initialUI.sale.label || "");

    const [createDate, setCreateDate] = useState(initialUI.create_date || [null, null]);

    const typingRef = useRef(null);

    const fetchCustomer = useCallback((text) => {
        if (typingRef.current) clearTimeout(typingRef.current);
        typingRef.current = setTimeout(async () => {
            if (!text) {
                setCustomers([]);
                return;
            }
            try {
                setCustomerLoading(true);
                const res = await axios.get(apiAutocompleteCustomer, {
                    params: { search: text },
                });

                if (Array.isArray(res.data)) setCustomers(res.data);
            } catch (_) {

            } finally {
                setCustomerLoading(false);
            }
        }, 500);
    }, []);

    const fetchSale = useCallback((text) => {
        if (typingRef.current) clearTimeout(typingRef.current);
        typingRef.current = setTimeout(async () => {
            if (!text) {
                setSales([]);
                return;
            }
            try {
                setSaleLoading(true);
                const res = await axios.get(apiAutocompleteSale, {
                    params: { search: text },
                });

                if (Array.isArray(res.data)) setSales(res.data);
            } catch (_) {

            } finally {
                setSaleLoading(false);
            }
        }, 500);
    }, []);

    useEffect(() => {
        console.log("initialUI", initialUI)
        form.setFieldsValue({
            so: initialUI.so,
            description: initialUI.description,
            sale: saleDisplay,
            customer: customerDisplay,
            create_date: initialUI.create_date[0] && initialUI.create_date[1]
                ? [moment(initialUI.create_date[0]), moment(initialUI.create_date[1])]
                : [null, null],
            status: initialUI.status
        });
        hook.searchNow();
    }, []);

    const updateFilterDebounced = useCallback((partialFilter) => hook.setFilter({ filter: partialFilter }), [hook]);

    const onSearchInput = (key, text) => {
        updateFilterDebounced({ [key]: text });
    };

    const onCustomerSearch = (text) => {
        setCustomerDisplay(text);
        fetchCustomer(text);
        updateFilterDebounced({ customer: text, selected_customer: { value: null, label: text } });
    };

    const onCustomerSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setCustomerDisplay(display);
        form.setFieldsValue({ customer: display });
        updateFilterDebounced({ customer: value, selected_customer: { value, label: display } });
    };

    const onSaleSearch = (text) => {
        setSaleDisplay(text);
        fetchSale(text);
        updateFilterDebounced({ sale: text, selected_sale: { value: null, label: text } });
    };

    const onSaleSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setSaleDisplay(display);
        form.setFieldsValue({ sale: display });
        updateFilterDebounced({ sale: value, selected_sale: { value, label: display } });
    };

    const onDateRangeChange = (key, dates) => {
        const [start, end] = dates || [];
        const ymd = [toYMD(start), toYMD(end)];
        updateFilterDebounced({ [`${key}_start`]: ymd[0], [`${key}_end`]: ymd[1] });

        switch (key) {
            case 'order_date':
                setCreateDate([ymd[0], ymd[1]])
                break;

            default:
                break;
        }
    };

    const onSearchNow = () => hook.searchNow();
    const onClear = () => {
        form.resetFields();
        setCustomerDisplay("");
        setCustomers([]);
        hook.clear();
    };

    return (
        <Form form={form} layout="vertical">
            <Row gutter={[12, 8]} align="bottom">
                <Col xs={24} md={5}>
                    <Form.Item label="SO No. / Description" name="so">
                        <AutoComplete
                            // value={so}
                            onSearch={(v) => onSearchInput("so", v)}
                            allowClear
                            placeholder="ค้นหาด้วย SO No. หรือ Description"
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={5}>
                    <Form.Item label="Customer" name="customer">
                        <AutoComplete
                            value={customerDisplay}
                            options={customers}
                            onSearch={onCustomerSearch}
                            onSelect={onCustomerSelect}
                            onChange={(v) => setCustomerDisplay(v)}
                            allowClear
                            placeholder="ค้นหาด้วย ชื่อ, รหัส Customer"
                            notFoundContent={customerLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                    <Form.Item label="Sales person" name="sale">
                        <AutoComplete
                            value={saleDisplay}
                            options={sales}
                            onSearch={onSaleSearch}
                            onSelect={onSaleSelect}
                            onChange={(v) => setSaleDisplay(v)}
                            allowClear
                            placeholder="ค้นหาด้วย ชื่อ, รหัสพนักงานขาย"
                            notFoundContent={saleLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Order Date" name="order_date">
                        <DatePicker.RangePicker
                            style={{ width: "100%" }}
                            format="DD/MM/YYYY"
                            onChange={v => onDateRangeChange("order_date", v)}
                            allowEmpty={[true, true]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                    <Form.Item label="สถานะ" name="status">
                        <Select
                            options={[
                                { value: "", label: "All" },
                                { value: "Draft", label: "Draft" },
                                { value: "Confirm", label: "Confirm" },
                                { value: "Cancel", label: "Cancel" },
                                { value: "Completed", label: "Completed" },
                                { value: "None DR", label: "None DR" },
                            ]}
                            onChange={(v) => onSearchInput("status", v)}
                            allowClear
                            placeholder="Select..."
                            showSearch
                            optionFilterProp="label"
                        />
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