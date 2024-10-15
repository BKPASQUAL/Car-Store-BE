const inquiryService = require("../service/inquiry.service");

//add inquiry
async function addInquiry(req, res) {
  try {
    const inquiry = req.body;

    const result = await inquiryService.addInquiry(inquiry);

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
    console.log("Error creating inquiry controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

module.exports = { addInquiry };
