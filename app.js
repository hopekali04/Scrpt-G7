const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

const config = require('./config');
const connection = mysql.createPool(config.database);

app.set("view engine", "ejs")
app.use(express.static("public"))


const home = (req, res) =>{
    const data = {title: "Home"}
    res.render("index", data)
}


app.get('/', home)

app.listen(3000,()=>{
    console.log('listening');
});