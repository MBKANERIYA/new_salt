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

const RING_IMG = "/assets/products/ring_engagement.png";
const RING_IMG2 = "/assets/products/ring_solitaire.png";
const RING_IMG3 = "/assets/products/ring_cocktail.png";
const RING_IMG4 = "/assets/products/ring_band.png";

const PENDANT_IMG = "/assets/products/pendant_diamond.png";
const NECKLACE_IMG = "/assets/products/necklace_diamond.png";

const newProducts = [
    // ===== RING: Add PARTY WEAR (header shows "Party wear") =====
    {
        id: "RNG-PTY-001", title: "Gold Party Wear Ring", gender: "Female",
        category: "Ring", subCategory: "PARTY WEAR",
        price14KT: 32000, price18KT: 38400,
        image01: RING_IMG3, image02: RING_IMG, image03: "", video: "",
        diamondprice: 8000, makingCharge14KT: 4000, makingCharge18KT: 4800,
        grossWt: 3.8, netWeight14KT: 3.2, netWeight18KT: 3.5,
        gst14KT: 960, gst18KT: 1152, total14KT: 32960, total18KT: 39552, discount: 10,
    },
    {
        id: "RNG-PTY-002", title: "Diamond Party Statement Ring", gender: "Female",
        category: "Ring", subCategory: "PARTY WEAR",
        price14KT: 48000, price18KT: 57600,
        image01: RING_IMG3, image02: RING_IMG2, image03: "", video: "",
        diamondprice: 15000, makingCharge14KT: 5500, makingCharge18KT: 6600,
        grossWt: 4.2, netWeight14KT: 3.6, netWeight18KT: 4.0,
        gst14KT: 1440, gst18KT: 1728, total14KT: 49440, total18KT: 59328, discount: 5,
    },

    // ===== PENDANT: New styles matching header =====
    // PENDENT SET
    {
        id: "PND-SET-001", title: "Classic Pendant Set", gender: "Female",
        category: "Pendant", subCategory: "PENDENT SET",
        price14KT: 35000, price18KT: 42000,
        image01: PENDANT_IMG, image02: NECKLACE_IMG, image03: "", video: "",
        diamondprice: 8000, makingCharge14KT: 4200, makingCharge18KT: 5000,
        grossWt: 4.5, netWeight14KT: 4.0, netWeight18KT: 4.3,
        gst14KT: 1050, gst18KT: 1260, total14KT: 36050, total18KT: 43260, discount: 10,
    },
    {
        id: "PND-SET-002", title: "Diamond Pendant Set", gender: "Female",
        category: "Pendant", subCategory: "PENDENT SET",
        price14KT: 55000, price18KT: 66000,
        image01: PENDANT_IMG, image02: NECKLACE_IMG, image03: "", video: "",
        diamondprice: 20000, makingCharge14KT: 6000, makingCharge18KT: 7200,
        grossWt: 5.0, netWeight14KT: 4.5, netWeight18KT: 4.8,
        gst14KT: 1650, gst18KT: 1980, total14KT: 56650, total18KT: 67980, discount: 5,
    },

    // HEART
    {
        id: "PND-HRT-001", title: "Gold Heart Pendant", gender: "Female",
        category: "Pendant", subCategory: "HEART",
        price14KT: 18000, price18KT: 21600,
        image01: PENDANT_IMG, image02: NECKLACE_IMG, image03: "", video: "",
        diamondprice: 3000, makingCharge14KT: 2500, makingCharge18KT: 3000,
        grossWt: 2.5, netWeight14KT: 2.0, netWeight18KT: 2.3,
        gst14KT: 540, gst18KT: 648, total14KT: 18540, total18KT: 22248, discount: 12,
    },
    {
        id: "PND-HRT-002", title: "Diamond Heart Pendant", gender: "Female",
        category: "Pendant", subCategory: "HEART",
        price14KT: 28000, price18KT: 33600,
        image01: PENDANT_IMG, image02: NECKLACE_IMG, image03: "", video: "",
        diamondprice: 7000, makingCharge14KT: 3500, makingCharge18KT: 4200,
        grossWt: 2.8, netWeight14KT: 2.3, netWeight18KT: 2.6,
        gst14KT: 840, gst18KT: 1008, total14KT: 28840, total18KT: 34608, discount: 8,
    },

    // ALPHABET
    {
        id: "PND-ALP-001", title: "Gold Alphabet Initial Pendant", gender: "Female",
        category: "Pendant", subCategory: "ALPHABET",
        price14KT: 12000, price18KT: 14400,
        image01: PENDANT_IMG, image02: NECKLACE_IMG, image03: "", video: "",
        diamondprice: 1500, makingCharge14KT: 1800, makingCharge18KT: 2200,
        grossWt: 1.8, netWeight14KT: 1.5, netWeight18KT: 1.7,
        gst14KT: 360, gst18KT: 432, total14KT: 12360, total18KT: 14832, discount: 15,
    },
    {
        id: "PND-ALP-002", title: "Diamond Alphabet Pendant", gender: "Female",
        category: "Pendant", subCategory: "ALPHABET",
        price14KT: 16000, price18KT: 19200,
        image01: PENDANT_IMG, image02: NECKLACE_IMG, image03: "", video: "",
        diamondprice: 3000, makingCharge14KT: 2200, makingCharge18KT: 2600,
        grossWt: 2.0, netWeight14KT: 1.7, netWeight18KT: 1.9,
        gst14KT: 480, gst18KT: 576, total14KT: 16480, total18KT: 19776, discount: 10,
    },

    // ===== NECKLACE: New styles matching header =====
    // LIGHTWEIGHT
    {
        id: "NCK-LWT-001", title: "Lightweight Gold Necklace", gender: "Female",
        category: "Necklace", subCategory: "LIGHTWEIGHT",
        price14KT: 22000, price18KT: 26400,
        image01: NECKLACE_IMG, image02: PENDANT_IMG, image03: "", video: "",
        diamondprice: 3500, makingCharge14KT: 3000, makingCharge18KT: 3600,
        grossWt: 3.2, netWeight14KT: 2.8, netWeight18KT: 3.0,
        gst14KT: 660, gst18KT: 792, total14KT: 22660, total18KT: 27192, discount: 10,
    },
    {
        id: "NCK-LWT-002", title: "Diamond Lightweight Chain Necklace", gender: "Female",
        category: "Necklace", subCategory: "LIGHTWEIGHT",
        price14KT: 30000, price18KT: 36000,
        image01: NECKLACE_IMG, image02: PENDANT_IMG, image03: "", video: "",
        diamondprice: 6000, makingCharge14KT: 3800, makingCharge18KT: 4500,
        grossWt: 3.5, netWeight14KT: 3.0, netWeight18KT: 3.3,
        gst14KT: 900, gst18KT: 1080, total14KT: 30900, total18KT: 37080, discount: 8,
    },

    // EVIL EYE
    {
        id: "NCK-EVL-001", title: "Evil Eye Gold Necklace", gender: "Female",
        category: "Necklace", subCategory: "EVIL EYE",
        price14KT: 18000, price18KT: 21600,
        image01: NECKLACE_IMG, image02: PENDANT_IMG, image03: "", video: "",
        diamondprice: 3000, makingCharge14KT: 2500, makingCharge18KT: 3000,
        grossWt: 2.8, netWeight14KT: 2.3, netWeight18KT: 2.6,
        gst14KT: 540, gst18KT: 648, total14KT: 18540, total18KT: 22248, discount: 12,
    },
    {
        id: "NCK-EVL-002", title: "Diamond Evil Eye Charm Necklace", gender: "Female",
        category: "Necklace", subCategory: "EVIL EYE",
        price14KT: 25000, price18KT: 30000,
        image01: NECKLACE_IMG, image02: PENDANT_IMG, image03: "", video: "",
        diamondprice: 5500, makingCharge14KT: 3200, makingCharge18KT: 3800,
        grossWt: 3.0, netWeight14KT: 2.5, netWeight18KT: 2.8,
        gst14KT: 750, gst18KT: 900, total14KT: 25750, total18KT: 30900, discount: 5,
    },
];

async function updateAllCategories() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const Upload = mongoose.model("Upload", UploadSchema, "uploads");

        // 1. Ring: Delete old COCKTAIL, add PARTY WEAR
        const delCocktail = await Upload.deleteMany({ category: "Ring", subCategory: "COCKTAIL" });
        console.log(`Deleted ${delCocktail.deletedCount} Ring COCKTAIL products`);

        // 2. Pendant: Delete ALL old pendant products
        const delPendant = await Upload.deleteMany({ category: "Pendant" });
        console.log(`Deleted ${delPendant.deletedCount} old Pendant products`);

        // 3. Necklace: Delete ALL old necklace products
        const delNecklace = await Upload.deleteMany({ category: "Necklace" });
        console.log(`Deleted ${delNecklace.deletedCount} old Necklace products`);

        // 4. Insert all new products
        const result = await Upload.insertMany(newProducts);
        console.log(`\nInserted ${result.length} new products`);

        // 5. Summary
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

updateAllCategories();
