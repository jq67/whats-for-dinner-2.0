const User = require('./User');
const Meal = require('./Meal');
const Mealplan = require('./Mealplan');

User.belongsToMany(Mealplan, {
  through: 'Userjoinplan',
  onDelete: 'NO ACTION',
});

Mealplan.belongsToMany(User, {
  through: 'Userjoinplan',
  onDelete: 'NO ACTION',
});

Mealplan.belongsToMany(Meal, {
  through: 'Mealjoinplan',
  onDelete: 'NO ACTION',
});

Meal.belongsToMany(Mealplan, {
  through: 'Mealjoinplan',
  onDelete: 'NO ACTION',
});

module.exports = { User, Meal, Mealplan };
