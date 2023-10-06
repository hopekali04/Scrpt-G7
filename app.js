const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');

const dbTables = require('./database')

const userService = require('./api/user');
const teamService = require('./api/team');
const documentService = require('./api/documents');
const projectService = require('./api/project');
const cropService = require('./api/crops');

const app = express();
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    //cookie: {
    //  maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
    //}
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Protected function to check if the user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // User is logged in, proceed to the next middleware or route handler
      next();
    } else {
      // User is not logged in, redirect to the login page
      res.redirect('/login');
    }
};

const config = require('./config');
const connection = mysql.createPool(config.database);
const upload = multer(); // handles the file upload

app.set("view engine", "ejs")
app.use(express.static("public"))


const home = (req, res) =>{
    dbTables.createTablesIfNotExist(connection);
    const data = {title: "Home"}
    res.render("index", data)
}
const login = (req, res) =>{
    res.render("login")
}

const signUp = (req, res) =>{
    res.render("signup")
}
//app.post("/upload/logo",isAuthenticated, multer().single('logoFile'),userService.uploadLogo)

//AUTH
app.post('/signup', (req, res) => {userService.signUp(req, res, connection)})
app.post('/login', (req, res) => {userService.login(req, res, connection)})
app.get('/login', login)
app.get('/signup', signUp)

const loadLogoPage = (req, res) => {
    res.render('uploadLogo')
}
app.get("/upload", loadLogoPage)
app.post('/upload-logo', upload.single('logo'), (req, res) => {userService.uploadLogo(req, res, connection)});

/// Authenticate Routes

app.get('/', isAuthenticated, home)

//CALENDAR

// CROP
app.get("/crop", isAuthenticated,(req, res) => {cropService.getCreatecrop(req, res)} )
app.post("/crop",isAuthenticated, (req, res) => {cropService.Createcrop(req, res, connection)})
app.get("/crop/:id",isAuthenticated, (req, res) => {cropService.getSinglecrop(req, res, connection)})
app.get("/crops",isAuthenticated, (req, res) => {cropService.getAllcrops(req, res, connection)})
app.get("/updatecrop/:id", isAuthenticated, (req, res) => {cropService.getUpdatecrop(req, res, connection)})
app.post("/crop/:id",isAuthenticated, (req, res) => {cropService.updatecrop(req, res, connection)})
app.post("/deletecrop/:id",isAuthenticated, (req, res) => {cropService.deletecrop(req, res, connection)})

// TEAM
app.post("/team",isAuthenticated, (req, res) => {teamService.CreateTeam(req, res, connection)})
app.get("/team/:id",isAuthenticated, (req, res) => {teamService.getSingleTeam(req, res, connection)})
app.get("/teams",isAuthenticated, (req, res) => {teamService.getAllTeams(req, res, connection)})
app.post("/team/:id",isAuthenticated, (req, res) => {teamService.updateTeam(req, res, connection)})
app.delete("/team/:id",isAuthenticated, (req, res) => {teamService.deleteTeam(req, res, connection)})

// DOCUMENTS
app.post("/document",isAuthenticated, (req, res) => {documentService.Createdocuments(req, res, connection)})
app.get("/document/:id",isAuthenticated, (req, res) => {documentService.getSingledocuments(req, res, connection)})
app.get("/documents",isAuthenticated, (req, res) => {documentService.getAlldocumentss(req, res, connection)})
app.post("/document/:id",isAuthenticated, (req, res) => {documentService.updatedocuments(req, res, connection)})
app.delete("/document/:id",isAuthenticated, (req, res) => {documentService.deletedocuments(req, res, connection)})

// PROJECTS
app.post("/project",isAuthenticated, (req, res) => {projectService.CreateProject(req, res, connection)})
app.get("/project/:id",isAuthenticated, (req, res) => {projectService.getSingleprojects(req, res, connection)})
app.get("/projects",isAuthenticated,(req, res) => {projectService.getAllprojectss(req, res, connection)})
app.post("/project/:id",isAuthenticated, (req, res) => {projectService.updateprojects(req, res, connection)})
app.delete("/project/:id",isAuthenticated, (req, res) => {projectService.deleteprojects(req, res, connection)})
//REPORTS

app.listen(3000,()=>{
    console.log('listening');
});