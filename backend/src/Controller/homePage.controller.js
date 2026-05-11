const { Uplod, bannerSchema } = require("../Model");
const { banner_Services } = require("../Services");

module.exports.getHomePage = async (req, res) => {
  try {
    // Fetch banners
    let banners = [];
    try {
      banners = await banner_Services.getBanner();
      banners = banners.map((val) => {
        const { _id, ...body } = val.toObject();
        return { banner_id: _id, ...body };
      });
    } catch (e) {
      console.log("No banners found:", e.message);
    }

    // Fetch media (banners for carousel)
    const media = banners || [];

    // Fetch all products
    const allProducts = await Uplod.find().lean();

    // New arrivals (latest 10 products)
    const newArrivals = allProducts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map((product) => {
        const { _id, ...body } = product;
        return { product_id: _id, ...body };
      });

    // Solitaire products
    const solitire = allProducts
      .filter(
        (p) =>
          p.category &&
          p.category.toLowerCase().includes("solitaire")
      )
      .slice(0, 10)
      .map((product) => {
        const { _id, ...body } = product;
        return { product_id: _id, ...body };
      });

    // Get distinct categories
    const categoryNames = await Uplod.distinct("category");
    const categoryImage = [];
    for (const cat of categoryNames) {
      const sample = await Uplod.findOne({ category: cat }).lean();
      if (sample) {
        categoryImage.push({
          categoryName: cat,
          categoryImage: sample.image01 || "",
        });
      }
    }

    // Filter categories for navigation
    const filterCategory = categoryNames.map((cat) => ({
      name: cat,
      link: `/products/${cat.replace(/ /g, "-")}`,
    }));

    // Bottom banners (reuse banners or empty)
    const bottomBanner = banners.length > 1 ? banners.slice(0, 2) : [];

    // Gifts section (reuse some products)
    const gifts = allProducts.slice(0, 3).map((product) => {
      const { _id, ...body } = product;
      return { product_id: _id, ...body };
    });

    return res.status(200).json({
      message: "Home page data fetched successfully",
      media,
      banners: media,
      bottomBanner,
      gifts,
      categoryImage,
      filterCategory,
      newArrivals,
      solitire,
    });
  } catch (err) {
    console.error("Error fetching home page data:", err);
    return res
      .status(500)
      .json({ message: "Error fetching home page data", error: err.message });
  }
};
