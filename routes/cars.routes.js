const express = require("express");
const carsController = require("../controller/cars.controller");
const { uploadImages } = require("../middleware/cars.images.middleware");
const authMiddleware = require("../middleware/auth.middleware");

function getCarsRoutes() {
  const router = express.Router();

  router.use(express.json());

  router.post("/addCar", uploadImages, authMiddleware, carsController.addCar);
  router.get("/getAllCars", carsController.getAllCars);
  router.get("/getCarById/:id", carsController.getCarById);

  return router;
}

module.exports = getCarsRoutes();
