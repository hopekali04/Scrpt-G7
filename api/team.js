const teamService = require('../services/team');
//const connection = mysql.createPool(config.database);

// Post(/team)
const CreateTeam = (req, res, connection) =>{
    data = req.body
    teamService.createTeam(req, res, data, connection,(error, result) => {
      if (error) {
        res.status(500).send('Error creating team');
      } else {
        res.redirect("/teams")
      }
  })   
}
// Get(/team/:id)
const getSingleTeam = (req, res, connection) => {
  const memberId = req.params.id; // team member ID as primary key identification for each team

  teamService.getSingleTeam(req, res, memberId, connection, (error, data) => {
    if (error) {
      res.status(500).send('Error retrieving team');
    } else {
      //console.log(data);
      res.render("viewTeam", { document: data });
    }
})
};
// Get(/teams/)
const getAllTeams = (req, res, connection) => {
  teamService.getAllTeam(req, res, connection, (error, data) => {
    if (error) {
      res.status(500).send('Error retrieving teams');
    } else {
      //console.log(data);
      res.render("viewTeam", { team: data });
    }
})
};
// Post(/team/update/:id)
const updateTeam = (req, res, connection) => {
  const memberId = req.params.id;
  const updatedData = req.body;

  teamService.updateTeam(req, res, memberId, updatedData, connection,(error, result) => {
    if (error) {
      res.status(500).send('Error updating team');
    } else {
      res.redirect("/teams")
    }
})
};
// delete(/team/:id)
const deleteTeam = (req, res, connection) => {
  // performs a soft delete
  const memberId = req.params.id;

  teamService.deleteTeam(req, res, memberId, connection,(error, result) => {
    if (error) {
      res.status(500).send('Error deleting team');
    } else {
      //console.log(data);
      res.redirect("/teams")
    }
})  
};
module.exports = {
  CreateTeam,
  updateTeam,
  getAllTeams,
  getSingleTeam,
  deleteTeam
};