const User = require('./User');
const Meal = require('./Meal');
const Mealplan = require('./Mealplan');

User.hasMany(Mealplan);

Mealplan.belongsTo(User, {
  foreignKey: 'creator',
  onDelete: 'NO ACTION',
});

// Mealplan.hasMany(Meal, {
//   constraints: false
// });

// Meal.belongsTo(Mealplan, {
//   constraints: false
// });

module.exports = { User, Meal, Mealplan };
