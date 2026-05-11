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

const IMG = {
    earring_stud: "/assets/products/earring_stud.png",
    earring_jhumka: "/assets/products/earring_jhumka.png",
    earring_drop: "/assets/products/earring_drop.png",
};

const newProducts = [
    // HOOP - 2 products
    {
        id: "EAR-HOP-001", title: "Gold Hoop Earrings", gender: "Female",
        category: "Earring", subCategory: "HOOP",
        price14KT: 15000, price18KT: 18000,
        image01: IMG.earring_drop, image02: IMG.earring_stud, image03: "", video: "",
        diamondprice: 2000, makingCharge14KT: 2200, makingCharge18KT: 2600,
        grossWt: 3.0, netWeight14KT: 2.5, netWeight18KT: 2.8,
        gst14KT: 450, gst18KT: 540, total14KT: 15450, total18KT: 18540, discount: 10,
    },
    {
        id: "EAR-HOP-002", title: "Diamond Hoop Earrings", gender: "Female",
        category: "Earring", subCategory: "HOOP",
        price14KT: 28000, price18KT: 33600,
        image01: IMG.earring_drop, image02: IMG.earring_jhumka, image03: "", video: "",
        diamondprice: 8000, makingCharge14KT: 3500, makingCharge18KT: 4200,
        grossWt: 3.5, netWeight14KT: 3.0, netWeight18KT: 3.3,
        gst14KT: 840, gst18KT: 1008, total14KT: 28840, total18KT: 34608, discount: 5,
    },

    // SUI DHAGA - 2 products
    {
        id: "EAR-SDH-001", title: "Classic Sui Dhaga Earrings", gender: "Female",
        category: "Earring", subCategory: "SUI DHAGA",
        price14KT: 16000, price18KT: 19200,
        image01: IMG.earring_stud, image02: IMG.earring_drop, image03: "", video: "",
        diamondprice: 2500, makingCharge14KT: 2200, makingCharge18KT: 2600,
        grossWt: 2.8, netWeight14KT: 2.3, netWeight18KT: 2.6,
        gst14KT: 480, gst18KT: 576, total14KT: 16480, total18KT: 19776, discount: 12,
    },
    {
        id: "EAR-SDH-002", title: "Diamond Sui Dhaga Earrings", gender: "Female",
        category: "Earring", subCategory: "SUI DHAGA",
        price14KT: 24000, price18KT: 28800,
        image01: IMG.earring_stud, image02: IMG.earring_jhumka, image03: "", video: "",
        diamondprice: 5500, makingCharge14KT: 3200, makingCharge18KT: 3800,
        grossWt: 3.2, netWeight14KT: 2.8, netWeight18KT: 3.0,
        gst14KT: 720, gst18KT: 864, total14KT: 24720, total18KT: 29664, discount: 8,
    },

    // MEN STUD - 2 products
    {
        id: "EAR-MNS-001", title: "Men Gold Stud Earrings", gender: "Male",
        category: "Earring", subCategory: "MEN STUD",
        price14KT: 8000, price18KT: 9600,
        image01: IMG.earring_stud, image02: IMG.earring_drop, image03: "", video: "",
        diamondprice: 1000, makingCharge14KT: 1200, makingCharge18KT: 1500,
        grossWt: 1.5, netWeight14KT: 1.2, netWeight18KT: 1.4,
        gst14KT: 240, gst18KT: 288, total14KT: 8240, total18KT: 9888, discount: 10,
    },
    {
        id: "EAR-MNS-002", title: "Men Diamond Stud Earrings", gender: "Male",
        category: "Earring", subCategory: "MEN STUD",
        price14KT: 14000, price18KT: 16800,
        image01: IMG.earring_stud, image02: IMG.earring_jhumka, image03: "", video: "",
        diamondprice: 3000, makingCharge14KT: 1800, makingCharge18KT: 2200,
        grossWt: 1.8, netWeight14KT: 1.5, netWeight18KT: 1.7,
        gst14KT: 420, gst18KT: 504, total14KT: 14420, total18KT: 17304, discount: 5,
    },
];

async function addEarringProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const Upload = mongoose.model("Upload", UploadSchema, "uploads");

        const result = await Upload.insertMany(newProducts);
        console.log(`Inserted ${result.length} new earring products`);

        // Show earring breakdown
        const earCounts = await Upload.aggregate([
            { $match: { category: "Earring" } },
            { $group: { _id: "$subCategory", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        console.log("\nEarring subcategory breakdown:");
        earCounts.forEach(c => console.log(`  ${c._id}: ${c.count} products`));

        const total = await Upload.countDocuments();
        console.log(`\nTotal products in DB: ${total}`);

        await mongoose.disconnect();
        console.log("Done!");
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

addEarringProducts();
