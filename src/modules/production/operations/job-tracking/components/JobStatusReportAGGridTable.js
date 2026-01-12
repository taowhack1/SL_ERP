import React, { useMemo, forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getHighestPriorityEvent, getEventConfig } from '../../../../../constants/jobEventColorConfig';
import './JobStatusReportAGGrid.css';

const JobStatusReportAGGridTable = forwardRef(({ jobs = [], dateRange, viewMode, onJobClick, visibleColumns = [] }, ref) => {
    const gridRef = useRef(null);

    // Generate date array
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

    // Today's date
    const todayDate = moment().format('YYYY-MM-DD');

    // Fixed column definitions
    const fixedColumns = [
        { field: 'mrp_no', headerName: 'MRP No.', width: 120, pinned: 'left', index: 0, },
        { field: 'jobNo', headerName: 'Job No.', width: 90, pinned: 'left', index: 1 },
        { field: 'name', headerName: 'Name', width: 600, pinned: 'left', index: 2, cellStyle: { textAlign: 'left' } },
        { field: 'qty', headerName: 'Qty', width: 100, pinned: 'left', index: 3, cellStyle: { textAlign: 'right' } },
        { field: 'unit', headerName: 'Unit', width: 50, pinned: 'left', index: 4, },
        // { field: 'rmOut', headerName: 'RM Out', width: 110, pinned: 'left', index: 3, },
        // { field: 'pkOut', headerName: 'PK Out', width: 110, pinned: 'left', index: 4, },
        // { field: 'rmIn', headerName: 'RM In', width: 110, pinned: 'left', index: 5, },
        // { field: 'pkIn', headerName: 'PK In', width: 110, pinned: 'left', index: 6, },
        // { field: 'planDate', headerName: 'Plan (Min)', width: 110, pinned: 'left', index: 7, },
        { field: 'deliveryDate', headerName: 'Delivery Date', width: 100, pinned: 'left', index: 5, },
    ];

    // Cell renderer for job number (clickable)
    const mrpNoCellRenderer = (params) => {
        return (
            <div
                className="ag-job-no-link"
                onClick={() => onJobClick && onJobClick(params.data._rawJob)}
                style={{ cursor: 'pointer', color: '#1890ff', textDecoration: 'underline' }}
            >
                {params.value}
            </div>
        );
    };

    // Cell renderer for event cells
    const EventCellRenderer = (params) => {
        const date = params.colDef.field;
        const job = params.data._rawJob;

        if (!job || !date) return null;

        // Check for events that fall on this date
        // Handle both single date and date ranges (dateStart to dateEnd)
        const eventsForDate = (job.events || []).filter(e => {
            if (!e.isActive) return false;

            // If event has dateStart and dateEnd, check if date falls in range
            if (e.dateStart && e.dateEnd) {
                const currentDate = moment(date);
                const startDate = moment(e.dateStart);
                const endDate = moment(e.dateEnd);
                return currentDate.isBetween(startDate, endDate, 'day', '[]');
            }

            // Fallback to single date field
            return e.date === date;
        });

        if (!eventsForDate.length) {
            return null;
        }

        const topEvent = getHighestPriorityEvent(eventsForDate);
        const config = getEventConfig(topEvent.eventType);

        // Format date display
        let dateDisplay = topEvent.date;
        if (topEvent.dateStart && topEvent.dateEnd && topEvent.dateStart !== topEvent.dateEnd) {
            dateDisplay = `${moment(topEvent.dateStart).format('DD/MM')} - ${moment(topEvent.dateEnd).format('DD/MM')}`;
        } else if (topEvent.dateStart) {
            dateDisplay = moment(topEvent.dateStart).format('DD/MM/YYYY');
        }

        return (
            <div
                className="ag-event-cell"
                title={`${config.label} - ${dateDisplay}`}
                style={{
                    backgroundColor: config.bgColor,
                    color: '#111',
                    border: `1px solid ${config.borderColor}`,
                    padding: '2px 4px',
                    borderRadius: '2px',
                    fontSize: '10px',
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {config.label}
            </div>
        );
    };

    // Row span helper: merge fixed columns vertically by pairs (start on even rows)
    const getTwoRowSpan = useCallback((params) => {
        const { rowIndex, api, node } = params;
        if (!api || !node) return 1;

        const total = api.getDisplayedRowCount();
        const isLastOddRow = total % 2 === 1 && rowIndex === total - 1;

        // Only start span on even rows; their immediate next row shares the span
        if (rowIndex % 2 !== 0) return 1;
        if (isLastOddRow) return 1;

        const next = api.getDisplayedRowAtIndex(rowIndex + 1);
        if (!next) return 1;

        return 2;
    }, []);

    // Build column definitions with visible columns filter
    const columnDefs = useMemo(() => {
        const cols = [];

        // Fixed columns (single header row) with body row spanning
        fixedColumns.forEach(col => {
            if (visibleColumns.includes(col.index.toString())) {
                const colDef = {
                    field: col.field,
                    headerName: col.headerName,
                    width: col.width,
                    pinned: col.pinned,
                    suppressMovable: true,
                    lockPosition: true,
                    cellStyle: col.cellStyle,
                    rowSpan: getTwoRowSpan,
                };

                if (col.field === 'mrp_no') {
                    colDef.cellRenderer = mrpNoCellRenderer;
                }

                cols.push(colDef);
            }
        });

        // Flattened date columns with two-line header (month on first line, day on second)
        dateArray.forEach(date => {
            const isSunday = moment(date).day() === 0;
            const isToday = date === todayDate;

            cols.push({
                field: date,
                headerName: date,
                width: 50,
                cellRenderer: EventCellRenderer,
                suppressMovable: true,
                headerComponent: (params) => {
                    const monthYear = moment(date).format('MM/YY');
                    const day = moment(date).format('DD');
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', lineHeight: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: 'normal' }}>{monthYear}</div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{day}</div>
                        </div>
                    );
                },
                cellClass: () => {
                    const classes = ['ag-date-cell'];
                    if (isSunday) classes.push('ag-sunday-cell');
                    if (isToday) classes.push('ag-today-cell');
                    return classes;
                },
                headerClass: () => {
                    const classes = ['ag-date-header'];
                    if (isSunday) classes.push('ag-sunday-header');
                    if (isToday) classes.push('ag-today-header');
                    return classes;
                }
            });
        });

        return cols;
    }, [fixedColumns, dateArray, visibleColumns, todayDate, mrpNoCellRenderer, EventCellRenderer, getTwoRowSpan]);

    // Transform jobs data for AG Grid
    const rowData = useMemo(() => {
        return jobs.map(job => {
            const row = {
                _rawJob: job, // Keep reference to original job
                mrp_no: job.mrp_no,
                jobNo: job.jobNo,
                name: job.name,
                qty: job.qty,
                unit: job.unit,
                rmOut: job.dates?.rmWithdrawal ? moment(job.dates.rmWithdrawal).format('DD/MM/YYYY') : '-',
                pkOut: job.dates?.pkWithdrawal ? moment(job.dates.pkWithdrawal).format('DD/MM/YYYY') : '-',
                rmIn: job.dates?.rmEntry ? moment(job.dates.rmEntry).format('DD/MM/YYYY') : '-',
                pkIn: job.dates?.pkEntry ? moment(job.dates.pkEntry).format('DD/MM/YYYY') : '-',
                planDate: job.dates?.planDate ? moment(job.dates.planDate).format('DD/MM/YYYY') : '-',
                deliveryDate: job.dates?.deliveryDate ? job.dates.deliveryDate : '-',
            };

            // Add date fields - empty string prevents showing raw values
            dateArray.forEach(date => {
                row[date] = ''; // Empty value - renderer will handle display
            });

            return row;
        });
    }, [jobs, dateArray]);

    // Default column properties
    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: false,
        filter: false,
        suppressMenu: true,
    }), []);

    // Expose scrollToToday method
    useImperativeHandle(ref, () => ({
        scrollToToday: () => {
            if (gridRef.current && gridRef.current.api) {
                const todayColIndex = dateArray.indexOf(todayDate);
                if (todayColIndex >= 0) {
                    // Scroll to today's column
                    gridRef.current.api.ensureColumnVisible(todayDate);
                }
            }
        }
    }));

    return (
        <div className="ag-theme-alpine ag-job-status-grid" style={{ height: 'calc(100vh - 220px)', width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                suppressRowHoverHighlight={false}
                suppressRowTransform={true}
                rowHeight={50}
                headerHeight={50}
                suppressHorizontalScroll={false}
                suppressMovableColumns={true}
                enableCellTextSelection={true}
                ensureDomOrder={true}
                animateRows={false}
            />
        </div>
    );
});

JobStatusReportAGGridTable.displayName = 'JobStatusReportAGGridTable';
export default JobStatusReportAGGridTable;
