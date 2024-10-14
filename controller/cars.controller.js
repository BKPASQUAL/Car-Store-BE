const carsService = require("../service/cars.service");

// addCar
async function addCar(req, res) {
  try {
    const userRole_id = req.user.roleId;
    const car = req.body;
    const files = req.files;
    const images = files.map((file) => file.path);

    if (![1].includes(userRole_id)) {
        return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create agencies."});
}

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

//Get All Cars
async function getAllCars(req, res) {
  try {
    const result = await carsService.getAllCars();

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
    console.log("Error creating Car controller: ", error);
    return res.status(500).json({
      error: true,
      payload: error,
    });
  }
}

module.exports = { addCar , getAllCars };
