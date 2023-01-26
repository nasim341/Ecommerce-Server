const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const { requireSignin, isAdmin } = require("../middlewares/auth.js")

const {
    create,
    list,
    read,
    photo,
    remove,
    update
} = require("../controllers/product.js");


router.post("/product", requireSignin, isAdmin, formidable(), create)
router.get("/products", list)
router.get("/product/:slug", read)
router.get("/product/photo/:productId", photo)
router.delete("/product/:productId", requireSignin, isAdmin, remove)
router.put("/product/:productId", requireSignin, isAdmin, formidable(),update)
module.exports = router;