// callback (error, DBresult)
// CRUD sql functions for Crop
const createCrop = (req, res,data, connection, callback) =>{
    connection.query("INSERT INTO Crops SET ?", data, (error, results)=>{
        if (error){
          return callback(error, null);
        }else{
          return callback(null, results);
        }
    })
}

const getSingleCrop = (req, res,memberId,connection, callback) => {
  connection.query('SELECT * FROM Crops WHERE cropid = ? AND deleted_at IS NULL LIMIT 1', memberId, (error, results) => {
    if (error) {
      return callback(error);
    }

    if (results.length === 0) {
      return callback(null, results)
    }
    return callback(null, results[0])
  });
};
const getCrops = (req, res, connection, callback) => {
  connection.query('SELECT * FROM Crops WHERE deleted_at IS NULL', (error, results) => {
    if (error) {
      return callback(error, null);
    }

    if (results.length === 0) {
      return callback(null, [])
    }

    return callback(null, results);
  })
};
const updateCrop = (req, res,memberId, updatedData, connection, callback) => {
  connection.query('UPDATE Crops SET ? WHERE cropid = ?', [updatedData, memberId], (error, results) => {
    if (error) {
      return callback(error, null);
    }

    if (results.affectedRows === 0) {
      return callback("record not found", results);
    }
    return callback(null, results);
  });
};

const deleteCrop = (req, res,memberId, connection, callback) => {
  // performs a soft delete 
  connection.query('UPDATE Crops SET deleted_at = CURRENT_TIMESTAMP() WHERE cropid = ?', memberId, (error, results) => {
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
  createCrop,
  updateCrop,
  getCrops,
  getSingleCrop,
  deleteCrop
};