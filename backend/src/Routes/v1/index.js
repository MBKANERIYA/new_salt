const express = require("express");

const adminRoutes = require("./admin_routes");
const cartsRoutes = require('./cart');
const wishlistRoute = require("./wishlistRoutes");
const productRoutes = require('./Product');
const uploadRoutes = require('./upload_routes');
const bannerRoute = require("./banner.routes");
const getCategoryRoute = require("./categoryData.routes");
const otpRoute = require("./otp.routes");
const ratingRoute = require("./rating.routes");
const homePageRoute = require("./homePage.routes");
const mergeRoute = require("./merge.routes");
const addressRoute = require("./address.routes");
const orderRoute = require("./order.routes");

const router = express();

router.use("/admin", adminRoutes);
router.use('/cart', cartsRoutes);
router.use("/banner", bannerRoute);
router.use("/wishlist", wishlistRoute);
router.use('/product', productRoutes);
router.use('/upload', uploadRoutes);
router.use("/category", getCategoryRoute);
router.use("/otp", otpRoute);
router.use("/rating", ratingRoute);
router.use("/homePage", homePageRoute);
router.use("/merge", mergeRoute);
router.use("/address", addressRoute);
router.use("/order", orderRoute);

module.exports = router;
