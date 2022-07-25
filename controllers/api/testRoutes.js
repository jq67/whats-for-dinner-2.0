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
router.post('/mealplan/:planid/:userid', async (req, res) => {
    try {
        const addPlan = await Userjoinplan.create({
            user_id: req.params.userid,
            mealplan_id: req.params.planid,
        })

        res.status(200).json(addPlan)
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

// render all meals
router.get('/allmeals', async (req,res) => {
    try {
        const mealData = await Meal.findAll();

        const meals = mealData.map((meal) => meal.get({plain: true}))

        res.render('genmealplan', { meals })
    } catch (err) {
        res.status(500).json(err)
    }
});

// render all plans
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

        res.render('allmealplans', { plans })
    } catch (err) {
        res.status(500).json(err)
    }
});

// render user profile
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
        res.render('profile', { user })
    } catch (err) {
        res.status(500).json(err)
    }
});


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

        res.status(200).json(newPlan)

    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;