const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            res.status(401).json({
                success: false, 
                message: "Login Required"
            });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}