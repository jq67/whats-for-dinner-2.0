const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mealjoinplan extends Model {}

Mealjoinplan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mealplan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mealplan',
        key: 'id'
      }
    },
    meal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'mealjoinplan'
  }
);

module.exports = Mealjoinplan;
