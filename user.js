//const fileType = require('file-type');
//const mime = require('mime-types');
//const fs = require('fs');
const bcrypt = require('bcrypt');
const signUp = (req, res) => {
    data = req.body
    console.log(data);
    const loginRequest = {
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
    }
    const saltRounds = 10
    bcrypt.hash(loginRequest.confirmPassword, saltRounds, function(err, hash) {
      // save to db
      if (err) {
        // return error
        console.log("err happened")
      }
      console.log(hash)
    });
    //console.log(loginRequest)
    if (loginRequest.password !== loginRequest.confirmPassword){
        console.log("Passwords do not match")
        return res.status(401).send('Passwords do not match');
    }else{
    console.log("loginRequest Passed")
    return res.status(200).send('Passwords match');
    }
}
const login = (req, res) =>{
    const { username, password } = req.body;
    // Load hash from your password DB.
    //bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
      // result == true
    //});
    

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the hashed password with the entered password
    bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err || !result) {
        return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    });
}
const getLogo = (req, res) => {
  try {
    connection.query('SELECT * FROM logo LIMIT 1', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving logo');
        return;
      }

      if (results.length === 0) {
        res.status(404).send('Logo does not exist, Upload a logo first');
        return;
      }

      const data = results[0];
      const fileName = data.fileName;
      const contentType = mime.lookup(fileName) || 'application/octet-stream';
      res.set('Content-Type', contentType);
      res.set('Content-Disposition', 'inline');
      res.send(data.logo);
    });
  } catch (err) {
    return res.status(500).send('Failed to get logo');
  }
};
/*
connection.query('SELECT logo FROM logo LIMIT 1', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving logo from database');
      return;
    }
    const byteArray = results[0].logo;
    const image = Buffer.from(byteArray, 'binary');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': image.length
    });
    res.end(image);
  });
*/

// app.post('/uploadLogo', multer().single('logoFile'),
// <input type="file" name="logo" id="uploadLogoFile" accept="image/png, image/jpeg">
const uploadLogo = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(500).send('failed to read logo file'); 
    }
    const logoData = fs.readFileSync(file.path);

    const logoRequest ={
        logo: logoData,
        logoPath: 'tenant-logo.png',
    };

    try {
        app.TenantService.UploadTenantLogo(tenantID, logoRequest); // add logo upload logic
    } catch (err) {
        res.status(500).send('documents not found'); 
    }

    return res.json({
        message: 'Logo has been uploaded',
    });
}
module.exports = {
    signUp
    //uploadLogo,
    //getLogo
}