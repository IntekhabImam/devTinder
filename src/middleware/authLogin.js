const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const authLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("Unauthorized: please login");
        }
        const decoded = jwt.verify(token, "your_jwt_secret_key");

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).send("Unauthorized: user not found");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
};  
module.exports = authLogin;