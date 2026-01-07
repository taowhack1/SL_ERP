import * as api from '../../modules/production/operations/job-tracking/mockData/jobStatusReportMockApi';
import { message } from 'antd';

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

/**
 * Fetch job orders by date range
 */
export const fetchJobsByDateRange = (startDate, endDate) => async (dispatch) => {
    try {
        console.log('Fetching jobs from', startDate, 'to', endDate);
        dispatch({ type: SET_LOADING, payload: true });
        const jobs = await api.fetchJobsByDateRange(startDate, endDate);
        console.log('Fetched jobs:', jobs);
        dispatch({
            type: SET_JOB_STATUS_REPORT,
            payload: jobs
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
        await api.updateJobNotes(jobId, notes);
        dispatch({
            type: UPDATE_JOB_NOTES,
            payload: { jobId, notes }
        });
        message.success('Job notes updated successfully');
    } catch (error) {
        message.error('Failed to update job notes');
    }
};

/**
 * Add new job event
 */
export const addJobEvent = (jobId, eventType, date, note) => async (dispatch, getState) => {
    try {
        const newEvent = await api.addJobEvent(jobId, eventType, date, note);
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
        message.error('Failed to add event');
    }
};

/**
 * Update job event status (deactivate/activate)
 */
export const updateJobEventStatus = (eventId, jobId, isActive) => async (dispatch, getState) => {
    try {
        const result = await api.updateJobEventStatus(eventId, isActive);
        dispatch({
            type: UPDATE_JOB_EVENT_STATUS,
            payload: { eventId, jobId, isActive }
        });
        message.success(isActive ? 'Event activated' : 'Event deactivated');

        // Refresh the selected job
        const state = getState();
        const job = state.production.operations.jobStatusReport.jobs.find(j => j.id === jobId);
        if (job) {
            const updatedEvents = job.events.map(e =>
                e.id === eventId ? { ...e, isActive } : e
            );
            dispatch(setSelectedJob({ ...job, events: updatedEvents }));
        }
    } catch (error) {
        message.error('Failed to update event status');
    }
};
