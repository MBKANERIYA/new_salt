const { cartSchema, wishlistSchema } = require("../Model");

// Merge guest cart and wishlist into the logged-in user's account
module.exports.mergeCartAndWishlist = async (req, res) => {
  try {
    const { guestUserId, loggedInUserId } = req.body;

    if (!guestUserId || !loggedInUserId) {
      return res.status(400).json({
        status: false,
        message: "Both guestUserId and loggedInUserId are required",
      });
    }

    // Merge Cart
    const guestCart = await cartSchema.findOne({ userId: guestUserId });
    if (guestCart && guestCart.quantity.length > 0) {
      let userCart = await cartSchema.findOne({ userId: loggedInUserId });

      if (userCart) {
        // Merge items
        for (const guestItem of guestCart.quantity) {
          const existingIndex = userCart.quantity.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString()
          );
          if (existingIndex > -1) {
            userCart.quantity[existingIndex].quantity += guestItem.quantity;
          } else {
            userCart.quantity.push(guestItem);
          }
        }
        await userCart.save();
      } else {
        // Transfer guest cart to user
        guestCart.userId = loggedInUserId;
        await guestCart.save();
      }

      // Delete guest cart (if it wasn't transferred)
      if (guestCart.userId !== loggedInUserId) {
        await cartSchema.deleteOne({ userId: guestUserId });
      }
    }

    // Merge Wishlist
    const guestWishlist = await wishlistSchema.findOne({
      userId: guestUserId,
    });
    if (guestWishlist && guestWishlist.products.length > 0) {
      let userWishlist = await wishlistSchema.findOne({
        userId: loggedInUserId,
      });

      if (userWishlist) {
        // Merge items
        for (const guestItem of guestWishlist.products) {
          const existingIndex = userWishlist.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString()
          );
          if (existingIndex === -1) {
            userWishlist.products.push(guestItem);
          }
        }
        await userWishlist.save();
      } else {
        // Transfer guest wishlist to user
        guestWishlist.userId = loggedInUserId;
        await guestWishlist.save();
      }

      // Delete guest wishlist (if it wasn't transferred)
      if (guestWishlist.userId !== loggedInUserId) {
        await wishlistSchema.deleteOne({ userId: guestUserId });
      }
    }

    return res.status(200).json({
      status: true,
      message: "Cart and wishlist merged successfully",
    });
  } catch (err) {
    console.error("Error in mergeCartAndWishlist:", err);
    return res
      .status(500)
      .json({ status: false, message: err.message });
  }
};
