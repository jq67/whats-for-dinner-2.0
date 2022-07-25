const User = require('./User');
const Meal = require('./Meal');
const Mealplan = require('./Mealplan');
// const Mealjoinplan = require('./MealjoinPlan');
// const Userjoinplan = require('./UserjoinPlan');

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
});

Meal.belongsToMany(Mealplan, {
  through: 'Mealjoinplan',
});

module.exports = { User, Meal, Mealplan };
