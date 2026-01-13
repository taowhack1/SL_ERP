import React, { useState, useEffect } from 'react';
import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal,
    Form,
    Input,
    Button,
    DatePicker,
    Select,
    Tag,
    Table,
    Switch,
    List,
    Card,
    Descriptions,
    message,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
    updateJobNotes,
    addJobEvent,
    addJobComment,
    updateJobEvent,
    updateJobEventStatus,
    setSelectedJob,
    deleteJobComment,
} from '../../../../../actions/production/jobStatusReportActions';
import {
    JOB_EVENT_COLOR_CONFIG,
    getEventTypes,
    getEventConfig,
    getEventConfigsByPriority,
} from '../../../../../constants/jobEventColorConfig';
import '../JobStatusReport.css';

const { TextArea } = Input;

const JobStatusReportModal = ({ visible, onClose, initialEditEvent = null }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth?.authData);
    const selectedJob = useSelector((state) => state.production?.operations?.jobStatusReport?.selectedJob);
    const [addEventForm] = Form.useForm();
    const [newComment, setNewComment] = useState('');
    const [displayedComments, setDisplayedComments] = useState([]);
    const [commentOffset, setCommentOffset] = useState(10);
    const [editingEvent, setEditingEvent] = useState(null);

    const job = selectedJob;

    // DEBUG: Log when selectedJob changes
    useEffect(() => {
        if (job) {
            console.log('Modal: selectedJob updated', {
                mrp_id: job.mrp_id,
                mrp_no: job.mrp_no,
                eventsCount: job.events?.length,
                events: job.events
            });
        }
    }, [job]);

    // Initialize displayed comments (last 10)
    useEffect(() => {
        if (job?.notes && Array.isArray(job.notes)) {
            const sorted = [...job.notes].sort((a, b) =>
                moment(b.created).diff(moment(a.created))
            );
            setDisplayedComments(sorted.slice(0, 10));
            setCommentOffset(10);
        } else {
            setDisplayedComments([]);
            setCommentOffset(10);
        }
        setNewComment('');
    }, [job]);

    // Handle initial edit event from calendar double-click
    useEffect(() => {
        if (initialEditEvent) {
            setEditingEvent(initialEditEvent);
            // Form will be set in next useEffect or in the effect that runs after
        }
    }, [initialEditEvent]);

    // Set form values when editing event changes
    useEffect(() => {
        if (editingEvent) {
            addEventForm.setFieldsValue({
                eventType: editingEvent.type,
                description: editingEvent.description,
                eventDateRange: [moment(editingEvent.date_start), moment(editingEvent.date_end)]
            });
        }
    }, [editingEvent, addEventForm]);

    // DEBUG: Log when events change (before early return)
    useEffect(() => {
        if (job?.events && job.events.length > 0) {
            console.log('Modal: jobEvents changed', job.events.map(e => ({
                id: e.id,
                type: e.type,
                date_start: e.date_start,
                date_end: e.date_end,
                updated: e.updated
            })));
        }
    }, [job?.events]);

    if (!job) return null;

    const jobEvents = job.events || [];
    const jobComments = job.notes || [];
    const hasMoreComments = jobComments.length > commentOffset;

    // Load more comments (5 more)
    const loadMoreComments = () => {
        const sorted = [...jobComments].sort((a, b) =>
            moment(b.created).diff(moment(a.created))
        );
        setDisplayedComments(sorted.slice(0, commentOffset + 5));
        setCommentOffset(prev => prev + 5);
    };

    // Add comment (on Enter)
    const handleAddComment = () => {
        if (newComment.trim()) {
            const commentRaw = {
                job_id: job.mrp_no,
                description: newComment.trim(),
                remark: '',
                create_by: auth?.user_name || '',
                status: 'ACTIVE'
            };

            // Dispatch action to add comment via API
            dispatch(addJobComment(job.mrp_id, commentRaw));
            setNewComment('');
        }
    };

    // Delete comment via API
    const handleDeleteComment = async (commentId) => {
        await dispatch(deleteJobComment(commentId, job.mrp_id));
        // displayedComments will naturally refresh on next job update effect; but keep UX responsive:
        const filtered = jobComments.filter((c) => c.id !== commentId);
        const sorted = filtered.sort((a, b) => moment(b.created).diff(moment(a.created)));
        setDisplayedComments(sorted.slice(0, Math.min(commentOffset, sorted.length)));
    };

    // Add event
    const handleAddEvent = async () => {
        try {
            const values = await addEventForm.validateFields();
            const [start, end] = values.eventDateRange || [];

            if (editingEvent) {
                // Update existing event
                const eventData = {
                    id: editingEvent.id,
                    job_id: job.mrp_no,
                    type: values.eventType,
                    description: values.description,
                    remark: '',
                    date_start: start.format('YYYY-MM-DD'),
                    date_end: end.format('YYYY-MM-DD'),
                    status: editingEvent.status || 'ACTIVE'
                };

                dispatch(updateJobEvent(job.mrp_id, eventData));
                setEditingEvent(null);
            } else {
                // Add new event
                const eventRaw = {
                    job_id: job.mrp_no,
                    type: values.eventType,
                    description: values.description,
                    remark: '',
                    date_start: start.format('YYYY-MM-DD'),
                    date_end: end.format('YYYY-MM-DD'),
                    create_by: auth?.user_name || '',
                    status: 'ACTIVE',
                    notes: []
                };

                dispatch(addJobEvent(job.mrp_id, eventRaw));
            }

            addEventForm.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    // Edit event (load to form) - simplified to just set the editing state
    const handleEditEvent = (event) => {
        setEditingEvent(event);
        // Form values are set automatically by useEffect
    };

    // Cancel edit event
    const handleCancelEdit = () => {
        setEditingEvent(null);
        addEventForm.resetFields();
    };

    // Toggle event active status
    const handleToggleEventStatus = (event) => {
        dispatch(updateJobEventStatus(event.id, job.mrp_id, event.status !== 'ACTIVE'));
    };

    // Events table columns
    const eventColumns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 120,
            render: (type) => {
                const config = getEventConfig(type || '');
                return (
                    <Tag color={config.color} style={{ margin: 0 }}>
                        {config.label}
                    </Tag>
                );
            },
        },
        {
            title: 'Date Start',
            key: 'date_start',
            width: 120,
            render: (_, record) => {
                const d = record.date_start || record.date;
                return d ? moment(d).format('DD/MM/YYYY') : '-';
            },
            sorter: (a, b) => {
                const dateA = a.date_start || a.date;
                const dateB = b.date_start || b.date;
                return moment(dateA).unix() - moment(dateB).unix();
            },
        },
        {
            title: 'Date End',
            key: 'date_end',
            width: 120,
            render: (_, record) => {
                const d = record.date_end || record.date_start || record.date;
                return d ? moment(d).format('DD/MM/YYYY') : '-';
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (desc) => desc || '-',
        },
        {
            title: 'Updated',
            dataIndex: 'updated',
            key: 'updated',
            width: 140,
            render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            render: (status, record) => (
                <Switch
                    checked={status === 'ACTIVE'}
                    onChange={() => handleToggleEventStatus(record)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            ),
        },
    ];

    // Sort events by created date (latest first) for default display
    const sortedEvents = [...jobEvents].sort((a, b) => {
        const dateA = a.created || a.date_start;
        const dateB = b.created || b.date_start;
        return moment(dateB).unix() - moment(dateA).unix();
    });

    console.log("displayedComments", displayedComments, job?.notes)

    return (
        <Modal
            title={
                <div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1890ff' }}>
                        Job Details
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#666', marginTop: 4 }}>
                        {job.so_no} - {job.job_name}
                    </div>
                </div>
            }
            visible={visible}
            onCancel={onClose}
            width={1100}
            footer={[
                <Button key="close" type="primary" onClick={onClose}>
                    Close
                </Button>,
            ]}
            className="job-status-modal"
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
            {/* Section 1: Job Information */}
            <div className="job-modal-section">
                <h3>Job Information</h3>
                <Descriptions bordered size="small" column={3}>
                    <Descriptions.Item label="SO No" style={{ width: 150 }}>{job.so_no}</Descriptions.Item>
                    <Descriptions.Item label="Name" span={2}>{job.job_name}</Descriptions.Item>
                    <Descriptions.Item label="MRP No" style={{ width: 150 }}>
                        {job?.mrp_no || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="RM Book Date" style={{ width: 150 }}>
                        {job.rm_book_date || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="PK Book Date" style={{ width: 150 }}>
                        {job.pk_book_date || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="RM In" style={{ width: 150 }}>
                        {job.rm_in_date || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="PK In" style={{ width: 150 }}>
                        {job.pk_in_date || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Quantity" style={{ width: 150 }}>{numeral(job.order_qty).format('0,000.00')}</Descriptions.Item>
                    <Descriptions.Item label="Plan Date" style={{ width: 150 }}>
                        {job.plan_date || '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery Date">
                        {job.delivery_date || '-'}
                    </Descriptions.Item>
                </Descriptions>
            </div>

            {/* Section 2: Events Table */}
            <div className="job-modal-section">
                <h3>Events</h3>

                {/* Add Event Form */}
                <Card size="small" style={{ marginBottom: 16, backgroundColor: editingEvent ? '#fff7e6' : '#fafafa' }}>
                    <Form form={addEventForm} layout="inline">
                        <Form.Item
                            name="eventType"
                            rules={[{ required: true, message: 'Select type' }]}
                            style={{ marginBottom: 0 }}
                        >
                            <Select placeholder="Event Type" style={{ width: 220 }}>
                                {getEventConfigsByPriority().map((cfg) => (
                                    <Select.Option key={cfg.type} value={cfg.type}>
                                        {cfg.description}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="eventDateRange"
                            rules={[{ required: true, message: 'Select date range' }]}
                            style={{ marginBottom: 0 }}
                        >
                            <DatePicker.RangePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item name="description" style={{ marginBottom: 0, flex: 1 }} rules={[{ required: true, message: 'Please input description' }]}>
                            <Input placeholder="Description" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            {editingEvent ? (
                                <>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEvent} style={{ marginRight: 8 }}>
                                        Update
                                    </Button>
                                    <Button onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEvent}>
                                    Add
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Card>

                {/* Events Table */}
                <Table
                    dataSource={sortedEvents}
                    columns={eventColumns}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        showTotal: (total) => `Total ${total} events`
                    }}
                    size="small"
                    scroll={{ y: 320 }}
                    onRow={(record) => ({
                        onDoubleClick: () => handleEditEvent(record)
                    })}
                />
            </div>

            {/* Section 3: Comments */}
            <div className="job-modal-section">
                <h3>Comments</h3>

                {/* Add Comment */}
                <TextArea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onPressEnter={(e) => {
                        e.preventDefault();
                        handleAddComment();
                    }}
                    placeholder="Type comment and press Enter to add..."
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    style={{ marginBottom: 16 }}
                />

                {/* Comments List */}
                {displayedComments.length > 0 ? (
                    <>
                        <List
                            dataSource={displayedComments}
                            renderItem={(comment) => (
                                <List.Item
                                    key={comment.id}
                                    actions={[
                                        <Button
                                            danger
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleDeleteComment(comment.id)}
                                        >
                                            Delete
                                        </Button>
                                    ]}
                                    style={{ paddingTop: 8, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}
                                >
                                    <div style={{ width: '100%' }}>
                                        <p style={{ marginBottom: 4, fontSize: '13px' }}>{comment.description}</p>
                                        <span style={{ fontSize: '11px', color: '#999' }}>
                                            {moment(comment.created).format('DD/MM/YYYY HH:mm:ss')}
                                        </span>
                                    </div>
                                </List.Item>
                            )}
                        />

                        {hasMoreComments && (
                            <div style={{ textAlign: 'center', marginTop: 12 }}>
                                <Button onClick={loadMoreComments}>
                                    Load More (5 more)
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0', color: '#999' }}>
                        No comments yet
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default JobStatusReportModal;
