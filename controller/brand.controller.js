const brandService = require("../service/brand.service");

async function addBrand(req, res) {
    try {
      const userRole_id = req.user.roleId;
      const brand = req.body;
      const brandImage = req.file?.path;
  
      if (![1].includes(userRole_id)) {
        return res.status(403).json({
          error: true,
          payload: "Unauthorized. Only Admins can create Cars.",
        });
      }
  
      if (!brandImage) {
        return res.status(400).json({
          error: true,
          payload: "Brand image is required.",
        });
      }
  
      // Include brandImage in the brand object
      brand.brandImage = brandImage;
  
      const result = await brandService.addBrand(brand);
  
      if (result.error) {
        return res.status(result.status).json({
          error: true,
          payload: result.payload,
        });
      } else {
        return res.status(result.status).json({
          error: false,
          payload: result.payload,
        });
      }
    } catch (error) {
      console.log("Error creating brand controller: ", error);
      return res.status(500).json({
        error: true,
        payload: error.message || "Internal Server Error",
      });
    }
  }
  
  module.exports = { addBrand };
  