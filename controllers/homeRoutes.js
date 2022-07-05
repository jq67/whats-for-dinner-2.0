const router = require('express').Router();
const { User, Meal, Mealplan } = require('../models');
const withAuth = require ('../utils/auth');

router.get('/meals', async (req, res) => {
  try {
    const mealData = await Meal.findAll();

    res.status(200).json(mealData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/users', async (req, res) => {
  try {
    const userData = await User.findAll();

    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/', async (req, res) => {
  try {
    

    res.render('homepage', { logged_in: req.session.logged_in, user_id : req.session.user_id });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    window.alert('You are currently logged in');
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    window.alert('You are currently logged in');
    res.redirect('/');
    return;
  }
  res.render('register');
});

module.exports = router;