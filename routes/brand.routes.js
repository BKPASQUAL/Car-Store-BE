const express = require("express");
const brandController = require("../controller/brand.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { brandImage } = require("../middleware/brand.middleware");

function getBrandRoutes() {
  const router = express.Router();

  router.use(express.json());

  // Apply the brandImage middleware for file uploads
  router.post("/", authMiddleware, brandImage, brandController.addBrand);

  return router;
}

module.exports = getBrandRoutes();
