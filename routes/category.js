const express = require("express");
const router = express.Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
    create
} = require("../controllers/category.js")
router.post("/caategory", requireSignin, isAdmin, create)
module.exports = router;