const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.requireSignin = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.headers.authorization, process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(error)
    }
}

exports.isAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send("Unathosrized");
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
    }
};