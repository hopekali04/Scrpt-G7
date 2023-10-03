const documents = (req, res) =>{
    const data = {title: "documents"}
    res.render("documents", data)
  }
  // Post(/documents)
  const Createdocuments = (req, res) =>{
      data = req.body
      connection.query("INSERT INTO documents SET ?", data, (error, results)=>{
          if (error){
              console.log(error)
          }else{
          res.redirect("/")
          }
      })
  }
  // Get(/documents/:id)
  const getSingledocuments = (req, res) => {
    const memberId = req.params.id; 
  
    connection.query('SELECT * FROM documents WHERE id = ? AND deleted_at IS NULL LIMIT 1', memberId, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving documents');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('documents not found'); // user doesn't exist
        return;
      }
  
      const documentsMember = results[0];
      res.json(documentsMember);
    });
  };
  // Get(/documentss/)
  const getAlldocumentss = (req, res) => {
    connection.query('SELECT * FROM documents WHERE deleted_at IS NULL', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving documents');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('document does not exist, Create a document first');
        return;
      }
  
      const documentsMembers = results;
      res.json(documentsMembers);
    })
  };
  // Post(/documents/update/:id)
  const updatedocuments = (req, res) => {
    const memberId = req.params.id;
    const updatedData = req.body;
  
    connection.query('UPDATE documents SET ? WHERE id = ?', [updatedData, memberId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating document');
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).send('document not found');
        return;
      }
  
      console.log('document updated');
      res.send('document updated');
    });
  };
  // delete(/documents/:id)
  const deletedocuments = (req, res) => {
    // performs a soft delete
    const memberId = req.params.id;
  
    connection.query('UPDATE documents SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ?', memberId, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting document');
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).send('document not found');
        return;
      }
  
      console.log('document deleted');
      res.send('document deleted');
    });
  };
  module.exports = {
    documents,
    Createdocuments,
    updatedocuments,
    getAlldocumentss,
    getSingledocuments,
    deletedocuments
  };