import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, DatePicker, Space, Spin, Empty, Input, Popover, Checkbox, Radio, Modal } from 'antd';
import { SearchOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
    fetchJobsByDateRange,
    setViewMode,
    setDateRange,
} from '../../../../actions/production/jobStatusReportActions';
import JobStatusReportVirtualized from './components/JobStatusReportVirtualized';
import JobStatusReportModal from './components/JobStatusReportModal';
import './JobStatusReport.css';

const JobStatusReport = () => {
    const dispatch = useDispatch();
    const [customDateRange, setCustomDateRange] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [customDateMode, setCustomDateMode] = useState('month'); // 'month' or 'year'
    const [visibleColumns, setVisibleColumns] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8']); // index as string
    const virtualizationRef = useRef(null);

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

    // Debug: Log every render
    console.log('JobStatusReport render - viewMode:', viewMode, 'jobs count:', jobs ? jobs.length : 0, 'loading:', loading);
    console.log('Current dateRange from Redux:', dateRange);

    // Initialize on mount
    useEffect(() => {
        // Set initial date range based on month view
        const start = moment().startOf('month').format('YYYY-MM-DD');
        const end = moment().endOf('month').format('YYYY-MM-DD');
        console.log('Initial date range - Month view:', start, 'to', end);
        dispatch(setDateRange(start, end));
        dispatch(fetchJobsByDateRange(start, end));
    }, [dispatch]);

    // Handle view mode change
    const handleViewModeChange = (mode) => {
        console.log('handleViewModeChange called with mode:', mode);
        console.log('Current viewMode:', viewMode);
        dispatch(setViewMode(mode));

        let start, end;

        if (mode === 'year') {
            start = moment().startOf('year').format('YYYY-MM-DD');
            end = moment().endOf('year').format('YYYY-MM-DD');
            console.log('Year view date range:', start, 'to', end);
        } else if (mode === 'month') {
            start = moment().startOf('month').format('YYYY-MM-DD');
            end = moment().endOf('month').format('YYYY-MM-DD');
            console.log('Month view date range:', start, 'to', end);
        } else if (mode === 'custom') {
            // Keep current custom date range or reset to month view
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

    // Handle custom date mode (month/year picker for custom range)
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

    // Go to today - scroll to today's date
    const handleGoToToday = () => {
        if (virtualizationRef.current) {
            virtualizationRef.current.scrollToToday();
        }
    };

    // Handle job click to open modal
    const handleJobClick = (job) => {
        setSelectedJob(job);
        setModalVisible(true);
    };

    // Handle column visibility toggle
    const handleColumnToggle = (columnIndex) => {
        // Job No (index 0) must always be visible
        if (columnIndex === '0') return;

        setVisibleColumns(prev => {
            if (prev.includes(columnIndex)) {
                return prev.filter(col => col !== columnIndex);
            } else {
                return [...prev].sort();
            }
        });
    };

    const columnVisibilityMenu = (
        <div style={{ padding: '8px' }}>
            <div style={{ marginBottom: '8px', fontWeight: 600 }}>Show/Hide Columns</div>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((idx, i) => {
                    const columnNames = ['Job No.', 'Name', 'Qty', 'RM Out', 'PK Out', 'RM In', 'PK In', 'Plan (Min)', 'Delivery (Max)'];
                    const isLocked = idx === '0'; // Job No. always visible
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

    // Filter jobs based on search keyword (Job No or Name)
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
                <h1>Job Status Report</h1>

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
                                        setCustomDateRange([start, end]);
                                        dispatch(setDateRange(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')));
                                        dispatch(fetchJobsByDateRange(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')));
                                    }
                                }}
                                placeholder="Select Month"
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
                                        setCustomDateRange([start, end]);
                                        dispatch(setDateRange(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')));
                                        dispatch(fetchJobsByDateRange(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')));
                                    }
                                }}
                                placeholder="Select Year"
                            />
                        )}

                        {isCustomMode && (
                            <Radio.Group value={customDateMode} onChange={handleCustomDateModeChange} size="small">
                                <Radio.Button value="month">Month</Radio.Button>
                                <Radio.Button value="year">Year</Radio.Button>
                            </Radio.Group>
                        )}

                        {/* Go to Today Button */}
                        <Button
                            icon={<CalendarOutlined />}
                            onClick={handleGoToToday}
                            title="Scroll to today"
                        >
                            Today
                        </Button>

                        {/* Column Visibility Toggle */}
                        <Popover
                            content={columnVisibilityMenu}
                            title="Column Settings"
                            trigger="click"
                            placement="bottomRight"
                        >
                            <Button icon={<SettingOutlined />} />
                        </Popover>
                    </Space>
                </div>

                <div className="search-container">
                    <Input
                        placeholder="Search by Job No. or Name..."
                        prefix={<SearchOutlined />}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        allowClear
                        style={{ width: 300 }}
                    />
                    {searchKeyword && (
                        <span style={{ marginLeft: 12, color: '#666' }}>
                            Found {filteredJobs.length} job(s)
                        </span>
                    )}
                </div>

                {dateRange && (
                    <div className="date-range-info">
                        <span>
                            Showing: {moment(dateRange.startDate).format('DD/MM/YYYY')} to{' '}
                            {moment(dateRange.endDate).format('DD/MM/YYYY')}
                        </span>
                    </div>
                )}
            </div>

            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            )}

            <Spin spinning={loading} tip="Loading job data...">
                {filteredJobs && filteredJobs.length > 0 ? (
                    <JobStatusReportVirtualized
                        ref={virtualizationRef}
                        jobs={filteredJobs}
                        viewMode={viewMode}
                        dateRange={dateRange}
                        onJobClick={handleJobClick}
                        visibleColumns={visibleColumns}
                    />
                ) : (
                    <Empty description={searchKeyword ? "No jobs match your search" : "No job data available"} style={{ marginTop: 50 }} />
                )}
            </Spin>

            {selectedJob && (
                <JobStatusReportModal
                    visible={modalVisible}
                    job={selectedJob}
                    onClose={() => {
                        setModalVisible(false);
                        setSelectedJob(null);
                    }}
                />
            )}
        </div>
    );
};

export default JobStatusReport;
