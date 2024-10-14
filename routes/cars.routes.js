const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const carsController = require("../controller/cars.controller")

function getCarsRoutes() {
    const router = express.Router();

    router.use(express.json());
    // router.use(authMiddleware);

    router.post("/addCar", carsController.addCar);
    // router.get("/getAllCars", carsController.getAllCars);
    // router.get("/getCarsById/:id", carsController.getCarsById);
    // router.delete("/deleteCars/:id", carsController.deleteCars);
    // router.patch("/updateCars/:id", carsController.updateCars);
    
    return router;

}
module.exports = getCarsRoutes(); 