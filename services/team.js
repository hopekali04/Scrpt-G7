// callback (error, DBresult)
// CRUD sql functions for Team
const createTeam = (req, res,data, connection, callback) =>{
    connection.query("INSERT INTO team SET ?", data, (error, results)=>{
        if (error){
          return callback(error, null);
        }else{
          return callback(null, results);
        }
    })
}

const getSingleTeam = (req, res,memberId,connection, callback) => {
  connection.query('SELECT * FROM team WHERE id = ? AND deleted_at IS NULL LIMIT 1', memberId, (error, results) => {
    if (error) {
      return callback(error);
    }

    if (results.length === 0) {
      return callback(null, results)
    }
    return callback(null, results[0])
  });
};
const getAllTeam = (req, res, connection, callback) => {
  connection.query('SELECT * FROM team WHERE deleted_at IS NULL', (error, results) => {
    if (error) {
      return callback(error, null);
    }

    if (results.length === 0) {
      return callback(null, [])
    }

    return callback(null, results);
  })
};
const updateTeam = (req, res,memberId, updatedData, connection, callback) => {
  connection.query('UPDATE team SET ? WHERE id = ?', [updatedData, memberId], (error, results) => {
    if (error) {
      return callback(error, null);
    }

    if (results.affectedRows === 0) {
      return callback("record not found", results);
    }
    return callback(null, results);
  });
};

const deleteTeam = (req, res,memberId, connection, callback) => {
  // performs a soft delete 
  connection.query('UPDATE team SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?', memberId, (error, results) => {
    if (error) {
      return callback(error, null);
    }

    if (results.affectedRows === 0) {
      return callback(null, [])
    }
    return callback(null, results);
  });
};
module.exports = {
  createTeam,
  updateTeam,
  getAllTeam,
  getSingleTeam,
  deleteTeam
};