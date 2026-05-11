const { Uplod } = require("../Model")

module.exports.filterProducts = async (req, res) => {
    try {
        const { title, priceLimit, sortBy, priceOrder, discountLimit, typeBy, shopFor, occasionBy } = req.body

        if (!title && !priceLimit && !sortBy && !priceOrder && !discountLimit && !typeBy && !shopFor && !occasionBy) {
            return res.status(404).json({
                message: "At least one filter parameter required"
            })
        }

        let filterProduct = {};

        // Category filter — handle both string and array
        if (title) {
            if (Array.isArray(title) && title.length > 0) {
                filterProduct.category = { $in: title };
            } else if (typeof title === "string" && title.length > 0) {
                filterProduct.category = title;
            }
        }

        // SubCategory/Occasion filter — handle both string and array
        if (occasionBy) {
            if (Array.isArray(occasionBy) && occasionBy.length > 0) {
                filterProduct.subCategory = { $in: occasionBy };
            } else if (typeof occasionBy === "string" && occasionBy.length > 0) {
                filterProduct.subCategory = occasionBy;
            }
        }

        // Gender filter — handle both string and array
        if (typeBy) {
            if (Array.isArray(typeBy) && typeBy.length > 0) {
                const genderMap = { male: "Male", female: "Female" };
                const genders = typeBy.map(t => genderMap[t]).filter(Boolean);
                if (genders.length > 0) filterProduct.gender = { $in: genders };
            } else if (typeof typeBy === "string") {
                if (typeBy === "male") filterProduct.gender = "Male";
                else if (typeBy === "female") filterProduct.gender = "Female";
            }
        }

        // Build sort options
        let sortOptions = {};
        if (sortBy === "newestFirst") {
            sortOptions.createdAt = -1;
        }
        if (priceOrder === "lowToHigh") {
            sortOptions.total14KT = 1;
        } else if (priceOrder === "highToLow") {
            sortOptions.total14KT = -1;
        }

        // Build price range filter — handle both string and array
        if (priceLimit) {
            const priceLimits = Array.isArray(priceLimit) ? priceLimit : [priceLimit];
            const priceConditions = [];

            priceLimits.forEach(limit => {
                if (limit === "below10k") priceConditions.push({ total14KT: { $lt: 10000 } });
                else if (limit === "10kTo20k") priceConditions.push({ total14KT: { $gte: 10000, $lte: 20000 } });
                else if (limit === "below20k") priceConditions.push({ total14KT: { $lt: 20000 } });
                else if (limit === "20kTo30k") priceConditions.push({ total14KT: { $gte: 20000, $lte: 30000 } });
                else if (limit === "30kTo50k") priceConditions.push({ total14KT: { $gte: 30000, $lte: 50000 } });
                else if (limit === "below50k") priceConditions.push({ total14KT: { $lt: 50000 } });
                else if (limit === "50kTo75k") priceConditions.push({ total14KT: { $gte: 50000, $lte: 75000 } });
                else if (limit === "50kTo100k") priceConditions.push({ total14KT: { $gte: 50000, $lte: 100000 } });
                else if (limit === "above75k") priceConditions.push({ total14KT: { $gt: 75000 } });
                else if (limit === "100kTo200k") priceConditions.push({ total14KT: { $gte: 100000, $lte: 200000 } });
                else if (limit === "200kTo300k") priceConditions.push({ total14KT: { $gte: 200000, $lte: 300000 } });
                else if (limit === "300kTo500k") priceConditions.push({ total14KT: { $gte: 300000, $lte: 500000 } });
                else if (limit === "above500k") priceConditions.push({ total14KT: { $gt: 500000 } });
            });

            if (priceConditions.length === 1) {
                filterProduct.total14KT = priceConditions[0].total14KT;
            } else if (priceConditions.length > 1) {
                filterProduct.$or = priceConditions;
            }
        }

        let query = Uplod.find(filterProduct);
        if (Object.keys(sortOptions).length > 0) {
            query = query.sort(sortOptions);
        }
        let products = await query.lean();

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found matching the filters"
            });
        }

        const updatedProducts = products.map(product => {
            const { _id, ...body } = product;
            return { product_id: _id, ...body };
        });

        res.status(200).json({
            message: "get filterProduct successfully",
            updatedProducts
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}
