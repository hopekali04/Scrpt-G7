const team = (req, res) =>{
  const data = {title: "team"}
  res.render("team", data)
}
// Post(/team)
const CreateTeam = (req, res) =>{
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
const getSingleTeam = (req, res) => {
  const memberId = req.params.id; // team member ID as primary key identification for each team

  connection.query('SELECT * FROM team WHERE id = ? LIMIT 1', memberId, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving team member'); // 500 is internal server error
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Team member not found'); // user doesn't exist
      return;
    }

    const teamMember = results[0];
    res.json(teamMember);
  });
};
// Get(/team/)
const getAllTeams = (req, res) => {
  connection.query('SELECT * FROM team', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving teams'); // 500 is internal server error
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Teams do not exist, Create teams first');t
      return;
    }

    const teamMembers = results;
    res.json(teamMembers);
  })
};
// Post(/team/update/:id)
const updateTeam = (req, res) => {
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
const deleteTeam = (req, res) => {
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