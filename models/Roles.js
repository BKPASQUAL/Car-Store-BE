module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("Roles", {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Ensures no duplicate roles
      },
    }, {
      timestamps: false  // Disable timestamps for roles
    });
  
    Roles.associate = function (models) {
      Roles.hasMany(models.Users, {
        as: 'users',
        foreignKey: 'roleId',
      });
    };
  
    return Roles;
  };
  