const memberViewServ = require('../services/membersView');

const genderconst = (req, res, connection, callback) => {

    memberViewServ.teamGenders(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving data');
        } else {
            console.log(data);
        }
    });
};
const teamStuff = (req, res, connection, callback) => {

    memberViewServ.teamMemberNumber(req, res, connection, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error retrieving data');
        } else {
            console.log(data);
            return callback(null, data);
        }
    });
};

module.exports = {
    genderconst,
    teamStuff
}
