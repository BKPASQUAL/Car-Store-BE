const express = require("express");

const carsRoute = require("./cars.routes");
const userRoutes = require("./user.routes");
const inquiryRoutes = require("./inquiry.routes");
const brandRoutes = require("./brand.routes");

function routes() {
  const router = express.Router();

  router.use("/user", userRoutes); 
  router.use("/cars", carsRoute);
  router.use("/inquiry", inquiryRoutes);
  router.use("/brand", brandRoutes);
  

  return router;
}

module.exports = routes();
