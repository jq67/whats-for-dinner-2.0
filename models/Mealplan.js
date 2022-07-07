const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mealplan extends Model {}

Mealplan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meals: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'mealplan'
  },
);

module.exports = Mealplan;