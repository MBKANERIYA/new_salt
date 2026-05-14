const Order = require("../Model/Order");
const Cart = require("../Model/cartItem");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_Sp8ow2u4uVKQIl',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'HZ0Pp5Jblm8gys1HjRkIqCK4',
});

// Create a new order
module.exports.createOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { paymentMethod, shippingAddress, billingAddress, couponCode, discount, buyNowItem } = req.body;

        if (!userId) {
            return res.status(400).send({ status: false, message: "userId is required" });
        }

        let items = [];
        let subtotal = 0;

        if (buyNowItem) {
            // Build order item from buyNowItem
            const product = buyNowItem.productId || {};
            items = [{
                productId: product.id || product._id || product.product_id,
                title: product.title || "Product",
                image: product.image01 || "",
                price: (buyNowItem.itemPrice || product.total14KT || 0) / (buyNowItem.quantity || 1), // Get unit price
                quantity: buyNowItem.quantity || 1,
                colorBy: buyNowItem.colorBy || "",
                caratBy: buyNowItem.caratBy || "",
                size: buyNowItem.size || "",
            }];
            subtotal = items[0].price * items[0].quantity;
        } else {
            // Get cart data
            const cart = await Cart.findOne({ userId }).populate("quantity.productId");

            if (!cart || !cart.quantity || cart.quantity.length === 0) {
                return res.status(400).send({ status: false, message: "Cart is empty" });
            }

            // Build order items from cart
            items = cart.quantity.map((item) => {
                const product = item.productId;
                const price = product.total14KT || 0;
                return {
                    productId: product.id || product._id,
                    title: product.title || "Product",
                    image: product.image01 || "",
                    price: price,
                    quantity: item.quantity || 1,
                    colorBy: item.colorBy || "",
                    caratBy: item.caratBy || "",
                    size: item.size || "",
                };
            });
            subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        // Calculate totals
        const discountPercent = discount || 0;
        const discountAmount = subtotal * (discountPercent / 100);
        const totalAmount = subtotal - discountAmount;

        // Generate unique order ID
        const orderId = "SG-" + Date.now().toString(36).toUpperCase() + "-" + uuidv4().slice(0, 4).toUpperCase();

        const newOrder = new Order({
            orderId,
            userId,
            items,
            subtotal,
            discount: discountPercent,
            discountAmount,
            shippingCharges: 0,
            totalAmount,
            couponCode: couponCode || "",
            paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
            orderStatus: "placed",
            shippingAddress: shippingAddress || {},
            billingAddress: billingAddress || shippingAddress || {},
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        });

        await newOrder.save();

        if (!buyNowItem) {
            // Clear the cart after order is placed only if it wasn't a Buy Now order
            await Cart.findOneAndDelete({ userId });
        }

        return res.status(201).send({
            status: true,
            message: "Order placed successfully",
            order: newOrder,
        });
    } catch (err) {
        console.error("Error creating order:", err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

// Get all orders for a user
module.exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).send({ status: false, message: "userId is required" });
        }

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).send({
            status: true,
            message: "Orders retrieved successfully",
            orders,
        });
    } catch (err) {
        console.error("Error fetching orders:", err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

// Get single order by orderId
module.exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).send({ status: false, message: "Order not found" });
        }

        return res.status(200).send({
            status: true,
            message: "Order retrieved",
            order,
        });
    } catch (err) {
        console.error("Error fetching order:", err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports.createRazorpayOrder = async (req, res) => {
    try {
        const { userId, discount, buyNowItem } = req.body;

        if (!userId) {
            return res.status(400).json({ status: false, message: "userId is required" });
        }

        let items = [];
        let subtotal = 0;

        if (buyNowItem) {
            const product = buyNowItem.productId || {};
            items = [{
                price: (buyNowItem.itemPrice || product.total14KT || 0) / (buyNowItem.quantity || 1),
                quantity: buyNowItem.quantity || 1,
            }];
            subtotal = items[0].price * items[0].quantity;
        } else {
            // Get cart data
            const cart = await Cart.findOne({ userId }).populate("quantity.productId");

            if (!cart || !cart.quantity || cart.quantity.length === 0) {
                return res.status(400).send({ status: false, message: "Cart is empty" });
            }

            // Build order items from cart
            items = cart.quantity.map((item) => {
                const product = item.productId;
                const price = product.total14KT || 0;
                return {
                    price: price,
                    quantity: item.quantity || 1,
                };
            });
            subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        // Calculate totals
        const discountPercent = discount || 0;
        const discountAmount = subtotal * (discountPercent / 100);
        const totalAmount = subtotal - discountAmount;

        const options = {
            amount: Math.round(totalAmount * 100), // Amount in paise
            currency: "INR",
            receipt: "receipt_order_" + Date.now(),
        };

        const order = await razorpayInstance.orders.create(options);
        
        if (!order) {
            return res.status(500).send("Some error occurred while creating Razorpay order");
        }

        res.json({
            status: true,
            order
        });
    } catch (error) {
        console.error("Error creating razorpay order:", error);
        res.status(500).send(error);
    }
};

module.exports.verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'HZ0Pp5Jblm8gys1HjRkIqCK4')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ status: true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ status: false, message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).send({ status: false, message: error.message });
    }
};
