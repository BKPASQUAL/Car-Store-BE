const { Cars } = require("../models");

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
    const cars = await Cars.findAll();

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

module.exports = { createCar, getAllCars };
