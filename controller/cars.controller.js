const carsService = require("../service/cars.service");

// addCar
async function addCar(req, res) {
  try {
    const car = req.body; 
    const files = req.files; 
    const images = files.map(file => file.path);

    const result = await carsService.createCar(car, images);

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
