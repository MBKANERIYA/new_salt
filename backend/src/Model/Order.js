const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    colorBy: { type: String, default: "" },
    caratBy: { type: String, default: "" },
    size: { type: String, default: "" },
});

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        items: [orderItemSchema],
        subtotal: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        discountAmount: { type: Number, default: 0 },
        shippingCharges: { type: Number, default: 0 },
        totalAmount: { type: Number, required: true },
        couponCode: { type: String, default: "" },
        paymentMethod: { type: String, required: true },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
        },
        orderStatus: {
            type: String,
            enum: ["placed", "confirmed", "shipped", "delivered", "cancelled"],
            default: "placed",
        },
        shippingAddress: {
            firstname: String,
            lastname: String,
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
            mobile: String,
        },
        billingAddress: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        },
        deliveryDate: { type: Date },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
