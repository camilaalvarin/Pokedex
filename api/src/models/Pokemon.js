const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true, 
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: { 
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    createdDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
