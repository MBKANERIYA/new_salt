const mongoose = require("mongoose");
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

// Product images available at /assets/products/
const IMG = {
    ring_engagement: "/assets/products/ring_engagement.png",
    ring_cocktail: "/assets/products/ring_cocktail.png",
    ring_solitaire: "/assets/products/ring_solitaire.png",
    ring_band: "/assets/products/ring_band.png",
    earring_stud: "/assets/products/earring_stud.png",
    earring_jhumka: "/assets/products/earring_jhumka.png",
    earring_drop: "/assets/products/earring_drop.png",
    bracelet_chain: "/assets/products/bracelet_chain.png",
    bracelet_oval: "/assets/products/bracelet_oval.png",
    pendant_diamond: "/assets/products/pendant_diamond.png",
    necklace_diamond: "/assets/products/necklace_diamond.png",
    mangalsutra_gold: "/assets/products/mangalsutra_gold.png",
};

// Helper to build a product object
function p(id, title, category, subCategory, gender, price14, price18, img1, img2, img3, diamond, mk14, mk18, gw, nw14, nw18, gst14, gst18, total14, total18, discount) {
    return {
        id, title, gender, category, subCategory,
        price14KT: price14, price18KT: price18,
        image01: img1, image02: img2 || "", image03: img3 || "", video: "",
        diamondprice: diamond,
        makingCharge14KT: mk14, makingCharge18KT: mk18,
        grossWt: gw, netWeight14KT: nw14, netWeight18KT: nw18,
        gst14KT: gst14, gst18KT: gst18,
        total14KT: total14, total18KT: total18,
        discount,
    };
}

const products = [
    // ===== RING (10 subcategories × 2 = 20 products) =====
    // ENGAGEMENT
    p("RNG-ENG-001", "Classic Solitaire Engagement Ring", "Ring", "ENGAGEMENT", "Female", 35000, 42000, IMG.ring_engagement, IMG.ring_solitaire, "", 8000, 4200, 5000, 3.8, 3.2, 3.5, 1050, 1260, 36050, 43260, 10),
    p("RNG-ENG-002", "Halo Diamond Engagement Ring", "Ring", "ENGAGEMENT", "Female", 52000, 62400, IMG.ring_engagement, IMG.ring_cocktail, "", 15000, 5200, 6200, 4.5, 3.8, 4.2, 1560, 1872, 53560, 64272, 5),

    // COCKTAIL
    p("RNG-CKT-001", "Rose Gold Cocktail Ring", "Ring", "COCKTAIL", "Female", 28000, 33600, IMG.ring_cocktail, IMG.ring_engagement, "", 6000, 3500, 4200, 3.5, 3.0, 3.3, 840, 1008, 28840, 34608, 8),
    p("RNG-CKT-002", "Emerald Cocktail Statement Ring", "Ring", "COCKTAIL", "Female", 45000, 54000, IMG.ring_cocktail, IMG.ring_solitaire, "", 12000, 4800, 5700, 4.2, 3.6, 4.0, 1350, 1620, 46350, 55620, 12),

    // COUPLE
    p("RNG-CPL-001", "Platinum Couple Band Set", "Ring", "COUPLE", "Female", 22000, 26400, IMG.ring_band, IMG.ring_engagement, "", 3000, 3200, 3800, 3.2, 2.8, 3.0, 660, 792, 22660, 27192, 5),
    p("RNG-CPL-002", "Diamond Couple Promise Ring", "Ring", "COUPLE", "Male", 25000, 30000, IMG.ring_band, IMG.ring_solitaire, "", 5000, 3500, 4200, 3.5, 3.0, 3.3, 750, 900, 25750, 30900, 10),

    // DAILY WEAR
    p("RNG-DLY-001", "Minimalist Daily Wear Ring", "Ring", "DAILY WEAR", "Female", 12000, 14400, IMG.ring_engagement, IMG.ring_band, "", 2000, 1800, 2200, 2.5, 2.0, 2.3, 360, 432, 12360, 14832, 15),
    p("RNG-DLY-002", "Delicate Everyday Gold Ring", "Ring", "DAILY WEAR", "Female", 15000, 18000, IMG.ring_band, IMG.ring_engagement, "", 2500, 2200, 2600, 2.8, 2.3, 2.6, 450, 540, 15450, 18540, 10),

    // OFFICE WEAR
    p("RNG-OFF-001", "Sleek Office Wear Gold Ring", "Ring", "OFFICE WEAR", "Female", 14000, 16800, IMG.ring_band, IMG.ring_cocktail, "", 2200, 2000, 2400, 2.6, 2.1, 2.4, 420, 504, 14420, 17304, 8),
    p("RNG-OFF-002", "Professional Diamond Ring", "Ring", "OFFICE WEAR", "Male", 18000, 21600, IMG.ring_engagement, IMG.ring_band, "", 3500, 2500, 3000, 3.0, 2.5, 2.8, 540, 648, 18540, 22248, 5),

    // PLATINUM
    p("RNG-PLT-001", "Platinum Classic Band", "Ring", "PLATINUM", "Male", 42000, 50400, IMG.ring_band, IMG.ring_solitaire, "", 5000, 5500, 6500, 5.0, 4.5, 4.8, 1260, 1512, 43260, 51912, 5),
    p("RNG-PLT-002", "Platinum Diamond Eternity Ring", "Ring", "PLATINUM", "Female", 65000, 78000, IMG.ring_solitaire, IMG.ring_band, "", 18000, 7000, 8500, 5.5, 4.8, 5.2, 1950, 2340, 66950, 80340, 8),

    // BAND
    p("RNG-BND-001", "Classic Gold Wedding Band", "Ring", "BAND", "Male", 18000, 21600, IMG.ring_band, IMG.ring_engagement, "", 0, 2800, 3400, 3.5, 3.2, 3.4, 540, 648, 18540, 22248, 10),
    p("RNG-BND-002", "Diamond Studded Band Ring", "Ring", "BAND", "Female", 24000, 28800, IMG.ring_band, IMG.ring_solitaire, "", 4500, 3200, 3800, 3.2, 2.8, 3.0, 720, 864, 24720, 29664, 5),

    // INFINITY
    p("RNG-INF-001", "Infinity Diamond Ring", "Ring", "INFINITY", "Female", 20000, 24000, IMG.ring_solitaire, IMG.ring_engagement, "", 4000, 2800, 3400, 2.8, 2.3, 2.6, 600, 720, 20600, 24720, 12),
    p("RNG-INF-002", "Rose Gold Infinity Band", "Ring", "INFINITY", "Female", 16000, 19200, IMG.ring_engagement, IMG.ring_band, "", 2500, 2200, 2600, 2.5, 2.0, 2.3, 480, 576, 16480, 19776, 8),

    // PROMISE
    p("RNG-PRM-001", "Heart Promise Ring", "Ring", "PROMISE", "Female", 12000, 14400, IMG.ring_engagement, IMG.ring_cocktail, "", 2000, 1800, 2200, 2.2, 1.8, 2.0, 360, 432, 12360, 14832, 15),
    p("RNG-PRM-002", "Diamond Promise Ring for Him", "Ring", "PROMISE", "Male", 15000, 18000, IMG.ring_band, IMG.ring_engagement, "", 3000, 2000, 2400, 2.8, 2.3, 2.6, 450, 540, 15450, 18540, 10),

    // SOLITAIRE
    p("RNG-SOL-001", "1 Carat Solitaire Diamond Ring", "Ring", "SOLITAIRE", "Female", 85000, 102000, IMG.ring_solitaire, IMG.ring_engagement, "", 45000, 8000, 9500, 3.5, 3.0, 3.3, 2550, 3060, 87550, 105060, 5),
    p("RNG-SOL-002", "Premium VVS Solitaire Ring", "Ring", "SOLITAIRE", "Female", 120000, 144000, IMG.ring_solitaire, IMG.ring_cocktail, "", 70000, 10000, 12000, 3.8, 3.2, 3.5, 3600, 4320, 123600, 148320, 3),

    // ===== EARRING (4 subcategories × 2 = 8 products) =====
    // STUD
    p("EAR-STD-001", "Diamond Stud Earrings", "Earring", "STUD", "Female", 18000, 21600, IMG.earring_stud, IMG.earring_drop, "", 5000, 2200, 2600, 2.5, 2.0, 2.3, 540, 648, 18540, 22248, 10),
    p("EAR-STD-002", "Solitaire Stud Earrings", "Earring", "STUD", "Female", 32000, 38400, IMG.earring_stud, IMG.earring_jhumka, "", 12000, 3500, 4200, 2.8, 2.3, 2.6, 960, 1152, 32960, 39552, 5),

    // JHUMKA
    p("EAR-JHM-001", "Traditional Gold Jhumka", "Earring", "JHUMKA", "Female", 25000, 30000, IMG.earring_jhumka, IMG.earring_drop, "", 3000, 3500, 4200, 4.5, 4.0, 4.3, 750, 900, 25750, 30900, 8),
    p("EAR-JHM-002", "Antique Pearl Jhumka Earrings", "Earring", "JHUMKA", "Female", 35000, 42000, IMG.earring_jhumka, IMG.earring_stud, "", 5000, 4500, 5400, 5.2, 4.6, 5.0, 1050, 1260, 36050, 43260, 12),

    // DROP
    p("EAR-DRP-001", "Elegant Drop Earrings", "Earring", "DROP", "Female", 22000, 26400, IMG.earring_drop, IMG.earring_stud, "", 4500, 3000, 3600, 3.5, 3.0, 3.3, 660, 792, 22660, 27192, 10),
    p("EAR-DRP-002", "Diamond Drop Chandelier Earrings", "Earring", "DROP", "Female", 45000, 54000, IMG.earring_drop, IMG.earring_jhumka, "", 15000, 5000, 6000, 4.0, 3.5, 3.8, 1350, 1620, 46350, 55620, 5),

    // OFFICE WEAR
    p("EAR-OFF-001", "Minimalist Office Wear Studs", "Earring", "OFFICE WEAR", "Female", 10000, 12000, IMG.earring_stud, IMG.earring_drop, "", 1500, 1500, 1800, 1.8, 1.5, 1.7, 300, 360, 10300, 12360, 15),
    p("EAR-OFF-002", "Pearl Office Wear Earrings", "Earring", "OFFICE WEAR", "Female", 14000, 16800, IMG.earring_drop, IMG.earring_stud, "", 2500, 2000, 2400, 2.2, 1.8, 2.0, 420, 504, 14420, 17304, 10),

    // ===== BRACELET (3 subcategories × 2 = 6 products) =====
    // CHAIN
    p("BRC-CHN-001", "Delicate Chain Bracelet", "Bracelet", "CHAIN", "Female", 16000, 19200, IMG.bracelet_chain, IMG.bracelet_oval, "", 2500, 2200, 2600, 3.0, 2.5, 2.8, 480, 576, 16480, 19776, 10),
    p("BRC-CHN-002", "Gold Chain Link Bracelet", "Bracelet", "CHAIN", "Female", 22000, 26400, IMG.bracelet_chain, IMG.bracelet_oval, "", 3500, 3000, 3600, 3.8, 3.2, 3.5, 660, 792, 22660, 27192, 8),

    // OVAL
    p("BRC-OVL-001", "Oval Diamond Tennis Bracelet", "Bracelet", "OVAL", "Female", 38000, 45600, IMG.bracelet_oval, IMG.bracelet_chain, "", 10000, 4500, 5400, 5.0, 4.5, 4.8, 1140, 1368, 39140, 46968, 5),
    p("BRC-OVL-002", "Classic Oval Gold Bracelet", "Bracelet", "OVAL", "Female", 28000, 33600, IMG.bracelet_oval, IMG.bracelet_chain, "", 5000, 3500, 4200, 4.2, 3.6, 4.0, 840, 1008, 28840, 34608, 10),

    // OFFICE WEAR
    p("BRC-OFF-001", "Sleek Office Bracelet", "Bracelet", "OFFICE WEAR", "Female", 14000, 16800, IMG.bracelet_chain, IMG.bracelet_oval, "", 2000, 2000, 2400, 2.8, 2.3, 2.6, 420, 504, 14420, 17304, 12),
    p("BRC-OFF-002", "Professional Diamond Bracelet", "Bracelet", "OFFICE WEAR", "Male", 20000, 24000, IMG.bracelet_oval, IMG.bracelet_chain, "", 4000, 2800, 3400, 3.5, 3.0, 3.3, 600, 720, 20600, 24720, 8),

    // ===== PENDANT (3 subcategories × 2 = 6 products) =====
    // SOLITAIRE
    p("PND-SOL-001", "Solitaire Diamond Pendant", "Pendant", "SOLITAIRE", "Female", 42000, 50400, IMG.pendant_diamond, IMG.necklace_diamond, "", 18000, 4500, 5400, 2.5, 2.0, 2.3, 1260, 1512, 43260, 51912, 5),
    p("PND-SOL-002", "Round Solitaire Gold Pendant", "Pendant", "SOLITAIRE", "Female", 55000, 66000, IMG.pendant_diamond, IMG.necklace_diamond, "", 25000, 5500, 6600, 2.8, 2.3, 2.6, 1650, 1980, 56650, 67980, 3),

    // DAILY WEAR
    p("PND-DLY-001", "Minimalist Daily Pendant", "Pendant", "DAILY WEAR", "Female", 12000, 14400, IMG.pendant_diamond, IMG.necklace_diamond, "", 2000, 1800, 2200, 1.8, 1.5, 1.7, 360, 432, 12360, 14832, 15),
    p("PND-DLY-002", "Heart Shaped Daily Pendant", "Pendant", "DAILY WEAR", "Female", 16000, 19200, IMG.pendant_diamond, IMG.necklace_diamond, "", 3000, 2200, 2600, 2.2, 1.8, 2.0, 480, 576, 16480, 19776, 10),

    // OFFICE WEAR
    p("PND-OFF-001", "Professional Diamond Pendant", "Pendant", "OFFICE WEAR", "Female", 15000, 18000, IMG.pendant_diamond, IMG.necklace_diamond, "", 3000, 2000, 2400, 2.0, 1.7, 1.9, 450, 540, 15450, 18540, 10),
    p("PND-OFF-002", "Sleek Office Gold Pendant", "Pendant", "OFFICE WEAR", "Male", 13000, 15600, IMG.pendant_diamond, IMG.necklace_diamond, "", 2000, 1800, 2200, 1.8, 1.5, 1.7, 390, 468, 13390, 16068, 8),

    // ===== NECKLACE (4 subcategories × 2 = 8 products) =====
    // SOLITAIRE
    p("NCK-SOL-001", "Solitaire Diamond Necklace", "Necklace", "SOLITAIRE", "Female", 75000, 90000, IMG.necklace_diamond, IMG.pendant_diamond, "", 35000, 7500, 9000, 4.5, 4.0, 4.3, 2250, 2700, 77250, 92700, 5),
    p("NCK-SOL-002", "VVS Solitaire Chain Necklace", "Necklace", "SOLITAIRE", "Female", 95000, 114000, IMG.necklace_diamond, IMG.pendant_diamond, "", 50000, 9000, 10800, 4.8, 4.2, 4.6, 2850, 3420, 97850, 117420, 3),

    // DAILY WEAR
    p("NCK-DLY-001", "Everyday Gold Chain Necklace", "Necklace", "DAILY WEAR", "Female", 18000, 21600, IMG.necklace_diamond, IMG.pendant_diamond, "", 2500, 2500, 3000, 3.5, 3.0, 3.3, 540, 648, 18540, 22248, 12),
    p("NCK-DLY-002", "Minimalist Daily Wear Necklace", "Necklace", "DAILY WEAR", "Female", 22000, 26400, IMG.necklace_diamond, IMG.pendant_diamond, "", 3500, 3000, 3600, 3.8, 3.2, 3.5, 660, 792, 22660, 27192, 10),

    // OFFICE WEAR
    p("NCK-OFF-001", "Professional Office Necklace", "Necklace", "OFFICE WEAR", "Female", 20000, 24000, IMG.necklace_diamond, IMG.pendant_diamond, "", 3500, 2800, 3400, 3.2, 2.8, 3.0, 600, 720, 20600, 24720, 8),
    p("NCK-OFF-002", "Sleek Diamond Office Necklace", "Necklace", "OFFICE WEAR", "Female", 28000, 33600, IMG.necklace_diamond, IMG.pendant_diamond, "", 6000, 3500, 4200, 3.5, 3.0, 3.3, 840, 1008, 28840, 34608, 5),

    // PARTY WEAR
    p("NCK-PTY-001", "Statement Party Necklace", "Necklace", "PARTY WEAR", "Female", 55000, 66000, IMG.necklace_diamond, IMG.pendant_diamond, "", 18000, 6000, 7200, 5.5, 5.0, 5.3, 1650, 1980, 56650, 67980, 10),
    p("NCK-PTY-002", "Diamond Party Wear Choker", "Necklace", "PARTY WEAR", "Female", 72000, 86400, IMG.necklace_diamond, IMG.pendant_diamond, "", 28000, 7500, 9000, 6.0, 5.5, 5.8, 2160, 2592, 74160, 88992, 5),

    // ===== MANGALSUTRA (3 subcategories × 2 = 6 products) =====
    // MODERN
    p("MNG-MOD-001", "Modern Diamond Mangalsutra", "Mangalsutra", "MODERN", "Female", 28000, 33600, IMG.mangalsutra_gold, IMG.necklace_diamond, "", 6000, 3500, 4200, 3.8, 3.2, 3.5, 840, 1008, 28840, 34608, 10),
    p("MNG-MOD-002", "Contemporary Gold Mangalsutra", "Mangalsutra", "MODERN", "Female", 35000, 42000, IMG.mangalsutra_gold, IMG.pendant_diamond, "", 8000, 4200, 5000, 4.2, 3.6, 4.0, 1050, 1260, 36050, 43260, 8),

    // TRADITIONAL
    p("MNG-TRD-001", "Traditional Black Bead Mangalsutra", "Mangalsutra", "TRADITIONAL", "Female", 22000, 26400, IMG.mangalsutra_gold, IMG.necklace_diamond, "", 3500, 3000, 3600, 4.5, 4.0, 4.3, 660, 792, 22660, 27192, 12),
    p("MNG-TRD-002", "Classic Gold Mangalsutra", "Mangalsutra", "TRADITIONAL", "Female", 30000, 36000, IMG.mangalsutra_gold, IMG.pendant_diamond, "", 5000, 3800, 4500, 5.0, 4.5, 4.8, 900, 1080, 30900, 37080, 5),

    // DAILY WEAR
    p("MNG-DLY-001", "Lightweight Daily Mangalsutra", "Mangalsutra", "DAILY WEAR", "Female", 15000, 18000, IMG.mangalsutra_gold, IMG.necklace_diamond, "", 2000, 2200, 2600, 3.0, 2.5, 2.8, 450, 540, 15450, 18540, 15),
    p("MNG-DLY-002", "Short Daily Wear Mangalsutra", "Mangalsutra", "DAILY WEAR", "Female", 18000, 21600, IMG.mangalsutra_gold, IMG.pendant_diamond, "", 3000, 2500, 3000, 3.2, 2.8, 3.0, 540, 648, 18540, 22248, 10),
];

async function resetProducts() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");

        const Upload = mongoose.model("Upload", UploadSchema, "uploads");

        // 1. Delete all existing products
        const deleted = await Upload.deleteMany({});
        console.log(`Deleted ${deleted.deletedCount} existing products`);

        // 2. Insert new products
        const result = await Upload.insertMany(products);
        console.log(`Inserted ${result.length} new products`);

        // 3. Summary
        const categories = await Upload.aggregate([
            { $group: { _id: { category: "$category", subCategory: "$subCategory" }, count: { $sum: 1 } } },
            { $sort: { "_id.category": 1, "_id.subCategory": 1 } }
        ]);
        console.log("\nProduct breakdown:");
        categories.forEach(c => {
            console.log(`  ${c._id.category} → ${c._id.subCategory}: ${c.count} products`);
        });

        await mongoose.disconnect();
        console.log("\nDone!");
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
}

resetProducts();
