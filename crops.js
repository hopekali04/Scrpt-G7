const getCrops = (req, res, connection) => {
    connection.query('SELECT * FROM Crops', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving crops');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Crops not found');
            return;
        }

        const crops = results;
        res.json(crops);
    });
};

const createCrop = (req, res, connection) => {
    const cropData = req.body;

    connection.query('INSERT INTO Crops SET ?', cropData, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error creating crop');
            return;
        }

        console.log('Crop created');
        res.send('Crop created');
    });
};

const getSingleCrop = (req, res, connection) => {
    const cropId = req.params.id;

    connection.query('SELECT * FROM Crops WHERE CropID = ?', cropId, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error retrieving crop');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Crop not found');
            return;
        }

        const crop = results[0];
        res.json(crop);
    });
};

const updateCrop = (req, res, connection) => {
    const cropId = req.params.id;
    const updatedData = req.body;

    connection.query('UPDATE Crops SET ? WHERE CropID = ?', [updatedData, cropId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error updating crop');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Crop not found');
            return;
        }

        console.log('Crop updated');
        res.send('Crop updated');
    });
};

const deleteCrop = (req, res, connection) => {
    const cropId = req.params.id;

    connection.query('DELETE FROM Crops WHERE CropID = ?', cropId, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error deleting crop');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Crop not found');
            return;
        }

        console.log('Crop deleted');
        res.send('Crop deleted');
    });
};

module.exports = {
    getCrops,
    createCrop,
    updateCrop,
    getSingleCrop,
    deleteCrop
};
