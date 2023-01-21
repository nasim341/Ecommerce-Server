const express = require("express");
const router = express.Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
    create,
    update,
    remove
} = require("../controllers/category.js")
router.post("/category", requireSignin, isAdmin, create)
router.post("/category/:categoryId", requireSignin, isAdmin, update)
router.post("/category/:categoryId", requireSignin, isAdmin, remove)
module.exports = router;