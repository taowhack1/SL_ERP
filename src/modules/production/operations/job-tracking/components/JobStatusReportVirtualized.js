import React, { useMemo } from 'react';
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
const headerRowCount = 2; // Row 0 = month label, Row 1 = date label

const JobStatusReportVirtualized = ({ jobs = [], dateRange, viewMode }) => {
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

    const columnCount = fixedColumnCount + dateArray.length;
    const rowCount = headerRowCount + jobs.length;

    const getColumnWidth = ({ index }) => {
        if (index < fixedColumnCount) {
            return fixedColumnWidths[index] || 80;
        }
        return 40; // date columns
    };

    const getRowHeight = ({ index }) => {
        if (index < headerRowCount) return 40;
        return 50;
    };

    const renderHeaderCell = (columnIndex, rowIndex) => {
        if (columnIndex < fixedColumnCount) {
            // Frozen headers
            return <div className="virtual-cell-header">{headerLabels[columnIndex]}</div>;
        }

        const date = dateArray[columnIndex - fixedColumnCount];
        if (rowIndex === 0) {
            // Month label on first day of each month
            const isFirstOfMonth = moment(date).date() === 1;
            return (
                <div className="virtual-cell-header">
                    {isFirstOfMonth ? moment(date).format('MMM YYYY') : ''}
                </div>
            );
        }

        // Row 1: day of month
        const isSunday = moment(date).day() === 0;
        return (
            <div className={`virtual-cell-header ${isSunday ? 'virtual-cell-sunday' : ''}`}>
                {moment(date).format('DD')}
            </div>
        );
    };

    const renderJobInfoCell = (job, columnIndex) => {
        switch (columnIndex) {
            case 0:
                return job.jobNo;
            case 1:
                return job.name;
            case 2:
                return job.qty;
            case 3:
                return job.dates?.rmWithdrawal
                    ? moment(job.dates.rmWithdrawal).format('DD/MM')
                    : '-';
            case 4:
                return job.dates?.pkWithdrawal
                    ? moment(job.dates.pkWithdrawal).format('DD/MM')
                    : '-';
            case 5:
                return job.dates?.rmEntry
                    ? moment(job.dates.rmEntry).format('DD/MM')
                    : '-';
            case 6:
                return job.dates?.pkEntry
                    ? moment(job.dates.pkEntry).format('DD/MM')
                    : '-';
            case 7:
                return job.dates?.planDate
                    ? moment(job.dates.planDate).format('DD/MM')
                    : '-';
            case 8:
                return job.dates?.deliveryDate
                    ? moment(job.dates.deliveryDate).format('DD/MM')
                    : '-';
            default:
                return '';
        }
    };

    const renderEventCell = (job, date) => {
        const eventsForDate = (job.events || []).filter(
            (e) => e.isActive && e.date === date
        );

        if (!eventsForDate.length) {
            const isSunday = moment(date).day() === 0;
            return (
                <div className={`virtual-cell ${isSunday ? 'virtual-cell-sunday' : ''}`}></div>
            );
        }

        const topEvent = getHighestPriorityEvent(eventsForDate);
        const config = getEventConfig(topEvent.eventType);

        return (
            <div
                className="virtual-cell virtual-cell-event"
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
        const job = jobs[rowIndex - headerRowCount];
        if (columnIndex < fixedColumnCount) {
            return (
                <div key={key} style={style} className="virtual-cell-wrapper">
                    <div className="virtual-cell virtual-cell-frozen">
                        {renderJobInfoCell(job, columnIndex)}
                    </div>
                </div>
            );
        }

        const date = dateArray[columnIndex - fixedColumnCount];
        return (
            <div key={key} style={style} className="virtual-cell-wrapper">
                {renderEventCell(job, date)}
            </div>
        );
    };

    return (
        <div className="job-status-virtualized">
            <div className="virtual-grid-wrapper">
                <AutoSizer>
                    {({ width, height }) => (
                        <MultiGrid
                            cellRenderer={cellRenderer}
                            columnCount={columnCount}
                            columnWidth={getColumnWidth}
                            enableFixedColumnScroll
                            enableFixedRowScroll
                            fixedColumnCount={fixedColumnCount}
                            fixedRowCount={headerRowCount}
                            height={height}
                            rowCount={rowCount}
                            rowHeight={getRowHeight}
                            overscanColumnCount={4}
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
};

export default JobStatusReportVirtualized;
