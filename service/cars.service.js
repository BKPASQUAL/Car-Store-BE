const { Cars } = require("../models");

//addCar Service
async function createCar(car, images) {
  try {
    car.CarPhotos = images;

    await Cars.create(car);

    return {
      error: false,
      status: 200,
      payload: "Car successfully created!" 
    };
  } catch (error) {
    console.error('Error creating Car service:', error); 
    throw error;
  }
}

module.exports = { createCar };
