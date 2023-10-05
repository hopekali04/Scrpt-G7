const cropService = require('../pkg/crops');
//const connection = mysql.createPool(config.database);

// get(/crop)
const getCreatecrop = (req, res) =>{
    res.render("createCrop")  
}
const getUpdatecrop = (req, res, connection) =>{
    const memberId = req.params.id; // crop member ID as primary key identification for each crop
  console.log("id is",memberId)
  cropService.getSingleCrop(req, res, memberId, connection, (error, data) => {
    if (error) {
        //console.log(error)
      res.status(500).send('Error retrieving crop');
    } else {
      console.log(data);
      res.render("updateCrop", { crop: data });
    }
})
}
// Post(/crop)
const Createcrop = (req, res, connection) =>{
    data = req.body
    cropService.createCrop(req, res, data, connection,(error, result) => {
      if (error) {
        res.status(500).send('Error creating crop');
      } else {
        res.redirect("/crops")
      }
  })   
}
// Get(/crop/:id)
const getSinglecrop = (req, res, connection) => {
  const memberId = req.params.id; // crop member ID as primary key identification for each crop
  console.log("id is",memberId)
  cropService.getSingleCrop(req, res, memberId, connection, (error, data) => {
    if (error) {
        //console.log(error)
      res.status(500).send('Error retrieving crop');
    } else {
      console.log(data);
      res.render("viewCrop", { crop: data });
    }
})
};
// Get(/crops/)
const getAllcrops = (req, res, connection) => {
  cropService.getCrops(req, res, connection, (error, data) => {
    if (error) {
      res.status(500).send('Error retrieving crops');
    } else {
      //console.log(data);
      res.render("viewCrops", { crop: data });
    }
})
};
// Post(/crop/update/:id)
const updatecrop = (req, res, connection) => {
  const memberId = req.params.id;
  const updatedData = req.body;

  cropService.updateCrop(req, res, memberId, updatedData, connection,(error, result) => {
    if (error) {
      res.status(500).send('Error updating crop');
    } else {
      res.redirect("/crops")
    }
})
};
// delete(/crop/:id)
const deletecrop = (req, res, connection) => {
  // performs a soft delete
  const memberId = req.params.id;
  console.log("id is",memberId)
  cropService.deleteCrop(req, res, memberId, connection,(error, result) => {
    if (error) {
      res.status(500).send('Error deleting crop');
    } else {
      //console.log(data);
      res.redirect("/crops")
    }
})  
};
module.exports = {
  getUpdatecrop,
  getCreatecrop,
  Createcrop,
  updatecrop,
  getAllcrops,
  getSinglecrop,
  deletecrop
};