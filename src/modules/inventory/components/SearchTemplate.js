import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, AutoComplete, DatePicker, Select, Switch, Button, Input, Spin } from "antd";
import moment from "moment";
import axios from 'axios'

const toYMD = (d) => (d ? moment(d).format("YYYY-MM-DD") : undefined);
const itemAutocompleteAPI = `${process.env.REACT_APP_API_SERVER_V2}/inventory/items/autocomplete`;

export default function SearchItems({ hook, initialUI }) {
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
                            options={[
                                { value: 1, label: "Raw Material" },
                                { value: 2, label: "WIP" },
                                { value: 3, label: "Finished Goods" },
                                { value: 4, label: "Packaging" },
                            ]}
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