module.exports = (sequelize, DataTypes) => {
    const Cars = sequelize.define("Cars", {
        carName: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        brandName: {  
            type: DataTypes.STRING,
            allowNull: false
        }, 
        manufacturingYear: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }, 
        registrationYear: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },  
        exteriorColour: {  
            type: DataTypes.STRING,
            allowNull: true
        }, 
        interiorColour: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        driverPosition: {  
            type: DataTypes.STRING,
            allowNull: true
        }, 
        engine: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bodyType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transmission: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        // CarPhotos : {
        //     type: DataTypes.DOUBLE,
        //     allowNull: true
        // },
        // photos: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
    });

    return Cars;
}
