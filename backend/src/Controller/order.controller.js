const Order = require("../Model/Order");
const Cart = require("../Model/cartItem");
const { v4: uuidv4 } = require("uuid");

// Create a new order
module.exports.createOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const { paymentMethod, shippingAddress, billingAddress, couponCode, discount } = req.body;

        if (!userId) {
            return res.status(400).send({ status: false, message: "userId is required" });
        }

        // Get cart data
        const cart = await Cart.findOne({ userId }).populate("quantity.productId");

        if (!cart || !cart.quantity || cart.quantity.length === 0) {
            return res.status(400).send({ status: false, message: "Cart is empty" });
        }

        // Build order items from cart
        const items = cart.quantity.map((item) => {
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

        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
            paymentStatus: paymentMethod === "COD" ? "pending" : "pending",
            orderStatus: "placed",
            shippingAddress: shippingAddress || {},
            billingAddress: billingAddress || shippingAddress || {},
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        });

        await newOrder.save();

        // Clear the cart after order is placed
        await Cart.findOneAndDelete({ userId });

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
