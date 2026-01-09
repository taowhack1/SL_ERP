import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, DatePicker, Space, Spin, Empty, Input, Popover, Checkbox, Radio } from 'antd';
import { SearchOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
    fetchJobsByDateRange,
    setViewMode,
    setDateRange,
} from '../../../../actions/production/jobStatusReportActions';
import JobStatusReportAGGridTable from './components/JobStatusReportAGGridTable';
import JobStatusReportModal from './components/JobStatusReportModal';
import './JobStatusReport.css';

const JobStatusReportAGGrid = () => {
    const dispatch = useDispatch();
    const [customDateRange, setCustomDateRange] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [customDateMode, setCustomDateMode] = useState('month');
    const [visibleColumns, setVisibleColumns] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8']);
    const gridRef = useRef(null);

    const jobStatusReport = useSelector(
        state => state.production?.operations?.jobStatusReport || {
            viewMode: 'month',
            dateRange: { startDate: '', endDate: '' },
            jobs: [],
            selectedJob: null,
            loading: false,
            error: null
        }
    );

    const { viewMode, dateRange, jobs, loading, error } = jobStatusReport;

    // Initialize on mount
    useEffect(() => {
        const start = moment().startOf('month').format('YYYY-MM-DD');
        const end = moment().endOf('month').format('YYYY-MM-DD');
        dispatch(setDateRange(start, end));
        dispatch(fetchJobsByDateRange(start, end));
    }, [dispatch]);

    // Handle view mode change
    const handleViewModeChange = (mode) => {
        dispatch(setViewMode(mode));
        let start, end;

        if (mode === 'year') {
            start = moment().startOf('year').format('YYYY-MM-DD');
            end = moment().endOf('year').format('YYYY-MM-DD');
        } else if (mode === 'month') {
            start = moment().startOf('month').format('YYYY-MM-DD');
            end = moment().endOf('month').format('YYYY-MM-DD');
        } else if (mode === 'custom') {
            if (customDateRange && customDateRange[0] && customDateRange[1]) {
                start = customDateRange[0].format('YYYY-MM-DD');
                end = customDateRange[1].format('YYYY-MM-DD');
            } else {
                start = moment().startOf('month').format('YYYY-MM-DD');
                end = moment().endOf('month').format('YYYY-MM-DD');
            }
        }

        dispatch(setDateRange(start, end));
        dispatch(fetchJobsByDateRange(start, end));
    };

    // Handle custom date range change
    const handleDateRangeChange = (dates) => {
        if (dates && dates[0] && dates[1]) {
            setCustomDateRange(dates);
            const start = dates[0].format('YYYY-MM-DD');
            const end = dates[1].format('YYYY-MM-DD');
            dispatch(setDateRange(start, end));
            dispatch(fetchJobsByDateRange(start, end));
        }
    };

    // Handle custom date mode change
    const handleCustomDateModeChange = (e) => {
        const mode = e.target.value;
        setCustomDateMode(mode);
        if (customDateRange && customDateRange[0] && customDateRange[1]) {
            const start = customDateRange[0].format('YYYY-MM-DD');
            const end = customDateRange[1].format('YYYY-MM-DD');
            dispatch(setDateRange(start, end));
            dispatch(fetchJobsByDateRange(start, end));
        }
    };

    // Go to today
    const handleGoToToday = () => {
        if (gridRef.current) {
            gridRef.current.scrollToToday();
        }
    };

    // Handle job click
    const handleJobClick = (job) => {
        setSelectedJob(job);
        setModalVisible(true);
    };

    // Handle column visibility toggle
    const handleColumnToggle = (columnIndex) => {
        if (columnIndex === '0') return; // Job No always visible

        setVisibleColumns(prev => {
            if (prev.includes(columnIndex)) {
                return prev.filter(col => col !== columnIndex);
            } else {
                return [...prev, columnIndex].sort();
            }
        });
    };

    const columnVisibilityMenu = (
        <div style={{ padding: '8px' }}>
            <div style={{ marginBottom: '8px', fontWeight: 600 }}>Show/Hide Columns</div>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((idx, i) => {
                    const columnNames = ['Job No.', 'Name', 'Qty', 'RM Out', 'PK Out', 'RM In', 'PK In', 'Plan (Min)', 'Delivery (Max)'];
                    const isLocked = idx === '0';
                    return (
                        <div key={idx} style={{ marginBottom: '6px' }}>
                            <Checkbox
                                checked={visibleColumns.includes(idx)}
                                onChange={() => handleColumnToggle(idx)}
                                disabled={isLocked}
                            >
                                {columnNames[i]} {isLocked ? '(locked)' : ''}
                            </Checkbox>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // Filter jobs based on search keyword
    const filteredJobs = useMemo(() => {
        if (!searchKeyword.trim()) {
            return jobs;
        }
        const keyword = searchKeyword.toLowerCase().trim();
        return jobs.filter(job =>
            job.jobNo.toLowerCase().includes(keyword) ||
            job.name.toLowerCase().includes(keyword)
        );
    }, [jobs, searchKeyword]);

    const isCustomMode = viewMode === 'custom';

    return (
        <div className="job-status-report-container">
            <div className="report-header">
                <h1>Job Status Report (AG Grid)</h1>

                <div className="view-controls">
                    <Space>
                        <span className="control-label">View Mode:</span>
                        <Button.Group>
                            <Button
                                type={viewMode === 'year' ? 'primary' : 'default'}
                                onClick={() => handleViewModeChange('year')}
                            >
                                Year
                            </Button>
                            <Button
                                type={viewMode === 'month' ? 'primary' : 'default'}
                                onClick={() => handleViewModeChange('month')}
                            >
                                Month
                            </Button>
                            <Button
                                type={viewMode === 'custom' ? 'primary' : 'default'}
                                onClick={() => handleViewModeChange('custom')}
                            >
                                Custom
                            </Button>
                        </Button.Group>

                        {isCustomMode && customDateMode === 'month' && (
                            <DatePicker
                                picker="month"
                                format="YYYY-MM"
                                onChange={(date) => {
                                    if (date) {
                                        const start = date.clone().startOf('month');
                                        const end = date.clone().endOf('month');
                                        handleDateRangeChange([start, end]);
                                    }
                                }}
                            />
                        )}

                        {isCustomMode && customDateMode === 'year' && (
                            <DatePicker
                                picker="year"
                                format="YYYY"
                                onChange={(date) => {
                                    if (date) {
                                        const start = date.clone().startOf('year');
                                        const end = date.clone().endOf('year');
                                        handleDateRangeChange([start, end]);
                                    }
                                }}
                            />
                        )}

                        {isCustomMode && (
                            <Radio.Group onChange={handleCustomDateModeChange} value={customDateMode}>
                                <Radio.Button value="month">Month</Radio.Button>
                                <Radio.Button value="year">Year</Radio.Button>
                            </Radio.Group>
                        )}

                        <Button icon={<CalendarOutlined />} onClick={handleGoToToday}>
                            Today
                        </Button>

                        <Popover content={columnVisibilityMenu} trigger="click" placement="bottomRight">
                            <Button icon={<SettingOutlined />}>
                                Columns
                            </Button>
                        </Popover>
                    </Space>
                </div>

                <div className="search-controls">
                    <Input
                        placeholder="Search by Job No or Name..."
                        prefix={<SearchOutlined />}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                    <span className="search-result-count">
                        {filteredJobs.length} / {jobs.length} jobs
                    </span>
                </div>
            </div>

            <div className="report-content">
                {loading && (
                    <div className="loading-container">
                        <Spin size="large" tip="Loading jobs..." />
                    </div>
                )}

                {error && (
                    <div className="error-container">
                        <Empty description={`Error: ${error}`} />
                    </div>
                )}

                {!loading && !error && filteredJobs.length === 0 && (
                    <Empty description="No jobs found" />
                )}

                {!loading && !error && filteredJobs.length > 0 && (
                    <JobStatusReportAGGridTable
                        ref={gridRef}
                        jobs={filteredJobs}
                        viewMode={viewMode}
                        dateRange={dateRange}
                        onJobClick={handleJobClick}
                        visibleColumns={visibleColumns}
                    />
                )}
            </div>

            <JobStatusReportModal
                visible={modalVisible}
                job={selectedJob}
                onClose={() => {
                    setModalVisible(false);
                    setSelectedJob(null);
                }}
            />
        </div>
    );
};

export default JobStatusReportAGGrid;
