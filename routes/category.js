const express = require("express");
const router = express.Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
    create,
    update
} = require("../controllers/category.js")
router.post("/caategory", requireSignin, isAdmin, create)
router.post("/caategory/:categoryId", requireSignin, isAdmin, update)
module.exports = router;