//const fileType = require('file-type');
//const mime = require('mime-types');
//const fs = require('fs');
const bcrypt = require('bcrypt');

const dbTables = require('./database')

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
const login = (req, res, connection) => {
  dbTables.createUserTableIfNotExists(connection);
  const { username, password } = req.body;
  console.log(password);

  // Query the database to get the user with the provided username
  connection.query("SELECT * FROM users WHERE username = ?", username, (error, results) => {
    if (error) {
      console.log(error.sqlMessage);
      return res.status(500).json({ message: 'An error occurred during login' });
    }
    console.log(results);

    if (results.length === 0) {
      return res.status(500).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    // Compare the hashed password with the entered password
    comparePasswords(password, user.password)
      .then((isPasswordCorrect) => {
        if (isPasswordCorrect) {
          console.log(isPasswordCorrect);
          return res.status(200).json({ message: 'Password is correct!'});
        } else {
          return res.status(500).json({ message: 'Password is incorrect!' });
        }
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during login' });
      });
  });
};

const comparePasswords = (password, hashedPassword) => {
  // async function to run the bcrpt comparison on the password & it's hash
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (error, isPasswordCorrect) => {
      if (error) {
        reject(error);
      } else {
        resolve(isPasswordCorrect);
      }
    });
  });
};

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
    signUp,
    login
    //uploadLogo,
    //getLogo
}