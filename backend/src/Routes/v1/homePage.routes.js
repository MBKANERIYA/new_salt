const express = require("express");
const homePageController = require("../../Controller/homePage.controller");

const route = express.Router();

route.get("/home", homePageController.getHomePage);

module.exports = route;
