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
 * @param {string} params.mrp
 * @param {string} params.so
 * @param {string} params.job_name
 */
export const fetchJobsByDateRange = (params = {}) => async (dispatch) => {
    try {
        const { date_start = '', date_end = '', mrp = '', so = '', job_name = '' } = params;
        console.log('Fetching jobs:', params);
        dispatch({ type: SET_LOADING, payload: true });

        const response = await axios.get(API_JOB_CALENDAR, {
            ...header_config,
            params: {
                date_start,
                date_end,
                mrp,
                so,
                job_name,
            }
        });

        console.log('API Response:', response.data);
        const transformedJobs = transformJobData(response.data);
        console.log('Transformed jobs:', transformedJobs);

        dispatch({
            type: SET_JOB_STATUS_REPORT,
            payload: transformedJobs
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
            const transformedData = transformJobData(response.data);
            return transformedData[0];
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
 * Update job notes
 */
export const updateJobNotes = (jobId, notes) => async (dispatch) => {
    try {
        // TODO: Implement API call when endpoint is available
        // await axios.put(`${API_JOB_CALENDAR}/${jobId}/notes`, { description: notes }, header_config);

        dispatch({
            type: UPDATE_JOB_NOTES,
            payload: { jobId, notes }
        });
        message.success('Job notes updated successfully');
    } catch (error) {
        console.error('Error updating job notes:', error);
        message.error('Failed to update job notes');
    }
};

/**
 * Add new job event
 */
export const addJobEvent = (jobId, eventRaw) => async (dispatch, getState) => {
    try {
        // TODO: Implement API call when endpoint is available
        // const response = await axios.post(`${API_JOB_CALENDAR}/${eventRaw.job_id}/events`, eventRaw, header_config);

        // Build UI-friendly event object while preserving raw shape
        const now = new Date().toISOString();
        const newEvent = {
            id: Date.now(),
            jobId,
            // UI fields
            eventType: eventRaw.type,
            date: eventRaw.date_start,
            dateStart: eventRaw.date_start,
            dateEnd: eventRaw.date_end,
            isActive: (eventRaw.status || 'ACTIVE') === 'ACTIVE',
            createdAt: now,
            updatedAt: now,
            description: eventRaw.description,
            notes: eventRaw.notes || [],
            // Preserve raw fields
            ...eventRaw,
        };

        dispatch({
            type: ADD_JOB_EVENT,
            payload: { jobId, event: newEvent }
        });
        message.success('Event added successfully');

        // Refresh the selected job data to show the new event
        const state = getState();
        const job = state.production.operations.jobStatusReport.jobs.find(j => j.id === jobId);
        if (job) {
            dispatch(setSelectedJob({ ...job, events: [...(job.events || []), newEvent] }));
        }
    } catch (error) {
        console.error('Error adding event:', error);
        message.error('Failed to add event');
    }
};

/**
 * Update job event status (deactivate/activate)
 */
export const updateJobEventStatus = (eventId, jobId, isActive) => async (dispatch, getState) => {
    try {
        // TODO: Implement API call when endpoint is available
        // await axios.put(`${API_JOB_CALENDAR}/events/${eventId}`, {
        //     status: isActive ? 'ACTIVE' : 'INACTIVE'
        // }, header_config);

        dispatch({
            type: UPDATE_JOB_EVENT_STATUS,
            payload: { eventId, jobId, isActive }
        });
        message.success(isActive ? 'Event activated' : 'Event deactivated');

        // Refresh the selected job
        const state = getState();
        const job = state.production.operations.jobStatusReport.jobs.find(j => j.id === jobId);
        if (job) {
            const authUser = state.auth?.authData?.user_name || '';
            const updatedEvents = job.events.map(e =>
                e.id === eventId ? { ...e, isActive, updatedAt: new Date().toISOString(), update_by: authUser } : e
            );
            dispatch(setSelectedJob({ ...job, events: updatedEvents }));
        }
    } catch (error) {
        console.error('Error updating event status:', error);
        message.error('Failed to update event status');
    }
};
