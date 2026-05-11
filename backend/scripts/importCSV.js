const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const UploadSchema = new mongoose.Schema({
    id: String, title: String, gender: String,
    price14KT: Number, price18KT: Number,
    image01: String, image02: String, image03: String, video: String,
    category: String, subCategory: String,
    diamondprice: Number, makingCharge14KT: Number, makingCharge18KT: Number,
    grossWt: Number, netWeight14KT: Number, netWeight18KT: Number,
    gst14KT: Number, gst18KT: Number,
    total14KT: Number, total18KT: Number, discount: Number,
}, { timestamps: true });

async function importCSV() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");

        const Upload = mongoose.model("Upload", UploadSchema, "uploads");

        const csvPath = path.join(__dirname, "..", "products_template.csv");
        const csvData = fs.readFileSync(csvPath, "utf-8");
        const lines = csvData.split("\n").filter(line => line.trim());
        const headers = lines[0].split(",").map(h => h.trim());

        const products = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",").map(v => v.trim());
            const product = {};
            headers.forEach((header, idx) => {
                const val = values[idx] || "";
                const numFields = ["price14KT","price18KT","diamondprice","makingCharge14KT","makingCharge18KT","grossWt","netWeight14KT","netWeight18KT","gst14KT","gst18KT","total14KT","total18KT","discount"];
                product[header] = numFields.includes(header) ? Number(val) || 0 : val;
            });
            products.push(product);
        }

        const result = await Upload.insertMany(products);
        console.log(`Successfully imported ${result.length} products!`);

        await mongoose.disconnect();
        console.log("Done!");
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

importCSV();
