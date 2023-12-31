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
const memberService = require('./api/members');
const cropViews = require('./api/cropViews');
const memberViews = require('./api/membersView');
const calendar = require('./api/calendar');

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
connection.getConnection((err) =>{
    if (err) {
        "error"
    }
})
const upload = multer(); // handles the file upload

app.set("view engine", "ejs")
app.use(express.static("public"))


const home = (req, res) => {
    cropViews.getTotlcropView(req, res, connection, (err, view) => {
        console.log("I am ",view);
        dbTables.createTablesIfNotExist(connection);
        const data = { title: "Home" };
        const graph = {
            maleCount: 2,
            femaleCount: 8};
        memberViews.teamStuff(req, res, connection, (err, teamData) => {
            console.log(teamData)
            res.render("index", { array: view, data: data, teams: teamData, graph : graph });
        })
    })
    
};
const login = (req, res) =>{
    res.render("login")
}

const signUp = (req, res) =>{
    res.render("signup")
}
const reports = (req, res) =>{
    memberViews.teamStuff(req, res, connection, (err, teamData) => {
        console.log(teamData)
        res.render('reports', { title: 'Teams Summary', data: teamData });
    })
}


//app.post("/upload/logo",isAuthenticated, multer().single('logoFile'),userService.uploadLogo)
app.get("/me", (req, res) => {memberViews.teamStuff(req, res, connection, (err, view) => {
    console.log("I am ",view);
})} )
//AUTH
app.post('/signup', (req, res) => {userService.signUp(req, res, connection)})
app.post('/login', (req, res) => {userService.login(req, res, connection)})
app.get('/login', login)
app.get('/signup', signUp)
app.get("/logo", isAuthenticated,(req, res) => {userService.getLogo(req, res, connection)} )

const loadLogoPage = (req, res) => {
    res.render('uploadLogo')
}
app.get("/upload", loadLogoPage)
app.post('/upload-logo', upload.single('logo'), (req, res) => {userService.uploadLogo(req, res, connection)});

/// Authenticate Routes

app.get('/', isAuthenticated, home)

//CALENDAR
app.get("/calendar", isAuthenticated,(req, res) => {calendar.getAll(req, res, connection)})
app.post("/create-calendar",isAuthenticated, (req, res) => {calendar.Create(req, res, connection)})
app.get("/create-calendar", isAuthenticated,(req, res) => {calendar.getCreate(req, res, connection)})
app.get("/view-calendar/:id", isAuthenticated,(req, res) => {calendar.getSingle(req, res, connection)})
app.get("/update-calendar/:id",isAuthenticated, (req, res) => {calendar.getUpdate(req, res, connection)})
app.post("/update-calendar/:id",isAuthenticated, (req, res) => {calendar.update(req, res, connection)})
app.post("/delete-calendar/:id",isAuthenticated, (req, res) => {calendar.deleteCalendar(req, res, connection)})

// TEAM MEMBERS
app.get("/members", isAuthenticated,(req, res) => {memberService.getAllMembers(req, res, connection)})
app.post("/create-member",isAuthenticated, (req, res) => {memberService.Create(req, res, connection)})
app.get("/create-member", isAuthenticated,(req, res) => {memberService.getCreate(req, res, connection)})
app.get("/view-member/:id", isAuthenticated,(req, res) => {memberService.getSingle(req, res, connection)})
app.get("/update-member/:id",isAuthenticated, (req, res) => {memberService.getUpdate(req, res, connection)})
app.post("/update-member/:id",isAuthenticated, (req, res) => {memberService.updateMember(req, res, connection)})
app.post("/delete-member/:id",isAuthenticated, (req, res) => {memberService.deleteMember(req, res, connection)})

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
app.get("/create-team",isAuthenticated, (req, res) => {teamService.getCreate(req, res)})
app.get("/team/:id",isAuthenticated, (req, res) => {teamService.getSingleTeam(req, res, connection)})
app.get("/teams",isAuthenticated, (req, res) => {teamService.getAllTeams(req, res, connection)})
app.post("/team/:id",isAuthenticated, (req, res) => {teamService.updateTeam(req, res, connection)})
app.get("/update-team/:id",isAuthenticated, (req, res) => {teamService.getUpdate(req, res, connection)})
app.post("/delete-team/:id",isAuthenticated, (req, res) => {teamService.deleteTeam(req, res, connection)})

// DOCUMENTS
app.post("/document",isAuthenticated, (req, res) => {documentService.Createdocuments(req, res, connection)})
app.get("/document/:id",isAuthenticated, (req, res) => {documentService.getSingledocuments(req, res, connection)})
app.get("/documents",isAuthenticated, (req, res) => {documentService.getAlldocumentss(req, res, connection)})
app.post("/document/:id",isAuthenticated, (req, res) => {documentService.updatedocuments(req, res, connection)})
app.delete("/document/:id",isAuthenticated, (req, res) => {documentService.deletedocuments(req, res, connection)})

// PROJECTS
app.get("/create-project",isAuthenticated, (req, res) => {projectService.getCreateProject(req, res)})
app.post("/project",isAuthenticated, (req, res) => {projectService.CreateProject(req, res, connection)})
app.get("/project/:id",isAuthenticated, (req, res) => {projectService.getSingleprojects(req, res, connection)})
app.get("/projects",isAuthenticated,(req, res) => {projectService.getAllprojectss(req, res, connection)})
app.get("/update-project/:id",isAuthenticated, (req, res) => {projectService.getUpdate(req, res, connection)})
app.post("/project/:id",isAuthenticated, (req, res) => {projectService.updateprojects(req, res, connection)})
app.post("/delete-project/:id",isAuthenticated, (req, res) => {projectService.deleteprojects(req, res, connection)})
//REPORTS
app.get("/reports", reports)
app.listen(3000,()=>{
    console.log('listening');
});