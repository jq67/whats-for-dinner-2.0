const router = require('express').Router();
const { Meal, User, Mealplan, Mealjoinplan, Userjoinplan } = require('../../models');

// get all users
router.get('/allusers', async (req,res) => {
    try {
        const userData = await User.findAll()

        // const users = userData.get((user) => user.get({ plain: true }));

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})

// create mealplan, will use req.session.user_id for creator field
router.post('/mealplan/create', async (req, res) => {
    try {
        const newPlan = await Mealplan.create({
            name: req.body.name,
            creator: req.body.creator,
        });
        res.status(200).json(newPlan)
    } catch (err) {
        res.status(500).json(err)
    }
});

// adding meals to mealplan
router.post('/mealplan/create/:id', async (req, res) => {
    try {
        const addMeal = await Mealjoinplan.create({
            meal_id: req.body.meal_id,
            mealplan_id: req.params.id,
        });
        res.status(200).json(addMeal)
    } catch (err) {
        res.status(500).json(err)
    }
});

// adding mealplan to user, will use req.sesson.user_id
router.post('/mealplan/:planid/', async (req, res) => {
    try {
        // const user = await User.findByPk(req.session.user_id)
        const user = await User.findByPk(req.session.user_id)

        user.addMealplan(req.params.planid)

        const plan = await Mealplan.findByPk(req.params.planid)

        plan.increment({
            count: 1
        })

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
});

// get all mealplans
router.get('/mealplans', async (req,res) => {
    try {
        const planData = await Mealplan.findAll({
            include: [
                {
                    model: Meal,                 
                },
            ]
        });

        const plans = planData.map((plan) => plan.get({plain: true}))

        res.status(200).json(plans)
    } catch (err) {
        res.status(500).json(err)
    }
});

// get users plans, might use req.session.user_id
router.get('/profile/:id', async (req, res) => {
    try {
        const userData = await User.findByPk( req.params.id, {
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

        res.status(200).json(userData)
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

// render user profile, final route, add session, logged in params
router.get('/userplans', async (req,res) => {
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

// create plan add meals, final route, need to add session logged in params, will have to add user.addMealplan
router.post('/createplan/test', async (req, res) => {
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

        res.status(200).json(newPlan)

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/mealplans/count', async (req, res) => {
    try {
        const planCount = await Mealplan.findAll({
            limit: 5,
            order: [
                ['count', 'DESC']
            ]
        });

        res.status(200).json(planCount)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/meals/count', async (req, res) => {
    try {
        const mealCount = await Meal.findAll({
            limit: 5,
            order: [
                ['count', 'DESC']
            ]
        });

        res.status(200).json(mealCount)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/view/allmeals', async (req, res) => {
    try {
        const meals = await Meal.findAll()

        res.status(200).json(meals)
    } catch (err) {
        res.status(500).json(err)
    }
});
// todos
// front end restyling, loop
// better seed data
// add checks and preventions to buttons / routes
// add recipe route

module.exports = router;