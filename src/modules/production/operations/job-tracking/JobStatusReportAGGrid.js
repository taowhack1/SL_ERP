import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, DatePicker, Space, Spin, Empty, Input, Popover, Checkbox, Radio, Tag } from 'antd';
import { SearchOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
    fetchJobsByDateRange,
    fetchJobDetails,
    setViewMode,
    setDateRange,
} from '../../../../actions/production/jobStatusReportActions';
import { getEventConfigsByPriority } from '../../../../constants/jobEventColorConfig';
import JobStatusReportAGGridTable from './components/JobStatusReportAGGridTable';
import JobStatusReportModal from './components/JobStatusReportModal';
import './JobStatusReport.css';

const JobStatusReportAGGrid = () => {
    const dispatch = useDispatch();
    const [customDateRange, setCustomDateRange] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [customDateMode, setCustomDateMode] = useState('month');
    const [visibleColumns, setVisibleColumns] = useState(['0', '1', '2', '3', '4', '5']);
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
        dispatch(fetchJobsByDateRange({ date_start: start, date_end: end, search: '' }));
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
        dispatch(fetchJobsByDateRange({ date_start: start, date_end: end, search: searchValue }));
    };

    // Handle custom date range change
    const handleDateRangeChange = (dates) => {
        if (dates && dates[0] && dates[1]) {
            setCustomDateRange(dates);
            const start = dates[0].startOf('month').format('YYYY-MM-DD');
            const end = dates[1].endOf('month').format('YYYY-MM-DD');
            dispatch(setDateRange(start, end));
            dispatch(fetchJobsByDateRange({ date_start: start, date_end: end, search: searchValue }));
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

    // Handle job click - fetch details first
    const handleJobClick = async (job) => {
        const jobDetails = await fetchJobDetails(job.mrp_no);
        setSelectedJob(jobDetails);
        // if (jobDetails) {
        // } else {
        //     setSelectedJob(job);
        // }
        setModalVisible(true);
    };

    // Handle search
    const handleSearch = (value) => {
        setSearchValue(value);
        dispatch(fetchJobsByDateRange({ date_start: dateRange.startDate, date_end: dateRange.endDate, search: value }));
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
                {['0', '1', '2', '3', '4', '5'].map((idx, i) => {
                    const columnNames = ['MRP No.', 'Job No.', 'Name', 'Qty', 'Unit', 'Delivery Date'];
                    const isLocked = idx === '0' || idx === '1';
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

    // Event legend
    const eventLegend = useMemo(() => {
        const configs = getEventConfigsByPriority();
        return (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 600, marginRight: '8px' }}>Legend:</span>
                {configs.map(config => (
                    <div key={config.type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            backgroundColor: config.bgColor,
                            border: `1px solid ${config.borderColor}`,
                            borderRadius: '2px'
                        }} />
                        <span style={{ fontSize: '12px' }}>{config.description}</span>
                    </div>
                ))}
            </div>
        );
    }, []);

    const isCustomMode = viewMode === 'custom';

    return (
        <div className="job-status-report-container">
            <div className="report-header">
                <h1>Job Status Report</h1>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 12, marginBottom: 12 }}>
                    <Space><span className="control-label">SO Date Range:</span>
                        <DatePicker.RangePicker
                            picker="month"
                            format="YYYY-MM"
                            onChange={(vals) => {
                                if (vals && vals[0] && vals[1]) {
                                    handleDateRangeChange(vals);
                                }
                            }}
                        />
                        <Input.Search
                            placeholder="Search MRP No, Job No, Name..."
                            allowClear
                            style={{ width: 500 }}
                            onSearch={handleSearch}
                            onChange={(e) => {
                                if (!e.target.value) {
                                    handleSearch('');
                                }
                            }}
                        /></Space>
                    <Space>
                        {eventLegend}
                        <Button icon={<CalendarOutlined />} onClick={handleGoToToday}>
                            Focus Today
                        </Button>
                        <Popover content={columnVisibilityMenu} trigger="click" placement="bottomRight">
                            <Button icon={<SettingOutlined />}>
                                Columns
                            </Button>
                        </Popover>
                    </Space>
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

                {!loading && !error && (
                    <JobStatusReportAGGridTable
                        ref={gridRef}
                        jobs={jobs}
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
