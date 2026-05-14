const express = require("express");
const router = express.Router();
const orderController = require("../../Controller/order.controller");

// Create a new order
router.post("/createOrder/:userId", orderController.createOrder);

// Get all orders for a user
router.get("/getOrders/:userId", orderController.getOrders);

// Get single order by orderId
router.get("/getOrder/:orderId", orderController.getOrderById);

// Razorpay integration
router.post("/create-razorpay-order", orderController.createRazorpayOrder);
router.post("/verify-razorpay-payment", orderController.verifyRazorpayPayment);

module.exports = router;
