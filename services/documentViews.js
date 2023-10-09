// Total number of documents
const totalDocuments = (req, res, connection, callback) => {
    connection.query('SELECT COUNT(*) AS TotalDocuments FROM documents', (error, results) => {
        if (error) {
            return callback(error, null);
        }

        if (results.length === 0) {
            return callback(null, [])
        }

        return callback(null, results[0]);
    })

}

// Number of documents by category
const documentsByCategory = (req, res, connection, callback) => {
    connection.query('SELECT category, COUNT(*) AS NumberOfDocuments FROM documents GROUP BY category', (error, results) => {
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
    totalDocuments,
    documentsByCategory,
};
