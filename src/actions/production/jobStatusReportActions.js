import axios from 'axios';
import { message } from 'antd';
import { header_config } from '../../include/js/main_config';

// Action types
export const SET_JOB_STATUS_REPORT = 'SET_JOB_STATUS_REPORT';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_SELECTED_JOB = 'SET_SELECTED_JOB';
export const UPDATE_JOB_NOTES = 'UPDATE_JOB_NOTES';
export const ADD_JOB_EVENT = 'ADD_JOB_EVENT';
export const UPDATE_JOB_EVENT = 'UPDATE_JOB_EVENT';
export const UPDATE_JOB_EVENT_STATUS = 'UPDATE_JOB_EVENT_STATUS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// API endpoint
const API_JOB_CALENDAR = `${process.env.REACT_APP_API_SERVER_V2}/production/job/calendar`;

/**
 * Transform API response to match the expected job structure
 */
const transformJobData = (apiData) => {
    return apiData.map((item, index) => ({
        id: item.mrp_id || index + 1,
        mrp_no: item.mrp_no || '',
        jobNo: item.so_no || '',
        name: item.job_name || '',
        qty: item.order_qty || 0,
        unit: item.uom_no || '',
        dates: {
            rmWithdrawal: item.rm_book_date || null,
            pkWithdrawal: item.pk_book_date || null,
            rmEntry: item.rm_in_date || null,
            pkEntry: item.pk_in_date || null,
            planDate: item.plan_date || null,
            deliveryDate: item.delivery_date || null
        },
        notes: (item.notes || []).map(note => ({
            jobId: note.job_id,
            notes: note.description || '',
            updatedAt: note.created || new Date().toISOString()
        })),
        events: (item.events || []).map(event => ({
            id: event.id,
            jobId: event.job_id,
            eventType: event.type,
            date: event.date_start || event.date,
            dateStart: event.date_start || null,
            dateEnd: event.date_end || null,
            isActive: event.status === 'ACTIVE',
            createdAt: event.created || new Date().toISOString(),
            updatedAt: event.updated || new Date().toISOString(),
            notes: (event.notes || []).map(n => ({
                eventId: n.event_id,
                notes: n.description || '',
                updatedAt: n.created || new Date().toISOString()
            }))
        }))
    }));
};

/**
 * Fetch job orders by criteria
 * @param {object} params
 * @param {string} params.date_start
 * @param {string} params.date_end
 * @param {string} params.search
 */
export const fetchJobsByDateRange = (params = {}) => async (dispatch) => {
    try {
        const { date_start = '', date_end = '', search = '' } = params;
        dispatch({ type: SET_LOADING, payload: true });

        const response = await axios.get(API_JOB_CALENDAR, {
            ...header_config,
            params: {
                date_start,
                date_end,
                search,
            }
        });

        dispatch({
            type: SET_JOB_STATUS_REPORT,
            payload: response.data || []
        });
        dispatch({ type: SET_LOADING, payload: false });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_LOADING, payload: false });
        message.error('Failed to fetch job data');
    }
};

/**
 * Fetch job details for modal (card view)
 */
export const fetchJobDetails = async (mrp_no) => {
    try {
        const response = await axios.get(`${API_JOB_CALENDAR}/card`, {
            ...header_config,
            params: {
                mrp_no: mrp_no
            }
        });

        if (response.data && response.data.length > 0) {
            return response.data[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching job details:', error);
        message.error('Failed to fetch job details');
        return null;
    }
};

/**
 * Set view mode (year/month/custom)
 */
export const setViewMode = (mode) => ({
    type: SET_VIEW_MODE,
    payload: mode
});

/**
 * Set date range for custom view
 */
export const setDateRange = (startDate, endDate) => ({
    type: SET_DATE_RANGE,
    payload: { startDate, endDate }
});

/**
 * Set selected job in modal
 */
export const setSelectedJob = (job) => ({
    type: SET_SELECTED_JOB,
    payload: job
});

/**
 * Update job notes (for internal use - updating entire notes array)
 */
export const updateJobNotes = (jobId, notes) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_JOB_NOTES,
            payload: { jobId, notes }
        });
    } catch (error) {
        console.error('Error updating job notes:', error);
        message.error('Failed to update job notes');
    }
};

/**
 * Add new job comment
 */
export const addJobComment = (jobId, commentRaw) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`${API_JOB_CALENDAR}/comment`, commentRaw, header_config);

        // Use response data which includes the new ID from server
        const newComment = response.data;

        const state = getState();
        const job = state.production.operations.jobStatusReport.jobs.find(j => j.mrp_id === jobId || j.id === jobId);

        if (job) {
            const updatedNotes = [...(job.notes || []), newComment];

            dispatch({
                type: UPDATE_JOB_NOTES,
                payload: { jobId, notes: updatedNotes }
            });

            dispatch(setSelectedJob({ ...job, notes: updatedNotes }));
            message.success('Comment added successfully');
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        message.error('Failed to add comment');
    }
};

/**
 * Delete job comment by id (API returns 1 on success)
 */
export const deleteJobComment = (commentId, jobId) => async (dispatch, getState) => {
    try {
        const response = await axios.delete(`${API_JOB_CALENDAR}/comment/${commentId}`, header_config);

        const ok = response?.data === 1 || response?.data?.result === 1 || response?.data?.success === 1;
        if (!ok) {
            message.error('Failed to delete comment');
            return;
        }

        const state = getState();
        const job = state.production.operations.jobStatusReport.jobs.find(
            (j) => j.mrp_id === jobId || j.id === jobId
        );

        const updatedNotes = (job?.notes || []).filter((c) => c.id !== commentId);
        dispatch({
            type: UPDATE_JOB_NOTES,
            payload: { jobId, notes: updatedNotes },
        });

        message.success('Comment deleted');
    } catch (error) {
        console.error('Error deleting comment:', error);
        message.error('Failed to delete comment');
    }
};

/**
 * Add new job event
 */
export const addJobEvent = (jobId, eventRaw) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`${API_JOB_CALENDAR}/event`, eventRaw, header_config);

        // Use response data which includes the new ID from server
        const newEvent = response.data;

        dispatch({
            type: ADD_JOB_EVENT,
            payload: { jobId, event: newEvent }
        });

        // Reducer handles both jobs[] and selectedJob update - no need for additional setSelectedJob dispatch
        message.success('Event added successfully');
    } catch (error) {
        console.error('Error adding event:', error);
        message.error('Failed to add event');
    }
};

/**
 * Update existing job event
 */
export const updateJobEvent = (jobId, eventData) => async (dispatch, getState) => {
    try {
        const state = getState();
        const authUser = state.auth?.authData?.user_name || '';

        const payload = {
            ...eventData,
            update_by: authUser,
            updated: new Date().toISOString()
        };

        console.log('updateJobEvent sending payload:', payload);
        const response = await axios.put(`${API_JOB_CALENDAR}/event`, payload, header_config);

        // Use response data which includes updated event from server
        const updatedEvent = response.data;
        console.log('updateJobEvent received response:', updatedEvent);

        dispatch({
            type: UPDATE_JOB_EVENT,
            payload: { jobId, event: updatedEvent }
        });

        // Reducer handles both jobs[] and selectedJob update - no need for additional setSelectedJob dispatch
        message.success('Event updated successfully');
    } catch (error) {
        console.error('Error updating event:', error);
        message.error('Failed to update event');
    }
};

/**
 * Update job event status (deactivate/activate)
 */
export const updateJobEventStatus = (eventId, jobId, isActive) => async (dispatch, getState) => {
    try {
        const state = getState();
        const authUser = state.auth?.authData?.user_name || '';
        const job = state.production.operations.jobStatusReport.jobs.find(j => j.mrp_id === jobId || j.id === jobId);

        if (!job) return;

        const event = (job.events || []).find(e => e.id === eventId);
        if (!event) return;

        const payload = {
            id: eventId,
            job_id: event.job_id,
            type: event.type,
            description: event.description,
            remark: event.remark || '',
            date_start: event.date_start,
            date_end: event.date_end,
            status: isActive ? 'ACTIVE' : 'INACTIVE',
            update_by: authUser,
            updated: new Date().toISOString()
        };

        await axios.put(`${API_JOB_CALENDAR}/event`, payload, header_config);

        dispatch({
            type: UPDATE_JOB_EVENT_STATUS,
            payload: { eventId, jobId, status: isActive ? 'ACTIVE' : 'INACTIVE' }
        });
        message.success(isActive ? 'Event activated' : 'Event deactivated');

        const updatedEvents = (job.events || []).map(e =>
            e.id === eventId ? { ...e, status: isActive ? 'ACTIVE' : 'INACTIVE', updated: new Date().toISOString(), update_by: authUser } : e
        );
        dispatch(setSelectedJob({ ...job, events: updatedEvents }));
    } catch (error) {
        console.error('Error updating event status:', error);
        message.error('Failed to update event status');
    }
};
