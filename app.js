const express = require('express');

const app = express();

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