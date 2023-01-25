const Product = require("../models/product.js");
const fs = require("fs");
const slugify = require("slugify");
const braintree = require("braintree");
require("dotenv").config();
const Order = require("../models/order.js");
const sgMail = require("@sendgrid/mail");


sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.create = async(req, res) => {
    try {
        console.log(req.fields);
        console.log(req.files);
        const { name, description, price, category, quantity, shipping } =
        req.fields;
        const { photo } = req.files;
        console.log("PHOTO========>", photo)

        switch (true) {
            case !name.trim():
                return res.json({ error: "Name is required" });
            case !description.trim():
                return res.json({ error: "Description is required" });
            case !price.trim():
                return res.json({ error: "Price is required" });
            case !category.trim():
                return res.json({ error: "Category is required" });
            case !quantity.trim():
                return res.json({ error: "Quantity is required" });
            case !shipping.trim():
                return res.json({ error: "Shipping is required" });
            case photo && photo.size > 1000000:
                return res.json({ error: "Image should be less than 1mb in size" });
        }

     
        const product = new Product({...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};