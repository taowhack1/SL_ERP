import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Row, Col, AutoComplete, DatePicker, Select, Switch, Button, Input, Spin } from "antd";
import moment from "moment";
import axios from 'axios'

const toYMD = (d) => (d ? moment(d).format("YYYY-MM-DD") : undefined);
const autoCompleteVendor = "http://localhost:3008/api/purchase/vendor/autocomplete";
const autoCompleteEmp = "http://localhost:3008/api/hrm/emp/autocomplete";

export default function SearchPO({ hook, initialUI }) {
    console.log("SearchPO", initialUI);
    const [form] = Form.useForm();

    const [vendors, setVendors] = useState([]);
    const [acLoading, setAcLoading] = useState(false);

    const [createDate, setCreateDate] = useState(initialUI.create_date || [null, null]);
    const [due, setDue] = useState(initialUI.due_date || [null, null]);
    const [po, setPO] = useState(initialUI.po || "");

    const [vendorDisplay, setVendorDisplay] = useState(initialUI.vendor.label || "");
    const typingRef = useRef(null);

    const fetchVendor = useCallback((text) => {
        if (typingRef.current) clearTimeout(typingRef.current);
        typingRef.current = setTimeout(async () => {
            if (!text) {
                setVendors([]);
                return;
            }
            try {
                setAcLoading(true);
                const res = await axios.get(autoCompleteVendor, {
                    params: { search: text },
                });

                if (Array.isArray(res.data)) setVendors(res.data);
            } catch (_) {

            } finally {
                setAcLoading(false);
            }
        }, 500);
    }, []);

    useEffect(() => {
        console.log("initialUI", initialUI)
        form.setFieldsValue({
            po: initialUI.po,
            vendor: vendorDisplay || null,
            create_date: initialUI.create_date[0] && initialUI.create_date[1]
                ? [moment(initialUI.create_date[0]), moment(initialUI.create_date[1])]
                : [null, null],
            due_date: initialUI.due_date[0] && initialUI.due_date[1]
                ? [moment(initialUI.due_date[0]), moment(initialUI.due_date[1])]
                : [null, null],
            request_by: initialUI.request_by,
        });
        hook.searchNow();
    }, []);

    const updateFilterDebounced = useCallback((partialFilter) => hook.setFilter({ filter: partialFilter }), [hook]);

    const onPoSearch = (text) => {
        setPO(text);
        updateFilterDebounced({ po: text });
    };

    const onVendorSearch = (text) => {
        setVendorDisplay(text);
        fetchVendor(text);
        updateFilterDebounced({ vendor: text, selected_vendor: undefined });
    };

    const onVendorSelect = (value, option) => {
        const label = option && (option.label || option.children || option.value);
        const display = typeof label === "string" ? label : String(label);
        setVendorDisplay(display);
        form.setFieldsValue({ vendor: display });
        updateFilterDebounced({ vendor: value, selected_vendor: { value, label: display } });
    };

    const onDateRangeChange = (key, dates) => {
        const [start, end] = dates || [];
        const ymd = [toYMD(start), toYMD(end)];
        updateFilterDebounced({ [`${key}_start`]: ymd[0], [`${key}_end`]: ymd[1] });

        switch (key) {
            case 'due_date':
                setCreateDate([ymd[0], ymd[1]])
                break;
            case 'create_date':
                setDue([ymd[0], ymd[1]])
                break;

            default:
                break;
        }
    };

    const onSearchNow = () => hook.searchNow();
    const onClear = () => {
        form.resetFields();
        setVendorDisplay("");
        setVendors([]);
        hook.clear();
    };

    return (
        <Form form={form} layout="vertical">
            <Row gutter={[12, 8]} align="bottom">
                <Col xs={24} md={6}>
                    <Form.Item label="PO No." name="po">
                        <AutoComplete
                            value={po}
                            onSearch={onPoSearch}
                            onChange={(v) => setPO(v)}
                            allowClear
                            placeholder="ค้นหาด้วย PO No."
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Vendor" name="vendor">
                        <AutoComplete
                            value={vendorDisplay}
                            options={vendors}
                            onSearch={onVendorSearch}
                            onSelect={onVendorSelect}
                            onChange={(v) => setVendorDisplay(v)}
                            allowClear
                            placeholder="ค้นหาด้วย ชื่อ, รหัส Vendor"
                            notFoundContent={acLoading ? <Spin size="small" /> : null}
                            style={{ width: "100%" }}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="วันที่เอกสาร" name="create_date">
                        <DatePicker.RangePicker
                            style={{ width: "100%" }}
                            value={createDate}
                            format="DD/MM/YYYY"
                            onChange={v => onDateRangeChange("create_date", v)}
                            allowEmpty={[true, true]}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
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