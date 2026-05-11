const mongoose = require("mongoose");
require("dotenv").config();

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

const IMG1 = "/assets/products/bracelet_chain.png";
const IMG2 = "/assets/products/bracelet_oval.png";

const newProducts = [
    // TENNIS - 2 products
    {
        id: "BRC-TNS-001", title: "Gold Tennis Bracelet", gender: "Female",
        category: "Bracelet", subCategory: "TENNIS",
        price14KT: 35000, price18KT: 42000,
        image01: IMG1, image02: IMG2, image03: "", video: "",
        diamondprice: 10000, makingCharge14KT: 4200, makingCharge18KT: 5000,
        grossWt: 4.5, netWeight14KT: 4.0, netWeight18KT: 4.3,
        gst14KT: 1050, gst18KT: 1260, total14KT: 36050, total18KT: 43260, discount: 10,
    },
    {
        id: "BRC-TNS-002", title: "Diamond Tennis Bracelet", gender: "Female",
        category: "Bracelet", subCategory: "TENNIS",
        price14KT: 55000, price18KT: 66000,
        image01: IMG2, image02: IMG1, image03: "", video: "",
        diamondprice: 20000, makingCharge14KT: 6000, makingCharge18KT: 7200,
        grossWt: 5.0, netWeight14KT: 4.5, netWeight18KT: 4.8,
        gst14KT: 1650, gst18KT: 1980, total14KT: 56650, total18KT: 67980, discount: 5,
    },

    // LIGHT WEIGHT BANGLE - 2 products
    {
        id: "BRC-LWB-001", title: "Light Weight Gold Bangle", gender: "Female",
        category: "Bracelet", subCategory: "LIGHT WEIGHT BANGLE",
        price14KT: 18000, price18KT: 21600,
        image01: IMG2, image02: IMG1, image03: "", video: "",
        diamondprice: 2000, makingCharge14KT: 2500, makingCharge18KT: 3000,
        grossWt: 3.0, netWeight14KT: 2.5, netWeight18KT: 2.8,
        gst14KT: 540, gst18KT: 648, total14KT: 18540, total18KT: 22248, discount: 12,
    },
    {
        id: "BRC-LWB-002", title: "Diamond Light Weight Bangle", gender: "Female",
        category: "Bracelet", subCategory: "LIGHT WEIGHT BANGLE",
        price14KT: 28000, price18KT: 33600,
        image01: IMG2, image02: IMG1, image03: "", video: "",
        diamondprice: 5000, makingCharge14KT: 3500, makingCharge18KT: 4200,
        grossWt: 3.5, netWeight14KT: 3.0, netWeight18KT: 3.3,
        gst14KT: 840, gst18KT: 1008, total14KT: 28840, total18KT: 34608, discount: 8,
    },
];

async function updateBracelet() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const Upload = mongoose.model("Upload", UploadSchema, "uploads");

        // Delete old Bracelet products (OVAL, OFFICE WEAR)
        const deleted = await Upload.deleteMany({
            category: "Bracelet",
            subCategory: { $in: ["OVAL", "OFFICE WEAR"] }
        });
        console.log(`Deleted ${deleted.deletedCount} old Bracelet products (Oval, Office Wear)`);

        // Insert new products
        const result = await Upload.insertMany(newProducts);
        console.log(`Inserted ${result.length} new Bracelet products`);

        // Show full DB breakdown
        const summary = await Upload.aggregate([
            { $group: { _id: { cat: "$category", sub: "$subCategory" }, count: { $sum: 1 } } },
            { $sort: { "_id.cat": 1, "_id.sub": 1 } }
        ]);
        console.log("\nFull product breakdown:");
        let currentCat = "";
        summary.forEach(s => {
            if (s._id.cat !== currentCat) {
                currentCat = s._id.cat;
                console.log(`\n${currentCat}:`);
            }
            console.log(`  ${s._id.sub}: ${s.count}`);
        });

        const total = await Upload.countDocuments();
        console.log(`\nTotal products: ${total}`);

        await mongoose.disconnect();
        console.log("Done!");
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

updateBracelet();
