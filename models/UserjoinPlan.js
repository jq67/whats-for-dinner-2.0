const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Userjoinplan extends Model {}

Userjoinplan.init(
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userjoinplan'
  }
);

module.exports = Userjoinplan;
