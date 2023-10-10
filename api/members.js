const memberSvc = require('../services/members');
const teamService = require('../services/team');

const getCreate = (req, res, connection) =>{
    // pass teams too for refence when creating members
    teamService.getAllTeam(req, res, connection, (error, data) => {
        if (error) {
          res.status(500).send('<script>alert("Failed to get teams, try Later");</script>');
        } else {
          res.render("createMember",{ teams: data } ) ;
        }
    }) 
}
const getUpdate = (req, res, connection) =>{
    const memberId = req.params.id; 
    console.log("id is",memberId)
    memberSvc.getSingle(req, res, memberId, connection, (error, data) => {
        if (error) {
        res.status(500).send('<script>alert("Failed to get user, try Later");</script>');
        } else {
        console.log(data);
        res.render("updateMember", { member: data });
        }
    })
}
const Create = (req, res, connection) =>{
    data = req.body
    memberSvc.create(req, res, data, connection,(error, result) => {
      if (error) {
        res.status(500).send('<script>alert("Failed to create, try Later");</script>');
      } else {
        res.redirect("/members")
      }
  })   
}
const getSingle= (req, res, connection) => {
  const memberId = req.params.id; 
  console.log("id is",memberId)
  memberSvc.getSingle(req, res, memberId, connection, (error, data) => {
    if (error) {
      res.status(500).send('<script>alert("Failed to get user, try Later");</script>');
    } else {
      console.log(data);
      res.render("membersView", { member: data });
    }
})
};
const getAllMembers = (req, res, connection) => {
  memberSvc.getAll(req, res, connection, (error, data) => {
    if (error) {
      res.status(500).send('<script>alert("Failed to get members, try Later");</script>');
    } else {
      res.render("members", { array: data });
    }
})
};
const updateMember = (req, res, connection) => {
  const memberId = req.params.id;
  const updatedData = req.body;

  memberSvc.update(req, res, memberId, updatedData, connection,(error, result) => {
    if (error) {
      res.status(500).send('Error updating member');
    } else {
      res.redirect("/members")
    }
})
};
const deleteMember = (req, res, connection) => {
  // performs a soft delete
  const memberId = req.params.id;
  console.log("id is",memberId)
  memberSvc.deleteOne(req, res, memberId, connection,(error, result) => {
    if (error) {
      res.status(500).send('<script>alert("Failed to delete, try Later");</script>');
    } else {
      res.redirect("/members")
    }
})  
};
module.exports = {
  getCreate,
  Create,
  getAllMembers,
  updateMember,
  getUpdate,
  deleteMember,
  getSingle
};