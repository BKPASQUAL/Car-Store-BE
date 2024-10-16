const brandService = require("../service/brand.service");

//add brand
async function addBrand(req, res) {
    try {
      const brand = req.body;
  
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
  