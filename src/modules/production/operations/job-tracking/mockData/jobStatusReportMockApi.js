import mockData from './jobStatusReportMockData.json';

/**
 * Simulated API calls for Job Status Report
 */

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch jobs with their events within a date range
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise} Jobs with nested events and notes
 */
export const fetchJobsByDateRange = async (startDate, endDate) => {
    await delay(500); // Simulate network delay

    console.log('Mock API: fetchJobsByDateRange called', { startDate, endDate });
    console.log('Mock data jobs:', mockData?.jobs);

    // Return jobs with nested structure as-is
    // (Notes and events are already nested in the jobs array)
    return mockData.jobs || [];
};

/**
 * Update job notes
 * @param {number} jobId - Job ID
 * @param {string} notes - Notes text
 * @returns {Promise} Updated job notes
 */
export const updateJobNotes = async (jobId, notes) => {
    await delay(300);

    const job = mockData.jobs.find(j => j.id === jobId);

    if (job) {
        if (job.notes && job.notes.length > 0) {
            // Update existing note
            job.notes[0].notes = notes;
            job.notes[0].updatedAt = new Date().toISOString();
        } else {
            // Create new note
            job.notes = [
                {
                    id: 1,
                    jobId: jobId,
                    notes: notes,
                    updatedAt: new Date().toISOString()
                }
            ];
        }
    }

    return {
        success: true,
        jobId,
        notes,
        updatedAt: new Date().toISOString()
    };
};

/**
 * Add new job event
 * @param {number} jobId - Job ID
 * @param {string} eventType - Event type (RM_WITHDRAWAL, RM_ENTRY, etc.)
 * @param {string} date - Event date (YYYY-MM-DD)
 * @param {string} note - Event note (optional)
 * @returns {Promise} Created event
 */
export const addJobEvent = async (jobId, eventType, date, note = '') => {
    await delay(400);

    const job = mockData.jobs.find(j => j.id === jobId);

    if (!job) {
        throw new Error('Job not found');
    }

    // Find max event ID
    let maxEventId = 0;
    mockData.jobs.forEach(j => {
        j.events.forEach(e => {
            if (e.id > maxEventId) maxEventId = e.id;
        });
    });

    const newEvent = {
        id: maxEventId + 1,
        jobId,
        eventType,
        date,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: note ? [
            {
                id: 1,
                eventId: maxEventId + 1,
                notes: note,
                updatedAt: new Date().toISOString()
            }
        ] : []
    };

    job.events.push(newEvent);

    return newEvent;
};

/**
 * Update job event status (deactivate/activate)
 * @param {number} eventId - Event ID
 * @param {boolean} isActive - Active status
 * @returns {Promise} Updated event
 */
export const updateJobEventStatus = async (eventId, isActive) => {
    await delay(300);

    let foundEvent = null;

    // Find event in any job's events array
    for (const job of mockData.jobs) {
        const event = job.events.find(e => e.id === eventId);
        if (event) {
            event.isActive = isActive;
            event.updatedAt = new Date().toISOString();
            foundEvent = event;
            break;
        }
    }

    if (!foundEvent) {
        throw new Error('Event not found');
    }

    return {
        success: true,
        event: foundEvent
    };
};

/**
 * Get all events for a specific job
 * @param {number} jobId - Job ID
 * @returns {Promise} Array of events
 */
export const getJobEvents = async (jobId) => {
    await delay(200);

    const job = mockData.jobs.find(j => j.id === jobId);
    return job ? job.events : [];
};

/**
 * Get job notes
 * @param {number} jobId - Job ID
 * @returns {Promise} Job notes string
 */
export const getJobNotes = async (jobId) => {
    await delay(200);

    const job = mockData.jobs.find(j => j.id === jobId);
    return job && job.notes && job.notes.length > 0 ? job.notes[0].notes : '';
};

export default {
    fetchJobsByDateRange,
    updateJobNotes,
    addJobEvent,
    updateJobEventStatus,
    getJobEvents,
    getJobNotes
};
