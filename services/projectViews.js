// Total number of projects
const totalProjects = (req, res, connection, callback) => {
    connection.query('SELECT COUNT(*) AS TotalProjects FROM projects', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results[0]);
    })

}

// Number of ongoing projects
const ongoingProjects = (req, res, connection, callback) => {
    connection.query('SELECT COUNT(*) AS OngoingProjects FROM projects WHERE status = "In Progress"', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results[0]);
    })

}

// Number of completed projects
const completedProjects = (req, res, connection, callback) => {
    connection.query('SELECT COUNT(*) AS CompletedProjects FROM projects WHERE status = "Completed"', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results[0]);
    })

}

// Number of projects by status
const projectsByStatus = (req, res, connection, callback) => {
    connection.query('SELECT status, COUNT(*) AS NumberOfProjects FROM projects GROUP BY status', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results);
    })

}

// The project with the earliest start date
const earliestStartDateProject = (req, res, connection, callback) => {
    connection.query('SELECT * FROM projects ORDER BY start_date LIMIT 1', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results[0]);
    })

}

// The project with the nearest end date
const nearestEndDateProject = (req, res, connection, callback) => {
    connection.query('SELECT * FROM projects WHERE end_date >= CURDATE() ORDER BY end_date LIMIT 1', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results[0]);
    })

}

module.exports = {
    totalProjects,
    ongoingProjects,
    completedProjects,
    projectsByStatus,
    earliestStartDateProject,
    nearestEndDateProject
};
