const express = require("express");
const inquiryController = require("../controller/inquiry.controller");
const authMiddleware = require("../middleware/auth.middleware");

function getInquiryRoutes() {
  const router = express.Router();

  router.use(express.json());

  router.post("/addInquiry", inquiryController.addInquiry);

  return router;
}

module.exports = getInquiryRoutes();
