const express = require("express");
const carsController = require("../controller/cars.controller");
const { uploadImages } = require("../middleware/cars.images.middleware");

function getCarsRoutes() {
  const router = express.Router();

  router.use(express.json());

  router.post("/addCar", uploadImages, carsController.addCar);
  router.get("/getAllCars", carsController.getAllCars);

  return router;
}

module.exports = getCarsRoutes();
