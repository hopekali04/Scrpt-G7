const express = require('express');
const mysql = require('mysql2');

//const multer = require('multer');
const dbTables = require('./database')

const userService = require('./user');
const teamService = require('./team');
const documentService = require('./documents');
const projectService = require('./project');

const app = express();
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const config = require('./config');
const connection = mysql.createPool(config.database);

app.set("view engine", "ejs")
app.use(express.static("public"))


const home = (req, res) =>{
    dbTables.createTablesIfNotExist(connection);
    //dbTables.createUserTableIfNotExists(connection);
    const data = {title: "Home"}
    res.render("index", data)
}

//app.post("/upload/logo", multer().single('logoFile'),userService.uploadLogo)
app.get('/', home)
app.post('/signup', (req, res) => {userService.signUp(req, res, connection)})
app.post('/login', (req, res) => {userService.login(req, res, connection)})

app.listen(3000,()=>{
    console.log('listening');
});