const router = require('express').Router();
const { Meal, User, Mealplan } = require('../../models');
const withAuth = require('../../utils/auth');

// adding mealplan to user
router.post('/add/:planid/', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: Mealplan,
                }
            ]
        });

        // loop to check if user already has plan
        for (let i = 0; i < user.mealplans.length; i++) {
            if (user.mealplans.length == 0) {
                user.addMealplan(req.params.planid)

                const plan = await Mealplan.findByPk(req.params.planid)

                plan.increment({
                    count: 1
                });

                return res.status(200).json(user)

            } else if (user.mealplans[i].id == req.params.planid) {
                return res.status(400).json(user)

            } else if (i == user.mealplans.length-1) {         
                user.addMealplan(req.params.planid)

                const plan = await Mealplan.findByPk(req.params.planid)

                plan.increment({
                    count: 1
                });

                return res.status(200).json(user)
            };
        };

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
});

// remove plan from user
router.delete('/remove/:planid', async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id);

        user.removeMealplan(req.params.planid)

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
});

// create plan add meals, final route, need to add session logged in params, will have to add user.addMealplan
router.post('/new', withAuth, async (req, res) => {
    try {
        const newPlan = await Mealplan.create({
            name: req.body.name,
            creator: req.body.creator
        });

        // for (let i = 0; i < req.body.meals.length; i++) {
        //     newPlan.addMeal(Object.values(req.body.meals[i]))
        // }

        newPlan.addMeals(req.body.meals)

        newPlan.increment({
            count: 1,
        });
        
        for (let i = 0; i < req.body.meals.length; i++) {
            Meal.increment(
                {
                    count: 1
                },
                {
                    where: {
                        id: req.body.meals[i]
                    }
                }
            )
        };

        const user = await User.findByPk(req.session.user_id);

        user.addMealplan(newPlan)

        res.status(200).json(newPlan)

    } catch (err) {
        res.status(500).json(err)
    }
});

// render all meals, final route, add session, logged in params
router.get('/allmeals', async (req,res) => {
    try {
        const mealData = await Meal.findAll();

        const meals = mealData.map((meal) => meal.get({plain: true}))

        res.render('genmealplan', { meals, logged_in: req.session.logged_in, user_id: req.session.user_id })
    } catch (err) {
        res.status(500).json(err)
    }
});

// render all plans, final route, add session logged in params
router.get('/allplans', async (req,res) => {
    try {
        const planData = await Mealplan.findAll({
            include: [
                {
                    model: Meal,                 
                },
            ]
        });

        const plans = planData.map((plan) => plan.get({plain: true}))

        console.log(req.session.user_id)

        res.render('allmealplans', { plans, logged_in: req.session.logged_in, user_id: req.session.user_id })
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;