import React, { useState, useEffect } from 'react';
import { Input, DatePicker, Select, Space, Spin } from 'antd';
import moment from 'moment';
import useDebouncedSearch from '../../include/js/customHooks/useDebouncedSearch';

const { Option } = Select;

const defaultFilters = {
    so_no: '',
    order_date: null,
    customer: '',
    salesperson: '',
    status: ''
};

const SOFilterToolbar = ({ onSearch, loading }) => {
    const [filters, setFilters] = useState(() => {
        return JSON.parse(localStorage.getItem('so_filters')) || defaultFilters;
    });

    const debouncedFilters = useDebouncedSearch(filters, 2000);

    useEffect(() => {
        localStorage.setItem('so_filters', JSON.stringify(filters));
    }, [filters]);

    useEffect(() => {
        onSearch(debouncedFilters);
    }, [debouncedFilters]);

    const handleChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <Spin spinning={loading}>
            <Space wrap>
                <Input
                    placeholder='SO No.'
                    value={filters.so_no}
                    onChange={(e) => handleChange('so_no', e.target.value)}
                    allowClear
                />
                <DatePicker
                    placeholder='Order Date'
                    value={filters.order_date ? moment(filters.order_date) : null}
                    onChange={(date, dateString) => handleChange('order_date', dateString)}
                    allowClear
                />
                <Input
                    placeholder='Customer'
                    value={filters.customer}
                    onChange={(e) => handleChange('customer', e.target.value)}
                    allowClear
                />
                <Input
                    placeholder='Salesperson'
                    value={filters.salesperson}
                    onChange={(e) => handleChange('salesperson', e.target.value)}
                    allowClear
                />
                <Select
                    placeholder='Status'
                    value={filters.status}
                    onChange={(val) => handleChange('status', val)}
                    allowClear
                    style={{ width: 140 }}
                >
                    <Option value='Available'>Available</Option>
                    <Option value='Completed'>Completed</Option>
                    <Option value='Cancel'>Cancel</Option>
                    <Option value='Open DO 2'>Open DO 2</Option>
                </Select>
            </Space>
        </Spin>
    );
};

export default SOFilterToolbar;
