const { where } = require("sequelize");
const { Cars, Brands } = require("../models");

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
      attributes: ["id", "carName", "CarPhotos","price","manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"],
        },
      ],
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 404,
        payload: "No Cars Available",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price:car.price,
      manufacturingYear:car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
    }));

    return {
      error: false,
      status: 200,
      payload: formattedData,
    };
  } catch (error) {
    console.error("Error getting Cars service:", error);
    throw error;
  }
}

module.exports = { createCar, getAllCars, getCarById, sortCarByBrands };

async function getCarById(id) {
  try {
    const car = await Cars.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName","id"],
        },
      ],
    });

    if (!car) {
      return {
        error: true,
        status: 404,
        payload: "No car data available!",
      };
    }

    const formattedData = {
      id: car.id,
      carName: car.carName,
      manufacturingYear: car.manufacturingYear,
      exteriorColour: car.exteriorColour,
      interiorColour: car.interiorColour,
      driverPosition: car.driverPosition,
      engine: car.engine,
      bodyType: car.bodyType,
      transmission: car.transmission,
      price: car.price,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName, 
      brandId: car.brand.id,          
    };
    return {
      error: false,
      status: 200,
      payload: formattedData,
    };
  } catch (error) {
    console.error("Error getting Car by ID service:", error);
    throw error;
  }
}


async function sortCarByBrands(brandId) {
  try {
    const cars = await Cars.findAll({
      where: {
        brandId: brandId,
      },
      attributes: ["id", "carName", "CarPhotos","price","manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"],
        },
      ],
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 404,
        payload: "No car data available!",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price:car.price,
      manufacturingYear:car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
    }));

    return {
      error: false,
      status: 200,
      payload: formattedData,
    };
  } catch (error) {
    console.error("Error getting cars by brand ID:", error);
    throw error;
  }
}

// getPagination Service
async function getPagination(page = 1, pageSize = 9) {
  try {
    const offset = (page - 1) * pageSize;
    const { rows: cars, count: totalCars } = await Cars.findAndCountAll({
      attributes: ["id", "carName", "CarPhotos","price","manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"],
        },
      ],
      limit: pageSize,
      offset: offset,
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 404,
        payload: "No Cars Available",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price:car.price,
      manufacturingYear:car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
    }));

    return {
      error: false,
      status: 200,
      payload: {
        cars: formattedData,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalCars: totalCars,
          totalPages: Math.ceil(totalCars / pageSize),
        },
      },
    };
  } catch (error) {
    console.error("Error getting Cars with pagination:", error);
    throw error;
  }
}

async function sortCarByBrandsPagination(brandId, page = 1, pageSize = 9) {
  try {
    const offset = (page - 1) * pageSize;
    const { rows: cars, count: totalCars } = await Cars.findAndCountAll({
      where: {
        brandId: brandId,
      },
      attributes: ["id", "carName", "CarPhotos","price","manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"],
        },
      ],
      limit: pageSize,
      offset: offset,
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 404,
        payload: "No cars found for the selected brand!",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price:car.price,
      manufacturingYear:car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
    }));

    return {
      error: false,
      status: 200,
      payload: {
        cars: formattedData,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalCars: totalCars,
          totalPages: Math.ceil(totalCars / pageSize),
        },
      },
    };
  } catch (error) {
    console.error("Error sorting cars by brand with pagination:", error);
    throw error;
  }
}

//Delete a Car
async function deleteCar(id) {
  try {
    const car = await Cars.findByPk(id);

    if (!car) {
      return {
        error: true,
        status: 404,
        payload: "Car not found",
      };
    } else {
      await Cars.destroy({
        where: {
          id: id,
        },
      });

      return {
        error: false,
        status: 200,
        payload: "Car successfully deleted!",
      };
    }
  } catch (error) {
    console.error("Error deleteing Car service: ", error);
    throw error;
  }
}

//Update Car
async function updateCar(id, updatedData) {
  try {
    const car = await Cars.findByPk(id);

    if (!car) {
      return {
        error: true,
        status: 404,
        payload: "Car not found!",
      };
    } else {
      const updatedCar = await car.update(updatedData);

      return {
        error: false,
        status: 200,
        payload: "Car updated successfully!",
        updatedCar: car,
      };
    }
  } catch (error) {
    console.error("Error Updating Car Service : ", error);
    throw error;
  }
}

// Get the last six cars
async function getLastSixCars() {
  try {
    const cars = await Cars.findAll({
      attributes: ["id", "carName", "CarPhotos","price","manufacturingYear"],
      include: [
        {
          model: Brands,
          as: "brand",
          attributes: ["brandName", "id"],
        },
      ],
      order: [["createdAt", "DESC"]], 
      limit: 6,
      raw: true,
      nest: true,
    });

    if (!cars || cars.length === 0) {
      return {
        error: true,
        status: 404,
        payload: "No Cars Available",
      };
    }

    const formattedData = cars.map((car) => ({
      id: car.id,
      carName: car.carName,
      price:car.price,
      manufacturingYear:car.manufacturingYear,
      CarPhotos: car.CarPhotos,
      brandName: car.brand.brandName,
      brandId: car.brand.id,
    }));

    return {
      error: false,
      status: 200,
      payload: formattedData,
    };
  } catch (error) {
    console.error("Error getting the last six cars:", error);
    throw error;
  }
}

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  sortCarByBrands,
  getPagination,
  sortCarByBrandsPagination,
  deleteCar,
  updateCar,
  getLastSixCars
};
