const express = require("express");
const app  = express();

app.use("/hello",(req, res) =>{
    res.send("helllo world")
})

app.listen(8080, ()=>{
    console.log("server is listining")
})