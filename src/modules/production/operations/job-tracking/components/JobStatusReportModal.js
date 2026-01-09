import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
    updateJobEventStatus,
} from '../../../../../actions/production/jobStatusReportActions';
import {
    JOB_EVENT_COLOR_CONFIG,
    getEventTypes,
    getEventConfig,
} from '../../../../../constants/jobEventColorConfig';
import '../JobStatusReport.css';

const { TextArea } = Input;

const JobStatusReportModal = ({ visible, job, onClose }) => {
    const dispatch = useDispatch();
    const [addEventForm] = Form.useForm();
    const [newComment, setNewComment] = useState('');
    const [displayedComments, setDisplayedComments] = useState([]);
    const [commentOffset, setCommentOffset] = useState(10);

    // Initialize displayed comments (last 10)
    useEffect(() => {
        if (job?.notes && Array.isArray(job.notes)) {
            const sorted = [...job.notes].sort((a, b) =>
                moment(b.updatedAt).diff(moment(a.updatedAt))
            );
            setDisplayedComments(sorted.slice(0, 10));
            setCommentOffset(10);
        } else {
            setDisplayedComments([]);
            setCommentOffset(10);
        }
        setNewComment('');
    }, [job]);

    if (!job) return null;

    const jobEvents = job.events || [];
    const jobComments = job.notes || [];
    const hasMoreComments = jobComments.length > commentOffset;

    // Load more comments (5 more)
    const loadMoreComments = () => {
        const sorted = [...jobComments].sort((a, b) =>
            moment(b.updatedAt).diff(moment(a.updatedAt))
        );
        setDisplayedComments(sorted.slice(0, commentOffset + 5));
        setCommentOffset(prev => prev + 5);
    };

    // Add comment (on Enter)
    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentObj = {
                id: Date.now(),
                jobId: job.id,
                notes: newComment.trim(),
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            };

            // Dispatch action to add comment
            dispatch(updateJobNotes(job.id, [...jobComments, newCommentObj]));

            // Update local state
            const updated = [newCommentObj, ...jobComments].sort((a, b) =>
                moment(b.updatedAt).diff(moment(a.updatedAt))
            );
            setDisplayedComments(updated.slice(0, commentOffset));
            setNewComment('');
            message.success('Comment added');
        }
    };

    // Delete comment
    const handleDeleteComment = (commentId) => {
        const filtered = jobComments.filter(c => c.id !== commentId);
        dispatch(updateJobNotes(job.id, filtered));

        const sorted = filtered.sort((a, b) =>
            moment(b.updatedAt).diff(moment(a.updatedAt))
        );
        setDisplayedComments(sorted.slice(0, Math.min(commentOffset, sorted.length)));
        message.success('Comment deleted');
    };

    // Add event
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
            message.success('Event added');
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    // Toggle event active status
    const handleToggleEventStatus = (event) => {
        dispatch(updateJobEventStatus(event.id, job.id, !event.isActive));
    };

    // Events table columns
    const eventColumns = [
        {
            title: 'Type',
            dataIndex: 'eventType',
            key: 'eventType',
            width: 120,
            render: (type) => {
                const config = getEventConfig(type);
                return (
                    <Tag color={config.color} style={{ margin: 0 }}>
                        {config.label}
                    </Tag>
                );
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 120,
            render: (date) => moment(date).format('DD/MM/YYYY'),
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        },
        {
            title: 'Note',
            dataIndex: 'notes',
            key: 'notes',
            render: (notes) => (notes && notes[0]?.notes) || '-',
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 140,
            render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Updated',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 140,
            render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 80,
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    onChange={() => handleToggleEventStatus(record)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            ),
        },
    ];

    // Sort events by date (latest first) for default display
    const sortedEvents = [...jobEvents].sort((a, b) =>
        moment(b.date).unix() - moment(a.date).unix()
    );

    return (
        <Modal
            title={
                <div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: '#1890ff' }}>
                        Job Details
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#666', marginTop: 4 }}>
                        {job.jobNo} - {job.name}
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
                    <Descriptions.Item label="Job No">{job.jobNo}</Descriptions.Item>
                    <Descriptions.Item label="Name" span={2}>{job.name}</Descriptions.Item>
                    <Descriptions.Item label="Quantity">{job.qty}</Descriptions.Item>
                    <Descriptions.Item label="RM Out">
                        {job.dates?.rmWithdrawal ? moment(job.dates.rmWithdrawal).format('DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="PK Out">
                        {job.dates?.pkWithdrawal ? moment(job.dates.pkWithdrawal).format('DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="RM In">
                        {job.dates?.rmEntry ? moment(job.dates.rmEntry).format('DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="PK In">
                        {job.dates?.pkEntry ? moment(job.dates.pkEntry).format('DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Plan Date">
                        {job.dates?.planDate ? moment(job.dates.planDate).format('DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery Date">
                        {job.dates?.deliveryDate ? moment(job.dates.deliveryDate).format('DD/MM/YYYY') : '-'}
                    </Descriptions.Item>
                </Descriptions>
            </div>

            {/* Section 2: Events Table */}
            <div className="job-modal-section">
                <h3>Events</h3>

                {/* Add Event Form */}
                <Card size="small" style={{ marginBottom: 16, backgroundColor: '#fafafa' }}>
                    <Form form={addEventForm} layout="inline">
                        <Form.Item
                            name="eventType"
                            rules={[{ required: true, message: 'Select type' }]}
                            style={{ marginBottom: 0 }}
                        >
                            <Select placeholder="Event Type" style={{ width: 180 }}>
                                {getEventTypes().map((type) => {
                                    const config = JOB_EVENT_COLOR_CONFIG[type];
                                    return (
                                        <Select.Option key={type} value={type}>
                                            {config.label}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="eventDate"
                            rules={[{ required: true, message: 'Select date' }]}
                            style={{ marginBottom: 0 }}
                        >
                            <DatePicker format="DD/MM/YYYY" placeholder="Date" />
                        </Form.Item>
                        <Form.Item name="eventNote" style={{ marginBottom: 0, flex: 1 }}>
                            <Input placeholder="Note (optional)" />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEvent}>
                                Add
                            </Button>
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
                                    style={{ paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}
                                >
                                    <div>
                                        <p style={{ marginBottom: 8 }}>{comment.notes}</p>
                                        <span style={{ fontSize: '12px', color: '#999' }}>
                                            {moment(comment.updatedAt).format('DD/MM/YYYY HH:mm')}
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
