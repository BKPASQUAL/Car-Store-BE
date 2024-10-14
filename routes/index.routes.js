const express = require("express");

const carsRoute = require("./cars.routes");
const userRoutes = require("./user.routes");

function routes() {
  const router = express.Router();

  router.use("/user", userRoutes); 
  router.use("/cars", carsRoute);
  

  return router;
}

module.exports = routes();
