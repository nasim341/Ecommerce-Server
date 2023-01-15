const User = require("../models/user.js");
const { hashPassword, comparePassword } = require("../helpers/auth.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//New User register
exports.register = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name.trim()) {
            return res.json({ error: "Name is required" });
        }
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        if (!password || password.lencth < 6) {
            return res.json({ error: "Password must be at least 6 character long" });
        }
        const hashPassword = await hashPassword(password);
        const user = await new User({
            name,
            email,
            password: hashPassword,
        }).save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        console.log(error);
    }
}