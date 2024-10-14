const { Cars } = require("../models");

async function createCar(car) {
  try {
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
