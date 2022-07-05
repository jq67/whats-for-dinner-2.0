const User = require('./User');
const Meal = require('./Meal');
const Mealplan = require('./Mealplan');

User.hasMany(Mealplan, {
  foreignKey: 'mealplan'
});

Mealplan.belongsTo(User);

Mealplan.hasMany(Meal, {
  constraints: false
});

Meal.belongsTo(Mealplan, {
  constraints: false
});

module.exports = { User, Meal, Mealplan };
