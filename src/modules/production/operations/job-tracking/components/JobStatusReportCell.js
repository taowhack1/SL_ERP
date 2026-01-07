import React, { useState } from 'react';
import { Tooltip } from 'antd';
import {
    JOB_EVENT_COLOR_CONFIG,
    getHighestPriorityEvent,
} from '../../../../../constants/jobEventColorConfig';
import JobStatusReportModal from './JobStatusReportModal';
import '../JobStatusReport.css';

const JobStatusReportCell = ({ job, date, events, isSunday }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEventIndex, setSelectedEventIndex] = useState(0);

    // Find highest priority event
    const highestPriorityEvent = events.length > 0 ? getHighestPriorityEvent(events) : null;
    const eventConfig = highestPriorityEvent
        ? JOB_EVENT_COLOR_CONFIG[highestPriorityEvent.eventType]
        : null;

    // Handle cell click
    const handleCellClick = () => {
        if (events.length > 0) {
            // Find index of highest priority event
            const priorityEventIndex = events.findIndex(
                (e) => e.id === highestPriorityEvent.id
            );
            setSelectedEventIndex(priorityEventIndex >= 0 ? priorityEventIndex : 0);
            setModalVisible(true);
        }
    };

    // Create tooltip content
    const tooltipContent = events.length > 0 ? (
        <div>
            {events.map((event, idx) => {
                // Get event notes
                const eventNotes = event.notes && event.notes.length > 0
                    ? event.notes[0].notes
                    : 'No note';
                return (
                    <div key={event.id} style={{ marginBottom: idx < events.length - 1 ? '8px' : 0 }}>
                        <strong>{JOB_EVENT_COLOR_CONFIG[event.eventType]?.label || 'Event'}:</strong>{' '}
                        {eventNotes}
                    </div>
                );
            })}
        </div>
    ) : null;

    return (
        <>
            <Tooltip title={tooltipContent}>
                <div
                    className={`calendar-cell ${isSunday ? 'sunday' : ''} ${events.length > 0 ? 'has-event' : ''
                        }`}
                    onClick={handleCellClick}
                    style={
                        eventConfig
                            ? {
                                backgroundColor: eventConfig.bgColor,
                                borderColor: eventConfig.borderColor,
                            }
                            : {}
                    }
                >
                    {eventConfig && (
                        <div className="cell-content">
                            <span className="event-label">{eventConfig.label}</span>
                            {events.length > 1 && (
                                <span className="event-count">+{events.length - 1}</span>
                            )}
                        </div>
                    )}
                </div>
            </Tooltip>

            {/* Modal for job details and event management */}
            {modalVisible && (
                <JobStatusReportModal
                    visible={modalVisible}
                    job={job}
                    onClose={() => setModalVisible(false)}
                    selectedEventIndex={selectedEventIndex}
                    events={job.events || []}
                />
            )}
        </>
    );
};

export default JobStatusReportCell;
