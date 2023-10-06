// callback (error, DBresult)
// CRUD sql functions for documents
const createdocuments = (req, res,data, connection, callback) =>{
      connection.query("INSERT INTO documents SET ?", data, (error, results)=>{
          if (error){
            return callback(error, null);
          }else{
            return callback(null, results);
          }
      })
}

const getSingledocument = (req, res,memberId,connection, callback) => {
    connection.query('SELECT * FROM documents WHERE id = ? AND deleted_at IS NULL LIMIT 1', memberId, (error, results) => {
      if (error) {
        return callback(error);
      }
  
      if (results.length === 0) {
        return callback(null, results)
      }
      return callback(null, results)
    });
  };
const getAlldocuments = (req, res, connection, callback) => {
    connection.query('SELECT * FROM documents WHERE deleted_at IS NULL', (error, results) => {
      if (error) {
        return callback(error, null);
      }
  
      if (results.length === 0) {
        return callback(null, [])
      }
  
      return callback(null, results);
    })
  };
const updatedocuments = (req, res,memberId, updatedData, connection, callback) => {
    connection.query('UPDATE documents SET ? WHERE id = ?', [updatedData, memberId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
  
      if (results.affectedRows === 0) {
        return callback("record not found", results);
      }
      return callback(null, results);
    });
  };

const deletedocuments = (req, res,memberId, connection, callback) => {
    // performs a soft delete 
    connection.query('UPDATE documents SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?', memberId, (error, results) => {
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
    createdocuments,
    updatedocuments,
    getAlldocuments,
    getSingledocument,
    deletedocuments
  };