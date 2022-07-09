const router = require('express').Router();
const { Meal, User, Mealplan, Mealjoinplan, Userjoinplan } = require('../../models');

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
                }
            ]
        });

        const plans = planData.map((plan) => plan.get({plain: true}))

        res.status(200).json(planData)
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
})

module.exports = router;