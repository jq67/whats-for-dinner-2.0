const router = require('express').Router();
const { Meal } = require('../../models');
const withAuth = require('../../utils/auth');

// //Create meal
// router.post('/', withAuth, async (req, res) => {
//     try {
//       const mealData = await Meal.create({
//         name: req.body.name,
//         receipe_url : req.body.receipe_url,
//     });

//       res.status(200).json(newMealPlan);
//     } catch (err) {
//       res.status(400).json(err);
//     }
// });

//Route to get a single meal
router.get('/meal/:id', async (req, res) => {
  try {
      const MealPlan = await Meal.findbyPk(req.params.id, {
          include: [
              {
                  model: User,
                  attributes: ['name'],
              }
          ]
      })
      
      const meals = MealPlan.get({ plain: true });

      res.render('meal', {
          ...meals,
          logged_in: req.session.logged_in
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/mealplan', withAuth, async (req, res) => {
  try {
      const userData = await User.findbyPk(req.session.user_id, {
          attributes: { excludes: ['password'] },
          include: [{ model: Meal }],
      });

      const user = userData.get({ plain: true });

      res.render('mealplan', {
          ...user,
          logged_in: true
      });
  } catch (err) {
      res.status(500).json(err);
  }
})

//Delete meal
router.delete('/:id', async (req, res) => {
    try {
      const MealPlan = await Meal.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!MealPlan) {
        res.status(404).json({ message: 'No meal plan found with this id'});
        return;
      }
  
      res.status(200).json(MealPlan);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;