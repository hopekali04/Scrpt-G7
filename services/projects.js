// CRUD sql functions for projects
const CreateProject = (req, res,data, connection, callback) =>{
      connection.query("INSERT INTO projects SET ?", data, (error, results)=>{
          if (error){
            return callback(error, null);
          }else{
            return callback(null, results);
          }
      })
  }
const getSingleprojects = (req, res,memberId, connection, callback) => {
    connection.query('SELECT * FROM projects WHERE id = ? AND deleted_at IS NULL LIMIT 1', memberId, (error, results) => {
      if (error) {
        return callback(error, null);
      }
  
      if (results.length === 0) {
        return callback(error, null);
      }
  
      return callback(null, results)
    });
};
const getAllprojectss = (req, res,connection, callback) => {
    connection.query('SELECT * FROM projects WHERE deleted_at IS NULL', (error, results) => {
      if (error) {
        return callback(error, null);
      }
  
      if (results.length === 0) {
        return callback(null, [])
      }

      return callback(null, results);
    })
  };
const updateprojects = (req, res,projectId, updatedData, connection, callback) => {
    connection.query('UPDATE projects SET ? WHERE id = ?', [updatedData, projectId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
  
      if (results.affectedRows === 0) {
        return callback("record not found", results);
      }

      return callback(null, results);
    });
  };
const deleteprojects = (req, res,memberId, connection, callback) => {
    // performs a soft delete
    connection.query('UPDATE projects SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?', memberId, (error, results) => {
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
    CreateProject,
    updateprojects,
    getAllprojectss,
    getSingleprojects,
    deleteprojects
  };