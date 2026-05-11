const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

async function deleteAllProducts() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");

        const Upload = mongoose.model("Upload", new mongoose.Schema({}, { strict: false }), "uploads");
        
        const count = await Upload.countDocuments();
        console.log(`Found ${count} products. Deleting all...`);

        const result = await Upload.deleteMany({});
        console.log(`Deleted ${result.deletedCount} products successfully!`);

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

deleteAllProducts();
