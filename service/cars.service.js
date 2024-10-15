const { Cars, Brands } = require("../models"); // Ensure both models are imported

//addCar Service
async function createCar(car, images) {
  try {
    car.CarPhotos = images;

    await Cars.create(car);

    return {
      error: false,
      status: 200,
      payload: "Car successfully created!",
    };
  } catch (error) {
    console.error("Error creating Car service:", error);
    throw error;
  }
}

//get All Cars
async function getAllCars() {
  try {
    const cars = await Cars.findAll({
      attributes: ["id", "carName", "CarPhotos"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"],
        },
      ],
    });

    if (!cars) {
      return {
        error: true,
        status: 404,
        payload: "No Cars Available",
      };
    } else {
      return {
        error: false,
        status: 200,
        payload: cars,
      };
    }
  } catch (error) {
    console.error("Error getting Cars service:", error);
    throw error;
  }
}

async function getCarById(id) {
  try {
    const car = await Cars.findOne({
      where: {
        id: id,
      },
    });

    if (!car) {
      return {
        error: true,
        status: 404,
        payload: "No Car Data Found",
      };
    } else {
      return {
        error: false,
        status: 200,
        payload: car,
      };
    }
  } catch (error) {
    console.error("Error getting Car by ID service :", error);
    throw error;
  }
}

async function sortCarByBrands(brandId) {
  try {
    const cars = await Cars.findAll({
      where: {
        brandId: brandId,
      },
      attributes: ["id", "carName", "CarPhotos"], 
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"], 
        },
      ],
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 404,
        payload: "No car data available!",
      };
    } else {
      return {
        error: false,
        status: 200,
        payload: cars,
      };
    }
  } catch (error) {
    console.error("Error getting cars by brand ID:", error);
    throw error;
  }
}

module.exports = { createCar, getAllCars, getCarById, sortCarByBrands };
