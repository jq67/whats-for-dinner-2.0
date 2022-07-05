const router = require('express').Router();
const { User, Meal, Recipe } = require('../models');
const withAuth = require ('../utils/auth');

//Route to get all meals and JOINs with user data and recipe data;
router.get('/', async (req, res) => {
  try {
    const mealData = await Meal.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Recipe,
        },
      ],
    });
    //serialize data so it can be read;
    const meals = mealData.map((meal) => meal.get({ plain: true })
    );

    // set up user session
    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id);
      const user = userData.get({ plain: true });

      res.render('homepage', {
        meals,
        user,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render('homepage', {
        meals,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
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