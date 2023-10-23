const teamMemberNumber = (req, res, connection, callback) => {
    connection.query(`SELECT t.name AS team_name, COUNT(tm.member_id) AS total_members, SUM(CASE WHEN tm.gender = 'Male' THEN 1 ELSE 0 END) AS male_count, SUM(CASE WHEN tm.gender = 'Female' THEN 1 ELSE 0 END) AS female_count FROM team t LEFT JOIN teamMembers tm ON t.id = tm.team_id AND tm.deleted_at IS NULL WHERE t.deleted_at IS NULL GROUP BY t.id, t.name;`, (error, results) => {
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