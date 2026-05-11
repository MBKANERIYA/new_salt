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

const IMG = "/assets/products/mangalsutra_gold.png";
const IMG2 = "/assets/products/necklace_diamond.png";
const IMG3 = "/assets/products/pendant_diamond.png";

const newProducts = [
    // BRACELET - 2 products
    {
        id: "MNG-BRC-001", title: "Gold Mangalsutra Bracelet", gender: "Female",
        category: "Mangalsutra", subCategory: "BRACELET",
        price14KT: 18000, price18KT: 21600,
        image01: IMG, image02: IMG2, image03: "", video: "",
        diamondprice: 3000, makingCharge14KT: 2500, makingCharge18KT: 3000,
        grossWt: 3.2, netWeight14KT: 2.8, netWeight18KT: 3.0,
        gst14KT: 540, gst18KT: 648, total14KT: 18540, total18KT: 22248, discount: 10,
    },
    {
        id: "MNG-BRC-002", title: "Diamond Mangalsutra Bracelet", gender: "Female",
        category: "Mangalsutra", subCategory: "BRACELET",
        price14KT: 28000, price18KT: 33600,
        image01: IMG, image02: IMG3, image03: "", video: "",
        diamondprice: 7000, makingCharge14KT: 3500, makingCharge18KT: 4200,
        grossWt: 3.8, netWeight14KT: 3.2, netWeight18KT: 3.5,
        gst14KT: 840, gst18KT: 1008, total14KT: 28840, total18KT: 34608, discount: 8,
    },

    // HAND - 2 products
    {
        id: "MNG-HND-001", title: "Classic Hand Mangalsutra", gender: "Female",
        category: "Mangalsutra", subCategory: "HAND",
        price14KT: 15000, price18KT: 18000,
        image01: IMG, image02: IMG2, image03: "", video: "",
        diamondprice: 2000, makingCharge14KT: 2200, makingCharge18KT: 2600,
        grossWt: 2.8, netWeight14KT: 2.3, netWeight18KT: 2.6,
        gst14KT: 450, gst18KT: 540, total14KT: 15450, total18KT: 18540, discount: 12,
    },
    {
        id: "MNG-HND-002", title: "Diamond Hand Mangalsutra", gender: "Female",
        category: "Mangalsutra", subCategory: "HAND",
        price14KT: 22000, price18KT: 26400,
        image01: IMG, image02: IMG3, image03: "", video: "",
        diamondprice: 4500, makingCharge14KT: 3000, makingCharge18KT: 3600,
        grossWt: 3.2, netWeight14KT: 2.8, netWeight18KT: 3.0,
        gst14KT: 660, gst18KT: 792, total14KT: 22660, total18KT: 27192, discount: 5,
    },

    // FANCY - 2 products
    {
        id: "MNG-FNC-001", title: "Designer Fancy Mangalsutra", gender: "Female",
        category: "Mangalsutra", subCategory: "FANCY",
        price14KT: 32000, price18KT: 38400,
        image01: IMG, image02: IMG2, image03: "", video: "",
        diamondprice: 8000, makingCharge14KT: 4000, makingCharge18KT: 4800,
        grossWt: 4.0, netWeight14KT: 3.5, netWeight18KT: 3.8,
        gst14KT: 960, gst18KT: 1152, total14KT: 32960, total18KT: 39552, discount: 10,
    },
    {
        id: "MNG-FNC-002", title: "Pearl Fancy Mangalsutra", gender: "Female",
        category: "Mangalsutra", subCategory: "FANCY",
        price14KT: 25000, price18KT: 30000,
        image01: IMG, image02: IMG3, image03: "", video: "",
        diamondprice: 5000, makingCharge14KT: 3200, makingCharge18KT: 3800,
        grossWt: 3.5, netWeight14KT: 3.0, netWeight18KT: 3.3,
        gst14KT: 750, gst18KT: 900, total14KT: 25750, total18KT: 30900, discount: 8,
    },
];

async function updateMangalsutra() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const Upload = mongoose.model("Upload", UploadSchema, "uploads");

        // Delete old Mangalsutra products with DAILY WEAR and OFFICE WEAR subcategories
        const deleted = await Upload.deleteMany({
            category: "Mangalsutra",
            subCategory: { $in: ["DAILY WEAR", "OFFICE WEAR"] }
        });
        console.log(`Deleted ${deleted.deletedCount} old Mangalsutra products (Daily Wear, Office Wear)`);

        // Insert new products
        const result = await Upload.insertMany(newProducts);
        console.log(`Inserted ${result.length} new Mangalsutra products`);

        // Show Mangalsutra breakdown
        const counts = await Upload.aggregate([
            { $match: { category: "Mangalsutra" } },
            { $group: { _id: "$subCategory", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        console.log("\nMangalsutra subcategory breakdown:");
        counts.forEach(c => console.log(`  ${c._id}: ${c.count} products`));

        const total = await Upload.countDocuments();
        console.log(`\nTotal products in DB: ${total}`);

        await mongoose.disconnect();
        console.log("Done!");
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

updateMangalsutra();
