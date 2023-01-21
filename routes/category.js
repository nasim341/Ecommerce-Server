const express = require("express");
const router = express.Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
    create,
    update,
    remove,
    list
} = require("../controllers/category.js")
router.post("/category", requireSignin, isAdmin, create)
router.put("/category/:categoryId", requireSignin, isAdmin, update)
router.delete("/category/:categoryId", requireSignin, isAdmin, remove)
router.get("/categories", list)
module.exports = router;