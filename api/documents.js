const documentService = require('../pkg/documents');

// Post(/documents)
const Createdocuments = (req, res, connection) =>{
      data = req.body
      documentService.createdocuments(req, res, data, connection,(error, result) => {
        if (error) {
          res.status(500).send('Error creating document');
        } else {
          //console.log(data);
          res.redirect("/documents")
        }
    })      
  }
  // Get(/documents/:id)
  const getSingledocuments = (req, res, connection) => {
    const memberId = req.params.id;
    documentService.getSingledocument(req, res, memberId, connection, (error, data) => {
      if (error) {
        res.status(500).send('Error retrieving documents');
      } else {
        //console.log(data);
        res.render("viewDocument", { document: data });
      }
  })
  };
  // Get(/documentss/)
  const getAlldocumentss = (req, res, connection) => {
    documentService.getAlldocuments(req, res, connection, (error, data) => {
      if (error) {
        res.status(500).send('Error retrieving documents');
      } else {
        //console.log(data);
        res.render("documents", { document: data });
      }
  })
  };
  // Post(/documents/update/:id)
  const updatedocuments = (req, res, connection) => {
    const memberId = req.params.id;
    const updatedData = req.body;
    documentService.updatedocuments(req, res, memberId, updatedData, connection,(error, result) => {
      if (error) {
        res.status(500).send('Error updating document');
      } else {
        //console.log(data);
        res.redirect("/documents")
      }
  })  
    
  };
  // delete(/documents/:id)
  const deletedocuments = (req, res, connection) => {
    const memberId = req.params.id;
    documentService.deletedocuments(req, res, memberId, connection,(error, result) => {
      if (error) {
        res.status(500).send('Error deleting document');
      } else {
        //console.log(data);
        res.redirect("/documents")
      }
  })  
    
  };
  module.exports = {
    Createdocuments,
    updatedocuments,
    getAlldocumentss,
    getSingledocuments,
    deletedocuments
  };