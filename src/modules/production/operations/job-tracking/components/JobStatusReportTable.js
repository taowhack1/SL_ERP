import React, { useMemo, useRef, useEffect } from 'react';
import moment from 'moment';
import JobStatusReportCell from './JobStatusReportCell';
import '../JobStatusReport.css';

const JobStatusReportTable = ({ jobs, viewMode, dateRange }) => {
    const frozenBodyRef = useRef(null);
    const calendarBodyRef = useRef(null);
    const dateHeaderRef = useRef(null);
    const monthHeaderRef = useRef(null);

    // Sync vertical scroll between frozen columns and calendar grid
    useEffect(() => {
        const handleFrozenScroll = () => {
            if (calendarBodyRef.current && frozenBodyRef.current) {
                calendarBodyRef.current.scrollTop = frozenBodyRef.current.scrollTop;
            }
        };

        const handleCalendarScroll = () => {
            if (frozenBodyRef.current && calendarBodyRef.current) {
                frozenBodyRef.current.scrollTop = calendarBodyRef.current.scrollTop;
            }
        };

        const frozenBody = frozenBodyRef.current;
        const calendarBody = calendarBodyRef.current;

        if (frozenBody) {
            frozenBody.addEventListener('scroll', handleFrozenScroll);
        }

        if (calendarBody) {
            calendarBody.addEventListener('scroll', handleCalendarScroll);
        }

        return () => {
            if (frozenBody) {
                frozenBody.removeEventListener('scroll', handleFrozenScroll);
            }
            if (calendarBody) {
                calendarBody.removeEventListener('scroll', handleCalendarScroll);
            }
        };
    }, []);

    // Sync horizontal scroll between calendar headers and body
    useEffect(() => {
        const handleCalendarBodyHorizontalScroll = () => {
            if (dateHeaderRef.current && calendarBodyRef.current) {
                dateHeaderRef.current.scrollLeft = calendarBodyRef.current.scrollLeft;
            }
            if (monthHeaderRef.current && calendarBodyRef.current) {
                monthHeaderRef.current.scrollLeft = calendarBodyRef.current.scrollLeft;
            }
        };

        const calendarBody = calendarBodyRef.current;

        if (calendarBody) {
            calendarBody.addEventListener('scroll', handleCalendarBodyHorizontalScroll);
        }

        return () => {
            if (calendarBody) {
                calendarBody.removeEventListener('scroll', handleCalendarBodyHorizontalScroll);
            }
        };
    }, []);
    // Generate date array based on view mode
    const dateArray = useMemo(() => {
        const start = moment(dateRange.startDate);
        const end = moment(dateRange.endDate);
        const dates = [];

        let current = moment(start);
        while (current.isSameOrBefore(end)) {
            dates.push(current.format('YYYY-MM-DD'));
            current.add(1, 'day');
        }

        console.log('Generated dateArray:', dates.length, 'dates from', dateRange.startDate, 'to', dateRange.endDate);
        console.log('First 5 dates:', dates.slice(0, 5));
        console.log('Last 5 dates:', dates.slice(-5));

        return dates;
    }, [dateRange]);

    // Group dates by month
    const datesByMonth = useMemo(() => {
        const grouped = {};
        dateArray.forEach(date => {
            const monthKey = moment(date).format('YYYY-MM');
            if (!grouped[monthKey]) {
                grouped[monthKey] = [];
            }
            grouped[monthKey].push(date);
        });
        return grouped;
    }, [dateArray]);

    // Determine if a date is Sunday
    const isSunday = (dateStr) => {
        return moment(dateStr).day() === 0;
    };

    return (
        <div className="job-status-table-wrapper">
            <div className="table-scroll-container">
                {/* Frozen Left Column */}
                <div className="frozen-columns">
                    <div className="table-header-section">
                        <div className="header-row">
                            <div className="header-cell job-no-col">Job No.</div>
                            <div className="header-cell job-name-col">Name</div>
                            <div className="header-cell qty-col">Qty</div>
                            <div className="header-cell date-col">RM Out</div>
                            <div className="header-cell date-col">PK Out</div>
                            <div className="header-cell date-col">RM In</div>
                            <div className="header-cell date-col">PK In</div>
                            <div className="header-cell date-col">Plan (Min)</div>
                            <div className="header-cell date-col">Delivery (Max)</div>
                        </div>
                    </div>

                    <div className="table-body-section" ref={frozenBodyRef}>
                        {jobs.map((job, index) => (
                            <div
                                key={job.id}
                                className={`body-row ${index % 2 === 0 ? 'even' : 'odd'}`}
                            >
                                <div className="body-cell job-no-col">{job.jobNo}</div>
                                <div className="body-cell job-name-col" title={job.name}>
                                    {job.name}
                                </div>
                                <div className="body-cell qty-col">{job.qty}</div>
                                <div className="body-cell date-col">
                                    {job.dates.rmWithdrawal
                                        ? moment(job.dates.rmWithdrawal).format('DD/MM')
                                        : '-'}
                                </div>
                                <div className="body-cell date-col">
                                    {job.dates.pkWithdrawal
                                        ? moment(job.dates.pkWithdrawal).format('DD/MM')
                                        : '-'}
                                </div>
                                <div className="body-cell date-col">
                                    {job.dates.rmEntry ? moment(job.dates.rmEntry).format('DD/MM') : '-'}
                                </div>
                                <div className="body-cell date-col">
                                    {job.dates.pkEntry ? moment(job.dates.pkEntry).format('DD/MM') : '-'}
                                </div>
                                <div className="body-cell date-col">
                                    {job.dates.planDate
                                        ? moment(job.dates.planDate).format('DD/MM')
                                        : '-'}
                                </div>
                                <div className="body-cell date-col">
                                    {job.dates.deliveryDate
                                        ? moment(job.dates.deliveryDate).format('DD/MM')
                                        : '-'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrollable Calendar Grid */}
                <div className="calendar-grid-wrapper">
                    {/* Month Headers */}
                    <div className="calendar-header-month" ref={monthHeaderRef}>
                        {Object.keys(datesByMonth).map((monthKey) => {
                            const monthDates = datesByMonth[monthKey];
                            const monthLabel = moment(monthKey, 'YYYY-MM').format('MMM YYYY');
                            return (
                                <div
                                    key={`month-${monthKey}`}
                                    className="month-column"
                                    style={{ width: `${monthDates.length * 40}px` }}
                                >
                                    <div className="month-label">{monthLabel}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Date Headers */}
                    <div className="calendar-header-date" ref={dateHeaderRef}>
                        {dateArray.map((date) => (
                            <div
                                key={`date-${date}`}
                                className={`date-column ${isSunday(date) ? 'sunday' : ''}`}
                            >
                                <div className="date-label">{moment(date).format('DD')}</div>
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid Body */}
                    <div className="calendar-grid-body" ref={calendarBodyRef}>
                        {jobs.map((job) => (
                            <div key={`job-${job.id}`} className="calendar-row">
                                {dateArray.map((date) => {
                                    // Get all active events for this job on this date
                                    const dateEvents = (job.events || [])
                                        .filter(
                                            (e) => e.isActive && e.date === date
                                        );

                                    return (
                                        <JobStatusReportCell
                                            key={`cell-${job.id}-${date}`}
                                            job={job}
                                            date={date}
                                            events={dateEvents}
                                            isSunday={isSunday(date)}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobStatusReportTable;
