const express = require("express");
const inquiryController = require("../controller/inquiry.controller");
const authMiddleware = require("../middleware/auth.middleware");

function getInquiryRoutes() {
  const router = express.Router();

  router.use(express.json());

  router.post("/addInquiry", inquiryController.addInquiry);
  router.get("/", authMiddleware, inquiryController.getAllInquiry);
  router.get("/recentInquiries", authMiddleware, inquiryController.getRecentInquiry);
  router.patch("/:id/respons", inquiryController.markAsResponse);
  router.get("/:id", inquiryController.getInquirtById);

  return router;
}

module.exports = getInquiryRoutes();