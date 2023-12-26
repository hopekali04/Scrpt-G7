//const fileType = require('file-type');
//const mime = require('mime-types');
//const fs = require('fs');
const bcrypt = require('bcrypt');

const dbTables = require('../database')

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
    return res.status(401).send('<script>alert("Passwords do not match");</script>');
    //return res.status(401).send('Passwords do not match');
  } else {
    const saltRounds = 10;
    bcrypt.hash(loginRequest.password, saltRounds, function (err, hash) {
      if (err) {
        //console.log("Error occurred while hashing password");
        return res.status(500).send('<script>alert("PError occurred while hashing password! Try Again Later");</script>');
        //return res.status(500).send("Error occurred while hashing password");
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
          return res.status(200).send('<script>alert("User created successfully!"); window.location.href = "/login";</script>');
          //return res.status(200).send('User created successfully');
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
      return res.status(500).send('<script>alert("Password is incorrect!"); window.location.href = "/login";</script>');//.json({ message: 'Password is incorrect!' });
      return res.status(500).json({ message: 'An error occurred during login' });
    }
    console.log(results);

    if (results.length === 0) {
      return res.status(500).send('<script>alert("Invalid credentials!"); window.location.href = "/login";</script>');
      //return res.status(500).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    // Compare the hashed password with the entered password
    comparePasswords(password, user.password)
      .then((isPasswordCorrect) => {
        if (isPasswordCorrect) {
          req.session.user = { id: user.id, username: user.username };
          console.log(req.session)
          res.redirect('/');
          //return res.status(200).json({ message: 'Password is correct!'});
        } else {
          return res.status(500).send('<script>alert("Password is incorrect!"); window.location.href = "/login";</script>');//.json({ message: 'Password is incorrect!' });
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

const getLogo = (req, res, connection) => {
  const userId = req.session.user.id; // Get the user ID from the session
  //const userId = 1; // Get the user ID from the session
  try {
    connection.query('SELECT * FROM logo WHERE user_id = ? ', userId, (error, results) => {
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
      const contentType = 'image/png';
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
const uploadLogo = (req, res, connection) => {
  const logo = req.file.buffer; // Get the logo file buffer
  const userId = req.session.user.id; // Get the user ID from the session
  connection.query('INSERT INTO logo (logo, user_id) VALUES (?, ?)', [logo, userId], (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // If a previous logo exists, update it
        // Handles duplicate entry error by running an update script instead
        connection.query('UPDATE logo SET logo = ? WHERE user_id = ?', [logo, userId], (updateError, updateResults) => {
          if (updateError) {
            console.error('Error updating logo:', updateError.sqlMessage);
            res.status(500).send('<script>alert("Failed to update logo, try Later"); window.location.href = "/upload";</script>');
          } else {
            res.status(200).send('<script>alert("Logo Updated!"); window.location.href = "/";</script>');
          }
        });
      } else {
        console.error('Error inserting logo:', error.sqlMessage);
        res.status(500).send('<script>alert("Failed to update logo, try Later"); window.location.href = "/upload";</script>');
      }
    } else {
      res.status(200).send('<script>alert("Logo Created !"); window.location.href = "/";</script>');
    }
  });  
};
module.exports = {
    signUp,
    login,
    uploadLogo,
    getLogo
}