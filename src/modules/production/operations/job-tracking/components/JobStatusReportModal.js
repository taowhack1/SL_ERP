import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Modal,
    Tabs,
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    Divider,
    Tag,
    Space,
    Row,
    Col,
    Empty,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
    updateJobNotes,
    addJobEvent,
    updateJobEventStatus,
} from '../../../../../actions/production/jobStatusReportActions';
import {
    JOB_EVENT_COLOR_CONFIG,
    getEventTypes,
} from '../../../../../constants/jobEventColorConfig';
import '../JobStatusReport.css';

const JobStatusReportModal = ({ visible, job, onClose, selectedEventIndex, events }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [notesText, setNotesText] = useState(job?.notes || '');
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [addEventForm] = Form.useForm();

    useEffect(() => {
        // Handle nested notes structure
        if (job?.notes && Array.isArray(job.notes) && job.notes.length > 0) {
            setNotesText(job.notes[0].notes || '');
        } else if (typeof job?.notes === 'string') {
            setNotesText(job.notes || '');
        } else {
            setNotesText('');
        }
    }, [job]);

    // Handle save notes (on blur or Enter)
    const handleSaveNotes = async () => {
        if (notesText.trim() !== job?.notes) {
            dispatch(updateJobNotes(job.id, notesText));
        }
    };

    // Handle add event
    const handleAddEvent = async () => {
        try {
            const values = await addEventForm.validateFields();
            dispatch(
                addJobEvent(
                    job.id,
                    values.eventType,
                    values.eventDate.format('YYYY-MM-DD'),
                    values.eventNote || ''
                )
            );
            addEventForm.resetFields();
            setShowAddEvent(false);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    // Handle deactivate event
    const handleDeactivateEvent = (eventId) => {
        dispatch(updateJobEventStatus(eventId, job.id, false));
    };

    // Handle activate event
    const handleActivateEvent = (eventId) => {
        dispatch(updateJobEventStatus(eventId, job.id, true));
    };

    // Group events by date
    const eventsByDate = events.reduce((acc, event) => {
        const dateKey = event.date;
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
    }, {});

    const sortedDates = Object.keys(eventsByDate).sort();

    return (
        <Modal
            title={`Job Details: ${job?.jobNo} - ${job?.name}`}
            visible={visible}
            onCancel={onClose}
            width={900}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
            className="job-status-modal"
        >
            <Tabs defaultActiveKey="1">
                {/* Tab 1: Job & Event Details */}
                <Tabs.TabPane tab="Job & Event Details" key="1">
                    <div className="modal-section">
                        <h3>Job Information</h3>
                        <Row gutter={16}>
                            <Col span={8}>
                                <div className="info-item">
                                    <label>Job No.:</label>
                                    <span>{job?.jobNo}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="info-item">
                                    <label>Name:</label>
                                    <span>{job?.name}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="info-item">
                                    <label>Quantity:</label>
                                    <span>{job?.qty}</span>
                                </div>
                            </Col>
                        </Row>

                        <Divider>Important Dates</Divider>

                        <Row gutter={16}>
                            <Col span={12}>
                                <div className="info-item">
                                    <label>RM Withdrawal:</label>
                                    <span>
                                        {job?.dates?.rmWithdrawal
                                            ? moment(job.dates.rmWithdrawal).format('DD/MM/YYYY')
                                            : '-'}
                                    </span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="info-item">
                                    <label>PK Withdrawal:</label>
                                    <span>
                                        {job?.dates?.pkWithdrawal
                                            ? moment(job.dates.pkWithdrawal).format('DD/MM/YYYY')
                                            : '-'}
                                    </span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="info-item">
                                    <label>RM Entry:</label>
                                    <span>
                                        {job?.dates?.rmEntry
                                            ? moment(job.dates.rmEntry).format('DD/MM/YYYY')
                                            : '-'}
                                    </span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="info-item">
                                    <label>PK Entry:</label>
                                    <span>
                                        {job?.dates?.pkEntry
                                            ? moment(job.dates.pkEntry).format('DD/MM/YYYY')
                                            : '-'}
                                    </span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="info-item">
                                    <label>Plan Date (Min):</label>
                                    <span>
                                        {job?.dates?.planDate
                                            ? moment(job.dates.planDate).format('DD/MM/YYYY')
                                            : '-'}
                                    </span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="info-item">
                                    <label>Delivery Date (Max):</label>
                                    <span>
                                        {job?.dates?.deliveryDate
                                            ? moment(job.dates.deliveryDate).format('DD/MM/YYYY')
                                            : '-'}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Tabs.TabPane>

                {/* Tab 2: Job Notes */}
                <Tabs.TabPane tab="Notes" key="2">
                    <div className="modal-section">
                        <h3>Job Notes</h3>
                        <p className="section-desc">
                            General notes for this job. Press Tab or click outside to save.
                        </p>
                        <Input.TextArea
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            onBlur={handleSaveNotes}
                            rows={6}
                            placeholder="Enter job notes here..."
                            className="job-notes-textarea"
                        />
                    </div>
                </Tabs.TabPane>

                {/* Tab 3: Events Management */}
                <Tabs.TabPane tab="Events" key="3">
                    <div className="modal-section">
                        <div className="events-header">
                            <h3>Job Events</h3>
                            <Button
                                type={showAddEvent ? 'default' : 'primary'}
                                icon={<PlusOutlined />}
                                onClick={() => setShowAddEvent(!showAddEvent)}
                            >
                                {showAddEvent ? 'Cancel' : 'Add Event'}
                            </Button>
                        </div>

                        {/* Add Event Form */}
                        {showAddEvent && (
                            <div className="add-event-form">
                                <Divider>New Event</Divider>
                                <Form form={addEventForm} layout="vertical">
                                    <Form.Item
                                        label="Event Type"
                                        name="eventType"
                                        rules={[
                                            { required: true, message: 'Please select event type' },
                                        ]}
                                    >
                                        <Select placeholder="Select event type">
                                            {getEventTypes().map((type) => {
                                                const config = JOB_EVENT_COLOR_CONFIG[type];
                                                return (
                                                    <Select.Option key={type} value={type}>
                                                        <Tag color={config.color}>{config.label}</Tag>{' '}
                                                        {config.description}
                                                    </Select.Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Event Date"
                                        name="eventDate"
                                        rules={[
                                            { required: true, message: 'Please select event date' },
                                        ]}
                                    >
                                        <DatePicker format="DD/MM/YYYY" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Event Note (Optional)"
                                        name="eventNote"
                                    >
                                        <Input.TextArea
                                            rows={3}
                                            placeholder="Add a note for this event..."
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Space>
                                            <Button type="primary" onClick={handleAddEvent}>
                                                Save Event
                                            </Button>
                                            <Button onClick={() => setShowAddEvent(false)}>
                                                Cancel
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                                <Divider />
                            </div>
                        )}

                        {/* Events List */}
                        {sortedDates.length > 0 ? (
                            <div className="events-list">
                                {sortedDates.map((date) => (
                                    <div key={date} className="event-date-group">
                                        <h4 className="event-date">
                                            {moment(date).format('DD/MM/YYYY')} (
                                            {moment(date).format('dddd')})
                                        </h4>
                                        <div className="events-in-date">
                                            {eventsByDate[date].map((event) => {
                                                const eventConfig = JOB_EVENT_COLOR_CONFIG[event.eventType];
                                                return (
                                                    <div
                                                        key={event.id}
                                                        className={`event-item ${event.isActive ? 'active' : 'inactive'
                                                            }`}
                                                        style={{
                                                            borderLeftColor: eventConfig.color,
                                                        }}
                                                    >
                                                        <div className="event-header">
                                                            <Tag color={eventConfig.color}>
                                                                {eventConfig.label}
                                                            </Tag>
                                                            <span className="event-description">
                                                                {eventConfig.description}
                                                            </span>
                                                            {!event.isActive && (
                                                                <Tag color="red">Inactive</Tag>
                                                            )}
                                                        </div>

                                                        {event.notes && event.notes.length > 0 && event.notes[0].notes && (
                                                            <div className="event-note">
                                                                <strong>Note:</strong> {event.notes[0].notes}
                                                            </div>
                                                        )}

                                                        <div className="event-actions">
                                                            {event.isActive ? (
                                                                <Button
                                                                    size="small"
                                                                    type="text"
                                                                    danger
                                                                    onClick={() =>
                                                                        handleDeactivateEvent(event.id)
                                                                    }
                                                                >
                                                                    Deactivate
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    size="small"
                                                                    type="text"
                                                                    onClick={() => handleActivateEvent(event.id)}
                                                                >
                                                                    Activate
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Empty description="No events created yet" />
                        )}
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    );
};

export default JobStatusReportModal;
