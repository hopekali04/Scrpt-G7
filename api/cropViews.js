const cropService = require('../services/cropViews');

const getTotlcropView = (req, res, connection, callback) => {

    let distinctCrop= null;

    cropService.distinctCrop(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving crop');
        } else {
            console.log(data);
            distinctCrop = data;

            // Check if all data is available before logging
            if (distinctCrop !== null) {
                console.log(distinctCrop);
                return callback(null, distinctCrop);
            }
        }
    });
};

module.exports = {
    getTotlcropView
};
