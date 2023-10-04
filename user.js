//const fileType = require('file-type');
//const mime = require('mime-types');
//const fs = require('fs');
const bcrypt = require('bcrypt');

const createUser = (data, connection, callback) => {
  connection.query("INSERT INTO users SET ?", data, (error, results) => {
    if (error) {
      console.log(error.sqlMessage);
      callback(error.sqlMessage);
    } else {
      callback(null);
    }
  });
};

const signUp = (req, res, connection) => {
  data = req.body;
  const loginRequest = {
    username: data.username,
    password: data.password,
  };

  if (data.password !== data.confirmPassword) {
    console.log("Passwords do not match");
    return res.status(401).send('Passwords do not match');
  } else {
    const saltRounds = 10;
    bcrypt.hash(loginRequest.password, saltRounds, function (err, hash) {
      if (err) {
        console.log("Error occurred while hashing password");
        return res.status(500).send("Error occurred while hashing password");
      }

      // Update the password with the hashed password
      loginRequest.password = hash;

      // Call createUser with a callback to handle errors
      createUser(loginRequest, connection, (error) => {
        if (error) {
          console.log("Error occurred while creating user:", error);
          return res.status(500).send(error);
        } else {
          console.log("User created successfully");
          return res.status(200).send('User created successfully');
        }
      });
    });
  }
};
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