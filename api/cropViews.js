const cropService = require('../services/cropViews');

const getTotlcropView = (req, res, connection, callback) => {

    let highestCrop = null;
    let lowestCrop = null;
    let totalCrops = null;
    let totalCropTypes = null;
    let countCropSeasons = null;
    let distinctCrop= null;

    cropService.totalCrops(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving crop');
        } else {
            totalCrops = data;

            // Check if all data is available before logging
            if (highestCrop !== null && lowestCrop !== null && totalCrops !== null && totalCropTypes !== null && countCropSeasons !== null && distinctCrop !== null) {
                //console.log(highestCrop, lowestCrop, totalCrops, totalCropTypes, countCropSeasons);
            }
        }
    });

    cropService.totalCropTypes(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving crop');
        } else {
            totalCropTypes = data;

            // Check if all data is available before logging
            if (highestCrop !== null && lowestCrop !== null && totalCrops !== null && totalCropTypes !== null && countCropSeasons !== null && distinctCrop !== null) {
                //console.log(highestCrop, lowestCrop, totalCrops, totalCropTypes, countCropSeasons);
            }
        }
    });

    cropService.countCropSeasons(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving crop');
        } else {
            countCropSeasons = data;

            // Check if all data is available before logging
            if (highestCrop !== null && lowestCrop !== null && totalCrops !== null && totalCropTypes !== null && countCropSeasons !== null && distinctCrop !== null) {
                //console.log(highestCrop, lowestCrop, totalCrops, totalCropTypes, countCropSeasons);
            }
        }
    });

    cropService.highestCrop(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving crop');
        } else {
            highestCrop = data;

            // Check if all data is available before logging
            if (highestCrop !== null && lowestCrop !== null && totalCrops !== null && totalCropTypes !== null && countCropSeasons !== null && distinctCrop !== null) {
                //console.log(highestCrop, lowestCrop, totalCrops, totalCropTypes, countCropSeasons);
            }
        }
    });

    cropService.lowestCrop(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving crop');
        } else {
            lowestCrop = data;

            // Check if all data is available before logging
            if (highestCrop !== null && lowestCrop !== null && totalCrops !== null && totalCropTypes !== null && countCropSeasons !== null && distinctCrop !== null) {
                //console.log(highestCrop, lowestCrop, totalCrops, totalCropTypes, countCropSeasons);
            }
        }
    });
    cropService.distinctCrop(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving crop');
        } else {
            distinctCrop = data;

            // Check if all data is available before logging
            if (highestCrop !== null && lowestCrop !== null && totalCrops !== null && totalCropTypes !== null && countCropSeasons !== null && distinctCrop !== null && distinctCrop !== null) {
                console.log(distinctCrop);
                return callback(null, distinctCrop);
            }
        }
    });
};

module.exports = {
    getTotlcropView
};
