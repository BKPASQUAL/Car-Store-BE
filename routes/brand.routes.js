const express = require("express");
const brandController = require("../controller/brand.controller");
const authMiddleware = require("../middleware/auth.middleware");

function getBrandRoutes() {
  const router = express.Router();

  router.use(express.json());

  router.post("/", authMiddleware , brandController.addBrand);

  return router;
}

module.exports = getBrandRoutes();
