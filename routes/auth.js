const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.js");
const { requireSignin } = require("../middlewares/auth.js");

router.post("/register", register)
router.post("/login", login)

router.get("/auth-check", requireSignin, (req, res) => {
    res.json({ ok: true })
})
router.gte("/admin-check", requireSignin, isAdmin, (req, res) => {
    res.json({ ok: true })
})

module.exports = router;