import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, AutoComplete, DatePicker, Select, Switch, Button, Input, Spin } from "antd";
import moment from "moment";
import axios from 'axios'
import { getMasterDataItemCategory, getMasterDataItemType } from "../../../actions/inventory";

const toYMD = (d) => (d ? moment(d).format("YYYY-MM-DD") : undefined);
const itemAutocompleteAPI = "http://localhost:3008/api/inventory/items/autocomplete";
const autocompleteCustomer = "http://localhost:3008/api/sales/customer/autocomplete";

export default function SearchItems({ hook, initialUI }) {
    const [form] = Form.useForm();
    const [acOptions, setAcOptions] = useState([]);
    const [acLoading, setAcLoading] = useState(false);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [customerLoading, setCustomerLoading] = useState(false);
    const [itemDisplay, setItemDisplay] = useState(initialUI.item.label || "");
    const [customerDisplay, setCustomerDisplay] = useState(initialUI.customer.label || "");
    const typingRef = useRef(null);

    const [itemType, setItemType] = useState([]);
    const [itemCategory, setItemCategory] = useState([]);

    const triggerACFetch = useCallback((text) => {
        if (typingRef.current) clearTimeout(typingRef.current);
        typingRef.current = setTimeout(async () => {
            if (!text) {
                setAcOptions([]);
                return;
            }
            try {
                setAcLoading(true);
                const res = await axios.get(itemAutocompleteAPI, {
                    params: { search: text },
                });

                if (Array.isArray(res.data)) setAcOptions(res.data);
            } catch (_) {

            } finally {
                setAcLoading(false);
            }
        }, 500);
    }, []);

    const triggerCustomerFetch = useCallback((text) => {
        if (typingRef.current) clearTimeout(typingRef.current);
        typingRef.current = setTimeout(async () => {
            if (!text) {
                setCustomerOptions([]);
                return;
            }
            try {
                setCustomerLoading(true);
                const res = await axios.get(autocompleteCustomer, {
                    params: { search: text },
                });

                if (Array.isArray(res.data)) setCustomerOptions(res.data);
            } catch (_) {

            } finally {
                setCustomerLoading(false);
            }
        }, 500);
    }, []);

    useEffect(() => {
        const getData = async () => {
            const type = await getMasterDataItemType();
            const category = await getMasterDataItemCategory();
            console.log("UseEffectGetMAster", type, category)

            setItemType([
                {
                    value: null,
                    label: "All"
                },
                ...type?.map(obj => ({
                    value: obj?.type_id,
                    label: obj?.type_name
                }))

            ]);
            setItemCategory([
                {
                    value: null,
                    label: "All"
                },
                ...category?.map(obj => ({
                    value: obj?.category_id,
                    label: obj?.category_name
                }))

            ]);
        }

        getData()

        form.setFieldsValue({
            item: itemDisplay,
            customer: customerDisplay,
            item_type: initialUI.item_type,
            item_category: initialUI.item_category,
        });
        hook.searchNow();
    }, []);

    const updateFilterDebounced = useCallback((partialFilter) => hook.setFilter({ filter: partialFilter }), [hook]);

    const onItemSearch = (text) => {
        setItemDisplay(text);
        triggerACFetch(text);
        updateFilterDebounced({ item: text, item_search: undefined });
    };

    const onItemSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setItemDisplay(display);
        form.setFieldsValue({ item: display });
        updateFilterDebounced({ item: value, selected_item: { value, label: display } });
    };

    const onCustomerSearch = (text) => {
        setCustomerDisplay(text);
        triggerCustomerFetch(text);
        updateFilterDebounced({ customer: text, customer_search: undefined });
    };

    const onCustomerSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setCustomerDisplay(display);
        form.setFieldsValue({ customer: display });
        updateFilterDebounced({ customer: value, selected_customer: { value, label: display } });
    };


    const onSelectChange = (key, value) => updateFilterDebounced({ [key]: value });
    const onSearchNow = () => hook.searchNow();
    const onClear = () => {
        form.resetFields();
        setItemDisplay("");
        setAcOptions([]);
        hook.clear();
    };

    return (
        <Form form={form} layout="vertical">
            <Row gutter={[12, 8]} align="bottom">
                <Col xs={24} md={8}>
                    <Form.Item label="ค้นหา Item" name="item">
                        <AutoComplete
                            value={itemDisplay}
                            options={acOptions}
                            onSearch={onItemSearch}
                            onSelect={onItemSelect}
                            onChange={(v) => setItemDisplay(v)}
                            allowClear
                            placeholder="ค้นหาด้วย Item Code , Name"
                            notFoundContent={acLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="ชื่อลูกค้า" name="customer">
                        <AutoComplete
                            value={customerDisplay}
                            options={customerOptions}
                            onSearch={onCustomerSearch}
                            onSelect={onCustomerSelect}
                            onChange={(v) => setCustomerDisplay(v)}
                            allowClear
                            placeholder="ค้นหาจากชื่อลูกค้า"
                            notFoundContent={customerLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                    <Form.Item label="Item Type" name="item_type">
                        <Select
                            options={itemType}
                            onChange={(v) => onSelectChange('item_type', v)}
                            allowClear
                            placeholder="Select..."
                            showSearch
                            optionFilterProp="label"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                    <Form.Item label="Item Category" name="item_category">
                        <Select
                            options={itemCategory}
                            onChange={(v) => onSelectChange('item_category', v)}
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