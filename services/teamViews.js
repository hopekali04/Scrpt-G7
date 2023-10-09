// Total number of team members
const totalTeamMembers = (req, res, connection, callback) => {
    connection.query('SELECT COUNT(*) AS TotalTeamMembers FROM team', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results[0]);
    })

}

// Number of team members by role
const teamMembersByRole = (req, res, connection, callback) => {
    connection.query('SELECT role, COUNT(*) AS NumberOfMembers FROM team GROUP BY role', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results);
    })

}

// Number of active team members
const activeTeamMembers = (req, res, connection, callback) => {
    connection.query('SELECT COUNT(*) AS ActiveTeamMembers FROM team WHERE deleted_at IS NULL', (error, results) => {
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
    totalTeamMembers,
    teamMembersByRole,
    activeTeamMembers,
};
