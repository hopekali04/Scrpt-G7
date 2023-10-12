const projectService = require('../services/projects');

  // Post(/projects)
  const CreateProject = (req, res, connection) =>{
      data = req.body
      projectService.CreateProject(req, res,data, connection,(error, conndata) => {
        if (error) {
          res.status(500).send('Error creating project');
        } else {
          //console.log(data);
          res.redirect("/projects")
        }
    }) 
  }
  const getCreateProject = (req, res) =>{
    res.render("createProject")
  }
  const getUpdate = (req, res, connection) =>{
    const memberId = req.params.id; // crop member ID as primary key identification for each crop
    projectService.getSingleprojects(req, res, memberId, connection, (error, data) => {
    if (error) {
      res.status(500).send('Error retrieving team');
    } else {
      console.log(data);
      res.render("updateProject", { project: data });
    }
  })
  }
  // Get(/projects/:id)
  const getSingleprojects = (req, res, connection) => {
    const memberId = req.params.id;
  
    projectService.getSingleprojects(req, res, memberId, connection, (error, data) => {
      if (error) {
        res.status(500).send('Error retrieving project');
      } else {
        //console.log(data);
        res.render("viewProject", { project: data });
      }
  })
  };
  // Get(/projectss/)
  const getAllprojectss = (req, res, connection) => {
    projectService.getAllprojectss(req, res, connection, (error, data) => {
      if (error) {
        res.status(500).send('Error retrieving documents');
      } else {
        res.render("projects", { projects: data });
      }
  })
  };
  // Post(/projects/update/:id)
  const updateprojects = (req, res, connection) => {
    const projectId = req.params.id;
    const updatedData = req.body;
  
    projectService.updateprojects(req, res, projectId, updatedData, connection,(error, result) => {
      if (error) {
        res.status(500).send('Error updating project');
      } else {
        //console.log(data);
        res.redirect("/projects")
      }
  })  
  };
  // delete(/projects/:id)
  const deleteprojects = (req, res, connection) => {
    const memberId = req.params.id;
  
    projectService.deleteprojects(req, res, memberId, connection,(error, result) => {
      if (error) {
        res.status(500).send('Error deleting project');
      } else {
        //console.log(data);
        res.redirect("/projects")
      }
  })  
  };
  module.exports = {
    getUpdate,
    getCreateProject,
    CreateProject,
    updateprojects,
    getAllprojectss,
    getSingleprojects,
    deleteprojects
  };