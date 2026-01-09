import React, { useMemo, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import moment from 'moment';
import { MultiGrid, AutoSizer } from 'react-virtualized';
import { getHighestPriorityEvent, getEventConfig } from '../../../../../constants/jobEventColorConfig';

import '../JobStatusReport.css';

const headerLabels = [
    'Job No.',
    'Name',
    'Qty',
    'RM Out',
    'PK Out',
    'RM In',
    'PK In',
    'Plan (Min)',
    'Delivery (Max)',
];

const fixedColumnWidths = [60, 180, 70, 80, 80, 80, 80, 110, 120];
const fixedColumnCount = headerLabels.length;
const headerRowCount = 1; // Single header row with labels and dates

const JobStatusReportVirtualized = forwardRef(({ jobs = [], dateRange, viewMode, onJobClick, visibleColumns = [] }, ref) => {
    const dateArray = useMemo(() => {
        const start = moment(dateRange.startDate);
        const end = moment(dateRange.endDate);
        const dates = [];

        let current = moment(start);
        while (current.isSameOrBefore(end)) {
            dates.push(current.format('YYYY-MM-DD'));
            current.add(1, 'day');
        }
        return dates;
    }, [dateRange]);

    // Today's date indicator
    const todayDate = moment().format('YYYY-MM-DD');
    const todayColumnIndex = dateArray.indexOf(todayDate);

    // Filtered headers and widths based on visible columns
    const filteredHeaders = useMemo(() => {
        return headerLabels.filter((_, idx) => visibleColumns.includes(idx.toString()));
    }, [visibleColumns]);

    const filteredWidths = useMemo(() => {
        return fixedColumnWidths.filter((_, idx) => visibleColumns.includes(idx.toString()));
    }, [visibleColumns]);

    const gridRef = useRef(null);

    // Expose scrollToToday to parent component
    useImperativeHandle(ref, () => ({
        scrollToToday: () => {
            if (todayColumnIndex >= 0 && gridRef.current) {
                const columnPosition = todayColumnIndex + fixedColumnCount;
                gridRef.current.scrollToCell({ columnIndex: columnPosition, rowIndex: 0 });
            }
        }
    }));

    // Calculate month spans for merged month headers
    const monthSpans = useMemo(() => {
        const spans = [];
        let currentMonth = null;
        let startIdx = 0;

        dateArray.forEach((date, idx) => {
            const month = moment(date).format('YYYY-MM');
            if (month !== currentMonth) {
                if (currentMonth) {
                    spans.push({
                        month: currentMonth,
                        start: startIdx,
                        count: idx - startIdx,
                        label: moment(dateArray[startIdx]).format('MMM YYYY')
                    });
                }
                currentMonth = month;
                startIdx = idx;
            }
        });

        if (currentMonth && dateArray.length > 0) {
            spans.push({
                month: currentMonth,
                start: startIdx,
                count: dateArray.length - startIdx,
                label: moment(dateArray[startIdx]).format('MMM YYYY')
            });
        }

        return spans;
    }, [dateArray]);

    const columnCount = visibleColumns.filter(c => parseInt(c) < fixedColumnCount).length + dateArray.length;
    const rowCount = headerRowCount + jobs.length;

    const getColumnWidth = ({ index }) => {
        if (index < fixedColumnCount) {
            // Map visible column index to actual fixed width
            let visibleIdx = 0;
            for (let i = 0; i < fixedColumnCount; i++) {
                if (visibleColumns.includes(i.toString())) {
                    if (visibleIdx === index) {
                        return fixedColumnWidths[i] || 80;
                    }
                    visibleIdx++;
                }
            }
            return 80;
        }
        // Date columns
        const dateIdx = index - visibleColumns.filter(c => parseInt(c) < fixedColumnCount).length;
        if (dateIdx >= 0 && dateIdx < dateArray.length) {
            return 40; // date column width
        }
        return 40;
    };

    const getRowHeight = ({ index }) => {
        if (index < headerRowCount) return 50;
        return 50;
    };

    const renderHeaderCell = (columnIndex, rowIndex) => {
        if (columnIndex < filteredHeaders.length) {
            // Frozen columns - show header labels
            return <div className="virtual-cell-header">{filteredHeaders[columnIndex]}</div>;
        }

        const dateIdx = columnIndex - filteredHeaders.length;
        const date = dateArray[dateIdx];

        if (!date) return <div className="virtual-cell-header"></div>;

        // Show day of month for date columns
        const isSunday = moment(date).day() === 0;
        const isToday = date === todayDate;
        const dayLabel = moment(date).format('DD');
        const monthLabel = moment(date).format('MMM');

        return (
            <div className={`virtual-cell-header ${isSunday ? 'virtual-cell-sunday' : ''} ${isToday ? 'virtual-cell-today' : ''}`}>
                <div className="virtual-header-month">{monthLabel}</div>
                <div className="virtual-header-day">{dayLabel}</div>
                {isToday && <div className="today-indicator"></div>}
            </div>
        );
    };

    const renderJobInfoCell = (job, columnIndex) => {
        let content;
        // Map visible column index to actual column index
        let visibleIdx = 0;
        let actualColumnIdx = -1;

        for (let i = 0; i < fixedColumnCount; i++) {
            if (visibleColumns.includes(i.toString())) {
                if (visibleIdx === columnIndex) {
                    actualColumnIdx = i;
                    break;
                }
                visibleIdx++;
            }
        }

        if (actualColumnIdx === -1) return '';

        switch (actualColumnIdx) {
            case 0:
                content = job.jobNo;
                break;
            case 1:
                content = job.name;
                break;
            case 2:
                content = job.qty;
                break;
            case 3:
                content = job.dates?.rmWithdrawal
                    ? moment(job.dates.rmWithdrawal).format('DD/MM')
                    : '-';
                break;
            case 4:
                content = job.dates?.pkWithdrawal
                    ? moment(job.dates.pkWithdrawal).format('DD/MM')
                    : '-';
                break;
            case 5:
                content = job.dates?.rmEntry
                    ? moment(job.dates.rmEntry).format('DD/MM')
                    : '-';
                break;
            case 6:
                content = job.dates?.pkEntry
                    ? moment(job.dates.pkEntry).format('DD/MM')
                    : '-';
                break;
            case 7:
                content = job.dates?.planDate
                    ? moment(job.dates.planDate).format('DD/MM')
                    : '-';
                break;
            case 8:
                content = job.dates?.deliveryDate
                    ? moment(job.dates.deliveryDate).format('DD/MM')
                    : '-';
                break;
            default:
                content = '';
        }

        // Make Job No clickable (always visible as first column)
        if (actualColumnIdx === 0 && onJobClick) {
            return (
                <div
                    className="virtual-cell-job-no-link"
                    onClick={() => onJobClick(job)}
                    title="Click to view job details"
                >
                    {content}
                </div>
            );
        }

        return content;
    };

    const renderEventCell = (job, date, isToday = false) => {
        const eventsForDate = (job.events || []).filter(
            (e) => e.isActive && e.date === date
        );

        if (!eventsForDate.length) {
            const isSunday = moment(date).day() === 0;
            return (
                <div className={`virtual-cell ${isSunday ? 'virtual-cell-sunday' : ''} ${isToday ? 'virtual-cell-today' : ''}`}></div>
            );
        }

        const topEvent = getHighestPriorityEvent(eventsForDate);
        const config = getEventConfig(topEvent.eventType);

        return (
            <div
                className={`virtual-cell virtual-cell-event ${isToday ? 'virtual-cell-today' : ''}`}
                title={`${config.label} - ${topEvent.date}`}
                style={{
                    backgroundColor: config.bgColor,
                    color: '#111',
                    borderColor: config.borderColor,
                }}
            >
                <span className="virtual-event-label">{config.label}</span>
            </div>
        );
    };

    const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
        // Header rows
        if (rowIndex < headerRowCount) {
            return (
                <div key={key} style={style} className="virtual-cell-wrapper">
                    {renderHeaderCell(columnIndex, rowIndex)}
                </div>
            );
        }

        // Data rows
        const jobRowIndex = rowIndex - headerRowCount;
        const job = jobs[jobRowIndex];
        const visibleFrozenColCount = visibleColumns.filter(c => parseInt(c) < fixedColumnCount).length;

        if (columnIndex < visibleFrozenColCount) {
            return (
                <div
                    key={key}
                    style={style}
                    className="virtual-cell-wrapper job-row-wrapper"
                    data-row-index={jobRowIndex}
                >
                    <div className="virtual-cell virtual-cell-frozen">
                        {renderJobInfoCell(job, columnIndex)}
                    </div>
                </div>
            );
        }

        const dateIdx = columnIndex - visibleFrozenColCount;
        const date = dateArray[dateIdx];
        const isToday = date === todayDate;

        return (
            <div
                key={key}
                style={style}
                className="virtual-cell-wrapper job-row-wrapper"
                data-row-index={jobRowIndex}
            >
                {renderEventCell(job, date, isToday)}
            </div>
        );
    };

    return (
        <div className="job-status-virtualized">
            <div className="virtual-grid-wrapper">
                <AutoSizer>
                    {({ width, height }) => (
                        <MultiGrid
                            ref={gridRef}
                            cellRenderer={cellRenderer}
                            columnCount={columnCount}
                            columnWidth={getColumnWidth}
                            enableFixedColumnScroll
                            enableFixedRowScroll
                            fixedColumnCount={visibleColumns.filter(c => parseInt(c) < fixedColumnCount).length}
                            fixedRowCount={headerRowCount}
                            height={height}
                            rowCount={rowCount}
                            rowHeight={getRowHeight}
                            overscanColumnCount={15}
                            overscanRowCount={8}
                            width={width}
                            hideTopRightGridScrollbar
                            hideBottomLeftGridScrollbar
                        />
                    )}
                </AutoSizer>
            </div>
        </div>
    );
});

JobStatusReportVirtualized.displayName = 'JobStatusReportVirtualized';
export default JobStatusReportVirtualized;
