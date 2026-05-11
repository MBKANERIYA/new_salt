const express = require("express");
const addressController = require("../../Controller/address.controller");

const router = express.Router();

// Add a new address for a user
router.post("/addAddress/:userId", addressController.addAddress);

// Get all addresses for a user
router.get("/getAddress/:userId", addressController.getAddress);

// Delete a specific address
router.delete("/deleteAddress/:userId/:addressId", addressController.deleteAddress);

module.exports = router;
