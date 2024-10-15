const { Inquiry } = require("../models");

//add Inquiry
async function addInquiry(inquiry) {
  try {
    await Inquiry.create(inquiry);

    return {
      error: false,
      status: 200,
      payload: "inquiry successfully created!",
    };
  } catch (error) {
    console.error("Error creating inquiry service:", error);
    throw error;
  }
}

module.exports = { addInquiry };
