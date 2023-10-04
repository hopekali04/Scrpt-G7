const projects = (req, res) =>{
    const data = {title: "projects"}
    res.render("projects", data)
  }
  // Post(/projects)
  const CreateProject = (req, res, connection) =>{
      data = req.body
      connection.query("INSERT INTO projects SET ?", data, (error, results)=>{
          if (error){
              console.log(error)
          }else{
          res.redirect("/")
          }
      })
  }
  // Get(/projects/:id)
  const getSingleprojects = (req, res, connection) => {
    const memberId = req.params.id;
  
    connection.query('SELECT * FROM projects WHERE id = ? AND deleted_at IS NULL LIMIT 1', memberId, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving project');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('project not found'); // user doesn't exist
        return;
      }
  
      const projectsMember = results[0];
      res.json(projectsMember);
    });
  };
  // Get(/projectss/)
  const getAllprojectss = (req, res, connection) => {
    connection.query('SELECT * FROM projects WHERE deleted_at IS NULL', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving projectss');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('projectss do not exist, Create projectss first');
        return;
      }
  
      const projectsResult = results;
      res.json(projectsResult);
    })
  };
  // Post(/projects/update/:id)
  const updateprojects = (req, res, connection) => {
    const projectId = req.params.id;
    const updatedData = req.body;
  
    connection.query('UPDATE projects SET ? WHERE id = ?', [updatedData, projectId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating project');
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).send('project not found');
        return;
      }
  
      console.log('project updated');
      res.send('project updated');
    });
  };
  // delete(/projects/:id)
  const deleteprojects = (req, res, connection) => {
    // performs a soft delete
    const memberId = req.params.id;
  
    connection.query('UPDATE projects SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?', memberId, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting project member');
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).send('project not found');
        return;
      }
  
      console.log('project deleted');
      res.send('project deleted');
    });
  };
  module.exports = {
    projects,
    CreateProject,
    updateprojects,
    getAllprojectss,
    getSingleprojects,
    deleteprojects
  };