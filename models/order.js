const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const orderSchema = new Schema({
    products: [{ type: ObjectId, ref: "Product" }]
}, { timestamps: true, versionKey: false })

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;