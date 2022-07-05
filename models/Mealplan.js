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
    meal1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id',
      },
    },
    meal2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id',
      },
    },
    meal3_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id',
      },
    },
    meal4_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id',
      },
    },
    meal5_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id',
      },
    },
    meal6_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id',
      },
    },
    meal7_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
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
  }
);

module.exports = Mealplan;