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
//AUTH
app.get('/', home)
app.post('/signup', (req, res) => {userService.signUp(req, res, connection)})
app.post('/login', (req, res) => {userService.login(req, res, connection)})

//CALENDAR
// TEAM
app.post("/team", (req, res) => {teamService.CreateTeam(req, res, connection)})
app.get("/team/:id", (req, res) => {teamService.getSingleTeam(req, res, connection)})
app.get("/teams", (req, res) => {teamService.getAllTeams(req, res, connection)})
app.post("/team/:id", (req, res) => {teamService.updateTeam(req, res, connection)})
app.delete("/team/:id", (req, res) => {teamService.deleteTeam(req, res, connection)})

// DOCUMENTS
app.post("/document", (req, res) => {documentService.Createdocuments(req, res, connection)})
app.get("/document/:id", (req, res) => {documentService.getSingledocuments(req, res, connection)})
app.get("/documents", (req, res) => {documentService.getAlldocumentss(req, res, connection)})
app.post("/document/:id", (req, res) => {documentService.updatedocuments(req, res, connection)})
app.delete("/document/:id", (req, res) => {documentService.deletedocuments(req, res, connection)})

// PROJECTS
app.post("/project", (req, res) => {projectService.CreateProject(req, res, connection)})
app.get("/project/:id", (req, res) => {projectService.getSingleprojects(req, res, connection)})
app.get("/projects", (req, res) => {projectService.getAllprojectss(req, res, connection)})
app.post("/project/:id", (req, res) => {projectService.updateprojects(req, res, connection)})
app.delete("/project/:id", (req, res) => {projectService.deleteprojects(req, res, connection)})
//REPORTS

app.listen(3000,()=>{
    console.log('listening');
});