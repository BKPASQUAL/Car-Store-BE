const express = require("express");

const carsRoute = require("./cars.routes");

function routes() {
  const router = express.Router();

  router.use("/cars", carsRoute);
  

  return router;
}

module.exports = routes();
