/**
 * Job Event Color Configuration
 * Defines event types with their priority, colors, and labels
 * Priority 1 = Highest (will display on cell if multiple events on same date)
 */

export const JOB_EVENT_COLOR_CONFIG = {
    RM_IN: {
        priority: 1,
        color: '#87CEEB', // Sky Blue
        bgColor: 'rgba(135, 206, 235, 0.7)',
        borderColor: '#4682B4',
        label: 'RM In',
        description: 'RM เข้า',
        type: 'RM_IN'
    },
    RM_BOOK: {
        priority: 2,
        color: '#8B4513', // Saddle Brown
        bgColor: 'rgba(139, 69, 19, 0.7)',
        borderColor: '#654321',
        label: 'เบิก RM',
        description: 'เบิก RM',
        type: 'RM_BOOK'
    },
    PK_IN: {
        priority: 3,
        color: '#4169E1', // Royal Blue
        bgColor: 'rgba(65, 105, 225, 0.7)',
        borderColor: '#1E40AF',
        label: 'PK In',
        description: 'PK เข้า',
        type: 'PK_IN'
    },
    PK_BOOK: {
        priority: 4,
        color: '#CD853F', // Peru
        bgColor: 'rgba(205, 133, 63, 0.7)',
        borderColor: '#9B6B3A',
        label: 'เบิก PK',
        description: 'เบิก PK',
        type: 'PK_BOOK'
    },
    PLAN_DATE: {
        priority: 5,
        color: '#FFD700', // Gold
        bgColor: 'rgba(255, 215, 0, 0.7)',
        borderColor: '#DAA520',
        label: 'Plan',
        description: 'Plan',
        type: 'PLAN'
    },
    DELIVERY_DATE: {
        priority: 6,
        color: '#FF6347', // Tomato
        bgColor: 'rgba(255, 99, 71, 0.7)',
        borderColor: '#DC143C',
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
    return JOB_EVENT_COLOR_CONFIG[eventType] || JOB_EVENT_COLOR_CONFIG.PLAN_DATE;
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
