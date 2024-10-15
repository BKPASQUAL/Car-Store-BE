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
  router.get("/sortCarsByBrands/:id", carsController.sortCarByBrands);
  router.get("/getPagination", carsController.getPagination);
  router.get("/getPaginatedCarsByBrand/:id", carsController.sortCarByBrandsPagination);


  return router;
}

module.exports = getCarsRoutes();
