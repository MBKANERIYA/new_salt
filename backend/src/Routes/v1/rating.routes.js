const express = require("express");
const ratingController = require("../../Controller/rating.controller");

const route = express.Router();

route.post("/addRating", ratingController.addRating);
route.get("/getRating/:productId", ratingController.getRating);
route.put("/updateRating", ratingController.updateRating);
route.delete("/deleteRating/:productId/:userId", ratingController.deleteRating);

module.exports = route;
