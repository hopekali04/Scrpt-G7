const team = (req, res) =>{
  const data = {title: "team"}
  res.render("team", data)
}
// Post(/team)
const CreateTeam = (req, res, connection) =>{
    data = req.body
    connection.query("INSERT INTO team SET ?", data, (error, results)=>{
        if (error){
            console.log(error)
        }else{
        res.redirect("/")
        }
    })
}
// Get(/team/:id)
const getSingleTeam = (req, res, connection) => {
  const memberId = req.params.id; // team member ID as primary key identification for each team

  connection.query('SELECT * FROM team WHERE id = ? AND deleted_at IS NULL LIMIT 1', memberId, (error, results) => {
    if (error) {
      console.error(error);
      //res.status(500).send('Error retrieving team member');
      //return;
    }

    if (results.length === 0) {
      //res.status(404).send('Team member not found'); // user doesn't exist
      //return;
    }

    const teamMember = results[0];
    res.json(teamMember);
  });
};
// Get(/teams/)
const getAllTeams = (req, res, connection, callback) => {
  connection.query('SELECT * FROM team WHERE deleted_at IS NULL', (error, results) => {
    if (error) {
      console.error(error);
      return callback(error, null);
    }

    if (results.length === 0) {
      return callback(null, []);
    }

    const teamMembers = results;
    return callback(null, teamMembers);
  });
};
// Post(/team/update/:id)
const updateTeam = (req, res, connection) => {
  const memberId = req.params.id;
  const updatedData = req.body;

  connection.query('UPDATE team SET ? WHERE id = ?', [updatedData, memberId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating team member');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Team member not found');
      return;
    }

    console.log('Team member updated');
    res.send('Team member updated');
  });
};
// delete(/team/:id)
const deleteTeam = (req, res, connection) => {
  // performs a soft delete
  const memberId = req.params.id;

  connection.query('UPDATE team SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?', memberId, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting team member');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Team member not found');
      return;
    }

    console.log('Team member deleted');
    res.send('Team member soft deleted');
  });
};
module.exports = {
  team,
  CreateTeam,
  updateTeam,
  getAllTeams,
  getSingleTeam,
  deleteTeam
};