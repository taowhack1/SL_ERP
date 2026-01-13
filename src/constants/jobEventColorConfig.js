/**
 * Job Event Color Configuration
 * Defines event types with their priority, colors, and labels
 * Priority 1 = Highest (will display on cell if multiple events on same date)
 */

export const JOB_EVENT_COLOR_CONFIG = {
    RM_IN: {
        priority: 1,
        color: '#A8E6CE', // Cornsilk (light yellow)
        bgColor: '#A8E6CE',
        borderColor: '#A8E6CE',
        label: 'RM In',
        description: 'RM เข้า',
        type: 'RM_IN'
    },
    RM_BOOK: {
        priority: 2,
        color: '#628dbd', // Goldenrod (dark yellow)
        bgColor: '#628dbd',
        borderColor: '#628dbd',
        label: 'เบิก RM',
        description: 'เบิก RM',
        type: 'RM_BOOK'
    },
    PK_IN: {
        priority: 3,
        color: '#b9bbe6ff', // Light blue
        bgColor: '#b9bbe6ff',
        borderColor: '#b9bbe6ff',
        label: 'PK In',
        description: 'PK เข้า',
        type: 'PK_IN'
    },
    PK_BOOK: {
        priority: 4,
        color: '#ab99faff', // Dark blue (Navy)
        bgColor: '#ab99faff',
        borderColor: '#ab99faff',
        label: 'เบิก PK',
        description: 'เบิก PK',
        type: 'PK_BOOK'
    },
    PLAN: {
        priority: 5,
        color: '#FFD6A5', // Lime green
        bgColor: '#FFD6A5',
        borderColor: '#dba15bff',
        label: 'Plan',
        description: 'Plan',
        type: 'PLAN'
    },
    DELIVERY: {
        priority: 6,
        color: '#fa8072', // Bright red
        bgColor: '#fa8072',
        borderColor: '#fa8072',
        label: 'Delivery',
        description: 'Delivery',
        type: 'DELIVERY'
    }
};

/**
 * Get event config by type
 * @param {string} eventType - Event type
 * @returns {object} Event configuration
 */
export const getEventConfig = (eventType) => {
    return JOB_EVENT_COLOR_CONFIG[eventType] || JOB_EVENT_COLOR_CONFIG.PLAN;
};

/**
 * Get all event types as array
 * @returns {array} Array of event type keys
 */
export const getEventTypes = () => {
    return Object.keys(JOB_EVENT_COLOR_CONFIG);
};

/**
 * Get event config sorted by priority
 * @returns {array} Array of event configs sorted by priority
 */
export const getEventConfigsByPriority = () => {
    return Object.entries(JOB_EVENT_COLOR_CONFIG)
        .map(([key, config]) => ({ type: key, ...config }))
        .sort((a, b) => a.priority - b.priority);
};

/**
 * Find highest priority event from array of events
 * @param {array} events - Array of event objects
 * @returns {object} Event with highest priority (lowest priority number)
 */
export const getHighestPriorityEvent = (events) => {
    if (!events || events.length === 0) return null;

    return events.reduce((highest, current) => {
        const currentConfig = getEventConfig(current.eventType);
        const highestConfig = getEventConfig(highest.eventType);

        return currentConfig.priority < highestConfig.priority ? current : highest;
    });
};

export default JOB_EVENT_COLOR_CONFIG;
