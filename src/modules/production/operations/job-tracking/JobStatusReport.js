import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, DatePicker, Space, Spin, Empty } from 'antd';
import moment from 'moment';
import {
    fetchJobsByDateRange,
    setViewMode,
    setDateRange,
} from '../../../../actions/production/jobStatusReportActions';
import JobStatusReportTable from './components/JobStatusReportTable';
import './JobStatusReport.css';

const JobStatusReport = () => {
    const dispatch = useDispatch();
    const [customDateRange, setCustomDateRange] = useState(null);

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

                        {isCustomMode && (
                            <DatePicker.RangePicker
                                value={customDateRange}
                                onChange={handleDateRangeChange}
                                format="YYYY-MM-DD"
                                placeholder={['Start Date', 'End Date']}
                            />
                        )}
                    </Space>
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
                {jobs && jobs.length > 0 ? (
                    <JobStatusReportTable
                        jobs={jobs}
                        viewMode={viewMode}
                        dateRange={dateRange}
                    />
                ) : (
                    <Empty description="No job data available" style={{ marginTop: 50 }} />
                )}
            </Spin>
        </div>
    );
};

export default JobStatusReport;
