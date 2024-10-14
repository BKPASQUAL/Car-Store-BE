const carsService = require("../service/cars.service");

// Create New Car
async function addCar(req, res) {
  try {
    const car = req.body; // Extract car data from request body

    const result = await carsService.createCar(car);

    return res.status(result.status).json({
      error: result.error,
      payload: result.payload,
    });

  } catch (error) {
    console.log("Error creating Car controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error.message || "Internal Server Error",
    });
  }
}

module.exports = { addCar };
