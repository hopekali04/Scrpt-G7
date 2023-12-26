// Total number of crops
const totalCrops =  (req, res, connection, callback) => {
    connection.query('SELECT COUNT(*) AS TotalCrops FROM Crops WHERE deleted_at IS NULL', (error, results) => {
        if (error) {
          return callback(error, null);
        }
    
        if (results.length === 0) {
          return callback(null, [])
        }
    
        return callback(null, results[0]);
      })

}
const totalCropTest = async (req, res, connection) => {
    try {
      const results = await connection.query('SELECT COUNT(*) AS TotalCrops FROM Crops WHERE deleted_at IS NULL');
      
      if (results.length === 0) {
        return [];
      }
  
      return results[0];
    } catch (error) {
      throw error;
    }
  }
  
// list all crops SELECT DISTINCT CropName, CropType FROM Crops;
const distinctCrop = (req, res, connection, callback) => {
    connection.query('SELECT DISTINCT CropName FROM Crops WHERE deleted_at IS NULL  ', (error, results) => {
        if (error) {
          return callback(error, null);
        }
    
        if (results.length === 0) {
          return callback(null, [])
        }
    
        return callback(null, results);
      })

}
//-- Number of crops by type
const totalCropTypes = (req, res, connection, callback) => {
    connection.query('SELECT CropType, COUNT(*) AS NumberOfCrops FROM Crops WHERE deleted_at IS NULL GROUP BY CropType ', (error, results) => {
        if (error) {
          return callback(error, null);
        }
    
        if (results.length === 0) {
          return callback(null, [])
        }
    
        return callback(null, results[0]);
      })

}
//-- Number of crops by planting season
//SELECT PlantingSeason, COUNT(*) AS NumberOfCrops FROM Crops GROUP BY PlantingSeason;
const  countCropSeasons = (req, res, connection, callback) => {
    connection.query('SELECT PlantingSeason, COUNT(*) AS NumberOfCrops FROM Crops WHERE deleted_at IS NULL GROUP BY PlantingSeason', (error, results) => {
        if (error) {
          return callback(error, null);
        }
    
        if (results.length === 0) {
          return callback(null, [])
        }
    
        return callback(null, results[0]);
      })

}
// Crop types with the highest number of entries
const highestCrop = (req, res, connection, callback) => {
    connection.query('SELECT CropType, COUNT(*) AS NumberOfEntries FROM Crops WHERE deleted_at IS NULL GROUP BY CropType ORDER BY NumberOfEntries DESC LIMIT 1 ', (error, results) => {
        if (error) {
          return callback(error, null);
        }
    
        if (results.length === 0) {
          return callback(null, [])
        }
    
        return callback(null, results[0]);
      })

}
//-- Crop types with the lowest number of entries
const lowestCrop = (req, res, connection, callback) => {
    connection.query('SELECT CropType, COUNT(*) AS NumberOfEntries FROM Crops WHERE deleted_at IS NULL GROUP BY CropType ORDER BY NumberOfEntries ASC LIMIT 1 ', (error, results) => {
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
    distinctCrop,
    totalCropTypes,
    totalCrops,
    countCropSeasons,
    highestCrop,
    lowestCrop
};
