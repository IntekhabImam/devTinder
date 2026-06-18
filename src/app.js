const express = require("express");
const connectDB = require("./config/database")
const User = require("./Models/user");
const app  = express();
const validatSignupData = require("./utils/validation");
const validateLoginData = require("./utils/loginValidation");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const authLogin = require("./middleware/authLogin");


app.use(express.json());
app.use(cookieParser());

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
        // validate
        validatSignupData(req);

        // hashing password
     const {password} = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = new User({
        ...req.body,
        password: hashedPassword,
     });

// save the user
        await user.save();
        res.status(201).send("User created successfully");
    }catch(err){
        res.status(400).send("Error creating user", err);
        console.log("Error creating user", err);

    }


        
});     

// login route
app.post("/login", async (req, res, next) => {
  try {
    validateLoginData(req);

    const { email, password } = req.body;
    // find user
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    // cheaking password is correct or not
    const isPasswordMatch = await user.verifyPassword(password);

    if (!isPasswordMatch) {
      throw new Error("Invalid credentials");
    }
    // generate JWT token
    const token = user.generateJWT ();

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });

  } catch (err) {
    next(err);
  }
});

//profile route

app.get("/profile", authLogin, (req, res) => {
    res.send(req.user);
});