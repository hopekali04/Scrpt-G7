const teamMemberNumber = (req, res, connection, callback) => {
    connection.query('SELECT team.id AS team_id, COUNT(teamMembers.member_id) AS total_members FROM team LEFT JOIN teamMembers ON team.id = teamMembers.team_id GROUP BY team.id;', (error, results) => {
        if (error) {
          return callback(error, null);
        }
    
        if (results.length === 0) {
          return callback(null, [])
        }
    
        return callback(null, results);
      })

}
const teamGenders = (req, res, connection, callback) => {
    connection.query('SELECT gender, COUNT(member_id) AS gender_count FROM teamMembers GROUP BY gender;', (error, results) => {
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
    teamMemberNumber,
    teamGenders
}