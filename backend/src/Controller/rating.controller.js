const Rating = require("../Model/rating.model");
const { Uplod } = require("../Model");
const { isValidObjectId } = require("mongoose");

// Helper: find product by MongoDB _id or custom string 'id' field
const findProduct = async (productId) => {
  if (isValidObjectId(productId)) {
    const product = await Uplod.findById(productId);
    if (product) return product;
  }
  // Fallback: search by custom 'id' field
  return await Uplod.findOne({ id: productId });
};

// Helper: get the MongoDB _id for a given productId param
const resolveProductId = async (productId) => {
  if (isValidObjectId(productId)) {
    const product = await Uplod.findById(productId);
    if (product) return product._id;
  }
  // Fallback: search by custom 'id' field
  const product = await Uplod.findOne({ id: productId });
  return product ? product._id : null;
};

module.exports.addRating = async (req, res) => {
  try {
    const { productId, userId, rating, userRating, review, userReview, userName } = req.body;
    const actualRating = parseInt(rating || userRating);
    const actualReview = review || userReview || "";

    if (!productId) {
      return res.status(400).json({ status: false, message: "Product ID is required" });
    }

    if (!userId) {
      return res.status(400).json({ status: false, message: "User ID is required" });
    }

    if (!actualRating || actualRating < 1 || actualRating > 5) {
      return res.status(400).json({ status: false, message: "Rating must be between 1 and 5" });
    }

    // Resolve productId to MongoDB _id
    const mongoId = await resolveProductId(productId);
    if (!mongoId) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    // Check if user already rated this product
    const existingRating = await Rating.findOne({ productId: mongoId, userId });
    if (existingRating) {
      return res.status(400).json({ status: false, message: "You have already rated this product. Use update instead." });
    }

    const newRating = await Rating.create({
      productId: mongoId,
      userId,
      rating: actualRating,
      review: actualReview,
      userName: userName || "Anonymous",
    });

    return res.status(201).json({
      status: true,
      message: "Rating added successfully",
      rating: newRating,
    });
  } catch (err) {
    console.error("Error in addRating:", err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports.getRating = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ status: false, message: "Product ID is required" });
    }

    // Resolve productId to MongoDB _id
    const mongoId = await resolveProductId(productId);
    if (!mongoId) {
      // No product found — return empty ratings instead of error
      return res.status(200).json({
        status: true,
        message: "No ratings found",
        ratings: [],
        approvedRating: [],
        averageRating: 0,
        totalRatings: 0,
      });
    }

    const ratings = await Rating.find({ productId: mongoId }).sort({ createdAt: -1 });

    // Calculate average rating
    const totalRatings = ratings.length;
    const averageRating =
      totalRatings > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        : 0;

    // Format ratings to match frontend expected structure
    const approvedRating = ratings.map((r) => ({
      _id: r._id,
      productId: r.productId,
      userId: { _id: r.userId, firstName: r.userName || "User", lastName: "" },
      userRating: r.rating,
      userReview: r.review,
      userName: r.userName,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));

    return res.status(200).json({
      status: true,
      message: "Ratings fetched successfully",
      ratings,
      approvedRating,
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings,
    });
  } catch (err) {
    console.error("Error in getRating:", err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports.updateRating = async (req, res) => {
  try {
    const { productId, userId, rating, userRating, review, userReview, userName } = req.body;
    const actualRating = parseInt(rating || userRating);
    const actualReview = review !== undefined ? review : (userReview !== undefined ? userReview : undefined);

    if (!productId) {
      return res.status(400).json({ status: false, message: "Product ID is required" });
    }

    if (!userId) {
      return res.status(400).json({ status: false, message: "User ID is required" });
    }

    // Resolve productId to MongoDB _id
    const mongoId = await resolveProductId(productId);
    if (!mongoId) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    const existingRating = await Rating.findOne({ productId: mongoId, userId });
    if (!existingRating) {
      return res.status(404).json({ status: false, message: "Rating not found" });
    }

    if (actualRating) existingRating.rating = actualRating;
    if (actualReview !== undefined) existingRating.review = actualReview;
    if (userName) existingRating.userName = userName;

    await existingRating.save();

    return res.status(200).json({
      status: true,
      message: "Rating updated successfully",
      rating: existingRating,
    });
  } catch (err) {
    console.error("Error in updateRating:", err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports.deleteRating = async (req, res) => {
  try {
    const { productId, userId } = req.params;

    if (!productId) {
      return res.status(400).json({ status: false, message: "Product ID is required" });
    }

    // Resolve productId to MongoDB _id
    const mongoId = await resolveProductId(productId);
    if (!mongoId) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    const deleted = await Rating.findOneAndDelete({ productId: mongoId, userId });
    if (!deleted) {
      return res.status(404).json({ status: false, message: "Rating not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Rating deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleteRating:", err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

