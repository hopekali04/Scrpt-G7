// Number of upcoming events
const upcomingEvents = (req, res, connection, callback) => {
    connection.query('SELECT COUNT(*) AS UpcomingEvents FROM calendars WHERE event_date >= CURDATE()', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results[0]);
    })

}

// Number of events by location
const eventsByLocation = (req, res, connection, callback) => {
    connection.query('SELECT location, COUNT(*) AS NumberOfEvents FROM calendars GROUP BY location', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results);
    })

}

// Number of events by date range (this week, this month)
const eventsByDateRange = (req, res, connection, callback) => {
    connection.query('SELECT DATE_FORMAT(event_date, "%Y-%m") AS DateRange, COUNT(*) AS NumberOfEvents FROM calendars GROUP BY DateRange', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results);
    })

}

// Recently added events
const recentlyAddedEvents = (req, res, connection, callback) => {
    connection.query('SELECT * FROM calendars ORDER BY created_at DESC LIMIT 5', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results);
    })

}

module.exports = {
    upcomingEvents,
    eventsByLocation,
    eventsByDateRange,
    recentlyAddedEvents,
};
