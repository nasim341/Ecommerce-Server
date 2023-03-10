const User = require("../models/user.js");
const { comparePassword, hashPassword } = require("../helpers/auth.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Order = require("../models/order.js");


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name.trim()) {
            return res.json({ error: "Name is required" });
        }
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least 6 character long" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: "Email is alredy taken" })
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
//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least 6 character long " });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "user not found" })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({ error: "Wrong password" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d", });
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
};
exports.secret = async (req, res) => {
    res.json({ currentUser: req.user })
}
//update profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, password, address } = req.body;
        const user = await User.findById(req.user._id);

        // check password length
        if (password && password.length < 6) {
            return res.json({
                error: "Password is required and should be min 6 characters long",
            });
        }
        // hash the password
        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updated = await User.findByIdAndUpdate(
            req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            address: address || user.address,
        }, { new: true }
        );

        updated.password = undefined;
        res.json(updated);
    } catch (err) {
        console.log(err);
    }
};
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (err) {
        console.log(err);
    }
};

exports.allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (err) {
        console.log(err);
    }
};