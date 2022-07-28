const router = require('express').Router();
const { User, Meal, Mealplan } = require('../models');
const recipeScraper = require("recipe-scraper");
const withAuth = require('../utils/auth');

// render homepage
router.get('/', async (req, res) => {
  try {
    const planCount = await Mealplan.findAll({
      limit: 5,
      order: [
          ['count', 'DESC']
      ]
    });

    const plans = planCount.map((plan) => plan.get({ plain: true }))

    const mealCount = await Meal.findAll({
      limit: 5,
      order: [
          ['count', 'DESC']
      ]
    });

  const meals = mealCount.map((meal) => meal.get({ plain: true }))

    res.render('homepage', { meals, plans, logged_in: req.session.logged_in, user_id : req.session.user_id });
  } catch (err) {
    res.status(500).json(err)
  }
});

// render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    window.alert('You are currently logged in');
    res.redirect('/');
    return;
  }
  res.render('login');
});

// render register page
router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    window.alert('You are currently logged in');
    res.redirect('/');
    return;
  }
  res.render('register');
});

// recipe route
router.get('/:mealid/recipe', withAuth, async (req, res) => {
  try {
      const meal = await Meal.findByPk(req.params.mealid)

      console.log(meal.recipe_url)

      const recipe = await recipeScraper(meal.recipe_url)

      // res.status(200).json(recipe)
      res.render('recipe', {recipe, logged_in: req.session.logged_in, user_id: req.session.user_id })
  } catch (err) {
      res.status(500).json(err)
  }
});

module.exports = router;