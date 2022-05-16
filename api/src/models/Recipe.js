const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.STRING,
      allowNull: true
    },
    healthScore: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, { timestamps: false });
};



