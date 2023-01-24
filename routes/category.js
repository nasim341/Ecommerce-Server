const express = require("express");
const router = express.Router();
const { requireSignin, isAdmin } = require("../middlewares/auth");
const {
    create,
    update,
    remove,
    list,
    read,
    productsByCategory

} = require("../controllers/category.js")
router.post("/category", requireSignin, isAdmin, create)
router.put("/category/:categoryId", requireSignin, isAdmin, update)
router.delete("/category/:categoryId", requireSignin, isAdmin, remove)
router.get("/category", list)
router.get("/category/:slug", read)
router.get("/products-by-category/:slug", productsByCategory);
module.exports = router;