const express = require("express");
const mergeController = require("../../Controller/merge.controller");

const route = express.Router();

route.post("/mergeCartAndWishlist", mergeController.mergeCartAndWishlist);

module.exports = route;
