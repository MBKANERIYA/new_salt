const mongoose = require("mongoose");

const addressItemSchema = new mongoose.Schema({
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    street: { type: String, required: true, trim: true },
    additionalInfo: { type: String, trim: true },
    postalCode: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    mobile: { type: String, trim: true },
}, { _id: true });

const addressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    addresses: [addressItemSchema],
}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);
