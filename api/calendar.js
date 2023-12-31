const cropService = require('../services/calendar');
//const connection = mysql.createPool(config.database);

// get(/crop)
const getCreate = (req, res) =>{
    res.render("createCalendar")  
}
const getUpdate = (req, res, connection) =>{
    const memberId = req.params.id; // crop member ID as primary key identification for each crop
  console.log("id is",memberId)
  cropService.getSingle(req, res, memberId, connection, (error, data) => {
    if (error) {
        //console.log(error)
      res.status(500).send('Error retrieving crop');
    } else {
      console.log(data);
      res.render("updateCalendar", { crop: data });
    }
})
}
// Post(/crop)
const Create = (req, res, connection) =>{
    data = req.body
    cropService.create(req, res, data, connection,(error, result) => {
      if (error) {
        res.status(500).send('Error creating crop');
      } else {
        res.redirect("/calendar")
      }
  })   
}
// Get(/crop/:id)
const getSingle = (req, res, connection) => {
  const memberId = req.params.id; // crop member ID as primary key identification for each crop
  console.log("id is",memberId)
  cropService.getSingle(req, res, memberId, connection, (error, data) => {
    if (error) {
        //console.log(error)
      res.status(500).send('Error retrieving crop');
    } else {
      console.log(data);
      res.render("viewcalendar", { crop: data });
    }
})
};
// Get(/crops/)
const getAll = (req, res, connection) => {
  cropService.getAll(req, res, connection, (error, data) => {
    if (error) {
      res.status(500).send('Error retrieving crops');
    } else {
      //console.log(data);
      res.render("calendar", { calendar: data });
    }
})
};
// Post(/crop/update/:id)
const update = (req, res, connection) => {
  const memberId = req.params.id;
  const updatedData = req.body;

  cropService.update(req, res, memberId, updatedData, connection,(error, result) => {
    if (error) {
      res.status(500).send('Error updating crop');
    } else {
      res.redirect("/calendar")
    }
})
};
// delete(/crop/:id)
const deleteCalendar = (req, res, connection) => {
  // performs a soft delete
  const memberId = req.params.id;
  console.log("id is",memberId)
  cropService.deleteOne(req, res, memberId, connection,(error, result) => {
    if (error) {
      res.status(500).send('Error deleting crop');
    } else {
      //console.log(data);
      res.redirect("/calendar")
    }
})  
};
module.exports = {
  getUpdate,
  getCreate,
  Create,
  update,
  getAll,
  getSingle,
  deleteCalendar
};