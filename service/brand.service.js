const { Brands } = require("../models");

//add Inquiry
async function addBrand(brand) {
  try {
    await Brands.create(brand);

    return {
      error: false,
      status: 200,
      payload: "Brand successfully created!",
    };
  } catch (error) {
    console.error("Error creating Brand service:", error);
    throw error;
  }
  
}


module.exports = { addBrand };
