const router = require('express').Router();
const { Meal, User, Mealplan } = require('../../models');
const withAuth = require('../../utils/auth');
const recipeScraper = require("recipe-scraper");

// adding mealplan to user, will use req.sesson.user_id COPIED
router.post('/mealplan/:planid/', withAuth, async (req, res) => {
    try {
        // const user = await User.findByPk(req.params.userid, {
        const user = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: Mealplan,
                }
            ]
        });

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

// remove plan from user route COPIED
router.delete('/mealplan/:planid', async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id);

        user.removeMealplan(req.params.planid)

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
});

// render all meals, final route, add session, logged in params COPIED
router.get('/allmeals', async (req,res) => {
    try {
        const mealData = await Meal.findAll();

        const meals = mealData.map((meal) => meal.get({plain: true}))

        res.render('genmealplan', { meals, logged_in: req.session.logged_in, user_id: req.session.user_id })
    } catch (err) {
        res.status(500).json(err)
    }
});

// render all plans, final route, add session logged in paramS COPIED
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

// render user profile, final route, add session, logged in params COPIED
router.get('/userplans', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Mealplan,
                    include: [
                        {
                            model: Meal,
                        }
                    ]
                }
            ]
        });

        const user = userData.get({ plain: true });

        // res.status(200).json(user)
        res.render('profile', { user, logged_in: req.session.logged_in, user_id: req.session.user_id })
    } catch (err) {
        res.status(500).json(err)
    }
});

// create plan add meals, final route, need to add session logged in params, will have to add user.addMealplan COPIED
router.post('/createplan/test/', withAuth, async (req, res) => {
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

// todos
// better seed data
// add checks and preventions to buttons / routes *double check everything is covered*
// refactor code and routes
// push to heroku

module.exports = router;