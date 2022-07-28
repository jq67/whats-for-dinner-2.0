const sequelize = require('../config/connection');
const { User, Meal, Mealplan } = require('../models');
const userData = require('./userData.json');
const mealData = require('./mealData.json');
const mealplanData = require('./mealplan.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
  });

  await Meal.bulkCreate(mealData);

  await Mealplan.bulkCreate(mealplanData);

  process.exit(0);
};

seedDatabase();