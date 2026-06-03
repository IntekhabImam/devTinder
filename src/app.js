const express = require("express");
const connectDB = require("./config/database")
const User = require("./Models/user");
const app  = express();

app.use(express.json());

// database and server connection starting
connectDB()
.then(()=>{
    console.log("DB Connection Established");

    app.listen(8080, ()=>{
        console.log("Server running on port 8080");
    })
}).catch((err)=>{
    console.log("Db Connection failed", err);
})

// signup route
app.post("/signup",async(req, res) =>{
    const user = new User(req.body);

    try{
        const savedUser = await user.save();
        res.send("user saved successfully");
    }catch(err){
        res.send("Error saving user", err);
    }
})

//get all users data
app.get("/users", async(req, res) =>{
    try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        res.send("Error fetching users", err);
    }})

// get user by email

app.get("/user", async(req, res) =>{
    const email = req.body.email;
    try{
        const user = await User.findOne({email: email});
        res.send(user);
    }catch(err){
        res.send("Error fetching user", err);
    }});


//update user by id

app.patch("/user/:id", async(req, res) =>{
    const id = req.params.id;
    const updates = req.body;
    try{
        const user = await User.findByIdAndUpdate(id, updates, {new: true});
        res.send("user updated successfully",user);
    }catch(err){
        res.send("Error updating user", err);
    }
});

//delete user by id
app.delete("/user/:id", async(req, res) =>{
    const id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(id);
        res.send("user deleted successfully");
    }catch(err){
        res.send("Error deleting user", err);
    }
});
